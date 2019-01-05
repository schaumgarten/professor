import React, {Component} from 'react'
import axios from "axios";
import {patchRoles} from "../../service";
import M from 'materialize-css';


class AdminProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            error:null
        }
    }

    componentDidMount() {
        axios.get(`http://professor2018.herokuapp.com/api/auth/`)
            .then(res => {
                let users = res.data.users;
                this.setState({users});
            })
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
    }

    handleChange = (e,user,index) => {
        let u = this.state.users[index];
        const users = this.state.users;
        console.log(users);
        u.role = e.target.value;
        users.splice(index, 1, u);
        this.setState({users});
    };

    handleSubmit = (e, user, index) => {
        e.preventDefault();
        this.setState({error:null})
        const uroles = {role: this.state.users[index].role}
        if (this.state.users[index].role !== "student" && this.state.users[index].role!=="professor" && this.state.users[index].role !=="admin") {
            this.setState({error: "Invalid user role"})
        } else {
            patchRoles(user._id, uroles)
        }
    };



    render(){
        return (

            <div>

                {this.state.users.map((user,index) =>
                    <form onSubmit={(e) => this.handleSubmit(e,user,index)}>
                        <span>{user.name}</span>
                        <div className="input-field col s4">
                            <input className="inline" type="text" value={user.role} onChange={(e) => this.handleChange(e,user,index)}/>
                            <button className="btn-small" type="submit">OK</button>

                        </div>

                    </form>)}
                {this.state.error ? <p className="red-text">{this.state.error}</p> : null}



            </div>
        )

    }
}

export default AdminProfile;