import { Flex, Typography } from 'antd';
import React, { useContext, useState } from 'react';
import Period from './Period';
import { compareCommonSalesColumns, compareExpandedSalesColumns, compareSalesColumns } from '../tableColumns';
import { CompareSalesContextType } from '../../../types/compareSales';
import { CompareSalesContext } from '../../../context/CompareSalesContext';
import ComparePeriodHeader from './ComparePeriodHeader';

const defaultCheckedList = compareCommonSalesColumns?.map((item) => item.key);
const defaultArticleSumList = compareSalesColumns?.map((item) => item.key);
const defaultArticleList = compareExpandedSalesColumns?.map((item) => item.key);

const ComparePeriod = () => {
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [checkedArticleSum, setCheckedArticleSum] = useState(defaultArticleSumList);
    const [checkedArticle, setCheckedArticle] = useState(defaultArticleList);

    const {
        compareSalesState: { periods },
    } = useContext(CompareSalesContext) as CompareSalesContextType;

    const onChangeCheckedList = (value: string[]) => {
        setCheckedList(value);
    };
    const onChangeArticleSum = (value: string[]) => {
        setCheckedArticleSum(value);
    };
    const onChangeArticle = (value: string[]) => {
        setCheckedArticle(value);
    };

    const newColumns = compareCommonSalesColumns?.map((item) => ({
        ...item,
        hidden: !checkedList?.includes(item.key as string),
    }));

    const newColumnsArticleSum = compareSalesColumns?.map((item) => ({
        ...item,
        hidden: !checkedArticleSum?.includes(item.key as string),
    }));

    const newColumnsArticle = compareExpandedSalesColumns?.map((item) => ({
        ...item,
        hidden: !checkedArticle?.includes(item.key as string),
    }));

    return (
        <Flex gap={32} vertical>
            <ComparePeriodHeader
                checkedArticle={checkedArticle}
                checkedArticleSum={checkedArticleSum}
                checkedList={checkedList}
                onChangeCheckedArticle={onChangeArticle}
                onChangeCheckedArticleSum={onChangeArticleSum}
                onChangeCheckedList={onChangeCheckedList}
            />
            <Typography.Title level={3} style={{ margin: 0 }}>
                Периоды:
            </Typography.Title>

            <Flex gap={10} vertical>
                {periods.map((period) => (
                    <Period
                        period={period}
                        key={period.id}
                        columns={newColumns}
                        columnsArticleSum={newColumnsArticleSum}
                        columnsArticle={newColumnsArticle}
                    />
                ))}
            </Flex>
        </Flex>
    );
};

export default ComparePeriod;
