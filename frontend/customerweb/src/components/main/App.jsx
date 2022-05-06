/* eslint-disable import/no-anonymous-default-export */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './css/App.css'
import React from 'react'
import {HashRouter} from 'react-router-dom'

import Routes from './Routes'
import Logo from '../template/Logo'
import Nav from '../template/Nav'
import Footer from '../template/Footer'

export default prop => 
<HashRouter>
    <div className="app">
        <Logo />
        <Nav />
        <Routes />
        <Footer />
    </div>
</HashRouter>