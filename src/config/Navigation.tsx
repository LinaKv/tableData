import React from 'react';
import { HomeOutlined, ShoppingCartOutlined, ShopOutlined, EditOutlined } from '@ant-design/icons';
import { NavItem } from '../types/common';
import { Link } from 'react-router-dom';

const NAVIGATION: NavItem[] = [
    {
        title: 'Home',
        icon: <HomeOutlined />,
        path: '/home',
    },
    {
        title: 'Себестоимость',
        icon: <EditOutlined />,
        path: '/settings',
    },
    {
        title: 'Таблица продаж',
        icon: <ShoppingCartOutlined />,
        path: '/sales',
    },
    {
        title: 'Таблица заказов',
        icon: <ShopOutlined />,
        path: '/orders',
    },
];

export const menuItems = NAVIGATION.map((navItem) => ({
    key: navItem.title,
    icon: navItem.icon,
    label: <Link to={navItem.path}>{navItem.title}</Link>,
}));
