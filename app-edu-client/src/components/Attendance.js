import React, {Component} from 'react';
import {Button, CustomInput, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {connect} from "dva";
import {IoIosSettings} from 'react-icons/io';
import {AiOutlineDislike, AiOutlineLike} from "react-icons/all";

@connect(({groupModel}) => ({groupModel}))
class Attendance extends Component {

  constructor() {
    super('');
    this.state = {
      open: false
    };
    this.customInputSwitched.bind(this);
  }

  customInputSwitched(student, e) {
    const {dispatch, groupModel} = this.props;
    const {students} = groupModel;
    students.map(item => {
      if (item.studentId === student.studentId) {
        student.todayInLesson = e.target.checked
      }
    });
    dispatch({
      type: 'groupModel/updateState',
      payload: {
        students: students
      }
    });
  };

  render() {

    const {students, makeAttend, showModal, student, relationToLesson, openModal, saveRelation, changeRelation} = this.props;
    const {dispatch, cabinetModel} = this.props;

    const a = () => {
      this.setState({open: true})
    };
    return (
      <div className="container">
        <div className="row">
          {/*<button className="btn btn-primary" onClick={a}>open</button>*/}
          {/*<div className={this.state.open ? "col-md-12 " : " d-none"}>*/}
          <div className="col-md-12">
            {/*{console.log(students)}*/}
            <Table>
              <thead>
              <tr>
                <th>T/r</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>attendance</th>
                <th>detailed</th>
                <th>balance</th>
              </tr>
              </thead>
              <tbody>
              {students.map((item, i) =>
                <tr key={item.studentId}>
                  <td>{i + 1}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>
                    {console.log(item)}
                    <CustomInput type="checkBox" checked={item.todayInLesson}
                                 className={item.explicable ? "d-none" : "checkBoxT"}
                                 onChange={this.customInputSwitched.bind(this, item)} id={'switch' + i + 1}/>
                  </td>
                  <td className="pl-4">
                    <IoIosSettings onClick={() => openModal(item)}/>
                  </td>
                  <td><b>{new Intl.NumberFormat('en-EN').format(item.resStJoinGroups[0].balance)}</b></td>
                </tr>
              )}
              </tbody>
            </Table>
            <button onClick={makeAttend} className="btn float-md-right btn-success">submit</button>
          </div>
        </div>

        <Modal isOpen={showModal}>
          <ModalHeader>
            making to lesson relation of student
          </ModalHeader>
          <ModalBody className="text-center">
            {student.todayInLesson === false || student.attendanceId == null ?
              <h3>you can not make relation</h3> : student.relationToLesson ?
                <AiOutlineLike className="icon-relation" onClick={changeRelation}/> :
                <AiOutlineDislike className="icon-relation" onClick={changeRelation}/>}
          </ModalBody>
          <ModalFooter>
            <CustomInput type="switch" id="valid" label="valid"/>
            <Button color="danger" type="button" onClick={() => openModal('')}>Close</Button>
            <Button color="success" onClick={saveRelation}>save</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

Attendance.propTypes = {};

export default Attendance;
