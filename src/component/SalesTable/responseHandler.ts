import { DataType, SalesAccType, SalesDataSWOTType, SalesItem } from '../../types/sales';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { DateType, FilterType } from '../../types/common';
import { OperationEnum, exceptionStatus } from '../../const/const';
dayjs.extend(isBetween);

const getExpandedData = () => {};

export const handlerResponseSales = (responseData: SalesItem[], datePeriod: DateType) => {
    return responseData.reduce(
        (acc: SalesAccType, item, index) => {
            const {
                retail_price_withdisc_rub,
                retail_amount,
                commission_percent,
                ppvz_vw,
                delivery_rub,
                storage_fee,
                sale_dt,
                deduction,
                sa_name,
                supplier_oper_name,
                srid,
            } = item;

            if (exceptionStatus.includes(supplier_oper_name as OperationEnum)) {
                console.log(item);
                return acc;
            }

            const existExpandedData = acc.aggregatedData
                .map((data) => data.expandedData.find((item) => item.id === srid))
                .find((item) => item);

            if (existExpandedData) {
                existExpandedData.supplier_oper_name = supplier_oper_name;
                existExpandedData.retail_price_withdisc_rub += retail_price_withdisc_rub;
                existExpandedData.retail_amount += retail_amount;
                existExpandedData.commission_percent += commission_percent;
                existExpandedData.ppvz_vw += ppvz_vw;
                existExpandedData.delivery_rub += delivery_rub;
                existExpandedData.storage_fee += storage_fee;
            }

            const newExpandData = {
                key: index,
                id: srid,
                supplier_oper_name,
                retail_price_withdisc_rub,
                date: sale_dt,
                retail_amount,
                commission_percent,
                ppvz_vw,
                delivery_rub,
                storage_fee,
                deduction,
                sa_name,
            };

            const existingItem = acc.aggregatedData.find((item) => item.sa_name === sa_name);
            const isSale = supplier_oper_name === 'Продажа';

            if (existingItem) {
                existingItem.amountSales = isSale ? existingItem.amountSales + 1 : existingItem.amountSales;
                existingItem.retail_price_withdisc_rub += retail_price_withdisc_rub;
                existingItem.retail_amount += retail_amount;
                existingItem.commission_percent += commission_percent;
                existingItem.ppvz_vw += ppvz_vw;
                existingItem.delivery_rub += delivery_rub;
                existingItem.storage_fee += storage_fee;

                if (!existExpandedData) {
                    existingItem.expandedData.push(newExpandData);
                }
            } else {
                acc.aggregatedData.push({
                    key: index,
                    amountSales: isSale ? 1 : 0,
                    retail_price_withdisc_rub,
                    retail_amount,
                    commission_percent,
                    ppvz_vw,
                    delivery_rub,
                    storage_fee,
                    deduction,
                    sa_name,
                    expandedData: [newExpandData],
                });
            }

            const isArticleExist = acc.supplierArticle.find((item) => item.text === sa_name);
            if (!isArticleExist) {
                acc.supplierArticle.push({
                    text: sa_name,
                    value: sa_name,
                });
            }

            return acc;
        },
        { aggregatedData: [], supplierArticle: [] },
    );
};
