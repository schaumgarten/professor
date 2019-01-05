import React, {Component} from 'react';
import M from "materialize-css";

class Evaluations extends Component {
    constructor(props) {
        super(props);
        this.state={
            finalAvg:null
        }
    }

    componentDidMount() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);

    }

    getAvg = () => {
       const gradesSummary = this.props.course.evaluationCriteria;
       const toAdd = [];
       gradesSummary.forEach(field => {
           if(field.inSession) {
               field.grades = [];
           }
           this.props.currentEvals.forEach(evaluation => {
               if (evaluation.grade !== null){
                   if (evaluation.evaluationType === field.name){
                       if(evaluation._session){
                           field.grades.push(evaluation.grade)
                           field.grade = field.grades.reduce((c,i) => {
                               return c+i
                           } )/field.grades.length;
                       } else {
                           field.grade = evaluation.grade;
                       }
                       field.absoluteValue = field.grade*(parseInt(field.percentage)/100);

                   }
               }

           } );
           toAdd.push(field.absoluteValue);
       });
       const avg =  toAdd.reduce((c,i) => {return c+i});
        const finalAvg = avg.toFixed(2);
        this.setState({finalAvg});
        //axios.patch(`http://professor2018.herokuapp.com/api/enrollments/`)
    };

    render(){

        //console.log(this.props.currentEvals);
        return(
            <div>
                <form onSubmit={(e)=>this.props.submit(e)}>
                    <h4 className="right">{this.props.course.title}</h4>
                    <h3>{this.props.fieldName}</h3>
                    {this.props.session ? <h4>{this.props.session.dateString}</h4>:null}
                    <ul className="collection">
                        {this.props.currentEvals.map((one,index) =>
                            <li className="collection-item row">
                                <div className="col s11">{this.props.field === "course" ? one._student.name : <span>{one.evaluationType}{ one._session ? <span> - {one._session.dateString}</span> : ''}</span>} </div>
                                <input className="col s1" type="number" value={one.grade} onChange={(e)=>this.props.changeGrade(e.target.value,index)}/>
                            </li>
                           )}
                        {this.props.field === "student" ? <li className="collection-item">Final grade: <span className="right">{this.state.finalAvg}</span> </li>: null}
                    </ul>
                    <span className="red-text right">{this.props.error}</span>
                    <button className="btn  red-background" onClick={this.props.global ? this.getAvg : null }type="submit"  >Submit</button>
                    <button className="btn btn-flat modal-close"> Close</button>
                </form>
            </div>
        );
    }

}

export default Evaluations;