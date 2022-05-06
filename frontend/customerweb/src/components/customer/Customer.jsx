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
    list:[]
}

export default class Customer extends Component {
    state = {...initialState}

    clear() {
        this.setState({customer: initialState.customer})
    }

    save() {
        const customer = this.state.customer
        const method = customer.id ? 'put' : 'post'
        const url = customer.id ? `${baseURL}/${customer.id}` : `${baseURL}/createcustomer`
        axios[method](url, customer).then(
            resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({customer: initialState.customer,list})
                resp.headers = {"Access-Control-Allow-Origin": "*"}
            }
        )
    }

    getUpdatedList(customer) {
        const list = this.state.list.filter(c => c.id !== customer.id)
        list.unshift(customer)
        return list
    }

    updateField(event) {
        const customer = {...this.state.customer}
        customer[event.target.name] = event.target.value
        this.setState({customer})
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-md-4 col-md-4">
                        <div className="form-group">
                            <label>Nome:</label>
                            <input type="text" className="form-control" 
                            name="name" value={this.state.customer.name}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome do cliente..." />
                        </div>
                    </div>
                    <div className="col-md-4 col-md-4">
                        <div className="form-group">
                            <label>CPF:</label>
                            <MaskedInput 
                                    name="cpf"
                                    mask="999.999.999-99"
                                    value={this.state.customer.cpf}
                                    onChange={e => this.updateField(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 col-md-4">
                        <div className="form-group">
                            <label>Data de Nascimento:</label>
                            <input type="date" className="form-control" 
                            name="birthdate" value={this.state.customer.birthdate}
                            onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                        onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary" style={{marginLeft:'5px'}}
                        onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
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
