import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {GrEdit, MdCancel, RiDeleteBin5Line} from "react-icons/all";
import {AvField, AvForm} from "availity-reactstrap-validation";

class GroupSetting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectText: "",
      selectValue: ""
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    let selectedOption = e.target.selectedOptions[0];
    this.setState({selectText: selectedOption.text, selectValue: selectedOption.value});
  }

  render() {
    const {deleteChild,groupDetails, deleteGroup, subjects, teachersByGr, allSubjects, saveGroup, teachersName, cancelTea, addTea, teachers, cancel, showModalSetting, subjectsName, addSub, openModalchange} = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Table>
              <thead>
              <tr>
                <th>Num</th>
                <th>subject name</th>
                <th>action</th>
              </tr>
              </thead>
              <tbody>
              {subjects.map((item, i) =>
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td><RiDeleteBin5Line onClick={() => deleteChild(item.id)} style={{width: '20px', height: '20px'}}/></td>
                </tr>
              )}
              <tr>
                <th>Num</th>
                <th>teacher full name</th>
                <th>action</th>
              </tr>
              {teachersByGr.map((item, i) =>
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.firstName + ' ' + item.lastName}</td>
                  <td><RiDeleteBin5Line onClick={() => deleteChild(item.id)} style={{width: '20px', height: '20px'}}/></td>
                </tr>
              )}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 pt-5 text-center offset-2">
            <h5>delete this group</h5>
            <RiDeleteBin5Line onClick={() => deleteGroup(groupDetails.id)} style={{width: '100px', height: '100px'}}/>
          </div>
          <div className="col-md-4 pt-5 text-center">
            <h5>change this group</h5>
            <GrEdit onClick={openModalchange} style={{width: '80px', height: '80px'}}/>
          </div>
        </div>
        <Modal isOpen={showModalSetting} toggle={openModalchange}>
          <AvForm onValidSubmit={saveGroup}>
            <ModalHeader>
              add group
            </ModalHeader>
            <ModalBody className="text-right">
              <AvField name="id" className="d-none" value={groupDetails.id}/>
              <AvField name="name" value={groupDetails.name} placeholder="enter group name"/>
              <AvField name="direction" value={groupDetails.direction} placeholder="enter direction"/>
              <AvField name="groupCode" value={groupDetails.groupCode}
                       placeholder="enter group code"/>
              <AvField name="price" value={groupDetails.price}
                       placeholder="enter group code"/>
              <AvField name="sub" id="aaa" onChange={this.handleSelect} type="select">
                <option value="" disabled>select subject...</option>
                {allSubjects.map(item =>
                  <option key={item.id} value={item.id}>{item.name}</option>
                )}
              </AvField>
              <button type="button" className="btn btn-success"
                      onClick={() => addSub(this.state.selectValue, this.state.selectText)}>add
              </button>
              <div className="p-2">
                {subjectsName.map((item, i) =>
                  <span key={item + i}>
                    <span className="bg-secondary rounded m-1 p-1">{item}</span>
                    <span><MdCancel onClick={() => cancel(item)}/></span>
                  </span>
                )}
              </div>
              <AvField name="t" onChange={this.handleSelect} type="select">
                <option value="" disabled>select teacher...</option>
                {teachers.map(item =>
                  <option key={item.id} value={item.id}>{item.firstName + ' ' + item.lastName}</option>
                )}
              </AvField>
              <button type="button" className="btn btn-success"
                      onClick={() => addTea(this.state.selectValue, this.state.selectText)}>add
              </button>
              <div className="p-2">
                {teachersName.map((item, i) =>
                  <span key={item + i}>
                    <span className="bg-secondary rounded m-1 p-1">{item}</span>
                    <span><MdCancel onClick={() => cancelTea(item)}/></span>
                  </span>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" type="button" onClick={openModalchange}>close</Button>
              <Button color="success">save</Button>
            </ModalFooter>
          </AvForm>
        </Modal>
      </div>
    );
  }
}

GroupSetting.propTypes = {};

export default GroupSetting;
