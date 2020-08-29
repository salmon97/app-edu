import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FcTodoList } from "react-icons/fc";

class StudentTableTwo extends Component {

  render() {
    const {resGroups, getStudentDetail} = this.props;
    return (
      <div className="container ">
        <div className="row">
          {resGroups.map((item,i)=>
            <div key={i} className="col-md-3">
              <div className="card-st text-center text-light">
                <h5>{item.name}</h5>
                <div className="div-st">
                  <FcTodoList className="w-100 h-100"/>
                </div>
                <button className="button-st btn" onClick={()=>getStudentDetail(item.id)}><h6>myDetails</h6></button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

StudentTableTwo.propTypes = {};

export default StudentTableTwo;
