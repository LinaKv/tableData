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
