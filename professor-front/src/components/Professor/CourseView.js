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
        axios.patch(`http://localhost:3000/api/enrollments/confirm/${id}`, student)
        this.props.history.push('/profile');

    };

    render(){
        console.log(this.state.confirmedStudents, this.state.pendingStudents);
        return(
            <div>
                <Navbar/>
                <h1>{this.props.state.course.title}</h1>
                <h2>Confirmed students</h2>
                {this.state.confirmedStudents.length > 0 ? this.state.confirmedStudents.map(student => <h3>{student.name}</h3>) : <p>Vacío</p>}
                <h2>Pending students</h2>
                {this.state.pendingStudents.map(student => <div> <h3>{student.name}</h3> <button onClick={()=> this.handleConfirm(student)}>Confirm</button> </div> )}
            </div>
        )
    }
}

export default CourseView;