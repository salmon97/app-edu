import AdminNavigation from "@/components/AdminNavigation";
import {ToastContainer} from 'react-toastify';
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import {connect} from "dva";

@connect(({globalModel}) => ({globalModel}))
class BasicLayout extends React.Component {


  render() {

    // console.log(window.screen.width);



    const {globalModel} = this.props;
    const {isStaff, isTeacher,isStudent} = globalModel;
    return (
      <div>
        <ToastContainer/>
        <AdminNavigation/>
        {/*{isStaff || isTeacher ?*/}
        {/*   : isStudent ?*/}
        {/*  <UserNavigation/> : ''*/}
        {/*}*/}
        {this.props.children}
      </div>
    );
  }
}

export default BasicLayout;
