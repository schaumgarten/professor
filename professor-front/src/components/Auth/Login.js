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
        return(
            <div>
                <Navbar/>
                <div className="container2">
                    <div className="row">
                        <form  id="reg-form" onSubmit={this.handleSubmit}>

                            <div className="row">
                                <div className="input-field col s12 m9">
                                    <input id="email" name="email" type="email" className="validate" minLength="6" onChange={this.handleChange} required/>
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m9">
                                    <input id="password" name="password" type="password" onChange={this.handleChange} required/>
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>

                            <div className="input-field col s12">
                                <button className="btn btn-large btn-register blue-background waves-effect waves-light center"
                                        type="submit" name="action">Login

                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;