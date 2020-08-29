import React, {Component} from 'react';
import DashboardLayout from "../../components/DashboardLayout";
import {connect} from "dva";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {IoIosSettings, RiDeleteBin5Line} from "react-icons/all";
import {Tab, Tabs} from "react-bootstrap";
import router from "umi/router";

@connect(({globalModel, teacherModel}) => ({globalModel, teacherModel}))
class Teacher extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'globalModel/getTeachers',
      payload: {full: 'full'}
    })
  }

  render() {
    const {globalModel, dispatch, teacherModel} = this.props;
    const {teachers} = globalModel;
    const {showModal, groupsName, teacher} = teacherModel;
    const openModal = (item) => {
      if (item === '')
        item = item = {groupsName: []};
      dispatch({
        type: 'teacherModel/updateState',
        payload: {
          teacher: {...item, ...item.resContact},
          groupsName: item.groupsName,
          showModal: !showModal
        }
      })
    };
    const deleteStudent = (id) => {
      // eslint-disable-next-line no-restricted-globals
      if (confirm("are you sure delete ?")) {
        dispatch({
          type: 'globalModel/deleteTeacher',
          payload: {id}
        })
      }
    };

    const addTeacher=()=>{
      dispatch({
        type: 'globalModel/updateState',
        payload: {which:'teacher'}
      });
      router.push("/checkRegister/register")};
    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <div className="container">
            <div className="row p-3">
              <div className="col-md-4">
                <button className="btn btn-primary" onClick={addTeacher}>add Teacher</button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Table>
                  <thead>
                  <tr>
                    <th>T/r</th>
                    <th>join Date</th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>contact</th>
                    <th>detailed</th>
                  </tr>
                  </thead>
                  <tbody>
                  {teachers.map((item, i) =>
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <td>{item.joinDate}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td><IoIosSettings onClick={() => openModal(item)} style={{width: '20px', height: '20px'}}/>
                      </td>
                      <td>
                        <RiDeleteBin5Line onClick={() => deleteStudent(item.id)}
                                          style={{width: '20px', height: '20px'}}/>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </DashboardLayout>
        <Modal isOpen={showModal} toggle={openModal}>
          <Tabs className="justify-content-center" defaultActiveKey="home" id="aAsa">
            <Tab eventKey="home" title={<h5>contact</h5>}>
              <ModalHeader>
                details
              </ModalHeader>
              <ModalBody>
                <h5>email{': ' + teacher.email}</h5>
                <h5>phoneNumber{': ' + teacher.phoneNumber}</h5>
                <h5>parent's phoneNum{': ' + teacher.phoneNumbers}</h5>
                <h5>address{': ' + teacher.address}</h5>
                <h5>regionName{': ' + teacher.regionName}</h5>
                <h5>districtName{': ' + teacher.districtName}</h5>
              </ModalBody>
            </Tab>
            <Tab eventKey="groups" title={<h5>groups</h5>}>
              <ModalHeader>
                add Student to Group
              </ModalHeader>
              <ModalBody>
                {groupsName.map(item =>
                  <div key={item}>
                    <h6>group name : {item}</h6>
                  </div>
                )}
              </ModalBody>
            </Tab>
          </Tabs>
          <ModalFooter>
            <Button color="danger" type="button" onClick={() => openModal("")}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

Teacher.propTypes = {};

export default Teacher;
