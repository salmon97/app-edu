import React, {Component} from 'react';
import {connect} from "dva";
import {Tab} from 'react-bootstrap'
import Tabs from 'react-bootstrap/Tabs'
import Rate from "../../../components/Rate";
import Attendance from "../../../components/Attendance";
import DashboardLayout from "../../../components/DashboardLayout";
import {toast} from "react-toastify";
import StudentTable from "../../../components/StudentTable";
import IntoGroupFirst from "../../../components/IntoGroupFirst";
import GroupSetting from "../../../components/GroupSetting";
import {router} from "umi";

@connect(({globalModel, groupModel}) => ({globalModel, groupModel}))
class Student extends Component {

  // componentDidMount() {
  //   this.props.dispatch({
  //     type: 'groupModel/getStudent',
  //   })
  // }

  render() {

    const {dispatch, groupModel, globalModel} = this.props;
    const {currentUser, isStudent, isStaff, allSubjects, teachers, isDirector} = globalModel;
    const {
      student, rateNum, subjectId, teachersByGr,
      attendedStudent, showModal, rateShowModal, students, homeWorkText,
      subjects, relationToLesson, homeworkTrue, resMayDetails, groupDetails, homeWorkModalShow
      , teachersId, subjectsName, teachersName, subjectsId, showModalSetting,
    } = groupModel;

    const deleteChild = (childId) => {
      // eslint-disable-next-line no-restricted-globals
      if (confirm("are you sure delete")) {
        dispatch({
          type: 'groupModel/deleteChild',
          payload: {groupId: groupDetails.id, childId}
        })
      }
    };
    const openModal = (item) => {
      dispatch({
        type: 'groupModel/updateState',
        payload: {
          student: {...item, ...item.resContact},
          showModal: !showModal
        }
      });
    };
    const makeAttend = () => {
      dispatch({
        type: 'groupModel/makeAttend',
        payload: students
      });

    };
    const changeRelation = () => {
      let s = student.relationToLesson;
      dispatch({
        type: 'groupModel/updateState',
        payload: {
          student: {...student, relationToLesson: !s}
        }
      })
    };
    const saveRelation = () => {
      let p = student.relationToLesson;
      dispatch({
        type: 'groupModel/saveRelation',
        payload: {
          attendanceId: student.attendanceId,
          relationToLesson: p
        }
      });
      dispatch({
        type: 'groupModel/updateState',
        payload: {
          showModal: false
        }
      });
    };
    const rateModal = (thing) => {
      if (thing === 'homeworkTrue') {
        dispatch({
          type: 'groupModel/updateState',
          payload: {
            homeworkTrue: true,
            rateShowModal: !rateShowModal,
          }
        })
      } else {
        dispatch({
          type: 'groupModel/updateState',
          payload: {
            homeworkTrue: false,
            rateShowModal: !rateShowModal,
            attendedStudent: thing
          }
        })
      }
    };
    const handleSelect = (id) => {
      dispatch({
        type: 'groupModel/updateState',
        payload: {
          subjectId: id
        }
      })
    };
    const getRateValue = (num) => {
      dispatch({
        type: 'groupModel/updateState',
        payload: {
          rateNum: num
        }
      })
    };
    const submitRate = (v) => {
      if (v !== '') {
        let attendId = students.map(item => item.attendanceId);
        dispatch({
          type: 'groupModel/homeWork',
          payload: {
            attendId,
            homeWork: v,
            subjectId
          }
        })
      } else {
        if (rateNum < 3)
          return toast.error("choose which one number");
        dispatch({
          type: 'groupModel/submitRate',
          payload: {
            attendanceId: attendedStudent.attendanceId,
            subjectId,
            rate: rateNum
          }
        });
      }
      dispatch({
        type: 'groupModel/updateState',
        payload: {
          rateShowModal: !rateShowModal,
          homeworkTrue: false,
        }
      })
    };
    const homeWorkModal = (text) => {
      dispatch({
        type: 'groupModel/updateState',
        payload: {
          homeWorkModalShow: !homeWorkModalShow,
          homeWorkText: text.length ? text : '',
        }
      })
    };
    const deleteGroup = (id) => {
      // eslint-disable-next-line no-restricted-globals
      let r = confirm("are sure delete this group");
      if (r === true) {
        dispatch({
          type: 'groupModel/deleteGroup',
          payload: {id}
        });
      }
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
    const saveGroup = (e, v) => {
      dispatch({
        type: 'groupModel/saveGroup',
        payload: {
          ...v,
          subjectId: subjectsId,
          teacherId: teachersId
        }
      })
    };
    const openModalchange = () => {
      dispatch({
        type: 'globalModel/getSubjects'
      });
      dispatch({
        type: 'globalModel/getTeachers',
        payload: {full: 'no'}
      });
      dispatch({
        type: 'groupModel/updateState',
        payload: {
          showModalSetting: !showModalSetting
        }
      });
    };
    const intoStudent = (item) => {
      router.push("/student/intoStudent");
      dispatch({
        type: 'globalModel/updateState',
        payload: {
          student_global: {...item, ...item.resContact}
        }
      });
      dispatch({
        type: 'globalModel/getStudentGroup',
        payload: {id: item.studentId}
      })
    };

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          {isStudent ? <StudentTable
              currentUser={currentUser}
              homeWorkModalShow={homeWorkModalShow}
              homeWorkModal={homeWorkModal}
              homeWorkText={homeWorkText}
              resMayDetails={resMayDetails}
            /> :
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  {isStaff || isDirector ?
                    <Tabs className="nav-pills justify-content-center" defaultActiveKey="home"
                          id="uncontrolled-tab-example">
                      <Tab eventKey="home" title={<h4>Students</h4>}>
                        <IntoGroupFirst
                          intoStudent={intoStudent}
                          deleteChild={deleteChild}
                          students={students}
                          subjects={subjects}
                        />
                      </Tab>
                      <Tab eventKey="setting" title={<h4>Setting</h4>}>
                        <GroupSetting
                          deleteChild={deleteChild}
                          openModalchange={openModalchange}
                          addSub={addSub}
                          addTea={addTea}
                          saveGroup={saveGroup}
                          teachers={teachers}
                          showModalSetting={showModalSetting}
                          cancel={cancel}
                          cancelTea={cancelTea}
                          subjectsName={subjectsName}
                          teachersName={teachersName}
                          allSubjects={allSubjects}
                          teachersByGr={teachersByGr}
                          subjects={subjects}
                          deleteGroup={deleteGroup}
                          groupDetails={groupDetails}
                        />
                      </Tab>
                    </Tabs>
                    :
                    <Tabs className="nav-pills justify-content-center" onSelect={handleSelect} defaultActiveKey="home"
                          id="uncontrolled-tab-example">
                      <Tab eventKey="home" title={<h4>Student</h4>}>
                        <Attendance
                          saveRelation={saveRelation}
                          relationToLesson={relationToLesson}
                          changeRelation={changeRelation}
                          student={student}
                          showModal={showModal}
                          openModal={openModal}
                          makeAttend={makeAttend}
                          students={students}
                          subjects={subjects}
                        />
                      </Tab>
                      {subjects.map(item =>
                        <Tab key={item.id} eventKey={item.id} title={<h4>{item.name}</h4>}>
                          <Rate
                            homeworkTrue={homeworkTrue}
                            attendedStudent={attendedStudent}
                            submitRate={submitRate}
                            getRateValue={getRateValue}
                            rateShowModal={rateShowModal}
                            rateModal={rateModal}
                            students={students}/>
                        </Tab>
                      )}
                    </Tabs>
                  }
                </div>
              </div>
            </div>}
        </DashboardLayout>

      </div>
    );
  }
}

Student.propTypes = {};

export default Student;
