import { Flex } from 'antd';
import React from 'react';
import SalesTable from '../component/SalesTable/SalesTable';
import OrdersTable from '../component/OrdersTable/OrdersTable';

const Static = () => {
    return (
        <Flex gap={30} vertical>
            <SalesTable />
        </Flex>
    );
};

export default Static;
