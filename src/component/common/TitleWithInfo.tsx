import { Flex, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import React from 'react';

type TitleWithInfoProps = {
    title: string;
    tooltipTitle: string;
};

const TitleWithInfo = ({ title, tooltipTitle }: TitleWithInfoProps) => {
    return (
        <Flex align="center" justify="space-around" gap="middle">
            <span>{title}</span>
            <Tooltip title={tooltipTitle}>
                <QuestionCircleOutlined />
            </Tooltip>
        </Flex>
    );
};

export default TitleWithInfo;
