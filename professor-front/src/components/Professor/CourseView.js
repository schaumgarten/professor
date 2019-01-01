import React, {Component} from 'react';
import axios from "axios";
import Navbar from "../Home/Navbar";

class CourseView extends Component {
    constructor(props) {
        super(props);
        this.state={
            enrollments: [],
            confirmedStudents: [],
            pendingStudents: []
        }
    }

     componentWillMount() {
        console.log('id ',this.props.state.course._id);
        axios.get(`http://localhost:3000/api/courses/course/${this.props.state.course._id}`)

           .then(res => {
               const enrollments = res.data.enrollments;
               const confirmedStudents =[];
               const pendingStudents = [];
               enrollments.forEach(enrollment => {
                   if (enrollment.confirmed === false) {
                       pendingStudents.push(enrollment._student)
                   } else {
                       confirmedStudents.push(enrollment._student)
                   }
               });


               this.setState({enrollments, pendingStudents, confirmedStudents});
           })
           .catch(err => console.log(err))

    }

    handleConfirm = (student) => {
        const id = this.props.state.course._id;
        console.log(">>>>>>")
        axios.patch(`http://localhost:3000/api/enrollments/confirm/${id}`, student)
            .then(() => {
                axios.get(`http://localhost:3000/api/courses/course/${this.props.state.course._id}`)

                    .then(res => {
                        const enrollments = res.data.enrollments;
                        const confirmedStudents =[];
                        const pendingStudents = [];
                        enrollments.forEach(enrollment => {
                            if (enrollment.confirmed === false) {
                                pendingStudents.push(enrollment._student)
                            } else {
                                confirmedStudents.push(enrollment._student)
                            }
                        });


                        this.setState({enrollments, pendingStudents, confirmedStudents});
                    })
                    .catch(err => console.log(err))
            })


    };

    render(){
        console.log(this.state.confirmedStudents, this.state.pendingStudents);
        return(
            <div>
                <Navbar/>
                <h1>{this.props.state.course.title}</h1>
                <div className="row">
                    <div className="col s4">
                        <ul className="collection with-header">
                            <li className="collection-header"><h4 className="blue-text-mine">Confimed Students</h4></li>
                            {this.state.confirmedStudents.length > 0 ? this.state.confirmedStudents.map(student => <li className="collection-item">
                                <div>{student.name}<a href="#!" className="secondary-content"><i
                                    className="material-icons red-text">delete</i></a></div>
                            </li>) : <li className="collection-item">Vacío</li>}
                            <li className="collection-header"><h4 className="blue-text-mine">Pending Students</h4></li>
                            {this.state.pendingStudents.map(student => <li className="collection-item">
                                <div>{student.name}<a href="#!" className="secondary-content"><i
                                    className="material-icons blue-text-mine" onClick={()=>this.handleConfirm(student)}>add</i></a></div>
                            </li>)}
                        </ul>
                    </div>
                    <div className="col s4">
                        <ul className="collection with header">
                            <li className="collection-header"><h4 className="blue-text-mine">Sessions</h4><a href="#!" className="secondary-content"><i
                                className="material-icons blue-text-mine">add</i></a></li>

                        </ul>
                    </div>
                </div>


            </div>
        )
    }
}

export default CourseView;