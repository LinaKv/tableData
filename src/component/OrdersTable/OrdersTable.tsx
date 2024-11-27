import React from 'react';
import { useState } from 'react';
import { DataOrdersSWOTType, DataOrdersType, OrdersType } from '../../types/orders';
import { DateType } from '../../types/common';
import { ordersColumns, ordersColumnsSWOT } from './ordersColumns';
import { handlerResponseOrders } from './responseHandler';
import TableWithSWOT from '../Tables/TableWithSWOT/TableWithSWOT';

const token = process.env.REACT_APP_TOKEN;

const OrdersTable = () => {
    const [data, setData] = useState<DataOrdersType[] | undefined>(undefined);
    const [dataSWOT, setDataSWOT] = useState<DataOrdersSWOTType[] | undefined>(undefined);

    const onUpdateData = async (datePeriod: DateType) => {
        const dateFrom = '2019-06-20T23:59:59';
        const response = await fetch(
            `https://statistics-api.wildberries.ru/api/v1/supplier/orders?dateFrom=${encodeURIComponent(dateFrom)}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData: OrdersType[] = await response.json();
        const { aggregatedData, filteredData } = handlerResponseOrders(responseData, datePeriod);
        setDataSWOT(aggregatedData);
        setData(filteredData);
    };

    return (
        <TableWithSWOT
            data={data}
            dataSWOT={dataSWOT}
            columns={ordersColumns}
            columnsSWOT={ordersColumnsSWOT}
            title="Таблица заказов"
            updateData={onUpdateData}
        />
    );
};

export default OrdersTable;
