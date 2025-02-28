import { Button, Checkbox, CheckboxOptionType, Collapse, CollapseProps, Flex, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { commonSalesColumns } from '../../SalesTable/tableColumns';

import Period from './Period';

type ComparePeriodProps = {
    periods: any[];
    deleteTablePeriod: (id: string) => void;
    createNewPeriods: () => void;
};

const defaultCheckedList = commonSalesColumns?.map((item) => item.key);

const ComparePeriod = ({ periods, deleteTablePeriod, createNewPeriods }: ComparePeriodProps) => {
    const [checkedList, setCheckedList] = useState(defaultCheckedList);

    const options = commonSalesColumns?.map(({ key, title }) => ({
        label: title,
        value: key,
    }));

    const newColumns = commonSalesColumns?.map((item) => ({
        ...item,
        hidden: !checkedList?.includes(item.key as string),
    }));

    const onCreateNewPeriods = () => {
        createNewPeriods();
    };

    return (
        <Flex gap={32} vertical>
            <Flex gap={10} vertical>
                <Flex gap={10} justify="space-between">
                    <Typography.Title level={3} style={{ margin: 0 }}>
                        Колонки для отображения
                    </Typography.Title>
                    <Button type="primary" htmlType="button" onClick={onCreateNewPeriods}>
                        Новые периоды
                    </Button>
                </Flex>
                <Checkbox.Group
                    value={checkedList}
                    options={options as CheckboxOptionType[]}
                    onChange={(value) => {
                        setCheckedList(value as string[]);
                    }}
                />
            </Flex>
            <Flex gap={10} vertical>
                {periods.map((period) => (
                    <Period
                        period={period}
                        key={period.id}
                        columns={newColumns}
                        deleteTablePeriod={deleteTablePeriod}
                    />
                ))}
            </Flex>
        </Flex>
    );
};

export default ComparePeriod;
