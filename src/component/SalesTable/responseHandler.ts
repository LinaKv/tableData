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

            const isReturn = supplier_oper_name === OperationEnum.RETURN;
            const isSale = supplier_oper_name === OperationEnum.SALE;

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

            if (existingItem) {
                existingItem.amountSales = isSale ? existingItem.amountSales + 1 : existingItem.amountSales;
                existingItem.retail_price_withdisc_rub += retail_price_withdisc_rub;
                existingItem.retail_amount += retail_amount;
                existingItem.commission_percent += commission_percent;
                existingItem.ppvz_vw += ppvz_vw;
                existingItem.delivery_rub += delivery_rub;
                existingItem.storage_fee += storage_fee;
                existingItem.deduction += deduction;
                existingItem.returnAmount = isReturn ? existingItem.returnAmount + 1 : existingItem.returnAmount;

                existingItem.expandedData.push(newExpandData);
            } else {
                acc.aggregatedData.push({
                    key: index,
                    amountSales: isSale ? 1 : 0,
                    returnAmount: isReturn ? 1 : 0,
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
