export enum PeriodTypeEnum {
    YEAR = 'year',
    MONTH = 'month',
    DAYS = 'date',
    QUARTER = 'quarter',
    WEEK = 'week',
}

export const MIN_DATE = '2023-01-01' as const;

export enum CompareSalesDispatchEnum {
    ADD_NEW_PERIOD = 'addNewPeriod',
    CHANGE_TYPE_PERIOD = 'changeTypePeriod',
    CHANGE_DATE_PERIOD = 'changeDatePeriod',
    DELETE_PERIOD = 'deletePeriod',
    DELETE_ALL_PERIODS = 'deleteAllPeriods',
    UPDATE_PERIODS_COMPARED_DATA = 'updatePeriodsComparedData',
    UPDATE_FILTER = 'updateFilter',
}
