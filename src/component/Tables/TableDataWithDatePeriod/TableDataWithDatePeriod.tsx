import { Table, message } from 'antd';
import { useState } from 'react';
import TableTitle from '../TableTitle';
import dayjs from 'dayjs';
import { DateType } from '../../../types/common';
import { ColumnsType } from 'antd/es/table';
import { ExpandableConfig } from 'antd/es/table/interface';

const today = dayjs();

type TableDataWithDatePeriodProps<T> = {
    additionalComponent?: React.ReactNode;
    data: T[] | undefined;
    title: string;
    columns: ColumnsType<T> | undefined;
    expandable?: ExpandableConfig<T> | undefined;
    summary?: (data: readonly T[]) => React.ReactNode;
    updateData: (datePeriod: DateType) => void;
};

const TableDataWithDatePeriod = <T,>({
    data,
    additionalComponent,
    title,
    columns,
    expandable,
    updateData,
    summary,
}: TableDataWithDatePeriodProps<T>) => {
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
            <Table<T>
                bordered
                columns={columns}
                dataSource={data}
                loading={isLoading}
                pagination={false}
                scroll={{ x: 'max-content' }}
                expandable={expandable}
                summary={summary}
                title={() => (
                    <>
                        <TableTitle
                            title={title}
                            startDate={datePeriod.startDate}
                            endDate={datePeriod.endDate}
                            onUpdate={onUpdateData}
                            onChangeDate={onChangeDate}
                        />
                        {additionalComponent}
                    </>
                )}
            />
        </>
    );
};

export default TableDataWithDatePeriod;
