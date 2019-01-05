import React, {Component} from 'react'
import Navbar from "../Home/Navbar";
import axios from 'axios';
import Evaluations from "./Evaluations";

class SessionView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            evaluations: [],
            attendance: []
        }
    }

    componentDidMount() {
        this.setState({activities:this.props.state.session.activities, attendance: this.props.state.session.attendance})
    }


    handleSubmitActivity = (e) => {
        e.preventDefault();
        const {activities} = this.state;
        activities.push(e.target.input.value);
        axios.patch(`http://professor2018.herokuapp.com/api/sessions/${this.props.state.session._id}`,{activities})
            .then(()=> {
                this.setState({activities:this.props.state.session.activities})
                document.getElementById("txtComment").value = "";
            })
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


    delete = (index) => {
        let {activities} = this.state;
        activities.splice(index,1);
        axios.patch(`http://professor2018.herokuapp.com/api/sessions/${this.props.state.session._id}`,{activities})
            .then(()=> {
                this.setState({activities:this.props.state.session.activities})
            });
    };

    changeGrade = (grade, index) => {
        const {evaluations} = this.state;
        evaluations[index].grade = grade;
        this.setState({evaluations});
    };

    uploadEvaluations = (field,type) => {
        const search = (type === "course" ?  field.name :  field._id);
               //console.log(search);
        axios.get(`http://professor2018.herokuapp.com/api/evaluations/${type}/${search}`)
            .then(res => {
                const evaluations = res.data.eval.filter(evaluation => {
                    return evaluation._session === this.props.state.session._id
                });
                this.setState({evaluations, fieldName:field.name, errorMessage:'',fieldType:type})
                //console.log(this.state.evaluations)
            })
            .catch(err => {
                console.log(err);
            })
    };

    handleCheck = (index,bool) => {
        const {attendance} = this.state;
        attendance[index].attended= !bool;
        axios.patch(`http://professor2018.herokuapp.com/api/sessions/${this.props.state.session._id}`,{attendance})
            .then(()=> {
                this.setState({attendance: this.props.state.session.attendance})
            })
    }

    render(){
        return(
            <div>
                <Navbar/>
                <h1 className="center-align red-text">{this.props.state.course ? this.props.state.course.title : "Curso"}</h1>
                <h3 className="center-align red-text">Session {this.props.state.session ? this.props.state.session.dateString : "fecha"}</h3>
                <div className="row">
                    <div className="col l4 m6 s12 ">
                        <ul className="collection with-header hoverable scroll">
                            <li className="collection-header"><h4 className="blue-text-mine">Attendance</h4></li>
                            {this.state.attendance.map((entry,index) =>
                                <li className="collection-item">
                                    <label>
                                        <input type="checkbox"  onClick={()=>this.handleCheck(index,entry.attended)} checked={entry.attended} />
                                        <span>{entry._student.name}</span>
                                    </label>
                                </li>)}
                        </ul>
                    </div>
                    <div className="col l4 m6 s12 ">
                        <ul className="collection with-header hoverable scroll">
                            <li className="collection-header"><h4 className="blue-text-mine">Activities</h4></li>
                            {this.state.activities.map((activity,index) => <li className="collection-item">{activity}<a href="#!" className="secondary-content"><i
                                className="material-icons red-text" onClick={()=>this.delete(index)}>delete</i></a></li>) }
                            <li className="collection-item row">
                                <form onSubmit={this.handleSubmitActivity}>
                                    <input type="text" className="col s11" name="input" id="txtComment"/>
                                    <button className="secondary-content btn-flat col s1" type="submit">
                                        <i className="material-icons red-text" >add</i>
                                    </button>
                                </form>

                            </li>
                        </ul>
                    </div>
                    <div className="col l4 m6 s12 ">
                        <ul className="collection with-header hoverable">
                            <li className="collection-header"><h4 className="blue-text-mine">Evaluation</h4></li>
                            {this.props.state.course.evaluationCriteria.map(field => field.inSession ? <li className="collection-item"><div>{field.name} <a href="#!" className="secondary-content"><i
                                data-target="modal1" className="material-icons red-text modal-trigger" onClick={()=>this.uploadEvaluations(field,"course")}>mode_edit</i></a></div> </li> : null)}
                        </ul>
                    </div>
                </div>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <Evaluations currentEvals={this.state.evaluations} course={this.props.state.course.title} fieldName={this.state.fieldName} changeGrade={this.changeGrade} error={this.state.errorMessage} session={this.props.state.session} submit={this.submitGrades} field={this.state.fieldType}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default SessionView;