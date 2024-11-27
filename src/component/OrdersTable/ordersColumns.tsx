import { TableProps } from 'antd';
import { toRub } from '../../helpers/helpers';
import { DataOrdersSWOTType, DataOrdersType } from '../../types/orders';

export const ordersColumns: TableProps<DataOrdersType>['columns'] = [
    {
        title: 'Артикул',
        dataIndex: 'supplierArticle',
        key: 'supplierArticle',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Цена без скидок',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render: (text) => <>{toRub(text)}</>,
    },
    {
        title: 'Скидка WB',
        dataIndex: 'spp',
        key: 'spp',
        render: (text) => <>{text.toFixed(2)} %</>,
    },
    {
        title: 'Фактическая цена',
        dataIndex: 'finishedPrice',
        key: 'finishedPrice',
        render: (text) => <>{toRub(text)}</>,
    },
];

export const ordersColumnsSWOT: TableProps<DataOrdersSWOTType>['columns'] = [
    {
        title: 'Артикул',
        dataIndex: 'supplierArticle',
        key: 'supplierArticle',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Кол-во заказов',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Цена без скидок',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render: (text) => <>{toRub(text)}</>,
    },
    {
        title: 'Скидка WB',
        dataIndex: 'spp',
        key: 'spp',
        render: (text) => <>{text.toFixed(2)} %</>,
    },
    {
        title: 'Фактическая цена',
        dataIndex: 'finishedPrice',
        key: 'finishedPrice',
        render: (text) => <>{toRub(text)}</>,
    },
];
