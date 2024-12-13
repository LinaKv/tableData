import React from 'react';
import { useState } from 'react';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { menuItems } from '../config/Navigation';

const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
};

type SidebarProps = {
    collapsed: boolean;
    changeCollapsed: (v: boolean) => void;
};

const Sidebar = ({ collapsed, changeCollapsed }: SidebarProps) => {
    return (
        <Sider
            className="sider"
            collapsible
            collapsed={collapsed}
            style={siderStyle}
            onCollapse={(value) => changeCollapsed(value)}
        >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
        </Sider>
    );
};

export default Sidebar;
