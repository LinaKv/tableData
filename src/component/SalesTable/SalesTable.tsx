import { useState } from 'react';
import { DataType, SalesDataSWOTType, SalesDataType, SalesExpandedData, SalesItem } from '../../types/sales';
import { handlerResponseSales } from './responseHandler';
import { ExpandedSalesColumns, getSalesColumns } from './tableColumns';
import { DateType, ExpandedSalesAndOrdersDataType, FilterType } from '../../types/common';
import TableWithSWOT from '../Tables/TableWithSWOT/TableWithSWOT';
import { Table } from 'antd';
import TableDataWithDatePeriod from '../Tables/TableDataWithDatePeriod/TableDataWithDatePeriod';

const token = process.env.REACT_APP_TOKEN;

const SalesTable = () => {
    const [data, setData] = useState<SalesDataType[] | undefined>(undefined);
    const [articleFilter, setArticleFilter] = useState<FilterType[]>([]);
    const [dataSWOT, setDataSWOT] = useState<SalesDataSWOTType[] | undefined>(undefined);

    const onUpdateData = async (datePeriod: DateType) => {
        const params = new URLSearchParams({
            dateFrom: datePeriod.startDate.startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
            dateTo: datePeriod.endDate.endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        });

        const response = await fetch(
            `https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod?${params.toString()}`,
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

        const responseData = await response.json();
        const { aggregatedData, supplierArticle } = handlerResponseSales(responseData, datePeriod);

        setArticleFilter(supplierArticle);
        setData(aggregatedData);
    };

    const expandedRowRender = (record: SalesDataType) => (
        <Table<SalesExpandedData> columns={ExpandedSalesColumns} dataSource={record.expandedData} />
    );

    return (
        <>
            <TableDataWithDatePeriod
                columns={getSalesColumns(articleFilter)}
                expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                data={data}
                title="Таблица продаж"
                updateData={onUpdateData}
            />
        </>
    );
};

export default SalesTable;
