import React, {Component} from 'react';
import axios from "axios";
import Navbar from "../Home/Navbar";
import Calendar from 'react-calendar';
import {createSession, getSessions} from "../../service";
import Evaluations from "./Evaluations";
import {Link} from 'react-router-dom'

class CourseView extends Component {
    constructor(props) {
        super(props);
        this.state={
            enrollments: [],
            confirmedStudents: [],
            pendingStudents: [],
            date : new Date(),
            sessions: [],
            evaluations: [],
            fieldName: '',
            errorMessage: '',
            fieldType: ''
        }
    }

     componentWillMount() {
        console.log('id ',this.props.state.course._id);
        getSessions(this.props.state.course._id)
            .then((res) => {
                this.setState({sessions: res.data.sessions})
            });
        this.updateStudents();
    }

    onDateChange = date => this.setState({ date });

    handleCreateSession = () => {
        const date = this.state.date;
        const _course = this.props.state.course._id;
        const dateString = date.toDateString();
        const students = this.state.confirmedStudents;
        const attendance = [];
        students.forEach(student => attendance.push({_student:student._id, attended: false}));
        createSession(date,_course,dateString,attendance)
            .then((res) => {

                const session = res.data.session;
                getSessions(this.props.state.course._id)
                    .then((res) => {
                        this.setState({sessions: res.data.sessions})
                    });
                students.forEach(student => {
                    this.props.state.course.evaluationCriteria.forEach(field => {
                        if (field.inSession){
                            axios.post(`http://professor2018.herokuapp.com/api/evaluations/new`,{evaluationType:field.name,_course,_student:student._id,grade:null,_session:session._id})
                        }
                    })

                })
            })
    };

    handleConfirm = (student) => {
        const id = this.props.state.course._id;
        this.createGlobalEvaluations(student);
        axios.patch(`http://professor2018.herokuapp.com/api/enrollments/confirm/${id}`, student)
            .then(() => {
                this.updateStudents();
            })
    };

    createGlobalEvaluations = (student) => {
        const {course} = this.props.state;
        course.evaluationCriteria.forEach(field => {
            const evaluationType = field.name;
            const _course = course._id;
            const _student = student._id;
            if (field.inSession === false) {
                axios.post(`http://professor2018.herokuapp.com/api/evaluations/new`,{evaluationType,_course,_student,grade:null})
            } else {
                axios.get(`http://professor2018.herokuapp.com/api/sessions/all/${_course}`)
                    .then(res => {
                        const sessions = res.data.sessions;
                        sessions.forEach(session => {
                            axios.post(`http://professor2018.herokuapp.com/api/evaluations/new`,{evaluationType,_course,_student,grade:null,_session:session._id})
                        })
                    })
            }

        })
    };

    changeGrade = (grade, index) => {
        const {evaluations} = this.state;
        evaluations[index].grade = grade;
        this.setState({evaluations});
    };

    submitGrades = (e) => {
        e.preventDefault();
        const {evaluations} = this.state;
        evaluations.forEach(evaluation => {
            if (evaluation.grade >= 0 && evaluation.grade <=10){
                axios.patch(`http://professor2018.herokuapp.com/api/evaluations/${evaluation._id}`,{grade: evaluation.grade})
            } else {
                this.setState({errorMessage: 'Grades must have a value between 1 and 10',modalManager:''})
            }
        });
        if (this.state.evaluations.every(evaluation => (evaluation.grade>0 && evaluation.grade <=10)|| evaluation.grade === null))  {
            this.setState({errorMessage:"Grades have been submitted"})
        }
    };



    uploadEvaluations = (field,type) => {
        const search = (type === "course" ?  field.name :  field._id);
;       console.log(search);
        axios.get(`http://professor2018.herokuapp.com/api/evaluations/${type}/${search}`)
            .then(res => {
                this.setState({evaluations: res.data.eval, fieldName:field.name, errorMessage:'',fieldType:type})
                console.log(this.state.evaluations)
            })
            .catch(err => {
                console.log(err);
            })
    };

    updateStudents = () => {
        axios.get(`http://professor2018.herokuapp.com/api/courses/course/${this.props.state.course._id}`)

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
    };

    delete = (id,type)=> {
        axios.delete(`http://professor2018.herokuapp.com/api/${type}/${id}`)
            .then(() => {
                if (type === "sessions"){
                    axios.get(`http://professor2018.herokuapp.com/api/evaluations/sessions/${id}`)
                        .then(res => {
                            res.data.eval.forEach(eva => {
                                axios.delete(`http://professor2018.herokuapp.com/api/evaluations/${eva._id}`)
                            })
                        });
                    getSessions(this.props.state.course._id)
                        .then((res) => {
                            this.setState({sessions: res.data.sessions})
                        });
                } else {
                    this.updateStudents();
                }
            })


    };

    render(){
        //console.log(this.state);
        return(
            <div>
                <Navbar/>
                <h1 className="center-align red-text">{this.props.state.course.title}</h1>
                <div className="row">
                    <div className="col l4 m6 s12 ">
                        <ul className="collection with-header hoverable scroll">
                            <li className="collection-header"><h4 className="blue-text-mine">Confimed Students</h4></li>
                            {this.state.confirmedStudents.length > 0 ? this.state.confirmedStudents.map(student => <li className="collection-item">
                                <div><a href="#!" data-target="modal2" className="modal-trigger" onClick={()=>this.uploadEvaluations(student,"student")}>{student.name}</a><a href="#!" className="secondary-content"><i
                                    className="material-icons red-text" onClick={()=>this.delete(student._id, "enrollments")}>delete</i></a></div>
                            </li>) : <li className="collection-item">Vacío</li>}
                            <li className="collection-header"><h4 className="blue-text-mine">Pending Students</h4></li>
                            {this.state.pendingStudents.map(student => <li className="collection-item">
                                <div>{student.name}<a href="#!" className="secondary-content"><i
                                    className="material-icons red-text" onClick={()=>this.handleConfirm(student)}>add</i></a></div>
                            </li>)}
                        </ul>
                    </div>
                    <div className="col l4 m6 s12 ">
                        <ul className="collection with-header hoverable scroll">
                            <li className="collection-header"><h4 className="blue-text-mine">Sessions</h4></li>
                            <li className="collection-item"> <Calendar onChange={this.onDateChange}
                                                                       value={this.state.date} showWeekNumbers={true}/>
                                <button className="btn waves-red waves-effect red-background lighten-1 margin-top" onClick={this.handleCreateSession}>Create new session</button>
                            </li>
                            {this.state.sessions.map(session => <li className="collection-item"><div><Link to="/session" onClick={()=>this.props.changeSession(session,this.state.confirmedStudents)}>{session.dateString}</Link><a href="#!" className="secondary-content"><i
                                className="material-icons red-text" onClick={() => this.delete(session._id,"sessions")}>delete</i></a></div> </li> )}
                        </ul>
                    </div>
                    <div className="col l4 m6 s12 ">
                        <ul className="collection with-header hoverable">
                            <li className="collection-header"><h4 className="blue-text-mine">Evaluation</h4></li>
                            {this.props.state.course.evaluationCriteria.map(field => <li className="collection-item"><div>{field.name} {field.inSession ? <i className="secondary-content material-icons red-text">block</i> :<a href="#!" className="secondary-content"><i
                                data-target="modal1" className="material-icons red-text modal-trigger" onClick={()=>this.uploadEvaluations(field,"course")}>mode_edit</i></a>}</div> </li>)}
                        </ul>
                    </div>
                </div>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <Evaluations currentEvals={this.state.evaluations} course={this.props.state.course.title} fieldName={this.state.fieldName} changeGrade={this.changeGrade} error={this.state.errorMessage} submit={this.submitGrades} field={this.state.fieldType}/>
                    </div>
                </div>
                <div id="modal2" className="modal">
                    <div className="modal-content">
                        <Evaluations currentEvals={this.state.evaluations} course={this.props.state.course.title} fieldName={this.state.fieldName} changeGrade={this.changeGrade} error={this.state.errorMessage} submit={this.submitGrades} field={this.state.fieldType} />
                    </div>
                </div>

            </div>
        )
    }
}

export default CourseView;