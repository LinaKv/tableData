import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import { Content } from 'antd/es/layout/layout';
import Sidebar from '../Sidebar/Sidebar';

const MainLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh', width: '100%' }} hasSider>
            <Sidebar />
            <Layout style={{ padding: '24px' }}>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
