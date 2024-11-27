export type OrdersType = {
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
    finishedPrice: number;
    priceWithDisc: number;
    isCancel: boolean;
    cancelDate: string | null;
    orderType: string;
    sticker: string;
    gNumber: string;
    srid: string;
};

export type DataOrdersType = {
    key: number;
    supplierArticle: string;
    totalPrice: number;
    spp: number;
    sppSum: number;
    finishedPrice: number;
};

export type DataOrdersSWOTType = {
    key: number;
    supplierArticle: string;
    totalPrice: number;
    totalPriceSum: number;
    spp: number;
    sppSum: number;
    finishedPrice: number;
    finishedPriceSum: number;
    amount: number;
};
