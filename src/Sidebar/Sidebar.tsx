import React from 'react';
import { useState } from 'react';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { menuItems } from '../config/Navigation';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider className="sider" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
        </Sider>
    );
};

export default Sidebar;
