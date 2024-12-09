import { TableProps, Tag } from 'antd';
import { DataType, SalesDataSWOTType, SalesDataType, SalesExpandedData } from '../../types/sales';
import { getTagColor, toRub } from '../../helpers/helpers';
import { ExpandedSalesAndOrdersDataType, FilterType } from '../../types/common';
import dayjs from 'dayjs';

export const getSalesColumns = (filter: FilterType[]) => {
    const salesColumns: TableProps<SalesDataType>['columns'] = [
        {
            title: 'Артикул',
            dataIndex: 'sa_name',
            key: 'sa_name',
            filters: filter,
            onFilter: (value, record) => record.sa_name.indexOf(value as string) === 0,
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Кол-во',
            dataIndex: 'amountSales',
            key: 'amountSales',
        },
        {
            title: 'Цена до СПП',
            dataIndex: 'retail_price_withdisc_rub',
            key: 'retail_price_withdisc_rub',
            render: (sum, record) => <>{toRub(sum / record.amountSales)}</>,
        },
        {
            title: 'Цена после СПП',
            dataIndex: 'retail_amount',
            key: 'retail_amount',
            render: (sum, record) => <>{toRub(sum / record.amountSales)}</>,
        },
        {
            title: 'Комиссия Вб',
            dataIndex: 'commission_percent',
            key: 'commission_percent',
            render: (percent, record) => <>{(percent / record.amountSales).toFixed(2)} %</>,
        },
        {
            title: 'Разница',
            dataIndex: 'ppvz_vw',
            key: 'ppvz_vw',
            render: (percent, record) => <>{(percent / record.amountSales).toFixed(2)} %</>,
        },
        {
            title: 'Логистика',
            dataIndex: 'delivery_rub',
            key: 'delivery_rub',
            render: (sum) => <>{toRub(sum)}</>,
        },
        {
            title: 'Хранение',
            dataIndex: 'storage_fee',
            key: 'storage_fee',
            render: (sum) => <>{toRub(sum)}</>,
        },
        {
            title: 'Реклама',
            dataIndex: 'deduction',
            key: 'deduction',
            render: (sum) => <>{toRub(sum)}</>,
        },
    ];

    return salesColumns;
};

export const ExpandedSalesColumns: TableProps<SalesExpandedData>['columns'] = [
    {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
        render: (date) => <>{dayjs(date).format('DD MMM HH:mm')}</>,
        width: '10%',
    },
    {
        title: 'Цена до СПП',
        dataIndex: 'retail_price_withdisc_rub',
        key: 'retail_price_withdisc_rub',
        render: (sum) => <>{toRub(sum)}</>,
    },
    {
        title: 'Цена после СПП',
        dataIndex: 'retail_amount',
        key: 'retail_amount',
        render: (sum) => <>{toRub(sum)}</>,
    },
    {
        title: 'Комиссия Вб',
        dataIndex: 'commission_percent',
        key: 'commission_percent',
        render: (percent) => <>{percent.toFixed(2)} %</>,
    },
    {
        title: 'Разница',
        dataIndex: 'ppvz_vw',
        key: 'ppvz_vw',
        render: (amount) => <>{amount.toFixed(2)}</>,
    },
    {
        title: 'Логистика',
        dataIndex: 'delivery_rub',
        key: 'delivery_rub',
        render: (sum) => <>{toRub(sum)}</>,
    },
    {
        title: 'Хранение',
        dataIndex: 'storage_fee',
        key: 'storage_fee',
        render: (sum) => <>{toRub(sum)}</>,
    },
    {
        title: 'Реклама',
        dataIndex: 'deduction',
        key: 'deduction',
        render: (sum) => <>{toRub(sum)}</>,
    },
];
