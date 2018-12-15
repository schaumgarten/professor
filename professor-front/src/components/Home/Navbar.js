import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Navbar extends Component{
    logout = () => {
        localStorage.clear();

    };

    render(){
        const token = localStorage.getItem('token');
        return(
            <div>
                {token ?
                    <div>
                        <Link to='/'> <button onClick={this.logout}>Logout</button></Link>
                        <Link to='/profile'>Profile</Link>

                        </div>

                    :
                    <div>
                        <Link to='/login'><button>Login</button></Link>
                        <Link to='/register'> <button>Register</button></Link>
                    </div>

                }
            </div>
        )
    }
};

export default Navbar;