import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Static from '../pages/Static';
import Settings from '../pages/Settings';
import Orders from '../pages/Orders';

export const router = createBrowserRouter(
    [
        {
            Component: App, // root layout route
            children: [
                { path: '/', Component: () => <Navigate to="/home" replace /> },
                { path: '/home', Component: Home },
                { path: '/settings', Component: Settings },
                { path: '/sales', Component: Static },
                { path: '/orders', Component: Orders },
                { path: '*', Component: () => <Navigate to="/home" replace /> },
            ],
        },
    ],
    { basename: '/tableData' },
);
