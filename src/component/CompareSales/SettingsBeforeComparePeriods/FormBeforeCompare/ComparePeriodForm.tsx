import React, { useContext, useState } from 'react';
import { Card, Checkbox, Collapse, Flex } from 'antd';
import { CompareSalesDispatchEnum, PeriodTypeEnum } from '../../../../const/compareSalesEnum';
import { CompareSalesContextType, OptionType, PeriodType } from '../../../../types/compareSales';
import { DeleteOutlined } from '@ant-design/icons';
import { CompareSalesContext } from '../../../../context/CompareSalesContext';
import type { CollapseProps } from 'antd';

import PeriodSettings from './PeriodSettings';

type Props = {
    period: PeriodType;
};

type ExpandIconPosition = 'start' | 'end';

const ComparePeriodForm = ({ period }: Props) => {
    const { dispatch } = useContext(CompareSalesContext) as CompareSalesContextType;
    const title =
        period.period[0] && period.period[1]
            ? `Период для сравнения: ${period.period[0].format('DD/MM/YYYY')}-${period.period[1].format('DD/MM/YYYY')}`
            : 'Заполните текущий период';

    const options: OptionType[] = [
        { label: 'Год', value: PeriodTypeEnum.YEAR },
        { label: 'Квартал', value: PeriodTypeEnum.QUARTER },
        { label: 'Месяц', value: PeriodTypeEnum.MONTH },
        { label: 'Неделя', value: PeriodTypeEnum.WEEK },
        { label: 'Дни', value: PeriodTypeEnum.DAYS },
    ];

    const onChange = (option: OptionType) => {
        dispatch({
            type: CompareSalesDispatchEnum.CHANGE_TYPE_PERIOD,
            payload: { id: period.id, newType: option.value },
        });
    };

    const onDelete = () => {
        dispatch({ type: CompareSalesDispatchEnum.DELETE_PERIOD, payload: { id: period.id } });
    };

    const getCard = () => {
        return (
            <>
                <Card type="inner" title="Тип периода">
                    <Flex wrap justify="start" align="flex-start" gap={15}>
                        {options.map((option) => (
                            <Checkbox
                                checked={option.value === period.type}
                                onChange={() => onChange(option)}
                                key={option.label}
                            >
                                {option.label}
                            </Checkbox>
                        ))}
                    </Flex>
                </Card>

                <Card type="inner" title="Период" style={{ marginTop: 16 }}>
                    <PeriodSettings key={period.type} periodId={period.id} periodType={period.type} />
                </Card>
            </>
        );
    };

    const items: CollapseProps['items'] = [
        {
            key: period.id,
            label: title,
            children: getCard(),
            extra: <DeleteOutlined onClick={onDelete} />,
        },
    ];

    return (
        <Collapse
            defaultActiveKey={[period.id]}
            items={items}
            style={{ background: `${period.period[0] ? 'white' : '#ffccc7'}`, border: 'none' }}
        />
    );
};

export default ComparePeriodForm;
