import React, {Component} from 'react';
import DashboardLayout from "../../components/DashboardLayout";
import {connect} from "dva";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {IoIosSettings, RiDeleteBin5Line} from "react-icons/all";
import {Tab, Tabs} from "react-bootstrap";
import router from "umi/router";

@connect(({globalModel, staffModel}) => ({globalModel, staffModel}))
class Staff extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'globalModel/getUsers',
      payload: {roleName: 'ROLE_STAFF'}
    })
  }

  render() {

    const {dispatch, staffModel, globalModel} = this.props;
    const {showModal} = staffModel;
    const {users} = globalModel;

    const addStaff = () => {
      dispatch({
        type: 'globalModel/updateState',
        payload: {which:'staff'}
      });
      router.push("/checkRegister/register")
    };

    const deleteStudent = (id) => {
      // eslint-disable-next-line no-restricted-globals
      if (confirm("are you sure delete")){
        dispatch({
          type: 'globalModel/deleteUser',
          payload: {id}
        })
      }
    };

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <div className="container">
            <div className="row p-3">
              <div className="col-md-4">
                <button className="btn btn-primary" onClick={addStaff}>add Staff</button>
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
                    <th>phoneNumber</th>
                    <th>detailed</th>
                  </tr>
                  </thead>
                  <tbody>
                  {users.map((item, i) =>
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.phoneNumber}</td>
                      {/*<td><IoIosSettings onClick={() => openModal(item)} style={{width: '20px', height: '20px'}}/>*/}
                      {/*</td>*/}
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

        {/*<Modal isOpen={showModal} toggle={openModal}>*/}
        {/*  <ModalHeader>*/}
        {/*    add Student to Group*/}
        {/*  </ModalHeader>*/}
        {/*  <ModalBody>*/}
        {/*  */}
        {/*  </ModalBody>*/}
        {/*  <ModalFooter>*/}
        {/*    <Button color="danger" type="button" onClick={() => openModal("")}>Close</Button>*/}
        {/*  </ModalFooter>*/}
        {/*</Modal>*/}
      </div>
    );
  }
}

Staff.propTypes = {};

export default Staff;
