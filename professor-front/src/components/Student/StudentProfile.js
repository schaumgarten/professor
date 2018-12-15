import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class StudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state={
            enrolledCourses:[]
        }
    }



   componentWillMount() {
        const {courses} = this.props;
        this.setState({enrolledCourses:courses});
    }


    render(){
        console.log(this.props.courses);
        return(
            <div>
                <h1>{this.props.user.name}</h1>
                <ul>
                    {this.props.courses.map((course, index) => <li key={index}> <strong> {course._course.title} </strong>  Professor: {course._course._professor.name} </li>)}
                </ul>
                <Link to='/catalog' > Course Catalog </Link>
                {/*<Link
                    to={{
                        pathname: '/catalog',
                        state: { enrolledCourses: this.state.enrolledCourses }
                    }}> Course Catalog </Link>*/}
            </div>

        )
    }
}

export default StudentProfile;