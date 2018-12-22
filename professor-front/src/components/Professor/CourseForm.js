import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Navbar from "../Home/Navbar";
import {createCourse} from "../../service";

class CourseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }

    handleChange = (e) => {
        let {title} = this.state;
        title = e.target.value;
        this.setState({title});

    };




    handleSubmit = (e) => {
        e.preventDefault();
        const {title} = this.state;
        const user = JSON.parse(localStorage.getItem('user'));
        createCourse(title,user,this.props.history)
            .then(()=> {
                this.props.uploadState()
                    })
    };

    render(){

        return(
            <div>
                {/*<Navbar/>*/}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Course title:
                        <input type="text" name="title" onChange={this.handleChange}/>
                    </label>
                    <button type="submit"  className="btn modal-close">Create</button>
                    <Link to="/profile"><button className="btn modal-close">Cancel</button></Link>
                </form>
            </div>
        )
    }

}

export default CourseForm;