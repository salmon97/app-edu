import React, {Component} from 'react';
import DashboardLayout from "../../components/DashboardLayout";
import GroupsCompanent from "../../components/GroupsCompanent";
import {connect} from "dva";
import StudentTableTwo from "../../components/StudentTableTwo";

@connect(({globalModel, groupModel}) => ({globalModel, groupModel}))
class Group extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'groupModel/getGroupss',
    })
  }

  render() {
    const {dispatch, groupModel, globalModel} = this.props;
    const {isStaff, isTeacher, isDirector,isStudent, allSubjects, teachers, weeks, hours} = globalModel;
    const {resGroups, page, size, teachersId, subjectsName, teachersName, subjectsId, totalPages, totalElements, showModal} = groupModel;

    const getStudentDetail = (id) => {
      dispatch({
        type: 'groupModel/getMyDetails',
        payload: {id}
      });
    };

    const openModal = () => {
      dispatch({
        type: 'globalModel/getSubjects'
      });
      dispatch({
        type: 'globalModel/getWeeks'
      });
      dispatch({
        type: 'globalModel/getHours'
      });
      dispatch({
        type: 'globalModel/getTeachers',
        payload: {full: 'no'}
      });
      dispatch({
        type: 'groupModel/updateState',
        payload: {
          showModal: !showModal
        }
      });
    };

    const getStudent = (item) => {
      dispatch({
        type: 'groupModel/getStudent',
        payload: {
          id: item.id
        }
      });
      dispatch({
        type: 'groupModel/updateState',
        payload: {groupDetails: item}
      });
    };

    const addSub = (v, n) => {
      subjectsId.push(v);
      subjectsName.push(n);
      dispatch({
        type: 'groupModel/updateState',
        payload: {
          subjectsId: subjectsId,
          subjectsName: subjectsName
        }
      });
    };

    const addTea = (v, n) => {
      teachersId.push(v);
      teachersName.push(n);
      console.log(teachersName, teachersId);
      dispatch({
        type: 'groupModel/updateState',
        payload: {
          teachersId: teachersId,
          teachersName: teachersName
        }
      });
    };

    const cancel = (item) => {
      let i = subjectsName.findIndex(element => element === item);
      subjectsName.splice(i, 1);
      subjectsId.splice(i, 1);
      dispatch({
        type: 'groupModel/updateState',
        payload: {
          subjectsId: subjectsId,
          subjectsName: subjectsName
        }
      });
    };

    const cancelTea = (item) => {
      let i = teachersName.findIndex(element => element === item);
      teachersName.splice(i, 1);
      teachersId.splice(i, 1);
      dispatch({
        type: 'groupModel/updateState',
        payload: {
          teachersId: teachersId,
          teachersName: teachersName
        }
      });
    };

    const changePage = (page) => {
      dispatch({
        type: 'groupModel/getApplication',
        payload: {
          page: page - 1,
          size: 5
        }
      });
    };
    const saveGroup = (e, v) => {
      dispatch({
        type: 'groupModel/saveGroup',
        payload: {
          ...v,
          subjectId: subjectsId,
          teacherId: teachersId,
          weekAndHour: {Sunday: "15:00", Monday: "15:00"}
        }
      })
    };
    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          {isStudent === false ?
            <GroupsCompanent
              weeks={weeks}
              hours={hours}
              addSub={addSub}
              addTea={addTea}
              saveGroup={saveGroup}
              teachers={teachers}
              cancel={cancel}
              cancelTea={cancelTea}
              subjectsName={subjectsName}
              teachersName={teachersName}
              allSubjects={allSubjects}
              openModal={openModal}
              showModal={showModal}
              isTeacher={isTeacher}
              isStaff={isStaff}
              isDirector={isDirector}
              getStudent={getStudent}
              resGroups={resGroups}
              size={size} page={page}
              totalPages={totalPages}
              totalElements={totalElements}
              changePage={changePage}
            />
            : <StudentTableTwo
              getStudentDetail={getStudentDetail}
              resGroups={resGroups}
            />
          } </DashboardLayout>
      </div>
    );
  }
}

Group.propTypes = {};

export default Group;
