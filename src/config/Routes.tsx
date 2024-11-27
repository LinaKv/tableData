import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Static from '../pages/Static';

export const router = createBrowserRouter([
    {
        Component: App, // root layout route
        children: [
            { path: '/', Component: () => <Navigate to="/home" replace /> },
            { path: '/home', Component: Home },
            { path: '/static', Component: Static },
        ],
    },
]);
