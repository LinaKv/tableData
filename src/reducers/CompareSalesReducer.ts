import { CompareSalesDispatchEnum, PeriodTypeEnum } from '../const/compareSalesEnum';
import { mergeUniqueFilters } from '../helpers/helpers';
import { ActionCompareSalesType, CompareSalesStateType } from '../types/compareSales';
import { v4 as uuidv4 } from 'uuid';

export const periodsReducer = (state: CompareSalesStateType, action: ActionCompareSalesType) => {
    switch (action.type) {
        case CompareSalesDispatchEnum.ADD_NEW_PERIOD:
            return {
                ...state,
                periods: [
                    ...state.periods,
                    {
                        id: uuidv4(),
                        type: PeriodTypeEnum.YEAR,
                        period: [null, null],
                        comparedData: [],
                    },
                ],
            };

        case CompareSalesDispatchEnum.CHANGE_TYPE_PERIOD:
            return {
                ...state,
                periods: state.periods.map((period) => {
                    if (period.id === action.payload.id) {
                        return { ...period, type: action.payload.newType, period: [null, null] };
                    } else {
                        return period;
                    }
                }),
            };

        case CompareSalesDispatchEnum.CHANGE_DATE_PERIOD:
            return {
                ...state,
                periods: state.periods.map((period) => {
                    if (period.id === action.payload.id) {
                        return { ...period, period: action.payload.newPeriod };
                    } else {
                        return period;
                    }
                }),
            };

        case CompareSalesDispatchEnum.DELETE_PERIOD:
            return {
                ...state,
                periods: state.periods.filter((period) => period.id !== action.payload.id),
            };

        case CompareSalesDispatchEnum.DELETE_ALL_PERIODS:
            return {
                ...state,
                periods: [],
            };

        case CompareSalesDispatchEnum.UPDATE_PERIODS_COMPARED_DATA:
            return {
                ...state,
                periods: state.periods.map((period) => {
                    if (period.id === action.payload.id) {
                        return {
                            ...period,
                            comparedData: action.payload.updatedData,
                            comparedDataWithFilter: action.payload.updatedData,
                        };
                    } else {
                        return period;
                    }
                }),
                articleFilter: mergeUniqueFilters(state.articleFilter, action.payload.articleFilter),
            };
    }
};
