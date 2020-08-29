import React, {Component} from 'react';
import {Table} from "reactstrap";
import {IoIosSettings, RiDeleteBin5Line} from "react-icons/all";

class IntoGroupFirst extends Component {
  render() {
    const {students, deleteChild, intoStudent} = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Table>
              <thead>
              <tr>
                <th>T/r</th>
                <th>joined date</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>contact</th>
                <th>delete</th>
                <th>balance</th>
              </tr>
              </thead>
              <tbody>
              {students.map((item, i) =>
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.resStJoinGroups[0].joinedDate.slice(0, 10)}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td><IoIosSettings onClick={() => intoStudent(item)} style={{width: '25px', height: '25px'}}/>
                  </td>
                  <td>
                    <RiDeleteBin5Line onClick={() => deleteChild(item.studentId)}
                                      style={{width: '20px', height: '20px'}}/>
                  </td>
                  <td><h5>{new Intl.NumberFormat('en-EN').format(item.resStJoinGroups[0].balance)}</h5></td>
                  {/*<td><h5>{item.resStJoinGroups[0].balance}</h5></td>*/}
                </tr>
              )}
              </tbody>
            </Table>
          </div>
        </div>
        {/*<Modal isOpen={showModal}>*/}
        {/*  <ModalHeader>*/}
        {/*    details*/}
        {/*  </ModalHeader>*/}
        {/*  <ModalBody>*/}
        {/*    <h5>email{': ' + student.email}</h5>*/}
        {/*    <h5>username{': ' + student.identificationCode}</h5>*/}
        {/*    <h5>password{': ' + student.password}</h5>*/}
        {/*    <h5>phoneNumber{': ' + student.phoneNumber}</h5>*/}
        {/*    <h5>parent's phoneNum{': ' + student.phoneNumbers}</h5>*/}
        {/*    <h5>address{': ' + student.address}</h5>*/}
        {/*    <h5>regionName{': ' + student.regionName}</h5>*/}
        {/*    <h5>districtName{': ' + student.districtName}</h5>*/}
        {/*  </ModalBody>*/}
        {/*  <ModalFooter>*/}
        {/*    <Button color="danger" type="button" onClick={openModal}>Close</Button>*/}
        {/*  </ModalFooter>*/}
        {/*</Modal>*/}
      </div>
    );
  }
}

IntoGroupFirst.propTypes = {};

export default IntoGroupFirst;
