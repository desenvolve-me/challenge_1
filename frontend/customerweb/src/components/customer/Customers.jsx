import React, {Component} from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon:'users',
    title:'Clientes',
    subtitle:'Gerenciamento de clientes'
}

const baseURL = 'https://localhost:7161/api/customer'

const initialState = {
    customer: {id:0,name:'',birthdate:'', cpf:'', sBirthDate:''},
    list:[]
}

export default class Customer extends Component {
    state = {...initialState}

    componentWillMount() {
        const url = `${baseURL}/getAllCustomers`
        axios(url).then(
            resp => {
                this.setState({list:resp.data})
                this.headers = {"Access-Control-Allow-Origin": "*"}
            }
        )
    }

    renderTable() {
        return (
            <table className="table" style={{marginTop:'4px'}}>
                <thead>
                    <tr>
                        <th style={{textAlign:'center'}}>Nome</th>
                        <th style={{textAlign:'center'}}>CPF</th>
                        <th style={{textAlign:'center'}}>Data de Nascimento</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>   
        )
    }

    renderRows() {
        return this.state.list.map(customer => {
            return (
                <tr key={customer.id}>
                    <td style={{textAlign:'center'}}>{customer.name}</td>
                    <td style={{textAlign:'center'}}>{customer.cpf}</td>
                    <td style={{textAlign:'center'}}>{customer.sBirthDate}</td>
                </tr>
            )
        })
    }

    render() {
        return(
            <Main {...headerProps}>
                {this.renderTable()}
            </Main>
        )
    }
}