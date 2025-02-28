import { CommonSalesDataType, SalesAccType, SalesDataType, SalesExpandedData, SalesItem } from '../../types/sales';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { OperationEnum } from '../../const/const';
import { DataArticleTableType } from '../ArticleTable/type';
import { toNumber } from '../../helpers/helpers';
dayjs.extend(isBetween);

export const handlerResponseCompareSales = (responseData: SalesItem[]) => {
    const initialCommonSalesDataType: CommonSalesDataType = {
        costPrice: 0,
        deduction: 0,
        netSalesProfit: 0,
        retail_amount: 0,
        retail_price_withdisc_rub: 0,
        salesProfit: 0,
        storage: 0,
        delivery: 0,
        commissionRUB: 0,
        acceptanceAndPenalty: 0,
        tax: 0,
        key: 0,
    };

    return responseData.reduce(
        (acc: SalesAccType, responseItem, index) => {
            const sa_name = responseItem.sa_name;
            const existingItem = acc.aggregatedData.find((item) => item.sa_name === sa_name);

            if (existingItem) {
                updateExistedAggregatedItem({
                    existingItem,
                    responseItem,
                    index,
                });
            } else if (sa_name) {
                const newAggregatedItem = createNewAggregatedItem({
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

            // refactor this!
            const sumArticlesData = acc.aggregatedData.reduce(
                (acc, cur) => {
                    const percent = cur.commission_percent / cur.amountSales;
                    acc.costPriceSum += cur.costPrice || 0;
                    acc.commissionRUBSum += (cur.retail_price_withdisc_rub * percent) / 100;
                    acc.taxSum += cur.tax;

                    return acc;
                },
                { costPriceSum: 0, commissionRUBSum: 0, taxSum: 0 },
            );

            acc.commonSalesData[0].storage += responseItem.storage_fee;
            acc.commonSalesData[0].deduction += responseItem.deduction;
            acc.commonSalesData[0].retail_price_withdisc_rub += responseItem.retail_price_withdisc_rub;
            acc.commonSalesData[0].retail_amount += responseItem.retail_amount;
            acc.commonSalesData[0].delivery += responseItem.delivery_rub;
            acc.commonSalesData[0].costPrice = sumArticlesData.costPriceSum;
            acc.commonSalesData[0].commissionRUB = sumArticlesData.commissionRUBSum;
            acc.commonSalesData[0].acceptanceAndPenalty += responseItem.acceptance + responseItem.penalty;
            acc.commonSalesData[0].tax = sumArticlesData.taxSum;
            acc.commonSalesData[0].key = sumArticlesData.taxSum;

            const commonValue =
                acc.commonSalesData[0].retail_price_withdisc_rub -
                acc.commonSalesData[0].costPrice -
                acc.commonSalesData[0].storage -
                acc.commonSalesData[0].delivery;

            const salesProfit = commonValue - sumArticlesData.commissionRUBSum;

            acc.commonSalesData[0].salesProfit = salesProfit;

            const netSalesProfit = commonValue - acc.commonSalesData[0].acceptanceAndPenalty - sumArticlesData.taxSum;
            acc.commonSalesData[0].netSalesProfit = netSalesProfit;

            return acc;
        },
        { aggregatedData: [], supplierArticle: [], commonSalesData: [initialCommonSalesDataType] },
    );
};

const updateExistedAggregatedItem = ({
    existingItem,
    responseItem,
    index,
}: {
    existingItem: SalesDataType;
    responseItem: SalesItem;
    index: number;
}) => {
    updateAggregatedData({
        existingItem,
        responseItem,
    });

    updateExpandedData({
        existingItem,
        responseItem,
        index,
    });
};

const updateAggregatedData = ({
    existingItem,
    responseItem,
}: {
    existingItem: SalesDataType;
    responseItem: SalesItem;
}) => {
    const { isReturn, isSale } = getOperationType(responseItem);
    const { costPrice, commissionRUB } = getArticleData(responseItem.sa_name);
    const { tax } = getTaxData();

    existingItem.amountSales = isSale ? existingItem.amountSales + responseItem.quantity : existingItem.amountSales;
    existingItem.retail_price_withdisc_rub += responseItem.retail_price_withdisc_rub;
    existingItem.retail_amount += responseItem.retail_amount;
    existingItem.commission_percent += responseItem.commission_percent;
    existingItem.ppvz_vw += responseItem.ppvz_kvw_prc;
    existingItem.delivery_rub += responseItem.delivery_rub;
    existingItem.storage_fee += responseItem.storage_fee;
    existingItem.deduction += responseItem.deduction;
    existingItem.returnAmount = isReturn ? existingItem.returnAmount + 1 : existingItem.returnAmount;
    existingItem.costPrice = costPrice * existingItem.amountSales;
    existingItem.commissionRUB = commissionRUB * existingItem.amountSales;
    existingItem.tax += (responseItem.retail_price_withdisc_rub * tax) / 100;
};

const updateExpandedData = ({
    existingItem,
    responseItem,
    index,
}: {
    existingItem: SalesDataType;
    responseItem: SalesItem;
    index: number;
}) => {
    const expandedData = createExpandedItem({ index, responseItem });
    const itemWithOperationBefore = existingItem.expandedData.find((expItem) => expItem.id === responseItem.srid);

    if (itemWithOperationBefore) {
        itemWithOperationBefore.supplier_oper_name.push(responseItem.supplier_oper_name);
        itemWithOperationBefore.retail_price_withdisc_rub = expandedData.retail_price_withdisc_rub;
        itemWithOperationBefore.retail_amount = expandedData.retail_amount;
        itemWithOperationBefore.commission_percent = expandedData.commission_percent;
        itemWithOperationBefore.ppvz_vw = expandedData.ppvz_vw;
        itemWithOperationBefore.delivery_rub += expandedData.delivery_rub;
        itemWithOperationBefore.tax += expandedData.tax;
    } else {
        existingItem.expandedData.push(expandedData);
    }
};

const createNewAggregatedItem = ({ index, responseItem }: { index: number; responseItem: SalesItem }) => {
    const { isReturn, isSale } = getOperationType(responseItem);
    const expandedData = createExpandedItem({ index, responseItem });

    return {
        key: index,
        amountSales: isSale ? responseItem.quantity : 0,
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
        commissionRUB: expandedData.commissionRUB,
        tax: expandedData.tax,
        expandedData: [expandedData],
    };
};

const getOperationType = (responseItem: SalesItem) => {
    const isReturn = responseItem.supplier_oper_name === OperationEnum.RETURN;
    const isSale = responseItem.supplier_oper_name === OperationEnum.SALE;
    return { isReturn, isSale };
};

const createExpandedItem = ({ responseItem, index }: { responseItem: SalesItem; index: number }) => {
    const { costPrice, commissionRUB } = getArticleData(responseItem.sa_name);
    const { tax } = getTaxData();

    return {
        key: index,
        id: responseItem.srid,
        supplier_oper_name: [responseItem.supplier_oper_name],
        retail_price_withdisc_rub: responseItem.retail_price_withdisc_rub,
        date: responseItem.sale_dt,
        retail_amount: responseItem.retail_amount,
        commission_percent: responseItem.commission_percent,
        ppvz_vw: responseItem.ppvz_kvw_prc,
        delivery_rub: responseItem.delivery_rub,
        storage_fee: responseItem.storage_fee,
        deduction: responseItem.deduction,
        sa_name: responseItem.sa_name,
        costPrice,
        commissionRUB,
        tax: (responseItem.retail_price_withdisc_rub * tax) / 100,
    };
};

const getArticleData = (articleToGet: string) => {
    const savedData = localStorage.getItem('data');
    const initialDataToReturn = { costPrice: 0, commission: 0, commissionRUB: 0 };

    if (!savedData) return initialDataToReturn;

    let data: DataArticleTableType[];

    try {
        data = JSON.parse(savedData);
    } catch (error) {
        console.warn('Invalid JSON data in localStorage.', error);
        return initialDataToReturn;
    }

    const article = data.find((item) => item.article === articleToGet);
    if (!article) return initialDataToReturn;

    return {
        costPrice: toNumber(article.costPrice),
        commission: toNumber(article.commission),
        commissionRUB: (Number(article.commission) * Number(article.costPrice)) / 100,
    };
};

const getTaxData = () => {
    const taxLocalData = localStorage.getItem('taxData');
    const initialTaxData = { tax: 0 };
    if (!taxLocalData) return initialTaxData;

    try {
        const actualData = JSON.parse(taxLocalData) as number;
        return { tax: actualData };
    } catch (error) {
        console.warn('Invalid JSON data in localStorage.', error);
        return initialTaxData;
    }
};
