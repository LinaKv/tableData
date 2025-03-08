import { PeriodType } from '../../types/compareSales';
import { handlerResponseCompareSales } from './responseHandlerCompareSales';

const token = process.env.REACT_APP_TOKEN;

export const getPeriodData = async (period: PeriodType) => {
    if (!period.period[0] || !period.period[1]) {
        throw new Error(`Error! No Data`);
    }

    const dateFrom = period.period[0].format('YYYY-MM-DDTHH:mm:ss');
    const dateTo = period.period[1].format('YYYY-MM-DDTHH:mm:ss');

    const params = new URLSearchParams({
        dateFrom,
        dateTo,
    });

    const response = await fetch(
        `https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod?${params.toString()}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        },
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    return handlerResponseCompareSales(responseData);
};
