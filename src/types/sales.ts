import { ExpandedSalesAndOrdersDataType, FilterType } from './common';

export interface SalesItemOLD {
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

export interface SalesItem {
    realizationreport_id: number;
    date_from: string;
    date_to: string;
    create_dt: string;
    currency_name: string;
    suppliercontract_code: string | null;
    rrd_id: number;
    gi_id: number;
    subject_name: string;
    nm_id: number;
    brand_name: string;
    sa_name: string;
    ts_name: string;
    barcode: string;
    doc_type_name: string;
    quantity: number;
    retail_price: number;
    retail_amount: number;
    sale_percent: number;
    commission_percent: number;
    office_name: string;
    supplier_oper_name: string;
    order_dt: string;
    sale_dt: string;
    rr_dt: string;
    shk_id: number;
    retail_price_withdisc_rub: number;
    delivery_amount: number;
    return_amount: number;
    delivery_rub: number;
    gi_box_type_name: string;
    product_discount_for_report: number;
    supplier_promo: number;
    rid: number;
    ppvz_spp_prc: number;
    ppvz_kvw_prc_base: number;
    ppvz_kvw_prc: number;
    sup_rating_prc_up: number;
    is_kgvp_v2: number;
    ppvz_sales_commission: number;
    ppvz_for_pay: number;
    ppvz_reward: number;
    acquiring_fee: number;
    acquiring_percent: number;
    acquiring_bank: string;
    ppvz_vw: number;
    ppvz_vw_nds: number;
    ppvz_office_id: number;
    ppvz_office_name: string;
    ppvz_supplier_id: number;
    ppvz_supplier_name: string;
    ppvz_inn: string;
    declaration_number: string;
    bonus_type_name: string;
    sticker_id: string;
    site_country: string;
    penalty: number;
    additional_payment: number;
    rebill_logistic_cost: number;
    rebill_logistic_org?: string;
    kiz?: string;
    storage_fee: number;
    deduction: number;
    acceptance: number;
    srid: string;
    report_type: number;
}

export type DataType = {
    key: number;
    forPay: number;
    supplierArticle: string;
    amountSales: number;
    finishedPriceSales: number;
    finishedPriceSalesSum: number;
    returnAmount: number;
    redemptionPercent: number;
    expandedData: ExpandedSalesAndOrdersDataType[];
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

export type SalesAccType = {
    aggregatedData: SalesDataType[];
    supplierArticle: FilterType[];
    commonSalesData: CommonSalesDataType[];
};

export type SalesDataType = {
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
    expandedData: SalesExpandedData[];
};

export type SalesExpandedData = {
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

export type CommonSalesDataType = {
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
};
