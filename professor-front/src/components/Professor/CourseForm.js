import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Navbar from "../Home/Navbar";
import {createCourse} from "../../service";

class CourseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            evalFields: [],
            fieldsCounter: 0,
            error: null,
            ready: null,
            authorizeCreate: false
        }
    }

    handleChange = (e) => {
        let {title} = this.state;
        title = e.target.value;
        this.setState({title});

    };

    handleFieldChange = (e) => {
        const index = e.target.name;
        const {value, type} = e.target;
        let {evalFields, authorizeCreate, ready} = this.state;
        let object = evalFields[index];
        this.setState({error:null});

        if (type === "text"){
            var field = "name";
        } else {
            var field = "percentage";
        }
        object[field] = value;
        evalFields.splice(index,1,object);
        const percentages = this.state.evalFields.map(field => parseInt(field.percentage));
        const total = percentages.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        if (total === 100){
            authorizeCreate = true;
            ready = "modal-close";
        }
        this.setState({evalFields, authorizeCreate, ready});
    };

    addField = () => {
        let counter = this.state.fieldsCounter;
        let {evalFields} = this.state;
        const newField = {
          name:'',
          percentage:null,
          inSession: false,
          key: counter
        };
        evalFields.push(newField);
        counter ++;
        this.setState({evalFields, fieldsCounter: counter});

    };

    handleSubmitClick = (e) => {
        e.preventDefault();

        if (this.state.authorizeCreate){
            this.handleSubmit()
        } else {
            this.setState({error:"The evaluation fields don't add to 100%"})

        }
    };




    handleSubmit = () => {
        const {title, evalFields} = this.state;
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(this.state.ready);
        createCourse(title,user, evalFields)
            .then(()=> {
                this.props.uploadState()
            })
    };

    render(){

        return(
            <div>
               <form onSubmit={this.handleSubmitClick}>
                    <label>
                        Course title:
                        <input type="text" name="title" onChange={this.handleChange}/>
                    </label>
                   <button className="btn" onClick={this.addField}>Add new evaluation field</button>
                   {this.state.evalFields.length > 0 ? this.state.evalFields.map((field,index) =>
                       <div>
                           <input type="text" onChange={this.handleFieldChange} value={field.name} name={index} key={index}/>
                           <input type = "number"  onChange={this.handleFieldChange} value={field.percentage} name={index} key={index + "b"}/ >
                           {/*<input type = "checkbox" {field.inSession ? checked : null}/>*/}
                       </div>

                   ) : console.log('perro') }
                    <button type="submit"  className={`btn ${this.state.ready}`} >Create</button>
                    <Link to="/profile"><button className="btn modal-close">Cancel</button></Link>
                </form>
                   {this.state.error ? <p className="red-text">{this.state.error}</p> : null}

            </div>
        )
    }

}

export default CourseForm;