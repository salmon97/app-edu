import {addPayment, addStudent, deleteStudent, getStudentByEdu, getStudentGroup} from "../service";
import {toast} from "react-toastify";

export default ({
  namespace: 'studentModel',
  state: {
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
    studentsByEdu: [],
  },
  subscriptions: {},
  effects: {
    * deleteStudent({payload}, {call, put, select}) {
      let students = yield select(_ => _.studentModel.studentsByEdu);
      let res = yield call(deleteStudent, payload);
      if (res.success) {
        // console.log(students);
        // console.log(res);
        students.splice(students.findIndex(e => e.studentId === res.object), 1);
        yield put({
          type: 'updateState',
          payload: {studentsByEdu: students}
        });
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    },
    * addStudent({payload}, {call, put}) {
      let res = yield call(addStudent, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {showModal: false}
        });
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    },
    * addPayment({payload}, {call, put}) {
      let res = yield call(addPayment, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {showModal: false}
        });
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    },
    * getStudentByEdu({payload}, {call, put, select}) {
      if (!payload) {
        let {page, size} = yield select(_ => _.studentModel);
        payload = {page, size}
      }
      let res = yield call(getStudentByEdu, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            studentsByEdu: res.object,
            page: res.page,
            size: res.size,
            totalElements: res.totalElements,
            totalPages: res.totalPages
          }
        })
      }
    },
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
