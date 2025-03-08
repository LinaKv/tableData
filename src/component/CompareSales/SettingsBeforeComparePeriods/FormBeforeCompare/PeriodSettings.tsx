import React, { useContext } from 'react';
import { DatePicker, GetProps } from 'antd';
import { CompareSalesDispatchEnum, MIN_DATE, PeriodTypeEnum } from '../../../../const/compareSalesEnum';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import dayjs, { Dayjs } from 'dayjs';
import { CompareSalesContext } from '../../../../context/CompareSalesContext';
import { CompareSalesContextType } from '../../../../types/compareSales';

type PeriodSettingsProps = {
    periodId: string;
    periodType: PeriodTypeEnum;
};
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
const { RangePicker } = DatePicker;

dayjs.extend(customParseFormat);
dayjs.extend(quarterOfYear);

const PeriodSettings = ({ periodId, periodType }: PeriodSettingsProps) => {
    const today = dayjs();
    const minDate = dayjs(MIN_DATE);

    const { dispatch } = useContext(CompareSalesContext) as CompareSalesContextType;

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        const isFuture = current >= dayjs().startOf('day');
        return current && isFuture;
    };

    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            const startDate = dayjs(dates[0] || dateStrings[0]).startOf(periodType);
            const endDate = dayjs(dates[1] || dateStrings[1]).endOf(periodType);
            dispatch({
                type: CompareSalesDispatchEnum.CHANGE_DATE_PERIOD,
                payload: { id: periodId, newPeriod: [startDate, endDate] },
            });
        } else {
            dispatch({
                type: CompareSalesDispatchEnum.CHANGE_DATE_PERIOD,
                payload: { id: periodId, newPeriod: [null, null] },
            });
        }
    };

    return (
        <RangePicker
            picker={periodType}
            disabledDate={disabledDate}
            onChange={onRangeChange}
            minDate={minDate}
            maxDate={today}
        />
    );
};

export default PeriodSettings;
