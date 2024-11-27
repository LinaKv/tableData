import { DataType, SalesDataSWOTType, SalesItem } from '../../types/sales';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { DateType } from '../../types/common';
dayjs.extend(isBetween);

export const handlerResponseSales = (responseData: SalesItem[], datePeriod: DateType) => {
    return responseData.reduce(
        (acc, item, index) => {
            const {
                supplierArticle,
                discountPercent,
                spp,
                totalPrice,
                forPay,
                finishedPrice,
                priceWithDisc,
                saleID,
                date,
            } = item;

            const dateToCheck = dayjs(date).startOf('day');
            const isGoodDate = dateToCheck.isBetween(datePeriod.startDate, datePeriod.endDate, null, '[]');
            const isSale = saleID.includes('S');

            const shouldAddItem = isGoodDate;

            if (isGoodDate) {
                acc.filteredData.push({
                    supplierArticle,
                    discountPercent,
                    spp,
                    sppSum: spp,
                    totalPrice,
                    forPay,
                    finishedPrice,
                    priceWithDisc,
                    key: index,
                    type: isSale ? 'Продажа' : 'Возврат',
                });

                const existingItem = acc.aggregatedData.find(
                    (item) => item.supplierArticle === supplierArticle && shouldAddItem,
                );

                if (existingItem) {
                    existingItem.amount = isSale ? existingItem.amount + 1 : existingItem.amount - 1;
                    existingItem.discountPercentSum += discountPercent;
                    existingItem.discountPercent = existingItem.discountPercentSum / existingItem.amount;
                    existingItem.sppSum += spp;
                    existingItem.spp = existingItem.sppSum / existingItem.amount;
                    existingItem.totalPriceSum += totalPrice;
                    existingItem.totalPrice = existingItem.totalPriceSum / existingItem.amount;
                    existingItem.forPay += forPay;
                    existingItem.finishedPriceSum += finishedPrice;
                    existingItem.finishedPrice = existingItem.finishedPriceSum / existingItem.amount;
                    existingItem.priceWithDiscSum += priceWithDisc;
                    existingItem.priceWithDisc = existingItem.priceWithDiscSum / existingItem.amount;
                    existingItem.returnAmount = isSale ? existingItem.returnAmount : existingItem.returnAmount + 1;
                    existingItem.returnPercent = (existingItem.returnAmount * 100) / existingItem.amount;
                } else {
                    acc.aggregatedData.push({
                        supplierArticle,
                        returnPercent: 0,
                        returnAmount: isSale ? 0 : 1,
                        discountPercent,
                        discountPercentSum: discountPercent,
                        spp,
                        sppSum: spp,
                        totalPrice,
                        totalPriceSum: totalPrice,
                        forPay,
                        finishedPrice,
                        finishedPriceSum: finishedPrice,
                        priceWithDisc,
                        priceWithDiscSum: priceWithDisc,
                        key: index,
                        amount: isSale ? 1 : -1,
                    });
                }
            }

            return acc;
        },
        { aggregatedData: [], filteredData: [] } as {
            aggregatedData: SalesDataSWOTType[];
            filteredData: DataType[];
        },
    );
};
