import { Flex } from 'antd';
import React from 'react';
import SalesOrdersTable from '../component/SalesOrdersTable/SalesOrdersTable';

const Static = () => {
    return (
        <Flex gap={30} vertical>
            <SalesOrdersTable />
        </Flex>
    );
};

export default Static;
