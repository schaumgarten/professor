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
                <h1 className="center-align red-text">Welcome, {this.props.user.name}</h1>
                <div className="row">
                    <div className="col l4 m6 s12 push-l4 push-m2">
                        <ul className="collection with-header hoverable">
                            <li className="collection-header"><h4 className="blue-text-mine">Courses</h4></li>
                            {this.props.courses.map((course, index) => <li className="collection-item" key={index}> <strong> {course._course.title} </strong> Professor:  {course._course._professor.name} </li>)}
                           <li className="collection-item"><Link to='/catalog' > Course Catalog </Link></li>
                        </ul>

                    </div>
                </div>

            </div>

        )
    }
}

export default StudentProfile;