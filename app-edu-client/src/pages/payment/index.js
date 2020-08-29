import React, {Component} from 'react';
import DashboardLayout from "../../components/DashboardLayout";
import {Tab, Tabs} from "react-bootstrap";
import {connect} from "dva";
import {Table} from "reactstrap";

@connect(({paymentModel}) => ({paymentModel}))
class Payment extends Component {
  state = {
    student: true
  };

  componentDidMount() {
    if (this.state.student) {
      this.props.dispatch({
        type: 'paymentModel/getPayments'
      })
    }
  }

  render() {

    const {dispatch, paymentModel} = this.props;
    const {payments} = paymentModel;
    const select = () => {
      this.setState({student: false})
    };
    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <div className="container">
            <Tabs id="sads" defaultActiveKey="student" onSelect={select} className="justify-content-center">
              <Tab eventKey="student" title={<h4>students</h4>}>
                <div className="row">
                  <div className="col-md-12">
                    <Table>
                      <thead>
                      <tr>
                        <th>Num</th>
                        <th>date</th>
                        <th>Sum</th>
                        <th>definition</th>
                        <th>who</th>
                        <th>group</th>
                      </tr>
                      </thead>
                      <tbody>
                      {payments.map((item, i) =>
                        <tr key={item.id}>
                          <td>{i + 1}</td>
                          <td>{item.date.substring(0, 10)}
                            <p>{item.date.substring(11, 16)}</p></td>
                          <td>{new Intl.NumberFormat('en-EN').format(item.paymentSum)}</td>
                          <td>{item.definition}</td>
                          <td>{item.studentFullName}</td>
                          <td>{item.groupName}</td>
                        </tr>
                      )}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="teacher" title={<h4>teachers</h4>}>

              </Tab>
            </Tabs>
          </div>
        </DashboardLayout>
      </div>
    );
  }
}

Payment.propTypes = {};

export default Payment;
