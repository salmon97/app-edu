import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CustomInput, Table} from "reactstrap";
import {GrAddCircle, RiDeleteBin5Line} from "react-icons/all";

class IntoGroupSecond extends Component {
  render() {
    const {subjects,teachersByGr}=this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Table>
              <thead>
              <tr>
                <th>T/r</th>
                <th>name</th>
                <th>action</th>
              </tr>
              </thead>
              <tbody>
              {subjects.map((item, i) =>
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td> <RiDeleteBin5Line style={{width: '20px', height: '20px'}}/></td>
                </tr>
              )}
              <tr>
                <th>T/r</th>
                <th>teacher full name</th>
                <th>action</th>
              </tr>
              {/*{console.log(teachersByGr,5555)}*/}
              {teachersByGr.map((item, i) =>
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.firstName+' '+item.lastName}</td>
                  <td> <RiDeleteBin5Line style={{width: '20px', height: '20px'}}/></td>
                </tr>
              )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

IntoGroupSecond.propTypes = {};

export default IntoGroupSecond;
