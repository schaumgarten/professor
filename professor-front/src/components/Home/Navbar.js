import React, {Component} from 'react';
import {Link} from "react-router-dom";
import M from 'materialize-css';


class Navbar extends Component{
    logout = () => {
        localStorage.clear();

    };

    componentDidMount() {
        var elems = document.querySelectorAll('.sidenav');
        //var instances = M.Sidenav.init(elems);
    }


    render(){
        const token = localStorage.getItem('token');
        return(
            <div>
                <nav className="blue-background lighten-1" role="navigation">
                    <div className="nav-wrapper container">

                        <Link id="logo-container" to="/" className="brand-logo"><img className='logo' src='logo-professor-navbar.png' alt="perro"></img></Link>

                        {token ?
                            <ul className="right hide-on-med-and-down">
                                <li><Link to='/profile'>Profile</Link></li>
                                <li onClick={this.logout}><Link to='/'> Logout</Link></li>
                            </ul>

                            :
                            <ul className="right hide-on-med-and-down">
                                <li><Link to='/login'>Login</Link></li>
                                <li><Link to='/register'> Register</Link></li>
                            </ul>}
                        {token ?
                            <ul id="nav-mobile" className="sidenav">
                                <li onClick={this.logout}><Link to='/'> Logout</Link></li>
                                <li><Link to='/profile'>Profile</Link></li>
                            </ul>

                            :
                            <ul id="nav-mobile" className="sidenav ">
                                <li className="blue-background"><Link to='/login'>Login</Link></li>
                                <li className="blue-background"><Link to='/register'> Register</Link></li>
                            </ul>}
                            <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i
                            className="material-icons">menu</i></a>
                            </div>
                            </nav>
            </div>

            /*<div>
                {token ?
                    <div>
                        <Link to='/'> <button className="btn" onClick={this.logout}>Logout</button></Link>
                        <Link to='/profile'>Profile</Link>

                        </div>

                    :
                    <div>
                        <Link to='/login'><button className="btn">Login</button></Link>
                        <Link to='/register'> <button className="btn">Register</button></Link>
                    </div>

                }
            </div>*/
        )
    }
};

export default Navbar;