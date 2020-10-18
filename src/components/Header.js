import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import firebase from '../config/firebase'
import AppContext from '../store/AppContext'

export default function Header() {

    const [isLoggedIn] = useContext(AppContext)
    const history = useHistory()

    const logout = e => {
        firebase.auth().signOut()
        .then(res => {
            history.replace('/login')
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }
    
    return (
        <nav className="py-5 bg-gray-900 text-white flex justify-between">
            <ul className="flex justify-between px-10">
                <li className="mr-5 hover:text-blue-100">
                    <NavLink to='/' exact activeClassName="text-blue-200">Home</NavLink>
                </li>
                <li className="mr-5 hover:text-blue-100">
                    <NavLink to='/gallery' activeClassName="text-blue-200">Gallery</NavLink>
                </li>
                <li className="mr-5 hover:text-blue-100">
                    <NavLink to='/tensorflow' activeClassName="text-blue-200">Tensorflow</NavLink>
                </li>
            </ul>
            <ul className="flex justify-between px-10">
                <li className="hover:text-blue-100">
                    {isLoggedIn ? (
                        <button onClick={logout}>Logout</button>
                    ) : (
                        <NavLink to='/login' activeClassName="text-blue-200">Login</NavLink>
                    )}
                </li>
                <li className="hover:text-blue-100 ml-5">
                    {!isLoggedIn && (
                        <NavLink to='/signup' activeClassName="text-blue-200">Sign Up</NavLink>
                    )}
                </li>
            </ul>
        </nav>
    )
}
