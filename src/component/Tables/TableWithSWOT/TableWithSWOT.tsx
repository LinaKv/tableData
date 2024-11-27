import { Flex, Table, message } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import { DateType } from '../../../types/common';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import TableTitle from '../TableTitle';

const today = dayjs();

type TableWithSWOTProps<T, T1> = {
    data: T[] | undefined;
    dataSWOT?: T1[] | undefined;
    title: string;
    columns: ColumnsType<T> | undefined;
    columnsSWOT: ColumnsType<T1> | undefined;
    updateData: (datePeriod: DateType) => void;
};

const TableWithSWOT = <T, T1>({
    data,
    dataSWOT,
    title,
    columns,
    columnsSWOT,
    updateData,
}: TableWithSWOTProps<T, T1>) => {
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
        <Flex gap="middle" vertical>
            {contextHolder}
            <TableTitle
                title={title}
                startDate={datePeriod.startDate}
                endDate={datePeriod.endDate}
                onUpdate={onUpdateData}
                onChangeDate={onChangeDate}
            />
            <Table<T>
                columns={columns}
                dataSource={data}
                loading={isLoading}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 'max-content' }}
                title={() => <>{title}</>}
            />
            <Table<T1>
                columns={columnsSWOT}
                dataSource={dataSWOT}
                loading={isLoading}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 100 * 5, x: 'max-content' }}
                title={() => <>{`${title} SWOT`}</>}
            />
        </Flex>
    );
};

export default TableWithSWOT;
