import React, {Component} from 'react';
import {register} from "../../service";
import Navbar from "../Home/Navbar";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                email:'',
                password: '',
                confirmPassword:'',
                role:''
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
        console.log(this.state.user);
        register(this.state.user, this.props.history);
    };



    render(){
        return(
            <div>
                <Navbar/>
                <div className="container2">
                    <div className="row">
                        <form className="col s12" id="reg-form" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="name" name="name" type="text" className="validate" minLength="6" onChange={this.handleChange} required/>
                                        <label htmlFor="name">Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="email" name="email" type="email" className="validate" minLength="6" onChange={this.handleChange} required/>
                                        <label htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="password" name="password" type="password" onChange={this.handleChange} required/>
                                        <label htmlFor="password">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="confirm-password" name="confirmPassword" type="password" className="validate" minLength="6" onChange={this.handleChange}  required/>
                                        <label htmlFor="confirm-password">Confirm password</label>
                                </div>
                            </div>

                                <div className="input-field col s12">
                                    <button className="btn btn-large btn-register blue-background waves-effect waves-light center"
                                            type="submit" name="action">Register

                                    </button>
                                </div>

                        </form>
                    </div>
                </div>
        </div>



        )
    }
}


export default Register;

{/* <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input name='name' type="text" onChange={this.handleChange}/>
                    </label>
                    <label>
                        E-mail:
                        <input name='email' type="text" onChange={this.handleChange}/>
                    </label>
                    <label>
                        Password:
                        <input name='password' type="password" onChange={this.handleChange}/>
                    </label>
                    <label>
                        Confirm Password:
                        <input name='confirmPassword' type="password" onChange={this.handleChange}/>
                    </label>
                    agregar rol
                    <div>
                        <label> You are a:</label>
                        <label> Student
                            <input name="role" type="radio" value="student" onClick={this.handleChange}/>
                        </label>
                        <label> Professor
                            <input name="role" type="radio" value="professor" onClick={this.handleChange}/>
                        </label>
                    </div>
                    <button className="btn" type='submit'>Register</button>
                </form>
            </div>*/}