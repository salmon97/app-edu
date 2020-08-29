import {
  deleteChild,
  deleteGroup,
  getGroup,
  getStudent,
  getStudentDetail,
  homeWork,
  makeAttend,
  saveGroup,
  saveRelation,
  submitRate
} from "../service";
import router from "umi/router";
import {toast} from "react-toastify";

export default ({
  namespace: 'groupModel',
  state: {
    resGroups: [],
    resMayDetails: [],
    page: 0,
    size: 5,
    groupId: '',
    totalElements: 0,
    totalPages: 0,
    students: [],
    subjects: [],
    attendStatus: false,
    showModalSetting: false,
    showModal: false,
    rateShowModal: false,
    subjectId: '',
    attendedStudent: {},
    student: {},
    rateNum: 0,
    relationToLesson: false,
    homeworkTrue: false,
    homeWorkModalShow: false,
    homeWorkText: '',
    groupDetails: {},
    subjectsId: [],
    subjectsName: [],
    teachersName: [],
    teachersId: [],
    teachersByGr: []
  },
  subscriptions: {},
  effects: {
    * deleteChild({payload}, {call, put, select}) {
      let res = yield call(deleteChild, payload);
      if (res.success) {
        if (res.message === 'subject') {
          yield put({
            type: 'updateState',
            payload: {subjects: res.object}
          });
        }
        if (res.message === 'teacher') {
          yield put({
            type: 'updateState',
            payload: {teachersByGr: res.object}
          });
        }
        if (res.message === 'student') {
          yield put({
            type: 'updateState',
            payload: {students: res.object}
          });
        }
      }
    },
    * getMyDetails({payload}, {call, put, select}) {
      if (!payload) {
        let {page, size} = yield select(_ => _.groupModel);
        payload = {page, size}
      }
      let res = yield call(getStudentDetail, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            resMayDetails: res.object,
            page: res.page,
            size: res.size,
            totalElements: res.totalElements,
            totalPages: res.totalPages
          }
        });
        router.push("/group/intoGroup")
      }
    },
    * saveGroup({payload}, {call, put, select}) {
      let {resGroups, teachersByGr, subjects} = yield select(_ => _.groupModel);
      let res = yield call(saveGroup, payload);
      if (res.success) {
        if (res.message === 'ok') resGroups.unshift(res.object);
        yield put({
          type: 'updateState',
          payload: {
            resGroups: res.message === 'ok' ? resGroups : resGroups,
            teachersByGr: res.message === 'teacher' ? res.object : teachersByGr,
            subjects: res.message === 'subject' ? res.object : subjects,
            subjectsId: [],
            subjectsName: [],
            teachersName: [],
            teachersId: [],
            showModal: false,
            showModalSetting: false
          }
        });
      } else {
        toast.error(res.message);
      }
    },
    * saveRelation({payload}, {call, put, select}) {
      const res = yield call(saveRelation, payload);
      let {students} = yield select(_ => _.groupModel);
      if (res.success) {
        // const ss = students.map(item => {
        //   if (item.attendanceId.toString()===res.object.id) {
        //     item.relationToLesson = res.object.relationToLesson;
        //   }
        //   return item
        // })
        yield put({
          type: 'updateState',
          payload: {
            students: students.map(item => {
              if (item.attendanceId.toString() === res.object.id) {
                item.relationToLesson = res.object.relationToLesson;
              }
              return item;
            })
          }
        });
      }
    },
    * getStudent({payload}, {call, put, select}) {
      let res = yield call(getStudent, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            students: res[0],
            subjects: res[1],
            teachersByGr: res[2]
          }
        });
        router.push("/group/intoGroup")
      }
    },
    * makeAttend({payload}, {call, put}) {
      let res = yield call(makeAttend, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            students: res[0]
          }
        });
      }
    },
    * homeWork({payload}, {call, put}) {
      let res = yield call(homeWork, payload);
      if (res.success) {

      } else {
        toast.error(res.message)
      }
    },
    * submitRate({payload}, {call, put}) {
      yield call(submitRate, payload)
    },
    * deleteGroup({payload}, {call, put}) {
      let res = yield call(deleteGroup, payload);
      if (res.success) {
        router.push("/group")
      }
    },
    * getGroupss({payload}, {call, put, select}) {
      if (!payload) {
        let {page, size} = yield select(_ => _.groupModel);
        payload = {page, size}
      }
      const res = yield call(getGroup, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            resGroups: res.object,
            page: res.message === "student" ? '' : res.page,
            size: res.message === "student" ? '' :res.size,
            totalElements:res.message === "student" ? '' : res.totalElements,
            totalPages:res.message === "student" ? '' : res.totalPages
          }
        });
      }
    }
  },
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  }
})
