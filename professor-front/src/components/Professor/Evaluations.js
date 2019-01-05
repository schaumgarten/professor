import React, {Component} from 'react';
import M from "materialize-css";

class Evaluations extends Component {
    componentDidMount() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    }

    render(){
        console.log(this.props.currentEvals);
        return(
            <div>
                <form onSubmit={(e)=>this.props.submit(e)}>
                    <h4 className="right">{this.props.course}</h4>
                    <h3>{this.props.fieldName}</h3>
                    {this.props.session ? <h4>{this.props.session.dateString}</h4>:null}
                    <ul className="collection">
                        {this.props.currentEvals.map((one,index) =>
                            <li className="collection-item row">
                                <div className="col s11">{this.props.field === "course" ? one._student.name : <span>{one.evaluationType}{ one._session ? <span> - {one._session.dateString}</span> : ''}</span>} </div>
                                <input className="col s1" type="number" value={one.grade} onChange={(e)=>this.props.changeGrade(e.target.value,index)}/>
                            </li>
                           )}
                    </ul>
                    <span className="red-text right">{this.props.error}</span>
                    <button className="btn  red-background" type="submit">Submit</button>
                    <button className="btn btn-flat modal-close"> Close</button>
                </form>
            </div>
        );
    }

}

export default Evaluations;