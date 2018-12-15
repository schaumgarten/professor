import React, {Component} from 'react';
import Navbar from "./Navbar";
import ProfessorProfile from "../Professor/ProfessorProfile";
import {getCourses} from "../../service";

import StudentProfile from "../Student/StudentProfile";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            courses: []
        }
    }



    componentWillMount() {
        const currentUser = JSON.parse(localStorage.getItem('user'));

        getCourses(currentUser._id)
            .then(res => {

                this.setState({courses:res.data.courses, user: currentUser});
            })
    }

    render(){
        return(
            <div>
                <Navbar/>
                {this.state.user.role === "professor" ? <ProfessorProfile courses={this.state.courses} user={this.state.user}/> : <StudentProfile user={this.state.user} courses={this.state.courses}/> }
            </div>

        )
    }
}


export default Profile;