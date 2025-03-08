import React, { useContext, useState } from 'react';
import Title from 'antd/es/typography/Title';
import { Button, Flex, Form, Spin, message } from 'antd';
import { CompareSalesContext } from '../../context/CompareSalesContext';
import ComparePeriodForm from './SettingsBeforeComparePeriods/FormBeforeCompare/ComparePeriodForm';
import { handlerResponseCompareSales } from './responseHandlerCompareSales';
import ComparePeriod from './ComparePeriod/ComparePeriod';
import { CompareSalesContextType } from '../../types/compareSales';
import { CompareSalesDispatchEnum } from '../../const/compareSalesEnum';
import { getPeriodData } from './response';

const CompareSalesForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        compareSalesState: { periods },
        dispatch,
    } = useContext(CompareSalesContext) as CompareSalesContextType;

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async () => {
        setIsLoading(true);

        try {
            const periodsPromise = periods.map(async (period) => {
                const res = await getPeriodData(period);
                return { id: period.id, updatedData: res.commonSalesData, articleFilter: res.supplierArticle };
            });

            const responses = await Promise.all(periodsPromise);
            responses.forEach((res) => {
                dispatch({
                    type: CompareSalesDispatchEnum.UPDATE_PERIODS_COMPARED_DATA,
                    payload: res,
                });
            });
        } catch (error: any) {
            handlerError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onAddPeriod = () => {
        dispatch({ type: CompareSalesDispatchEnum.ADD_NEW_PERIOD });
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
                <Spin size="large" />
            </Flex>
        );
    }

    if (periods[0]?.comparedData.length) {
        return <ComparePeriod />;
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
