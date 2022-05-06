/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import {Routes, Route} from 'react-router'

import Home from '../home/Home'
import Customer from '../customer/Customer'
import Search from '../customer/Search'
import Customers from '../customer/Customers'

export default props => 
<Routes>
    <Route exact path='/' element={<Home />} />
    <Route exact path='/addcustomer' element={<Customer />} />
    <Route exact path='/getcustomer' element={<Search />} />
    <Route exact path='/customers' element={<Customers />} />
</Routes>