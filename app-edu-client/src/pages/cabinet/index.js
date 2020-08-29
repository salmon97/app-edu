import React, {Component} from 'react';
import {connect} from "dva";
import DashboardLayout from "../../components/DashboardLayout";
import StaffCompanent from "../../components/StaffCompanent";
import StudentCibinet from "../../components/StudentCibinet";
import TeacherCabinet from "../../components/TeacherCabinet";


@connect(({globalModel, cabinetModel}) => ({globalModel, cabinetModel}))
class Cabinet extends Component {

  render() {
    const {globalModel} = this.props;
    const {isStaff, isDirector,isTeacher, isStudent} = globalModel;

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          {isStaff || isDirector ? <StaffCompanent/> :
            isTeacher ? <TeacherCabinet/> :
            isStudent ? <StudentCibinet/>
            : ''}
        </DashboardLayout>
      </div>
    );
  }
}

Cabinet.propTypes = {};

export default Cabinet;
