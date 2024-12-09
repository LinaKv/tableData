import { DataType, SalesAccType, SalesDataSWOTType, SalesItem } from '../../types/sales';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { DateType, FilterType } from '../../types/common';
dayjs.extend(isBetween);

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
            } = item;

            if (supplier_oper_name !== 'Продажа') {
                return acc;
            }

            const expandedData = {
                key: index,
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

            if (existingItem) {
                existingItem.amountSales += 1;
                existingItem.retail_price_withdisc_rub += retail_price_withdisc_rub;
                existingItem.retail_amount += retail_amount;
                existingItem.commission_percent += commission_percent;
                existingItem.ppvz_vw += ppvz_vw;
                existingItem.delivery_rub += delivery_rub;
                existingItem.storage_fee += storage_fee;
                existingItem.expandedData.push(expandedData);
            } else {
                acc.aggregatedData.push({
                    key: index,
                    amountSales: 1,
                    retail_price_withdisc_rub,
                    retail_amount,
                    commission_percent,
                    ppvz_vw,
                    delivery_rub,
                    storage_fee,
                    deduction,
                    sa_name,
                    expandedData: [expandedData],
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
