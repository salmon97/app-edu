import React, {Component} from 'react';
import {connect} from "dva";
import DashboardLayout from "../../../components/DashboardLayout";
import {Tab, Tabs} from "react-bootstrap";
import {Button, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import CurrencyInput from "react-currency-input";

@connect(({studentModel, globalModel}) => ({studentModel, globalModel}))
class IntoStudent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      summa: 0,
      cal: 0
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleCalculate = this.handleCalculate.bind(this);
  }

  handleChange(e) {
    this.setState({summa: e.replace(/ /gi, '')});
  }

  render() {
    const {dispatch, globalModel} = this.props;
    const {studentsGroup, student_global} = globalModel;


    const addStToGr = (e, v) => {
      dispatch({
        type: 'studentModel/addStudent',
        payload: {...v, stId: student_global.studentId}
      })
    };

    const payment = (e, v) => {
      dispatch({
        type: 'studentModel/addPayment',
        payload: {...v, paymentSum: this.state.summa, studentId: student_global.studentId}
      })
    };

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Tabs className="justify-content-center" defaultActiveKey="payment" id="rghnhj">
                  <Tab eventKey="home" title={<h5>contact</h5>}>
                    <h5>register at{': ' + student_global.createdAt}</h5>
                    <h5>email{': ' + student_global.email}</h5>
                    <h5>username{': ' + student_global.identificationCode}</h5>
                    <h5>password{': ' + student_global.password}</h5>
                    <h5>phoneNumber{': ' + student_global.phoneNumber}</h5>
                    <h5>parent's phoneNum{': ' + student_global.phoneNumbers}</h5>
                    <h5>address{': ' + student_global.address}</h5>
                    <h5>regionName{': ' + student_global.regionName}</h5>
                    <h5>districtName{': ' + student_global.districtName}</h5>
                  </Tab>
                  <Tab eventKey="payment" title={<h5>payment</h5>}>
                    <div className="row mb-2 mt-2">
                      <div className="col-md-12 text-center">
                        <h5>add Payment of Student</h5>
                      </div>
                    </div>
                    <AvForm onValidSubmit={payment}>
                      <div className="row">
                        <div className="col-md-4 offset-4">
                          {/*<AvField tag={CurrencyInput} precision="0" thousandSeparator=" " name="price" label="Car price"/>*/}
                          <AvField className="w-100 border-secondary rounded" tag={CurrencyInput} precision="0"
                                   thousandSeparator=" " name="sss" onChange={this.handleChange.bind(this)}
                                   placeholder="enter payment sum" required/>
                        </div>
                        {/*<div className="col-md-4">*/}
                        {/*  /!*<AvField name="calculateNum" onChange={this.handleCalculate} type="number"*!/*/}
                        {/*  /!*         placeholder="enter lesson count"/>*!/*/}
                        {/*</div>*/}
                        <div className="col-md-4 offset-2">
                          <AvField name="definition" placeholder="enter definition" required/>
                        </div>
                        <div className="col-md-4">
                          <AvField name="groupId" id="sasas" type="select" required>
                            <option value="" disabled>select group</option>
                            {studentsGroup.map(item =>
                              <option key={item.id} value={item.id}>{item.name}</option>
                            )}
                          </AvField>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-10 text-right">
                          <Button color="success">send</Button>
                        </div>
                      </div>
                    </AvForm>
                    <div className="row p-2">
                      <div className="col-md-12">
                        <Table>
                          <thead>
                          <tr>
                            <th>Group name</th>
                            <th>price of lesson</th>
                            <th>balance</th>
                          </tr>
                          </thead>
                          <tbody>
                          {student_global.resStJoinGroups.map((item, i) =>
                            <tr key={i}>
                              <td>{item.groupName}</td>
                              <td><h5>{new Intl.NumberFormat('en-EN').format(item.price)}</h5></td>
                              <td><h5>{new Intl.NumberFormat('en-EN').format(item.balance)}</h5></td>
                            </tr>
                          )}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="addGroup" title={<h5>addGroup</h5>}>
                    <AvForm onValidSubmit={addStToGr}>
                      <div className="row">
                        <div className="col-md-4 text-center offset-4">
                          <h6>add Student to Group</h6>
                          <AvField name="groupCode" placeholder="enter group code"/>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 text-right offset-4">
                          <Button color="success">add</Button>
                        </div>
                      </div>
                    </AvForm>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </DashboardLayout>
      </div>
    );
  }
}

IntoStudent.propTypes = {};

export default IntoStudent;
