import React, {Component} from 'react';

import {Link} from "react-router-dom";


class ProfessorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ownedCourses : []
        }
    }


    componentWillMount() {
        const {user, courses} = this.props;
        const {ownedCourses} = this.state;
        courses.forEach(course => {
            if (course._professor === user._id) ownedCourses.push(course)
        })
        this.setState({ownedCourses})
    }

    render(){
        console.log(this.state);
        return(
            <div>

                <h1>Courses</h1>
                <ul>
                    {this.state.ownedCourses.map(course => (<li>{course.title}</li>))}
                </ul>
                <Link to='/new-course'> <button>Create new course</button></Link>
            </div>


        )
    }
}

export default ProfessorProfile;

