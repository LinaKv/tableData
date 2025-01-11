import {
    SalesAccType,
    SalesDataType,
    SalesExpandedData,
    SalesItem,
} from '../../types/sales';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { DateType, FilterType } from '../../types/common';
import { OperationEnum, exceptionStatus } from '../../const/const';
import { DataArticleTableType } from '../ArticleTable/type';
dayjs.extend(isBetween);

export const handlerResponseSales = (responseData: SalesItem[], datePeriod: DateType) => {
    return responseData.reduce(
        (acc: SalesAccType, responseItem, index) => {
            const sa_name = responseItem.sa_name;
            const expandedData = createExpandedItem({ index, responseItem });

            const existingItem = acc.aggregatedData.find((item) => item.sa_name === sa_name);

            if (existingItem) {
                updateExistedItem({
                    expandedData,
                    item: existingItem,
                    responseItem,
                });
            } else {
                const newAggregatedItem = createNewAggregatedItem({
                    expandedData,
                    index,
                    responseItem,
                });
                acc.aggregatedData.push(newAggregatedItem);
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

const createExpandedItem = ({ responseItem, index }: { responseItem: SalesItem; index: number }) => {
    const articleData = getArticleData();

    return {
        key: index,
        id: responseItem.srid,
        supplier_oper_name: responseItem.supplier_oper_name,
        retail_price_withdisc_rub: responseItem.retail_price_withdisc_rub,
        date: responseItem.sale_dt,
        retail_amount: responseItem.retail_amount,
        commission_percent: responseItem.commission_percent,
        ppvz_vw: responseItem.ppvz_kvw_prc,
        delivery_rub: responseItem.delivery_rub,
        storage_fee: responseItem.storage_fee,
        deduction: responseItem.deduction,
        sa_name: responseItem.sa_name,
        costPrice: articleData[responseItem.sa_name],
    };
};

const getArticleData = () => {
    const savedData = localStorage.getItem('data');

    if (!savedData) {
        return {};
    }

    const data: DataArticleTableType[] = JSON.parse(savedData);
    return data.reduce((acc, cur) => {
        const number = Number(cur.costPrice);
        if (!isNaN(Number(cur.costPrice))) {
            acc[cur.article] = number;
        }
        return acc;
    }, {} as Record<string, number>);
};

const updateExistedItem = ({
    expandedData,
    item,
    responseItem,
}: {
    expandedData: SalesExpandedData;
    item: SalesDataType;
    responseItem: SalesItem;
}) => {
    const { isReturn, isSale } = getOperationType(responseItem);

    item.amountSales = isSale ? item.amountSales + 1 : item.amountSales;
    item.retail_price_withdisc_rub += responseItem.retail_price_withdisc_rub;
    item.retail_amount += responseItem.retail_amount;
    item.commission_percent += responseItem.commission_percent;
    item.ppvz_vw += responseItem.ppvz_kvw_prc;
    item.delivery_rub += responseItem.delivery_rub;
    item.storage_fee += responseItem.storage_fee;
    item.deduction += responseItem.deduction;
    item.returnAmount = isReturn ? item.returnAmount + 1 : item.returnAmount;
    item.expandedData.push(expandedData);
};

const createNewAggregatedItem = ({
    expandedData,
    index,
    responseItem,
}: {
    expandedData: SalesExpandedData;
    index: number;
    responseItem: SalesItem;
}) => {
    const { isReturn, isSale } = getOperationType(responseItem);
    return {
        key: index,
        amountSales: isSale ? 1 : 0,
        returnAmount: isReturn ? 1 : 0,
        retail_price_withdisc_rub: responseItem.retail_price_withdisc_rub,
        retail_amount: responseItem.retail_amount,
        commission_percent: responseItem.commission_percent,
        ppvz_vw: responseItem.ppvz_kvw_prc,
        delivery_rub: responseItem.delivery_rub,
        storage_fee: responseItem.storage_fee,
        deduction: responseItem.deduction,
        sa_name: responseItem.sa_name,
        costPrice: expandedData.costPrice,
        expandedData: [expandedData],
    };
};

const getOperationType = (responseItem: SalesItem) => {
    const isReturn = responseItem.supplier_oper_name === OperationEnum.RETURN;
    const isSale = responseItem.supplier_oper_name === OperationEnum.SALE;
    return { isReturn, isSale };
};
