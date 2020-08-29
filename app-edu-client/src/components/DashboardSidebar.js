import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "reactstrap";
import Badge from 'react-bootstrap/Badge';
import {Link} from "react-router-dom";
import {FaUsers, FaUserEdit, FaFileAlt,FaLayerGroup} from 'react-icons/fa';
import {FiMonitor} from 'react-icons/fi';
import {MdContactMail,MdGroup} from 'react-icons/md';
import {AiOutlineTeam, AiFillDashboard} from 'react-icons/ai';
import {connect} from "dva";


@connect(({globalModel}) => ({globalModel}))
class DashboardSidebar extends Component {
  render() {
    const {globalModel} = this.props;
    const {currentUser, isStaff ,isDirector, isTeacher, isStudent, message,isMenu} = globalModel;
    return (
      <div style={{"width": isMenu ? "20%" : "0%"}} className="katalog-sidebar">
        <div style={{"width": isMenu ? "17%" : "0%"}} className="menuSidebar">
          <div className="userStatus text-center text-white">
            <h5 className="">{currentUser.firstName}</h5>
            <div className="m-auto w-25">
              <h6>Online</h6>
            </div>
          </div>
          <ListGroup className="">
            <ListGroupItem className="">
              <Link to="/cabinet"
                    className={window.location.pathname === "/cabinet" ? "active-catalog" : "nav-link"}>
                <AiFillDashboard className="list-group-item-icon"/> Dashboard</Link>
            </ListGroupItem>
            <ListGroupItem>
              <Link to="/group"
                    className={window.location.pathname === "/group" ? 'active-catalog' : "nav-link"}>
                <FaLayerGroup className="list-group-item-icon"/> MyGroups</Link>
            </ListGroupItem>
            <ListGroupItem className={isDirector ? "d-block" : "d-none"}>
              <Link to="/staff"
                    className={window.location.pathname === "/staff" ? "active-catalog" : "nav-link"}>
              <MdGroup className="list-group-item-icon"/> Staffs</Link>
          </ListGroupItem>
            <ListGroupItem className={isStaff || isDirector ? "d-block" : "d-none"}>
              <Link to="/teacher"
                    className={window.location.pathname === "/teacher" ? "active-catalog" : "nav-link"}>
                <AiOutlineTeam className="list-group-item-icon"/> Teachers</Link>
            </ListGroupItem>
            <ListGroupItem className={isStaff || isDirector ? "d-block" : "d-none"}>
              <Link to="/payment"
                    className={window.location.pathname === "/payment" ? "active-catalog" : "nav-link"}><FiMonitor
                className="list-group-item-icon"/> Payments</Link>
            </ListGroupItem>
            <ListGroupItem className={isStaff || isDirector ? "d-block" : "d-none"}>
              <Link to="/profil"
                    className={window.location.pathname === "/profil" ? "active-catalog" : "nav-link"}>
                <FaUserEdit className="list-group-item-icon"/>  Profil</Link>
            </ListGroupItem>

            <ListGroupItem>
              <Link to="/message"
                    className={window.location.pathname === "/message" ? "active-catalog" : "nav-link"}>
                <FaUserEdit className="list-group-item-icon"/> Messages</Link>
            </ListGroupItem>
            <ListGroupItem className={isStaff || isDirector ? "d-block" : "d-none"}>
              <Link to="/student"
                    className={window.location.pathname === "/student" ? "active-catalog" : "nav-link"}>
              <FaUsers className="list-group-item-icon"/> Students</Link>
          </ListGroupItem>
            <ListGroupItem className={isStaff || isDirector  ? "d-block" : "d-none"}>
              <Link to=""
                    className={window.location.pathname === "/operator" ? "active-catalog" : "nav-link"}>
                <MdContactMail className="list-group-item-icon"/>
                {isStaff || isDirector  ? " Bog'lanish " : " Bildirishnoma "}
                <Badge className="ml-sm-1 ml-md-1 " variant={!message ? "danger"
                  : "primary"}> {message}</Badge>
              </Link>
            </ListGroupItem>
            <ListGroupItem className={isStaff || isDirector ? "d-block" : "d-none"}>
              <Link to="/subject"
                    className={window.location.pathname === "/subject" ? "active-catalog" : "nav-link"}>
                <FaFileAlt className="list-group-item-icon"/> Subjects</Link>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    );
  }
}

DashboardSidebar.propTypes = {};

export default DashboardSidebar;
