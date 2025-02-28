import React, { useContext, useState } from 'react';
import Title from 'antd/es/typography/Title';
import { Button, Flex, Form, Spin, message } from 'antd';
import { CompareSalesContext, CompareSalesContextType } from '../../context/CompareSalesContext';
import ComparePeriodForm from './SettingsBeforeComparePeriods/FormBeforeCompare/ComparePeriodForm';
import { handlerResponseCompareSales } from './responseHandlerCompareSales';
import ComparePeriod from './ComparePeriod/ComparePeriod';

const token = process.env.REACT_APP_TOKEN;

const CompareSalesForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState<any[]>([]);
    const { periods, addNewPeriod, deleteAllPeriods } = useContext(CompareSalesContext) as CompareSalesContextType;
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async () => {
        setIsLoading(true);

        try {
            const periodsPromise = periods.map(async (period) => {
                if (!period.period[0] || !period.period[1]) return;
                const dateFrom = period.period[0].format('YYYY-MM-DDTHH:mm:ss');
                const dateTo = period.period[1].format('YYYY-MM-DDTHH:mm:ss');

                const params = new URLSearchParams({
                    dateFrom,
                    dateTo,
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
                return {
                    responseData,
                    id: period.id,
                    dateFrom: period.period[0],
                    dateTo: period.period[1],
                    periodType: period.type,
                };
            });
            const responses = await Promise.all(periodsPromise);
            const tableData = responses.map((res) => {
                const newRes = handlerResponseCompareSales(res?.responseData);
                return { ...res, responseData: newRes };
            });
            setTableData(tableData);
        } catch (error: any) {
            handlerError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onAddPeriod = () => {
        addNewPeriod();
    };

    const deleteTablePeriod = (id: string) => {
        setTableData((prev) => prev.filter((data) => data.id !== id));
    };

    const createNewPeriods = () => {
        setTableData([]);
        deleteAllPeriods();
    };

    const isCompareDisabled = periods.some((period) => !period.period[0]) || periods.length < 2;

    const handlerError = (err: string) => {
        messageApi.open({
            type: 'error',
            content: err,
        });
    };

    if (isLoading) {
        return (
            <Flex gap={24} vertical>
                <Spin tip="Loading" size="large" />
            </Flex>
        );
    }

    if (tableData.length) {
        return (
            <ComparePeriod
                periods={tableData}
                deleteTablePeriod={deleteTablePeriod}
                createNewPeriods={createNewPeriods}
            />
        );
    }

    return (
        <Flex gap={24} vertical>
            {contextHolder}

            <Form onFinish={onFinish}>
                <Flex gap={12} vertical>
                    <Flex gap={12} justify="space-between" align="center">
                        <Title level={3} style={{ margin: '0px' }}>
                            Сравнение периодов
                        </Title>

                        <Button type="primary" htmlType="submit" disabled={isCompareDisabled}>
                            Сравнить периоды
                        </Button>
                    </Flex>

                    {periods?.map((period) => <ComparePeriodForm period={period} key={period.id} />)}
                </Flex>
            </Form>

            <Button type="primary" htmlType="button" onClick={onAddPeriod}>
                Добавить период
            </Button>
        </Flex>
    );
};

export default CompareSalesForm;
