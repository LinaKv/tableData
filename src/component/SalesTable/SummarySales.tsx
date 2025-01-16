import React from 'react';
import { SalesDataType } from '../../types/sales';
import { Table } from 'antd';
import { toRub } from '../../helpers/helpers';

type Props = {
    pageData: readonly SalesDataType[];
};

const SummarySales = ({ pageData }: Props) => {
    let retail_price_withdisc_rub_SUM = 0;
    let retail_amount_SUM = 0;
    let delivery_rub_SUM = 0;
    let deduction_SUM = 0;
    let storage_fee_SUM = 0;
    let costPrice_SUM = 0;
    let amountSales_SUM = 0;

    pageData.forEach(
        ({
            retail_price_withdisc_rub,
            retail_amount,
            delivery_rub,
            deduction,
            storage_fee,
            costPrice,
            amountSales,
        }) => {
            retail_price_withdisc_rub_SUM += retail_price_withdisc_rub;
            retail_amount_SUM += retail_amount;
            delivery_rub_SUM += delivery_rub;
            // deduction_SUM += deduction;
            // storage_fee_SUM += storage_fee;
            costPrice_SUM += costPrice || 0;
            amountSales_SUM += amountSales;
        },
    );
    return (
        <Table.Summary fixed>
            <Table.Summary.Row>
                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                <Table.Summary.Cell index={1}>Сумма</Table.Summary.Cell>
                <Table.Summary.Cell index={2}>{amountSales_SUM}</Table.Summary.Cell>
                <Table.Summary.Cell index={3}>{toRub(retail_price_withdisc_rub_SUM)}</Table.Summary.Cell>
                <Table.Summary.Cell index={4}>{toRub(retail_amount_SUM)}</Table.Summary.Cell>
                <Table.Summary.Cell index={5}></Table.Summary.Cell>
                <Table.Summary.Cell index={6}></Table.Summary.Cell>
                <Table.Summary.Cell index={7}>{toRub(delivery_rub_SUM)}</Table.Summary.Cell>
                <Table.Summary.Cell index={8}></Table.Summary.Cell>
                {/* <Table.Summary.Cell index={9}>{toRub(storage_fee_SUM)}</Table.Summary.Cell>
                <Table.Summary.Cell index={10}>{toRub(deduction_SUM)}</Table.Summary.Cell> */}
                <Table.Summary.Cell index={10}>{toRub(costPrice_SUM)}</Table.Summary.Cell>
            </Table.Summary.Row>
        </Table.Summary>
    );
};

export default SummarySales;
