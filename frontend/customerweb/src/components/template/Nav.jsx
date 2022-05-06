/* eslint-disable import/no-anonymous-default-export */
import './css/Nav.css'
import React from 'react'
import {Link} from 'react-router-dom'

export default props => 
<aside className="menu-area">
    <nav className="menu">
        <Link to="/">
            <i className="fa fa-home"></i>&nbsp;&nbsp;Início
        </Link>
        <Link to="/addcustomer">
            <i className="fa fa-users"></i>&nbsp;&nbsp;Cadastrar cliente
        </Link>
        <Link to="/getcustomer">
            <i className="fa fa-users"></i>&nbsp;&nbsp;Pesquisar cliente
        </Link>
        <Link to="/customers">
            <i className="fa fa-users"></i>&nbsp;&nbsp;Listar clientes
        </Link>
    </nav>
</aside>