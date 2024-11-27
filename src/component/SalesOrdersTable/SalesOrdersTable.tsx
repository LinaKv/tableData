import { useState } from 'react';
import React from 'react';
import TableDataWithDatePeriod from '../Tables/TableDataWithDatePeriod/TableDataWithDatePeriod';
import { expandedSalesAndOrdersColumns, salesAndOrdersColumnsSWOT } from './tableColumns';
import { SalesItem } from '../../types/sales';
import { DateType, ExpandedSalesAndOrdersDataType, SalesAndOrdersDataType } from '../../types/common';
import { OrdersType } from '../../types/orders';
import { getFetchData } from '../../helpers/fetch';
import { handlerResponseSalesAndOrders } from './responseHandler';
import { Table } from 'antd';

const SalesOrdersTable = () => {
    const [data, setData] = useState<SalesAndOrdersDataType[] | undefined>(undefined);

    const onUpdateData = async (datePeriod: DateType) => {
        const [responseDataSales, responseDataOrders] = await Promise.all([
            getFetchData<SalesItem[]>('/sales'),
            getFetchData<OrdersType[]>('/orders'),
        ]);

        const data = handlerResponseSalesAndOrders({
            responseDataSales,
            responseDataOrders,
            datePeriod,
        });

        setData(data);
    };

    const expandedRowRender = (record: SalesAndOrdersDataType) => (
        <Table<ExpandedSalesAndOrdersDataType>
            columns={expandedSalesAndOrdersColumns}
            dataSource={record.expandedData}
        />
    );

    return (
        <TableDataWithDatePeriod
            columns={salesAndOrdersColumnsSWOT}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
            data={data}
            title="Таблица сыр"
            updateData={onUpdateData}
        />
    );
};

export default SalesOrdersTable;
