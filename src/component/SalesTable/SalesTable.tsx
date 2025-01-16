import { useState } from 'react';
import {
    CommonSalesDataType,
    DataType,
    SalesDataSWOTType,
    SalesDataType,
    SalesExpandedData,
    SalesItem,
} from '../../types/sales';
import { handlerResponseSales } from './responseHandler';
import { commonSalesColumns, expandedSalesColumns, getSalesColumns } from './tableColumns';
import { DateType, FilterType } from '../../types/common';
import { Table } from 'antd';
import TableDataWithDatePeriod from '../Tables/TableDataWithDatePeriod/TableDataWithDatePeriod';
import SummarySales from './SummarySales';
import { res } from './response';
import TablesWithOnePeriod from '../Tables/TablesWithOnePeriod/TablesWithOnePeriod';

const token = process.env.REACT_APP_TOKEN;

const SalesTable = () => {
    const [data, setData] = useState<SalesDataType[] | undefined>(undefined);
    const [articleFilter, setArticleFilter] = useState<FilterType[]>([]);
    const [commonSalesData, setCommonSalesData] = useState<CommonSalesDataType[]>([]);

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
        const { aggregatedData, supplierArticle, commonSalesData } = handlerResponseSales(responseData);

        setArticleFilter(supplierArticle);
        setData(aggregatedData);
        setCommonSalesData(commonSalesData);
    };

    const expandedRowRender = (record: SalesDataType) => (
        <Table<SalesExpandedData> bordered columns={expandedSalesColumns} dataSource={record.expandedData} />
    );

    return (
        <>
            <TablesWithOnePeriod
                expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                firstTableColumns={commonSalesColumns}
                firstTableData={commonSalesData}
                firstTableTitle="Сумма по артиклям"
                secondTableData={data}
                secondTableTitle="Данные по артиклям"
                title="Отчет по продажам"
                secondTableColumns={getSalesColumns(articleFilter)}
                summary={(pageData) => data && SummarySales({ pageData })}
                updateData={onUpdateData}
            />
        </>
    );
};

export default SalesTable;
