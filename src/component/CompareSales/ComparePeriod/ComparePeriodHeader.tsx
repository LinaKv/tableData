import { Button, Card, Checkbox, Col, Flex, Row, Typography } from 'antd';
import React, { useContext } from 'react';
import { compareCommonSalesColumns, compareExpandedSalesColumns, compareSalesColumns } from '../tableColumns';
import { CompareSalesDispatchEnum } from '../../../const/compareSalesEnum';
import { CompareSalesContext } from '../../../context/CompareSalesContext';
import { CompareSalesContextType } from '../../../types/compareSales';

type ComparePeriodHeaderProps = {
    checkedList?: (React.Key | undefined)[];
    checkedArticleSum?: (React.Key | undefined)[];
    checkedArticle?: (React.Key | undefined)[];
    onChangeCheckedList: (value: string[]) => void;
    onChangeCheckedArticleSum: (value: string[]) => void;
    onChangeCheckedArticle: (value: string[]) => void;
};

const ComparePeriodHeader = ({
    checkedArticle,
    checkedArticleSum,
    checkedList,
    onChangeCheckedArticle,
    onChangeCheckedArticleSum,
    onChangeCheckedList,
}: ComparePeriodHeaderProps) => {
    const { dispatch } = useContext(CompareSalesContext) as CompareSalesContextType;

    const optionsArticle = compareExpandedSalesColumns?.map(({ key, title }) => ({
        label: title as string,
        value: key,
    }));

    const optionsArticleSum = compareSalesColumns?.map(({ key, title }) => ({
        label: title as string,
        value: key,
    }));

    const options = compareCommonSalesColumns?.map(({ key, title }) => ({
        label: title as string,
        value: key,
    }));

    const onCreateNewPeriods = () => {
        dispatch({ type: CompareSalesDispatchEnum.DELETE_ALL_PERIODS });
    };

    return (
        <Card
            title="Настройки отображения"
            extra={
                <Button type="primary" htmlType="button" onClick={onCreateNewPeriods}>
                    Сравнить новые периоды
                </Button>
            }
        >
            <Flex gap={16} vertical>
                <Flex gap={10} vertical>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                        Колонки для отображения
                    </Typography.Title>
                    <Checkbox.Group
                        // @ts-expect-error
                        value={checkedList}
                        onChange={onChangeCheckedList}
                    >
                        <Row gutter={[16, 8]}>
                            {options?.map((option) => (
                                <Col key={option.value} xs={24} sm={12} md={8} lg={6} xl={4}>
                                    <Checkbox value={option.value}>{option.label}</Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                </Flex>

                <Flex gap={10} vertical>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                        Колонки для отображения суммы артиклов
                    </Typography.Title>

                    <Checkbox.Group
                        // @ts-expect-error
                        value={checkedArticleSum}
                        onChange={onChangeCheckedArticleSum}
                    >
                        <Row gutter={[16, 8]}>
                            {optionsArticleSum?.map((option) => (
                                <Col key={option.value} xs={24} sm={12} md={8} lg={6} xl={4}>
                                    <Checkbox value={option.value}>{option.label}</Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                </Flex>

                <Flex gap={10} vertical>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                        Колонки для отображения в артикле
                    </Typography.Title>

                    <Checkbox.Group
                        // @ts-expect-error

                        value={checkedArticle}
                        onChange={onChangeCheckedArticle}
                    >
                        <Row gutter={[16, 8]}>
                            {optionsArticle?.map((option) => (
                                <Col key={option.value} xs={24} sm={12} md={8} lg={6} xl={4}>
                                    <Checkbox value={option.value}>{option.label}</Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                </Flex>
            </Flex>
        </Card>
    );
};

export default ComparePeriodHeader;
