import React from 'react'
import Home from '../../pages/Home'
import Gallery from '../../pages/Gallery'
import Login from '../../pages/Login'
import SignUp from '../../pages/SignUp'
import Tensorflow from '../../pages/Tensorflow'

export default [
    {
        path: '/',
        exact: true,
        component: () => <Home />,
        id: 1,
        protected: null
    },
    {
        path: '/gallery',
        component: () => <Gallery />,
        id: 2,
        protected: 'auth'
    },
    {
        path: '/login',
        component: () => <Login />,
        id: 3,
        protected: 'guest'
    },
    {
        path: '/signup',
        component: () => <SignUp />,
        id: 4,
        protected: 'guest'
    },
    {
        path: '/tensorflow',
        component: () => <Tensorflow />,
        id: 4,
        protected: null
    }
]