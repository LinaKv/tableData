import { Dayjs } from 'dayjs';

export type NavItem = {
    title: string;
    icon: React.ReactNode;
    path: string;
};

export type DateType = {
    startDate: Dayjs;
    endDate: Dayjs;
};

export type SalesAndOrdersDataType = {
    key: React.Key;
    forPay: number;
    supplierArticle: string;
    amountOrders: number;
    finishedPriceOrders: number;
    finishedPriceOrdersSum: number;
    amountSales: number;
    finishedPriceSales: number;
    finishedPriceSalesSum: number;
    returnAmount: number;
    redemptionPercent: number;
    expandedData: ExpandedSalesAndOrdersDataType[];
};

export type ExpandedSalesAndOrdersDataType = {
    key: React.Key;
    type: string;
    date: string;
    price: number;
    isCancel: boolean;
};
