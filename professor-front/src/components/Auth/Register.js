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
                <form onSubmit={this.handleSubmit}>
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
                    {/*agregar rol*/}
                    <div>
                        <label> You are a:</label>
                        <label> Student
                            <input name="role" type="radio" value="student" onClick={this.handleChange}/>
                        </label>
                        <label> Professor
                            <input name="role" type="radio" value="professor" onClick={this.handleChange}/>
                        </label>
                    </div>
                    <button type='submit'>Register</button>
                </form>
            </div>

        )
    }
}


export default Register;