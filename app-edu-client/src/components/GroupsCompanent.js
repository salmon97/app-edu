import React, {Component} from 'react';
import {FaArrowAltCircleRight} from 'react-icons/fa';
import {IoIosCodeWorking} from 'react-icons/io';
import OurPaginations from "./OurPaginations";
import {GrAddCircle, MdCancel} from "react-icons/all";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AvField, AvForm} from 'availity-reactstrap-validation';

class GroupsCompanent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectTextSub: "",
      selectValueSub: "",
      selectTextTea: "",
      selectValueTea: "",
      rowWeek: [],
      rowHour: [],
      week: '',
      hour: '',
      weekAndHour: {}
    };

    this.handleSelectSub = this.handleSelectSub.bind(this);
    this.handleSelectTea = this.handleSelectTea.bind(this);
    this.week = this.week.bind(this);
    this.hour = this.hour.bind(this);
  }

  handleSelectSub(e) {
    let selectedOption = e.target.selectedOptions[0];
    this.setState({selectTextSub: selectedOption.text, selectValueSub: selectedOption.value});
  }

  week(e) {
    let selectedOption = e.target.selectedOptions[0];
    this.setState({week: selectedOption.text});
  }

  hour(e) {
    let selectedOption = e.target.selectedOptions[0];
    this.setState({hour: selectedOption.text});
  }

  handleSelectTea(e) {
    let selectedOption = e.target.selectedOptions[0];
    this.setState({selectTextTea: selectedOption.text, selectValueTea: selectedOption.value});
  }

  render() {
    const {resGroups, size, allSubjects, saveGroup, teachersName, cancelTea, addTea, teachers, cancel, page, weeks, hours, subjectsName, addSub, showModal, openModal, getStudent, changePage, totalElements, totalPages, isStaff, isTeacher, isDirector} = this.props;

    const addRow = (week, hour) => {
      let ss = {};
      ss[week] = hour;
      this.state.rowWeek.push(week);
      this.state.rowHour.push(hour);
      this.setState({rowHour: this.state.rowHour});
      this.setState({rowWeek: this.state.rowWeek});
      console.log(this.state.rowWeek);
    };
    const removeRow = (item) => {
      this.state.rowWeek.splice(this.rowWeek.findIndex(item1 => item1 === item), 1);
      this.setState({rowWeek: this.state.rowWeek});
      console.log(this.state.rowWeek);
    };

    return (
      <div className="container">
        <div className={isStaff || isDirector ? "row" : "d-none"}>
          <div className="col-md-2 ">
            <h5>new group</h5>
            <GrAddCircle onClick={openModal} style={{width: '55px', height: '55px'}}/>
          </div>
        </div>
        <div className="row">
          {resGroups.map(item =>
            <div key={item.id} className="pl-4 pt-4 col-3">
              <div className="card text-white aaa bg-secondary mb-2">
                <div className="card-header text-center"><h5>{item.name}</h5></div>
                <h6>{item.createdAt}</h6>
                <h5>{item.direction}</h5> <span>{isTeacher ?
                <h5>{new Intl.NumberFormat('en-EN').format(item.price)}</h5> :
                <IoIosCodeWorking className="iconss"/>}</span>
                <div className={isTeacher ? 'd-none' : 'code'}><b>{item.groupCode}</b></div>
                <button onClick={() => getStudent(item)} className="btn-1">detailed <FaArrowAltCircleRight/></button>
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-4 offset-4">
            <OurPaginations
              activePage={0}
              totalElements={totalElements}
              size={size}
              showPageCount={totalPages < 5 ? totalPages : 5}
              changePage={changePage}
            />
          </div>
        </div>
        <Modal isOpen={showModal} toggle={openModal}>
          <AvForm onValidSubmit={saveGroup}>
            <ModalHeader>
              add group
            </ModalHeader>
            <ModalBody className="text-right">
              <AvField name="name" placeholder="enter group name"/>
              <AvField name="direction" placeholder="enter direction"/>
              <AvField name="groupCode" placeholder="enter group code"/>
              <AvField name="price" placeholder="enter how much price of lesson"/>
              <AvField name="sub" id="aaa" onChange={this.handleSelectSub} type="select">
                <option value="" disabled>select subject...</option>
                {allSubjects.map(item =>
                  <option key={item.id} value={item.id}>{item.name}</option>
                )}
              </AvField>
              <button type="button" className="btn btn-success"
                      onClick={() => addSub(this.state.selectValueSub, this.state.selectTextSub)}>add
              </button>
              <div className="p-2">
                {subjectsName.map((item, i) =>
                  <span key={item + i}>
                    <span className="bg-secondary rounded m-1 p-1">{item}</span>
                    <span><MdCancel onClick={() => cancel(item)}/></span>
                  </span>
                )}
              </div>
              <AvField name="t" onChange={this.handleSelectTea} type="select">
                <option value="" disabled>select teacher...</option>
                {teachers.map(item =>
                  <option key={item.id} value={item.id}>{item.firstName + ' ' + item.lastName}</option>
                )}
              </AvField>
              <button type="button" className="btn btn-success"
                      onClick={() => addTea(this.state.selectValueTea, this.state.selectTextTea)}>add
              </button>
              <div className="p-2">
                {teachersName.map((item, i) =>
                  <span key={item + i}>
                    <span className="bg-secondary rounded m-1 p-1">{item}</span>
                    <span><MdCancel onClick={() => cancelTea(item)}/></span>
                  </span>
                )}
              </div>
              {/*<div className="justify-content-around d-flex">*/}
              {/*  <AvField name="week" type="select" onChange={this.week}>*/}
              {/*    <option value="" disabled>select weeks</option>*/}
              {/*    {weeks.map(item =>*/}
              {/*      <option key={item.name} value={item.name}>{item.name}</option>*/}
              {/*    )}*/}
              {/*  </AvField>*/}
              {/*  <AvField name="hour" type="select" onChange={this.hour}>*/}
              {/*    <option value="" disabled>select weeks</option>*/}
              {/*    {hours.map(item =>*/}
              {/*      <option key={item.name} value={item.name}>{item.name}</option>*/}
              {/*    )}*/}
              {/*  </AvField>*/}
              {/*  <button type="button" className="btn btn-primary"*/}
              {/*          onClick={() => addRow(this.state.week, this.state.hour)}>+*/}
              {/*  </button>*/}
              {/*</div>*/}
              {/*{this.state.rowWeek.map((item, i) =>*/}
              {/*  <div key={item} className="justify-content-around d-flex">*/}
              {/*    <AvField name={"sa"} value={item}/>*/}
              {/*    /!*<AvField name={item} type="select" onChange={this.week}>*!/*/}
              {/*    /!*  <option value="" disabled>select weeks</option>*!/*/}
              {/*    /!*  {weeks.map(item =>*!/*/}
              {/*    /!*    <option key={item.name} value={item.name}>{item.name}</option>*!/*/}
              {/*    /!*  )}*!/*/}
              {/*    /!*</AvField>*!/*/}
              {/*    /!*<AvField name={item.name} type="select" onChange={this.hour} required>*!/*/}
              {/*    /!*  <option value="" disabled>select weeks</option>*!/*/}
              {/*    /!*  {hours.map(item =>*!/*/}
              {/*    /!*    <option key={item.name} value={item.name}>{item.name}</option>*!/*/}
              {/*    /!*  )}*!/*/}
              {/*    /!*</AvField>*!/*/}
              {/*    <button type="button" className="btn btn-danger" onClick={() => removeRow(this.state.week)}>-</button>*/}
              {/*    /!*<button type="button" className="btn btn-primary"*!/*/}
              {/*    /!*        onClick={() => addRow(this.state.week, this.state.hour)}>+*!/*/}
              {/*    /!*</button>*!/*/}
              {/*  </div>*/}
              {/*)}*/}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" type="button" onClick={openModal}>close</Button>
              <Button color="success">save</Button>
            </ModalFooter>
          </AvForm>
        </Modal>
      </div>
    )
  }
}

GroupsCompanent.propTypes = {};

export default GroupsCompanent;
