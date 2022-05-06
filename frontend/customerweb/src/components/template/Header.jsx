/* eslint-disable import/no-anonymous-default-export */
import './css/Header.css'
import React from 'react'

export default props => 
<header className="header d-none d-sm-flex flex-column">
    <h1 className="lead text-muted">{props.subtitle}</h1>
</header>