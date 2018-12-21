import React, {Component} from 'react'
import axios from "axios";
import {Row} from 'react-materialize'
import M from 'materialize-css';


class AdminProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            users: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/auth/`)
            .then(res => {
                let users = res.data.users;
                this.setState({users});
            })
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
    }


    render(){
        return (

            <div>

                {this.state.users.map(user =>
                    <form>
                        <label>{user.name}</label>
                        <div className="input-field col s4">
                        <select>
                            <option value="" disabled selected>Choose your option</option>
                            <option value="student">Student</option>
                            <option value="professor">Professor</option>
                            <option value="admin">Admin</option>
                        </select>
                        </div>

                    </form>)}

                    <div className="input-field col s6">
                        <select>
                            <option value="" disabled selected>Choose your option</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </select>
                        <label>Materialize Select</label>
                    </div>

            </div>
        )

    }
}

export default AdminProfile;