import { PeriodTypeEnum } from '../const/compareSalesEnum';
import { Dayjs } from 'dayjs';

export type PeriodType = {
    id: string;
    type: PeriodTypeEnum;
    period: PeriodDateType;
};
export type OptionType = { label: string; value: PeriodTypeEnum };
export type PeriodDateType = Dayjs[] | null[];
