import React, {Component} from 'react';

import {Link} from "react-router-dom";
import M from 'materialize-css';
import Catalog from "../Student/Catalog";
import CourseForm from "./CourseForm";


class ProfessorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ownedCourses : []
        }
    }


    componentDidMount() {
        this.props.uploadState();
        //this.setState({ownedCourses:this.props.ownedCourses});
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    }

    /*uploadState = () => {
        console.log(this.props)
        const {user, courses} = this.props;
        //const {ownedCourses} = this.state;
        const ownedCourses = [];
        courses.forEach(course => {
            if (course._professor === user._id) ownedCourses.push(course)
        });
        this.setState({ownedCourses})
        console.log(ownedCourses)
    };*/

    render(){
        //console.log(this.state);
        return(
            <div>

                <h1>Courses</h1>
                <ul>
                    {this.props.ownedCourses.map(course => (<li><Link to='/course-view' onClick={() => this.props.change(course)}>{course.title}</Link></li>))}
                </ul>
                {/*<Link to='/new-course'> <button className="btn">Create new course</button></Link>*/}
                <button data-target="modal1" className="btn modal-trigger">Create new course</button>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <CourseForm uploadState={this.props.uploadState}/>
                    </div>
                </div>

            </div>


        )
    }
}

export default ProfessorProfile;

