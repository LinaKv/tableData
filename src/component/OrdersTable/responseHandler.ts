import React from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { DateType } from '../../types/common';
import { DataOrdersSWOTType, DataOrdersType, OrdersType } from '../../types/orders';
dayjs.extend(isBetween);

export const handlerResponseOrders = (responseData: OrdersType[], datePeriod: DateType) => {
    return responseData.reduce(
        (acc, item, index) => {
            // const { supplierArticle, spp, totalPrice, finishedPrice, date } = item;
            // const dateToCheck = dayjs(date).startOf('day');
            // const isGoodDate = dateToCheck.isBetween(datePeriod.startDate, datePeriod.endDate, null, '[]');
            // const shouldAddItem = isGoodDate;
            // if (shouldAddItem) {
            //     acc.filteredData.push({
            //         supplierArticle,
            //         spp,
            //         sppSum: spp,
            //         totalPrice,
            //         finishedPrice,
            //         key: index,
            //     });
            //     // check if item exist
            //     const existingItem = acc.aggregatedData.find((item) => item.supplierArticle === supplierArticle);
            //     if (existingItem) {
            //         existingItem.amount += 1;
            //         existingItem.sppSum += spp;
            //         existingItem.spp = existingItem.sppSum / existingItem.amount;
            //         existingItem.totalPriceSum += totalPrice;
            //         existingItem.totalPrice = existingItem.totalPriceSum / existingItem.amount;
            //         existingItem.finishedPriceSum += finishedPrice;
            //         existingItem.finishedPrice = existingItem.finishedPriceSum / existingItem.amount;
            //     } else {
            //         acc.aggregatedData.push({
            //             supplierArticle,
            //             spp,
            //             sppSum: spp,
            //             totalPrice,
            //             totalPriceSum: totalPrice,
            //             finishedPrice,
            //             finishedPriceSum: finishedPrice,
            //             key: index,
            //             amount: 1,
            //         });
            //     }
            // }
            return acc;
        },
        { aggregatedData: [], filteredData: [] } as {
            aggregatedData: DataOrdersSWOTType[];
            filteredData: DataOrdersType[];
        },
    );
};
