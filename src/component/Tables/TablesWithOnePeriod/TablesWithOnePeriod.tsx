import { Flex, Table, message } from 'antd';
import { useState } from 'react';
import TableTitle from '../TableTitle';
import dayjs from 'dayjs';
import { DateType } from '../../../types/common';
import { ColumnsType } from 'antd/es/table';
import { ExpandableConfig } from 'antd/es/table/interface';

const today = dayjs();

type TablesWithOnePeriodProps<T, J> = {
    additionalComponent?: React.ReactNode;
    expandable?: ExpandableConfig<T>;
    firstTableColumns?: ColumnsType<J>;
    firstTableData: J[];
    firstTableTitle: string;
    secondTableColumns?: ColumnsType<T>;
    secondTableData: T[] | undefined;
    secondTableTitle: string;
    title: string;
    summary?: (data: readonly T[]) => React.ReactNode;
    updateData: (datePeriod: DateType) => void;
};

const TablesWithOnePeriod = <T, J>({
    additionalComponent,
    expandable,
    firstTableColumns,
    firstTableData,
    firstTableTitle,
    secondTableColumns,
    secondTableData,
    secondTableTitle,
    title,
    updateData,
    summary,
}: TablesWithOnePeriodProps<T, J>) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [datePeriod, setDatePeriod] = useState<DateType>({ startDate: today.subtract(30, 'day'), endDate: today });

    const [messageApi, contextHolder] = message.useMessage();

    const onUpdateData = async () => {
        setIsLoading(true);
        try {
            await updateData(datePeriod);
        } catch (error) {
            handlerError('Ошибка при загрузке данных');
        }
        setIsLoading(false);
    };

    const onChangeDate = ({ startDate, endDate }: DateType) => {
        setDatePeriod({ startDate, endDate });
    };

    const handlerError = (err: string) => {
        messageApi.open({
            type: 'error',
            content: err,
        });
    };

    return (
        <>
            {contextHolder}
            <Flex vertical gap={30}>
                <TableTitle
                    endDate={datePeriod.endDate}
                    startDate={datePeriod.startDate}
                    title={title}
                    onUpdate={onUpdateData}
                    onChangeDate={onChangeDate}
                />
                <Table<J>
                    bordered
                    columns={firstTableColumns}
                    dataSource={firstTableData}
                    loading={isLoading}
                    scroll={{ x: 'max-content' }}
                    pagination={{ pageSize: 20 }}
                    title={() => firstTableTitle}
                    key={firstTableTitle}
                />
                <Table<T>
                    bordered
                    columns={secondTableColumns}
                    dataSource={secondTableData}
                    expandable={expandable}
                    loading={isLoading}
                    scroll={{ x: 1300, y: 500 }}
                    pagination={false}
                    title={() => secondTableTitle}
                    key={secondTableTitle}
                    summary={summary}
                />
            </Flex>
        </>
    );
};

export default TablesWithOnePeriod;
