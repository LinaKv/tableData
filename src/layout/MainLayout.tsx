import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import { Content } from 'antd/es/layout/layout';
import Sidebar from '../Sidebar/Sidebar';

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <Layout style={{ minHeight: '100vh', width: '100%' }} hasSider>
            <Sidebar collapsed={collapsed} changeCollapsed={setCollapsed} />
            <Layout
                style={{
                    padding: '24px',
                    marginInlineStart: collapsed ? 80 : 200,
                    transition: `margin-inline-start ${collapsed ? 0.3 : 0.1}s ease-in-out`,
                }}
            >
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
