import { useState } from 'react';
import { DataType, SalesDataSWOTType, SalesItem } from '../../types/sales';
import { handlerResponseSales } from './responseHandler';
import { salesColumns, salesColumnsSWOT } from './tableColumns';
import { DateType } from '../../types/common';
import TableWithSWOT from '../Tables/TableWithSWOT/TableWithSWOT';

const token = process.env.REACT_APP_TOKEN;

const SalesTable = () => {
    const [data, setData] = useState<DataType[] | undefined>(undefined);
    const [dataSWOT, setDataSWOT] = useState<SalesDataSWOTType[] | undefined>(undefined);

    const onUpdateData = async (datePeriod: DateType) => {
        const dateFrom = '2019-06-20T23:59:59';

        const response = await fetch(
            `https://statistics-api.wildberries.ru/api/v1/supplier/sales?dateFrom=${encodeURIComponent(dateFrom)}`,
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

        const responseData: SalesItem[] = await response.json();

        const { aggregatedData, filteredData } = handlerResponseSales(responseData, datePeriod);

        setDataSWOT(aggregatedData);
        setData(filteredData);
    };

    return (
        <>
            <TableWithSWOT
                data={data}
                dataSWOT={dataSWOT}
                columns={salesColumns}
                columnsSWOT={salesColumnsSWOT}
                title="Таблица продаж"
                updateData={onUpdateData}
            />
        </>
    );
};

export default SalesTable;
