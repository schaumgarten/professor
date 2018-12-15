import React, {Component} from 'react';
import {login} from "../../service";
import Navbar from "../Home/Navbar";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            user: {
                email:'',
                password:''
            }

        }
    }

    handleChange = (e) => {
         const {user} = this.state;
         const field = e.target.name;
         user[field] = e.target.value;
         this.setState({user});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        login(this.state.user, this.props.history);
    };

    render(){
        console.log(this.state)
        return(
            <div>
                <Navbar/>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="">
                        E-mail:
                        <input name="email" type="text" onChange={this.handleChange}/>
                    </label>
                    <label htmlFor="">
                        Password:
                        <input name="password" type="password" onChange={this.handleChange}/>
                    </label>
                    <button type='submit'>Login</button>
                </form>
            </div>
        )
    }
}
export default Login;