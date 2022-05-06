import React, {Component} from 'react'
import axios from 'axios'
import Main from '../template/Main'
import MaskedInput from '../htmlelements/MaskedInput'

const headerProps = {
    icon:'users',
    title:'Clientes',
    subtitle:'Gerenciamento de clientes'
}

const baseURL = 'https://localhost:7161/api/customer'
const initialState = {
    customer: {name:'',birthdate:new Date(''), cpf:''},
    searchedCpf:''
}

export default class Customer extends Component {
    state = {...initialState}

    clear() {
        this.setState({customer: initialState.customer})
    }

    search(event) {
        const vcpf = this.state.searchedCpf
        const url = `${baseURL}/getCustomer/${vcpf}`
        axios(url).then(
            resp => {
                this.setState({customer:resp.data})
                this.headers = {"Access-Control-Allow-Origin": "*"}
            }
        )
    }

    updateField(event) {
        const cpf = event.target.value
        this.setState({searchedCpf:cpf})
    }

    renderForm() {
        return (
            <div>
                <div className="col-md-4 col-md-4">
                    <div className="form-group">
                        <label>Digite o CPF:</label>
                            <MaskedInput 
                                    name="cpf"
                                    mask="999.999.999-99"
                                    value={this.state.searchedCpf}
                                    onChange={e => this.updateField(e)}
                            />
                    </div>
                </div>
                <br/>
                <div className="col-md-4 col-md-4">
                    <button className="btn btn-primary"
                        onClick={e => this.search(e)}>
                            Pesquisar
                    </button>
                </div>
                <br/>
                <hr/>
                <div>Resultado da pesquisa</div>
                <hr/>
                <br/>
                <table className="table" style={{marginTop:'4px'}}>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Nome</th>
                            <th style={{textAlign:'center'}}>CPF</th>
                            <th style={{textAlign:'center'}}>Data de Nascimento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRow()}
                    </tbody>
                </table>
            </div>
        )
    }

    renderRow() {
        return (
            <tr>
                <td style={{textAlign:'center'}}>{this.state.customer.name}</td>
                <td style={{textAlign:'center'}}>{this.state.customer.cpf}</td>
                <td style={{textAlign:'center'}}>{this.state.customer.sBirthDate}</td>
            </tr>
        )
    }

    render() {
        return(
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}