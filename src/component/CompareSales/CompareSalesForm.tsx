import React, { useContext } from 'react';
import Title from 'antd/es/typography/Title';
import { Button, Flex, Form } from 'antd';
import { CompareSalesContext, CompareSalesContextType } from '../../context/CompareSalesContext';
import ComparePeriodForm from './SettingsBeforeComparePeriods/FormBeforeCompare/ComparePeriodForm';

const CompareSalesForm = () => {
    const { periods, addNewPeriod } = useContext(CompareSalesContext) as CompareSalesContextType;

    const onFinish = () => {
        console.log('finish');
    };

    const onAddPeriod = () => {
        addNewPeriod();
    };

    const isCompareDisabled = periods.some((period) => !period.period[0]) || periods.length < 2;

    return (
        <Flex gap={24} vertical>
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
