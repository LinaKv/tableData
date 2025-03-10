import { TableProps, Tag } from 'antd';
import { getTagColor, toRub } from '../../helpers/helpers';
import dayjs from 'dayjs';
import { OperationEnum } from '../../const/const';
import TitleWithInfo from '../common/TitleWithInfo';
import {
    CommonCompareSalesDataType,
    CompareCommonSalesDataType,
    CompareSalesExpandedData,
} from '../../types/compareSales';

export const compareSalesColumns: TableProps<CommonCompareSalesDataType>['columns'] = [
    {
        title: 'Артикул',
        dataIndex: 'sa_name',
        key: 'sa_name',
        fixed: 'left',
        onFilter: (value, record) => record.sa_name === '10',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Кол-во, шт',
        dataIndex: 'amountSales',
        key: 'amountSales',
        sorter: (a, b) => a.amountSales - b.amountSales,
    },
    {
        title: 'Сумма (до СПП)',
        dataIndex: 'retail_price_withdisc_rub',
        key: 'retail_price_withdisc_rub',
        render: (sum, record) => <>{sum ? toRub(sum) : '-'}</>,
        sorter: (a, b) => a.retail_price_withdisc_rub - b.retail_price_withdisc_rub,
    },
    {
        title: 'Сумма (после СПП)',
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
        title: 'Налог',
        dataIndex: 'tax',

        key: 'tax',
        render: (sum, record) => <>{sum ? toRub(sum) : '-'}</>,
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
        title: 'Себест-ть',
        dataIndex: 'costPrice',
        key: 'costPrice',
        render: (sum, record) => <>{sum ? toRub(sum) : '-'}</>,
    },
];

export const compareExpandedSalesColumns: TableProps<CompareSalesExpandedData>['columns'] = [
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
        title: 'Операции',
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
        onFilter: (value, record) => record.supplier_oper_name.includes(value as string),
        render: (operations: string[]) => {
            return operations.map((type) => (
                <Tag key={type} color={getTagColor(type)}>
                    {type}
                </Tag>
            ));
        },
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
        title: 'Налог',
        dataIndex: 'tax',
        key: 'tax',
        render: (sum, record) => <>{sum ? toRub(sum) : '-'}</>,
    },
    {
        title: 'Логистика',
        dataIndex: 'delivery_rub',
        key: 'delivery_rub',
        render: (sum) => <>{sum ? toRub(sum) : '-'}</>,
        sorter: (a, b) => a.delivery_rub - b.delivery_rub,
    },
];

export const compareCommonSalesColumns: TableProps<CompareCommonSalesDataType>['columns'] = [
    {
        title: 'Сумма (до СПП)',
        dataIndex: 'retail_price_withdisc_rub',
        key: 'retail_price_withdisc_rub',
        render: (sum) => <>{sum ? toRub(sum) : '-'}</>,
    },
    {
        title: (
            <TitleWithInfo
                title="Себест-ть"
                tooltipTitle="Сумма себестоимости по кол-ву продаж по всем артиклям из таблицы Себест"
            />
        ),
        dataIndex: 'costPrice',
        key: 'costPrice',
        render: (sum, record) => <>{sum ? toRub(sum) : '-'}</>,
    },
    {
        title: (
            <TitleWithInfo
                title="Комиссия"
                tooltipTitle="Сумма комиссии по кол-ву продаж по всем артиклям из таблицы Себест"
            />
        ),
        dataIndex: 'commissionRUB',
        key: 'commissionRUB',
        render: (sum, record) => <>{sum ? toRub(sum) : '-'}</>,
    },
    {
        title: 'Хранение',
        dataIndex: 'storage',
        key: 'storage',
        render: (sum) => <>{sum ? toRub(sum) : '-'}</>,
    },
    {
        title: 'Логистика',
        dataIndex: 'delivery',
        key: 'delivery',
        render: (sum, record) => <>{sum ? toRub(sum) : '-'}</>,
    },
    {
        title: 'Реклама',
        dataIndex: 'deduction',
        key: 'deduction',
        render: (sum) => <>{sum ? toRub(sum) : '-'}</>,
    },
    {
        title: (
            <TitleWithInfo
                title="Налог"
                tooltipTitle="Сумма налога по кол-ву продаж по всем артиклям из таблицы Себест"
            />
        ),
        dataIndex: 'tax',
        key: 'tax',
        render: (sum, record) => <>{sum ? toRub(sum) : '-'}</>,
    },
    {
        title: <TitleWithInfo title="Косвенные траты" tooltipTitle="Стоимость платной приемки и штрафы" />,
        dataIndex: 'acceptanceAndPenalty',
        key: 'acceptanceAndPenalty',
        render: (sum, record) => <>{sum ? toRub(sum) : '-'}</>,
    },
    {
        title: (
            <TitleWithInfo
                title="Прибыль"
                tooltipTitle="Прибыль = цена со скидкой продавца - Себест - логистика - хранение - комиссия "
            />
        ),
        dataIndex: 'salesProfit',
        key: 'salesProfit',
        render: (sum) => <>{sum ? toRub(sum) : '-'}</>,
    },
    {
        title: (
            <TitleWithInfo
                title="Чистая прибыль"
                tooltipTitle="Чистая прибыль = цена со скидкой продавца - Себест - логистика - хранение - налог - косвенные траты "
            />
        ),
        dataIndex: 'netSalesProfit',
        key: 'netSalesProfit',
        render: (sum) => <>{sum ? toRub(sum) : '-'}</>,
    },
];
