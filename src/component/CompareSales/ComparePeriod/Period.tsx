import { Collapse, CollapseProps } from 'antd';
import React, { useContext } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { getPeriodTag } from '../../../helpers/helpers';
import {
    CommonCompareSalesDataType,
    CompareCommonSalesDataType,
    CompareSalesContextType,
    CompareSalesExpandedData,
    PeriodType,
} from '../../../types/compareSales';
import PeriodTable from './PeriodTable';
import { CompareSalesContext } from '../../../context/CompareSalesContext';
import { CompareSalesDispatchEnum } from '../../../const/compareSalesEnum';

type PeriodProps = {
    period: PeriodType;
    columns?: ColumnsType<CompareCommonSalesDataType>;
    columnsArticleSum?: ColumnsType<CommonCompareSalesDataType>;
    columnsArticle?: ColumnsType<CompareSalesExpandedData>;
};

const Period = ({ period, columns, columnsArticleSum, columnsArticle }: PeriodProps) => {
    const { dispatch } = useContext(CompareSalesContext) as CompareSalesContextType;

    const onDelete = () => {
        dispatch({ type: CompareSalesDispatchEnum.DELETE_PERIOD, payload: { id: period.id } });
    };

    const items: CollapseProps['items'] = [
        {
            key: period.id,
            label: `Период ${getPeriodTag(period.type)} ${period.period[0]?.format('DD/MM/YYYY')} - ${period.period[1]?.format('DD/MM/YYYY')}`,
            children: PeriodTable({
                periodId: period.id,
                comparedData: period.comparedData,
                columns,
                columnsArticleSum,
                columnsArticle,
            }),
            extra: <DeleteOutlined onClick={onDelete} />,
        },
    ];

    return <Collapse defaultActiveKey={period.id} items={items} />;
};

export default Period;
