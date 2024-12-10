export enum OperationEnum {
    RETURN = 'Возврат',
    SALE = 'Продажа',
    LOGISTICS = 'Логистика',
    COMPENSATION = 'Возмещение издержек по перевозке/по складским операциям с товаром',
    STORAGE = 'Хранение',
    LOGISTICS_ADJUSTMENT = 'Коррекция логистики',
    ACQUIRING_CORRECTION = 'Корректировка эквайринга',
    RECALCULATION = 'Пересчет платной приемки',
    HOLD = 'Удержание',
}

export const exceptionStatus = [
    OperationEnum.HOLD,
    OperationEnum.RECALCULATION,
    OperationEnum.COMPENSATION,
    OperationEnum.ACQUIRING_CORRECTION,
    OperationEnum.LOGISTICS_ADJUSTMENT,
    OperationEnum.STORAGE,
];
