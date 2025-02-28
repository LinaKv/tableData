import { Collapse, CollapseProps, Table } from 'antd';
import React from 'react';
import { CommonSalesDataType } from '../../../types/sales';
import { DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { getPeriodTag } from '../../../helpers/helpers';

type PeriodProps = {
    period: any;
    columns?: ColumnsType<CommonSalesDataType>;
    deleteTablePeriod: (id: string) => void;
};

const Period = ({ period, columns, deleteTablePeriod }: PeriodProps) => {
    const onDelete = () => {
        deleteTablePeriod(period.id);
    };
    const getPeriod = () => {
        return (
            <Table<CommonSalesDataType>
                bordered
                columns={columns}
                dataSource={period.responseData.commonSalesData}
                scroll={{ x: 'max-content' }}
                pagination={false}
                key={period.id}
            />
        );
    };

    const items: CollapseProps['items'] = [
        {
            key: period.id,
            label: `Период ${getPeriodTag(period.periodType)} ${period.dateFrom.format('DD/MM/YYYY')} - ${period.dateTo.format('DD/MM/YYYY')}`,
            children: getPeriod(),
            extra: <DeleteOutlined onClick={onDelete} />,
        },
    ];

    return <Collapse defaultActiveKey={period.id} items={items} />;
};

export default Period;
