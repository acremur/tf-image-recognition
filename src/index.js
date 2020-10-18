import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'


ReactDOM.render(
        <Router>
            <App className='w-full' />
        </Router>
    , document.getElementById('root'))