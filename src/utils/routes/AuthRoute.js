import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import AppContext from '../../store/AppContext'
// import AnimatedRoute from './AnimatedRoute'

export default function AuthRoute({children, ...rest}) {

    const [isLoggedIn] = useContext(AppContext)

    if (isLoggedIn) return (
        <Route {...rest} >
            {children}
        </Route>
    ) 

    return <Redirect to='/login' />
}