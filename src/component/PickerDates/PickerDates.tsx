import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, TimeRangePickerProps } from 'antd';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DateType } from '../../types/common';

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

type PickerDatesProps = {
    startDate: Dayjs;
    endDate: Dayjs;
    onChangeDate: ({ startDate, endDate }: DateType) => void;
};

const PickerDates = ({ startDate, endDate, onChangeDate }: PickerDatesProps) => {
    const today = dayjs();

    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: 'Последние 7  Дней', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: 'Последние 14 Дней', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: 'Последние 30 Дней', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: 'Последние 90 Дней', value: [dayjs().add(-90, 'd'), dayjs()] },
    ];

    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            const startDate = dayjs(dates[0] || dateStrings[0]).startOf('day');
            const endDate = dayjs(dates[1] || dateStrings[1]).endOf('day');
            onChangeDate({ startDate, endDate });
        } else {
            console.log('Clear');
        }
    };

    return (
        <RangePicker
            defaultValue={[startDate, endDate]}
            minDate={today.subtract(90, 'day')}
            maxDate={today}
            presets={rangePresets}
            onChange={onRangeChange}
        />
    );
};

export default PickerDates;
