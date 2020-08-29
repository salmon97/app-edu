import React, {Component} from 'react';
import {connect} from "dva";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from 'availity-reactstrap-validation'
import DashboardLayout from "../../components/DashboardLayout";

@connect(({globalModel}) => ({globalModel}))
class Subject extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'globalModel/getSubjects'
    })
  }

  render() {


    const {dispatch, globalModel} = this.props;
    const {isOpenModel, allSubjects,subject} = globalModel;

    const openModal = (item) => {
      dispatch({
        type: 'globalModel/updateState',
        payload: {
          isOpenModel: !isOpenModel,
          subject:item
        }
      })
    };

    const addSubject = (e, v) => {
      dispatch({
        type:'globalModel/addSubject',
        payload: {...v}
      });
      dispatch({
        type:'globalModel/updateState',
        payload: {isOpenModel:false}
      });
    };

    const deleteSubject = (id) => {
      dispatch({
        type:'globalModel/deleteSubject',
        payload:id
      })
    };
    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <div className="container">
            <div className="row pt-2 pl-4">
              <div className="col-md-4 mb-2">
                <button className="btn btn-primary" onClick={()=>openModal('')}>addSubject</button>
              </div>
              <div className="col-md-12">
                <Table>
                  <thead>
                  <tr>
                    <th>№</th>
                    <th>name</th>
                    <th>action</th>
                    <th>action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {allSubjects.map((item, i) =>
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td><Button color="warning" onClick={()=>openModal(item)}>edit</Button></td>
                      <td><Button color="danger" onClick={()=>deleteSubject(item.id)}>delete</Button></td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </div>
            </div>
            <Modal isOpen={isOpenModel} toggle={openModal}>
              <AvForm onValidSubmit={addSubject}>
                <ModalHeader><h4>add subject</h4></ModalHeader>
                <ModalBody>
                  <AvField name="id" className="d-none" defaultValue={subject?subject.id:''}/>
                  <AvField name="name" defaultValue={subject?subject.name:''} placeholder="enter subject name" required/>
                </ModalBody>
                <ModalFooter>
                  <Button type="button" color="danger" onClick={()=>openModal('')}>close</Button>
                  <Button color="success">save</Button>
                </ModalFooter>
              </AvForm>
            </Modal>
          </div>
        </DashboardLayout>
      </div>
    );
  }
}

Subject.propTypes = {};

export default Subject;
