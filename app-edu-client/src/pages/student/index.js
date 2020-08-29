import React, {Component} from 'react';
import DashboardLayout from "../../components/DashboardLayout";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {AiOutlineContacts, GrAddCircle, IoIosSettings, MdCancel, RiDeleteBin5Line} from "react-icons/all";
import {connect} from "dva";
import {Tab, Tabs} from "react-bootstrap";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {router} from "umi";

@connect(({studentModel,globalModel}) => ({studentModel,globalModel}))
class Student extends Component {

  constructor(props) {
    super(props);
    this.state = {
      num: "",
      cal: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'studentModel/getStudentByEdu'
    })
  }

  handleChange(e) {
    this.setState({num: e.target.value});
  }
  handleCalculate(e){
    let value = this.state.num / e.target.value;
    this.setState({cal: value});
  }


  render() {

    const {dispatch, studentModel} = this.props;
    const {studentsByEdu} = studentModel;

    const intoStudent = (item) => {
      router.push("/student/intoStudent");
      dispatch({
        type: 'globalModel/updateState',
        payload: {
          student_global: {...item, ...item.resContact}
        }
      });
      dispatch({
        type: 'globalModel/getStudentGroup',
        payload: {id: item.studentId}
      })
    };


    const deleteStudent = (id) => {
      // eslint-disable-next-line no-restricted-globals
      if (confirm("are you sure delete ?")) {
        dispatch({
          type: 'studentModel/deleteStudent',
          payload: {id}
        })
      }
    };

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <div className="container">
            <div className="row p-4">
              <div className="col-md-3 offset-4">
                <input type="text" className="w-100" placeholder="enter first name"/>
              </div>
              <div className="col-md-3">
                <input type="text" className="w-100" placeholder="enter last name"/>
              </div>
              <div className="col-md-2">
                <button className="btn circle btn-primary">search</button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Table>
                  <thead>
                  <tr>
                    <th>Num</th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>details</th>
                    <th>delete</th>
                  </tr>
                  </thead>
                  <tbody>
                  {studentsByEdu.map((item, i) =>
                    <tr key={item.studentId}>
                      <td>{i + 1}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td><IoIosSettings onClick={() => intoStudent(item)} style={{width: '20px', height: '20px'}}/>
                      </td>
                      <td>
                        <RiDeleteBin5Line onClick={() => deleteStudent(item.studentId)}
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
        {/*<Modal isOpen={showModal}>*/}
        {/*  <Tabs className="justify-content-center" defaultActiveKey="home" id="rghnhj">*/}
        {/*    <Tab eventKey="home" title={<h5>contact</h5>}>*/}
        {/*      <ModalHeader>*/}
        {/*        details*/}
        {/*      </ModalHeader>*/}
        {/*      <ModalBody>*/}
        {/*        <h5>register at{': ' + student.createdAt}</h5>*/}
        {/*        <h5>email{': ' + student.email}</h5>*/}
        {/*        <h5>username{': ' + student.identificationCode}</h5>*/}
        {/*        <h5>password{': ' + student.password}</h5>*/}
        {/*        <h5>phoneNumber{': ' + student.phoneNumber}</h5>*/}
        {/*        <h5>parent's phoneNum{': ' + student.phoneNumbers}</h5>*/}
        {/*        <h5>address{': ' + student.address}</h5>*/}
        {/*        <h5>regionName{': ' + student.regionName}</h5>*/}
        {/*        <h5>districtName{': ' + student.districtName}</h5>*/}
        {/*      </ModalBody>*/}
        {/*      <ModalFooter>*/}
        {/*        <Button color="danger" type="button" onClick={intoStudent}>Close</Button>*/}
        {/*      </ModalFooter>*/}
        {/*    </Tab>*/}
        {/*    <Tab eventKey="payment" title={<h5>payment</h5>}>*/}
        {/*      <ModalHeader>*/}
        {/*        add Payment of Student*/}
        {/*      </ModalHeader>*/}
        {/*      <AvForm onValidSubmit={payment}>*/}
        {/*        <ModalBody className="text-right">*/}
        {/*          <div className="d-flex justify-content-around">*/}
        {/*            <AvField name="paymentSum" onChange={this.handleChange} placeholder="enter payment sum"/>*/}
        {/*            <AvField name="calculateNum" onChange={this.handleCalculate} type="number" placeholder="enter lesson count"/>*/}
        {/*          </div>*/}
        {/*          <div className="d-flex justify-content-around">*/}
        {/*            <AvField name="definition" placeholder="enter definition"/>*/}
        {/*            <AvField name="groupId" id="sasas" style={{width: '200px'}} type="select">*/}
        {/*              <option value="" disabled>select group</option>*/}
        {/*              {studentsGroup.map(item =>*/}
        {/*                <option key={item.id} value={item.id}>{item.name}</option>*/}
        {/*              )}*/}
        {/*            </AvField>*/}
        {/*          </div>*/}
        {/*          <h5>{this.state.cal} ss</h5>*/}
        {/*          {console.log(student)}*/}
        {/*        </ModalBody>*/}
        {/*        /!*{student.resStJoinGroups.map((item,i) =>*!/*/}
        {/*        /!*  <div key={i+1}>*!/*/}
        {/*        /!*    <div className="justify-content-around d-flex">*!/*/}
        {/*        /!*      /!*<h5>{item.balance}</h5>*!/*!/*/}
        {/*        /!*      /!*<h5>{item.calculateNum}</h5>*!/*!/*/}
        {/*        /!*      /!*<h5>{item.expiredBalance+65}</h5>*!/*!/*/}
        {/*        /!*      /!*<h5>{item.groupName+'g5'}</h5>*!/*!/*/}
        {/*        /!*    </div>*!/*/}
        {/*        /!*  </div>*!/*/}
        {/*        /!*)}*!/*/}
        {/*        /!*<div className="d-flex justify-content-around">*!/*/}
        {/*        /!*  <h5>group</h5>*!/*/}
        {/*        /!*  <h5>date</h5>*!/*/}
        {/*        /!*  <h5>price</h5>*!/*/}
        {/*        /!*  <h5>balance</h5>*!/*/}
        {/*        /!*</div>*!/*/}
        {/*        <div className="row p-2">*/}
        {/*          <div className="col-md-3"><h5>group</h5></div>*/}
        {/*          <div className="col-md-3"><h5>price</h5></div>*/}
        {/*          <div className="col-md-3"><h5>date</h5></div>*/}
        {/*          <div className="col-md-3"><h5>balance</h5></div>*/}
        {/*        </div>*/}
        {/*        <div className="row p-2">*/}
        {/*          <div className="col-md-3"><h5>g4</h5></div>*/}
        {/*          <div className="col-md-3"><h5>200000</h5></div>*/}
        {/*          <div className="col-md-3"><h5>851656</h5></div>*/}
        {/*          <div className="col-md-3"><h5>+4653120</h5></div>*/}
        {/*        </div>*/}

        {/*        <ModalFooter>*/}
        {/*          <Button color="danger" type="button" onClick={openModal}>Close</Button>*/}
        {/*          <Button color="success">save</Button>*/}
        {/*        </ModalFooter>*/}
        {/*      </AvForm>*/}
        {/*    </Tab>*/}
        {/*    <Tab eventKey="addGroup" title={<h5>addGroup</h5>}>*/}
        {/*      <ModalHeader>*/}
        {/*        add Student to Group*/}
        {/*      </ModalHeader>*/}
        {/*      <AvForm onValidSubmit={addStToGr}>*/}
        {/*        <ModalBody className="text-right">*/}
        {/*          <AvField name="groupCode" placeholder="enter group code"/>*/}
        {/*        </ModalBody>*/}
        {/*        <ModalFooter>*/}
        {/*          <Button color="danger" type="button" onClick={openModal}>Close</Button>*/}
        {/*          <Button color="success">save</Button>*/}
        {/*        </ModalFooter>*/}
        {/*      </AvForm>*/}
        {/*    </Tab>*/}
        {/*  </Tabs>*/}
        {/*</Modal>*/}
      </div>
    );
  }
}

Student.propTypes = {};

export default Student;
