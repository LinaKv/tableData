import { TableProps, Tag } from 'antd';
import { DataType, SalesDataSWOTType, SalesDataType, SalesExpandedData } from '../../types/sales';
import { getTagColor, toRub } from '../../helpers/helpers';
import { ExpandedSalesAndOrdersDataType, FilterType } from '../../types/common';
import dayjs from 'dayjs';
import { OperationEnum, exceptionStatus } from '../../const/const';

export const getSalesColumns = (filter: FilterType[]) => {
    const salesColumns: TableProps<SalesDataType>['columns'] = [
        {
            title: 'Артикул',
            dataIndex: 'sa_name',
            key: 'sa_name',
            width: '10%',
            filters: filter,
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.sa_name.indexOf(value as string) === 0,
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Кол-во',
            dataIndex: 'amountSales',
            key: 'amountSales',
            sorter: (a, b) => a.amountSales - b.amountSales,
        },
        {
            title: 'Продажи (до СПП)',
            dataIndex: 'retail_price_withdisc_rub',
            key: 'retail_price_withdisc_rub',
            render: (sum, record) => <>{sum ? toRub(sum) : '-'}</>,
            sorter: (a, b) => a.retail_price_withdisc_rub - b.retail_price_withdisc_rub,
        },
        {
            title: 'Продажи (после СПП)',
            dataIndex: 'retail_amount',
            key: 'retail_amount',
            render: (sum, record) => <>{sum ? toRub(sum) : '-'}</>,
            sorter: (a, b) => a.retail_amount - b.retail_amount,
        },
        {
            title: 'Комиссия Вб',
            dataIndex: 'commission_percent',
            key: 'commission_percent',
            render: (percent, record) => (
                <>{percent && record.amountSales ? `${(percent / record.amountSales).toFixed(2)} %` : '-'}</>
            ),
            sorter: (a, b) => a.commission_percent - b.commission_percent,
        },
        {
            title: 'Разница',
            dataIndex: 'ppvz_vw',
            key: 'ppvz_vw',
            render: (percent, record) => (
                <>{percent && record.amountSales ? `${(percent / record.amountSales).toFixed(2)} %` : '-'}</>
            ),
            sorter: (a, b) => a.ppvz_vw - b.ppvz_vw,
        },
        {
            title: 'Логистика',
            dataIndex: 'delivery_rub',
            key: 'delivery_rub',
            render: (sum, record) => <>{sum ? toRub(sum) : '-'}</>,
            sorter: (a, b) => a.delivery_rub - b.delivery_rub,
        },
        {
            title: 'Возвраты',
            dataIndex: 'returnAmount',
            key: 'returnAmount',
            render: (amount, record) => (
                <>{record.amountSales ? `${((amount * 100) / record.amountSales).toFixed(2)} %` : '-'}</>
            ),
            sorter: (a, b) => a.returnAmount - b.returnAmount,
        },
        {
            title: 'Хранение',
            dataIndex: 'storage_fee',
            key: 'storage_fee',
            render: (sum) => <>{sum ? toRub(sum) : '-'}</>,
        },
        {
            title: 'Реклама',
            dataIndex: 'deduction',
            key: 'deduction',
            render: (sum) => <>{sum ? toRub(sum) : '-'}</>,
        },
        {
            title: 'Себестоимость',
            dataIndex: 'costPrice',
            key: 'costPrice',
            render: (sum, record) => <>{sum ? toRub(sum * record.amountSales) : '-'}</>,
        },
    ];

    return salesColumns;
};

export const ExpandedSalesColumns: TableProps<SalesExpandedData>['columns'] = [
    {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
        width: '10%',
        sortDirections: ['descend'],
        render: (date) => <>{dayjs(date).format('DD MMM HH:mm')}</>,
        sorter: (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
    },
    {
        title: 'Тип Операции',
        width: '10%',
        dataIndex: 'supplier_oper_name',
        key: 'supplier_oper_name',
        filters: Object.values(OperationEnum).reduce(
            (acc, el) => {
                // if (!exceptionStatus.includes(el)) {
                //     acc.push({ text: el, value: el });
                // }
                acc.push({ text: el, value: el });

                return acc;
            },
            [] as { text: string; value: string }[],
        ),
        onFilter: (value, record) => record.supplier_oper_name.indexOf(value as string) === 0,
        render: (type) => <Tag color={getTagColor(type)}>{type}</Tag>,
    },
    {
        title: 'Цена до СПП',
        dataIndex: 'retail_price_withdisc_rub',
        key: 'retail_price_withdisc_rub',
        render: (sum) => <>{sum ? toRub(sum) : '-'}</>,
        sorter: (a, b) => a.retail_price_withdisc_rub - b.retail_price_withdisc_rub,
    },
    {
        title: 'Цена после СПП',
        dataIndex: 'retail_amount',
        key: 'retail_amount',
        render: (sum) => <>{sum ? toRub(sum) : '-'}</>,
        sorter: (a, b) => a.retail_amount - b.retail_amount,
    },
    {
        title: 'Комиссия Вб',
        dataIndex: 'commission_percent',
        key: 'commission_percent',
        render: (percent) => <>{percent ? `${percent}%` : '-'} </>,
        sorter: (a, b) => a.commission_percent - b.commission_percent,
    },
    {
        title: 'Разница',
        dataIndex: 'ppvz_vw',
        key: 'ppvz_vw',
        render: (percent, record) => <>{percent ? `${percent.toFixed(2)} %` : '-'}</>,

        sorter: (a, b) => a.ppvz_vw - b.ppvz_vw,
    },
    {
        title: 'Логистика',
        dataIndex: 'delivery_rub',
        key: 'delivery_rub',
        render: (sum) => <>{sum ? toRub(sum) : '-'}</>,
        sorter: (a, b) => a.delivery_rub - b.delivery_rub,
    },
    {
        title: 'Хранение',
        dataIndex: 'storage_fee',
        key: 'storage_fee',
        sorter: (a, b) => a.deduction - b.deduction,
        render: (sum) => <>{sum ? toRub(sum) : '-'}</>,
    },
    {
        title: 'Реклама',
        dataIndex: 'deduction',
        key: 'deduction',
        render: (sum) => <>{sum ? toRub(sum) : '-'}</>,
        sorter: (a, b) => a.deduction - b.deduction,
    },
];
