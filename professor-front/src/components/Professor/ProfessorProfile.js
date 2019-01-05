import React, {Component} from 'react';
import {Link} from "react-router-dom";
import M from 'materialize-css';
import CourseForm from "./CourseForm";
import axios from 'axios'

class ProfessorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ownedCourses : [],
            toDo:[]
        }
    }


    componentDidMount() {
        this.props.uploadState();
        this.setState({toDo:this.props.user.toDo});
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    }

    delete = (index) => {
        let {toDo} = this.state;
        toDo.splice(index,1);
        axios.patch(`http://professor2018.herokuapp.com/api/auth/${this.props.user._id}`,{toDo})
            .then(()=> {
                this.setState({toDo})
            });
    };

    handleSubmitActivity = (e) => {
        e.preventDefault();
        const {toDo} = this.state;
        toDo.push(e.target.input.value);
        axios.patch(`http://professor2018.herokuapp.com/api/auth/${this.props.user._id}`,{toDo})
            .then(()=> {
                this.setState({toDo})
                document.getElementById("txtComment").value = "";
            })
    };


    render(){
        //console.log(this.state);
        return(
            <div>
                <h1 className="center-align red-text">Welcome, {this.props.user.name}</h1>
                <div className="row">
                    <div className="col l4 m6 s12 ">
                        <ul className="collection with-header hoverable scroll">
                            <li className="collection-header"><h4 className="blue-text-mine">To-do List</h4></li>
                            {this.state.toDo.map((activity,index) => <li className="collection-item">{activity}<a href="#!" className="secondary-content"><i
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
                            <li className="collection-header"><h4 className="blue-text-mine">Courses</h4></li>
                            {this.props.ownedCourses.map(course => (<li className="collection-item"><Link to='/course-view' onClick={() => this.props.change(course)}>{course.title}</Link></li>))}
                       <li className="collection-item">
                           <button data-target="modal1" className="btn red-background modal-trigger">Create new course</button>
                       </li>
                        </ul>

                    </div>
                </div>

                {/*<Link to='/new-course'> <button className="btn">Create new course</button></Link>*/}

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

