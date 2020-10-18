import React, { useEffect, useState } from 'react'
import './assets/css/style.css'
import { BrowserRouter as Route, Switch, useLocation } from 'react-router-dom'
import routes from './utils/routes/index'
import Header from './components/Header'
import firebase from './config/firebase'
import AppContext from './store/AppContext'
import AuthRoute from './utils/routes/AuthRoute'
import GuestRoute from './utils/routes/GuestRoute'
import Loading from './components/Loading'
import NotFound from './pages/404'
import AnimatedRoute from './utils/routes/AnimatedRoute'

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true)
                setUser(user)
                setIsLoading(false)
            } else {
                setUser({})
                setIsLoggedIn(false)
                setIsLoading(false)
            }
        })
    }, [])

    const location = useLocation()

    if (isLoading) return <Loading />

    return (
        <AppContext.Provider value={[isLoggedIn, user]} >
            <Header />
            <Switch key={location.pathname} location={location}>
                {routes.map(route => {
                    if (route.protected === 'auth') {
                        return (
                            <AuthRoute path={route.path} exact={route.exact} key={route.id}> 
                                <route.component />
                            </AuthRoute>
                        )
                    } 
                    if (route.protected === 'guest') {
                        return (
                            <GuestRoute path={route.path} exact={route.exact} key={route.id}> 
                                <route.component />
                            </GuestRoute>
                        )
                    } 
                    return (
                        <AnimatedRoute path={route.path} exact={route.exact} key={route.id}> 
                            <route.component />
                        </AnimatedRoute>
                    )
                })}
                <Route path='*'><NotFound /></Route>
            </Switch>
        </AppContext.Provider>
    )
}

export default App