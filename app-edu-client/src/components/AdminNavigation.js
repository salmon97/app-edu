import React, {Component} from 'react';
import {
  Button,
  Collapse, DropdownItem, DropdownMenu, DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";
import {connect} from "dva";
import router from "umi/router";
import {TOKEN_NAME} from "../contants/contants";
import menu from "../assets/logo.png";
import {FiMenu} from "react-icons/all";

@connect(({globalModel}) => ({globalModel}))
class AdminNavigation extends Component {


  constructor() {
    super();
    this.state = {
      isOpen: false,
    }
  }
  render() {

    const toggle = () => {
      this.setState({isOpen:!this.state.isOpen});
    };

    const {globalModel}=this.props;
    const {isMenu}=globalModel;

    const openMenu = () => {
      this.props.dispatch({
        type: 'globalModel/updateState',
        payload: {
          isMenu: !isMenu
        }
      });
    };


    const logOut = () => {
      localStorage.removeItem(TOKEN_NAME);
      this.props.dispatch({
        type: 'globalModel/updateState',
        payload: {
          currentUser: '',
          isStaff: false,
          isTeacher: false,
          isStudent: false,
          isDirector: false
        }
      });
      router.push("/auth/login");
    };

    return (
      <div>
        <Navbar color="success" light expand="md">
          <NavbarBrand className={window.location.pathname.length < 2 ? 'd-none':'d-block' }><FiMenu onClick={openMenu}/></NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>

            </Nav>
            <button className="btn btn-dark" onClick={logOut}>logout</button>
            {/*<NavbarText>logout</NavbarText>*/}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
AdminNavigation.propTypes = {};
export default AdminNavigation;
