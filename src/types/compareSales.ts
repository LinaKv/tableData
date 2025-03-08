import { CompareSalesDispatchEnum, PeriodTypeEnum } from '../const/compareSalesEnum';
import { Dayjs } from 'dayjs';
import { FilterType } from './common';

export type OptionType = { label: string; value: PeriodTypeEnum };
export type PeriodDateType = Dayjs[] | null[];

export type CompareSalesAccType = {
    supplierArticle: ArticleFilterType[];
    commonSalesData: CompareCommonSalesDataType[];
};

export type CompareCommonSalesDataType = {
    key: React.Key;
    storage: number;
    deduction: number;
    costPrice: number;
    salesProfit: number;
    netSalesProfit: number;
    retail_price_withdisc_rub: number;
    retail_amount: number;
    delivery: number;
    commissionRUB: number;
    acceptanceAndPenalty: number;
    tax: number;
    expandedData: CommonCompareSalesDataType[];
};

export type CommonCompareSalesDataType = {
    key: React.Key;
    amountSales: number;
    retail_price_withdisc_rub: number;
    retail_amount: number;
    commission_percent: number;
    ppvz_vw: number;
    delivery_rub: number;
    storage_fee: number;
    deduction: number;
    sa_name: string;
    returnAmount: number;
    costPrice?: number;
    commissionRUB?: number;
    tax: number;
    expandedData: CompareSalesExpandedData[];
};

export type CompareSalesExpandedData = {
    key: React.Key;
    id: string;
    supplier_oper_name: string[];
    retail_price_withdisc_rub: number;
    date: string;
    retail_amount: number;
    commission_percent: number;
    ppvz_vw: number;
    delivery_rub: number;
    storage_fee: number;
    deduction: number;
    sa_name: string;
    costPrice?: number;
    tax: number;
};

export type ActionCompareSalesType =
    | { type: CompareSalesDispatchEnum.ADD_NEW_PERIOD }
    | { type: CompareSalesDispatchEnum.CHANGE_TYPE_PERIOD; payload: { id: string; newType: PeriodTypeEnum } }
    | { type: CompareSalesDispatchEnum.CHANGE_DATE_PERIOD; payload: { id: string; newPeriod: Dayjs[] | null[] } }
    | {
          type: CompareSalesDispatchEnum.DELETE_PERIOD;
          payload: { id: string };
      }
    | { type: CompareSalesDispatchEnum.DELETE_ALL_PERIODS }
    | {
          type: CompareSalesDispatchEnum.UPDATE_PERIODS_COMPARED_DATA;
          payload: { updatedData: CompareCommonSalesDataType[]; id: string; articleFilter: ArticleFilterType[] };
      };

export type PeriodType = {
    id: string;
    type: PeriodTypeEnum;
    period: PeriodDateType;
    comparedData: CompareCommonSalesDataType[];
};

export type CompareSalesStateType = {
    periods: PeriodType[];
    articleFilter: ArticleFilterType[];
};

export type CompareSalesContextType = {
    compareSalesState: CompareSalesStateType;
    dispatch: React.Dispatch<ActionCompareSalesType>;
};

export type ArticleFilterType = {
    label: string;
    value: string;
};
