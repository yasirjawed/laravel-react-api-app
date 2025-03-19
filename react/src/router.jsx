import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "./components/GuestLayout.jsx";
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import DefaultLayout from "./components/DefaultLayout.jsx";
import NotFound from './pages/NotFound.jsx'; // Add this import for NotFound component
import Users from './pages/Users.jsx';
import Dashboard from "./pages/Dashboard.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/users"/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/users',
                element: <Users/>
            }
        ]

    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login/>
              },
              {
                path: '/signup',
                element: <Signup/>
              }
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
]);

export default router;
