import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {TiStarFullOutline} from 'react-icons/ti'

class Rate extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }


  render() {

    const {students, rateModal, homeworkTrue, rateShowModal, getRateValue, submitRate, attendedStudent} = this.props;
    return (
      <div className="container rating-page">
        <div className="row">
          <div className="col-md-12">
            <Table hover>
              <thead>
              <tr>
                <th>T/r</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>rates</th>
              </tr>
              </thead>
              <tbody>
              {students.map((item, i) =>
                <tr key={item.studentId}>
                  <td>{i + 1}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td><TiStarFullOutline className="icon-star" onClick={() => rateModal(item)}/></td>
                </tr>
              )}
              </tbody>
            </Table>

          </div>
        </div>
        <div className="row bg-dark text-center">
          <div className="col-md-4 offset-4">
            <button className="btn bg-primary text-light" onClick={() => rateModal('homeworkTrue')}><h5>homeWork</h5>
            </button>
          </div>
        </div>
        <Modal className="ModalRate" isOpen={rateShowModal}>
          <ModalHeader>
            making {homeworkTrue === true ? 'homework' : 'rate'} by lesson
          </ModalHeader>
          <ModalBody className="text-center">
            {console.log(students)}
            {students.length > 0 ?
              students[0].attendanceId == null ? <h3>firstly make attendance</h3> : homeworkTrue === true ?
                <input type="text" style={{width: '85%'}} onChange={this.handleChange}/>
                : attendedStudent.todayInLesson === true ?
                  <div>
                    <button className="btn buttonRate3 mr-2 " onClick={() => getRateValue(3)}><h3>3</h3></button>
                    <button className="btn buttonRate4 mr-2 " onClick={() => getRateValue(4)}><h3>4</h3></button>
                    <button className="btn buttonRate5 " onClick={() => getRateValue(5)}><h3>5</h3></button>
                  </div> : <h3>this student did no come today</h3> : ''
            }
          </ModalBody>
          <ModalFooter>
            <Button color="danger" type="button" onClick={rateModal}>Close</Button>
            <Button color="success" onClick={() => submitRate(this.state.value)}>save</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

Rate.propTypes = {};

export default Rate;
