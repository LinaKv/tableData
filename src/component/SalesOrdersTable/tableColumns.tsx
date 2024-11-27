import { TableProps, Tag } from 'antd';
import { getTagColor, toRub } from '../../helpers/helpers';
import { ExpandedSalesAndOrdersDataType, SalesAndOrdersDataType } from '../../types/common';
import dayjs from 'dayjs';

export const salesAndOrdersColumnsSWOT: TableProps<SalesAndOrdersDataType>['columns'] = [
    {
        title: 'Артикул',
        dataIndex: 'supplierArticle',
        key: 'supplierArticle',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Заказы, шт',
        dataIndex: 'amountOrders',
        key: 'amountOrders',
    },
    {
        title: 'Ср. цена заказов',
        dataIndex: 'finishedPriceOrders',
        key: 'finishedPriceOrders',
        render: (sum) => <>{toRub(sum)}</>,
    },
    {
        title: 'Сумма Заказов',
        dataIndex: 'finishedPriceOrdersSum',
        key: 'finishedPriceOrdersSum',
        render: (sum) => <>{toRub(sum)}</>,
    },
    {
        title: 'Продажи, шт',
        dataIndex: 'amountSales',
        key: 'amountSales',
    },
    {
        title: 'Ср. цена продаж',
        dataIndex: 'finishedPriceSales',
        key: 'finishedPriceSales',
        render: (sum) => <>{toRub(sum)}</>,
    },
    {
        title: 'К перечислению продавцу',
        dataIndex: 'forPay',
        key: 'forPay',
        render: (text) => <>{toRub(text)}</>,
    },
    {
        title: 'Выкуп',
        dataIndex: 'redemptionPercent',
        key: 'redemptionPercent',
        render: (percent) => <>{percent.toFixed(2)} %</>,
    },
];

export const expandedSalesAndOrdersColumns: TableProps<ExpandedSalesAndOrdersDataType>['columns'] = [
    {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
        render: (date) => <>{dayjs(date).format('DD MMM HH:mm')}</>,
        width: '10%',
    },
    {
        title: 'Тип',
        dataIndex: 'type',
        key: 'type',
        render: (text) => <Tag color={getTagColor(text)}>{text}</Tag>,
        width: '10%',
    },
    {
        title: 'Сумма',
        dataIndex: 'price',
        key: 'price',
        render: (sum) => <>{toRub(sum)}</>,
    },
];
