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
        console.log(this.props)
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
                    {this.state.ownedCourses.map(course => (<li><Link to='/course-view' onClick={() => this.props.change(course)}>{course.title}</Link></li>))}
                </ul>
                <Link to='/new-course'> <button className="btn">Create new course</button></Link>
            </div>


        )
    }
}

export default ProfessorProfile;

