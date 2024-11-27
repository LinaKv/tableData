import { SalesItem } from '../../types/sales';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { DateType, SalesAndOrdersDataType } from '../../types/common';
import { OrdersType } from '../../types/orders';
dayjs.extend(isBetween);

type HandlerResponseSalesAndOrdersType = {
    responseDataSales: SalesItem[];
    responseDataOrders: OrdersType[];
    datePeriod: DateType;
};

export const handlerResponseSalesAndOrders = ({
    responseDataSales,
    responseDataOrders,
    datePeriod,
}: HandlerResponseSalesAndOrdersType) => {
    const salesData = responseDataSales.reduce((acc: SalesAndOrdersDataType[], item, index) => {
        const { supplierArticle, finishedPrice, saleID, date, forPay } = item;

        const dateToCheck = dayjs(date).startOf('day');
        const isGoodDate = dateToCheck.isBetween(datePeriod.startDate, datePeriod.endDate, null, '[]');
        const isSale = saleID.includes('S');

        if (isGoodDate) {
            const expandedData = {
                key: index,
                type: isSale ? 'Продажа' : 'Возврат',
                date,
                isCancel: false,
                price: finishedPrice,
            };

            const existingItem = acc.find((item) => item.supplierArticle === supplierArticle);

            if (existingItem) {
                existingItem.amountSales = isSale ? existingItem.amountSales + 1 : existingItem.amountSales - 1;
                existingItem.finishedPriceSalesSum += finishedPrice;
                existingItem.finishedPriceSales = existingItem.finishedPriceSalesSum / existingItem.amountSales;
                existingItem.forPay += forPay;
                existingItem.returnAmount = isSale ? existingItem.returnAmount : existingItem.returnAmount + 1;
                existingItem.redemptionPercent = 100 - (existingItem.returnAmount * 100) / existingItem.amountSales;
                existingItem.expandedData.push(expandedData);
            } else {
                acc.push({
                    key: index,
                    supplierArticle,
                    amountOrders: 0,
                    forPay,
                    finishedPriceOrders: 0,
                    finishedPriceOrdersSum: 0,
                    amountSales: isSale ? 1 : -1,
                    finishedPriceSales: finishedPrice,
                    finishedPriceSalesSum: finishedPrice,
                    returnAmount: isSale ? 0 : 1,
                    redemptionPercent: 0,
                    expandedData: [expandedData],
                });
            }
        }

        return acc;
    }, []);

    const finalData = responseDataOrders.reduce((acc: SalesAndOrdersDataType[], item, index) => {
        const { supplierArticle, finishedPrice, date, orderType, isCancel } = item;

        const dateToCheck = dayjs(date).startOf('day');
        const isGoodDate = dateToCheck.isBetween(datePeriod.startDate, datePeriod.endDate, null, '[]');

        if (isGoodDate) {
            const expandedData = {
                key: index,
                type: orderType,
                isCancel,
                date,
                price: finishedPrice,
            };

            const existingItem = acc.find((item) => item.supplierArticle === supplierArticle);

            if (existingItem) {
                existingItem.amountOrders += 1;
                existingItem.finishedPriceOrdersSum += finishedPrice;
                existingItem.finishedPriceOrders = existingItem.finishedPriceOrdersSum / existingItem.amountOrders;
                existingItem.expandedData.push(expandedData);
            } else {
                acc.push({
                    key: index,
                    supplierArticle,
                    amountOrders: 1,
                    forPay: 0,
                    finishedPriceOrders: 0,
                    finishedPriceOrdersSum: 0,
                    amountSales: 0,
                    finishedPriceSales: finishedPrice,
                    finishedPriceSalesSum: finishedPrice,
                    returnAmount: 0,
                    redemptionPercent: 0,
                    expandedData: [expandedData],
                });
            }
        }

        return acc;
    }, salesData);

    return finalData;
};
