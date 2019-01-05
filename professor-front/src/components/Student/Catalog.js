import React, {Component} from 'react';
import {getAllCourses} from "../../service";
import {joinCourse} from "../../service";
import {getCourses} from "../../service";
import Navbar from "../Home/Navbar";

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state={
            courses:[],
            enrolledCourses: [],
            availableCourses: [],
            user:{}
        }
    }

    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem('user'));

        getCourses(currentUser._id)
            .then(res => {
                const enrolledCourses = [];
                res.data.courses.forEach(course=> {
                    enrolledCourses.push(course._course._id)
                })
                this.setState({enrolledCourses, user: currentUser})


            });
        getAllCourses()
            .then(res => {
                this.setState({courses:res.data.courses})

            });
        console.log(this.state)



    }




    handleEnroll = (e) => {
    e.preventDefault();
    const {user} = this.state;
    const {history} = this.props;
    joinCourse(e.target.value,user,history)
    };

    setAvailableCourses = () => {
        const availableCourses = [];
        this.state.courses.forEach(course => {
            if(this.state.enrolledCourses.indexOf(course._id) === -1) {
                availableCourses.push(course._id)
            } else {
                availableCourses.push("vacío")
            }
        });
        return availableCourses;
    }


    render(){
       const availableCourses = this.setAvailableCourses();

        return(
            <div>
                <Navbar/>
                <div className="container">
                    <ul className="collection with-header">
                        <li className="collection-header ">
                            <h3 className="blue-text-mine">Courses</h3>
                        </li>
                        {this.state.courses.map(course =>
                            <li className="collection-item">
                                <strong>{course.title}</strong> Professor: {course._professor.name}
                                {availableCourses.includes(course._id) ?
                                    <button className="btn btn-small red-background secondary-content" value={course._id} onClick={this.handleEnroll}>Enroll</button>
                                    :<strong>  Enrolled</strong>
                                }

                            </li>)}
                    </ul>
                </div>

            </div>
        )
    }
}

export default Catalog;