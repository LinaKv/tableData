import { PeriodTypeEnum } from '../const/compareSalesEnum';
import { OperationEnum } from '../const/const';

export const toRub = (number: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(number);
};

export const getTagColor = (type: string) => {
    switch (type) {
        case OperationEnum.SALE:
            return 'green';
            break;

        case OperationEnum.RETURN:
            return 'volcano';
            break;

        case OperationEnum.LOGISTICS:
            return 'gold';
            break;

        case OperationEnum.ACQUIRING_CORRECTION:
            return 'purple';

        case OperationEnum.LOGISTICS_ADJUSTMENT:
            return 'geekblue';

        default:
            return 'red';
            break;
    }
};

export const toNumber = (value: unknown): number => {
    const parsed = Number(value);
    return isNaN(parsed) ? 0 : parsed;
};

export const getPeriodTag = (type: string) => {
    switch (type) {
        case PeriodTypeEnum.DAYS:
            return 'день';
            break;

        case PeriodTypeEnum.MONTH:
            return 'месяц';
            break;

        case PeriodTypeEnum.QUARTER:
            return 'квартал';
            break;

        case PeriodTypeEnum.WEEK:
            return 'неделя';

        case PeriodTypeEnum.YEAR:
            return 'год';

        default:
            return 'red';
            break;
    }
};
