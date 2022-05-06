/* eslint-disable import/no-anonymous-default-export */
import './css/Logo.css'
import logo from '../../assets/images/logo.ico'
import React from 'react'

export default props =>
<aside className="logo">
    <a href="/" className="logo">
        <img src={logo} alt="logo"></img>
    </a>
</aside>