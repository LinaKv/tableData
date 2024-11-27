export interface SalesItem {
    date: string;
    lastChangeDate: string;
    warehouseName: string;
    countryName: string;
    oblastOkrugName: string;
    regionName: string;
    supplierArticle: string;
    nmId: number;
    barcode: string;
    category: string;
    subject: string;
    brand: string;
    techSize: string;
    incomeID: number;
    isSupply: boolean;
    isRealization: boolean;
    totalPrice: number;
    discountPercent: number;
    spp: number;
    paymentSaleAmount: number;
    forPay: number;
    finishedPrice: number;
    priceWithDisc: number;
    saleID: string;
    orderType: string;
    sticker: string;
    gNumber: string;
    srid: string;
}

export type DataType = {
    key: number;
    supplierArticle: string;
    totalPrice: number;
    discountPercent: number;
    spp: number;
    sppSum: number;
    forPay: number;
    finishedPrice: number;
    priceWithDisc: number;
    type: string;
};

export type SalesDataSWOTType = {
    key: number;
    supplierArticle: string;
    totalPrice: number;
    totalPriceSum: number;
    discountPercent: number;
    discountPercentSum: number;
    spp: number;
    sppSum: number;
    forPay: number;
    finishedPrice: number;
    finishedPriceSum: number;
    priceWithDisc: number;
    priceWithDiscSum: number;
    returnAmount: number;
    returnPercent: number;
    amount: number;
};
