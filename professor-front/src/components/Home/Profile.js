import React, {Component} from 'react';
import Navbar from "./Navbar";
import ProfessorProfile from "../Professor/ProfessorProfile";
import {getCourses} from "../../service";

import StudentProfile from "../Student/StudentProfile";
import AdminProfile from "../Admin/AdminProfile";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            courses: [],
            ownedCourses: []

        }
    }



    componentDidMount() {
        this.uploadState();
    }

    uploadState = () => {
        this.getCourses()
            .then(() => {
                //console.log(this.props)
                const {user, courses} = this.state;
                //const {ownedCourses} = this.state;
                const ownedCourses = [];
                courses.forEach(course => {
                    if (course._professor === user._id) ownedCourses.push(course)
                });
                this.setState({ownedCourses})
                //console.log(ownedCourses)
            })

    };


    getCourses = () => {

        const currentUser = JSON.parse(localStorage.getItem('user'));

        return getCourses(currentUser._id)
            .then(res => {
                //console.log("res", res)
                this.setState({courses:res.data.courses, user: currentUser});
            })

    };

    renderProfileComponent = () => {
        const role = this.state.user.role;
        if (role === "professor"){
            return <ProfessorProfile ownedCourses={this.state.ownedCourses} uploadState={this.uploadState} getCourses={this.getCourses} courses={this.state.courses} user={this.state.user} change={this.props.change}/>
        } else if (role === "student"){
            return <StudentProfile user={this.state.user} courses={this.state.courses}/>
        } else if (role === "admin") {
            return <AdminProfile/>
        }

    };

    render(){
        return(
            <div>
                <Navbar/>
                {this.renderProfileComponent()}
                {/*{this.state.user.role === "professor" ? <ProfessorProfile courses={this.state.courses} user={this.state.user} change={this.props.change}/> : <StudentProfile user={this.state.user} courses={this.state.courses}/> }*/}
            </div>

        )
    }
}


export default Profile;