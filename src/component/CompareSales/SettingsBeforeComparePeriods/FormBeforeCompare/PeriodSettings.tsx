import React, { useContext } from 'react';
import { DatePicker, GetProps } from 'antd';
import { MIN_DATE, PeriodTypeEnum } from '../../../../const/compareSalesEnum';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import dayjs, { Dayjs } from 'dayjs';
import { CompareSalesContext, CompareSalesContextType } from '../../../../context/CompareSalesContext';

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

    const { changePeriod } = useContext(CompareSalesContext) as CompareSalesContextType;

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        const isFuture = current > dayjs().endOf('day');
        return current && isFuture;
    };

    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            const startDate = dayjs(dates[0] || dateStrings[0]).startOf(periodType);
            const endDate = dayjs(dates[1] || dateStrings[1]).endOf(periodType);
            changePeriod(periodId, [startDate, endDate]);
        } else {
            changePeriod(periodId, [null, null]);
        }
    };

    return (
        <RangePicker
            // @ts-expect-error
            picker={periodType}
            disabledDate={disabledDate}
            onChange={onRangeChange}
            minDate={minDate}
            maxDate={today}
        />
    );
};

export default PeriodSettings;
