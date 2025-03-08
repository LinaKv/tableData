import React from 'react';
import {
    CommonCompareSalesDataType,
    CompareCommonSalesDataType,
    CompareSalesExpandedData,
} from '../../../types/compareSales';
import { Table } from 'antd';
import { compareExpandedSalesColumns, compareSalesColumns } from '../tableColumns';
import { ColumnsType } from 'antd/es/table';

type Props = {
    periodId: string;
    comparedData: CompareCommonSalesDataType[];
    columns?: ColumnsType<CompareCommonSalesDataType>;
    columnsArticleSum?: ColumnsType<CommonCompareSalesDataType>;
    columnsArticle?: ColumnsType<CompareSalesExpandedData>;
};

const PeriodTable = ({ periodId, comparedData, columns, columnsArticleSum, columnsArticle }: Props) => {
    console.log(columnsArticleSum);
    const expandedRowSecondRender = (record: CommonCompareSalesDataType) => (
        <Table<CompareSalesExpandedData> bordered columns={columnsArticle} dataSource={record.expandedData} />
    );

    const expandedRowFirstRender = (record: CompareCommonSalesDataType) => (
        <Table<CommonCompareSalesDataType>
            bordered
            columns={columnsArticleSum}
            dataSource={record.expandedData}
            expandable={{ expandedRowRender: expandedRowSecondRender, defaultExpandedRowKeys: ['0'] }}
        />
    );

    return (
        <Table<CompareCommonSalesDataType>
            expandable={{ expandedRowRender: expandedRowFirstRender, defaultExpandedRowKeys: ['0'] }}
            bordered
            columns={columns}
            dataSource={comparedData}
            scroll={{ x: 'max-content' }}
            pagination={false}
            key={periodId}
        />
    );
};

export default PeriodTable;
