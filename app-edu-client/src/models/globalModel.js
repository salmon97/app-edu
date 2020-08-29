import {OPEN_PAGES, OPEN_PAGES2, TOKEN_NAME} from "../contants/contants";
import router from "umi/router";
import {toast} from "react-toastify";
import {
  addSubject,
  deleteSubject,
  deleteTeacher,
  deleteUser,
  getCountGrVsSt,
  getDitrict,
  getHours,
  getRegion,
  getStudentGroup,
  getSubjects,
  getTeachers,
  getUsers,
  getWeeks,
  login,
  userMe
} from "../pages/service";

export default ({
  namespace: 'globalModel',
  state: {
    todayInLesson: false,
    price: 0,
    currentUser: '',
    isStaff: false,
    isTeacher: false,
    isStudent: false,
    isDirector: false,
    studentCount: 0,
    groupsCount: 0,
    isOpenModal: false,
    allSubjects: [],
    subject: '',
    isMenu: true,
    teachers: [],
    regions: [],
    districts: [],
    users: [],
    which: '',
    studentsGroup: [],
    student_global: {},
    weeks: [],
    hours: []
  },
  subscriptions: {
    setupHistory({dispatch, history}) {
      history.listen((location) => {
        if (!OPEN_PAGES.includes(location.pathname)) {
          dispatch({
            type: 'userMe',
            payload: {
              pathname: location.pathname
            }
          })
        }
      })
    }
  },
  effects: {
    * userMe({payload}, {call, put}) {
      const res = yield call(userMe);
      if (!res.success) {
        console.log(payload.pathname);
        console.log(payload.pathname.split('/'));
        console.log(OPEN_PAGES2.includes(`/${payload.pathname.split('/')[1]}`));
        if (!OPEN_PAGES2.includes(payload.pathname)
          && !OPEN_PAGES2.includes('/' + payload.pathname.split('/')[1])) {
          localStorage.removeItem(TOKEN_NAME);
          router.push('/auth/login')
        }
      } else {
        yield put({
          type: 'updateState',
          payload: {
            currentUser: res,
            isStaff: !!res.roles.filter(item => item.roleName === 'ROLE_STAFF').length,
            isTeacher: !!res.roles.filter(item => item.roleName === 'ROLE_TEACHER').length,
            isStudent: !!res.roles.filter(item => item.roleName === 'ROLE_STUDENT').length,
            isDirector: !!res.roles.filter(item => item.roleName === 'ROLE_DIRECTOR').length,
          }
        })
      }
    },
    * login({payload}, {call, put}) {
      const res = yield call(login, payload);
      if (res.success) {
        localStorage.setItem(TOKEN_NAME, res.tokenType + res.token);
        router.push('/cabinet');
        // window.location.reload();
      } else {
        toast.error("неверный логин или парол");
      }
    },
    // eslint-disable-next-line no-empty-pattern
    * getCount({}, {call, put}) {
      let res = yield call(getCountGrVsSt);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            groupsCount: res[0],
            studentCount: res[1],
          }
        })
      }
    },
    * deleteUser({payload}, {call, put, select}) {
      let users = yield select(_ => _.globalModel.users);
      let res = yield call(deleteUser, payload);
      if (res.success) {
        users.splice(users.findIndex(e => e.id === res.object), 1);
        yield put({
          type: 'updateState',
          payload: {
            users: users
          }
        });
      }
    },
    * getUsers({payload}, {call, put}) {
      let res = yield call(getUsers, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {users: res.object}
        })
      }
    },
    // eslint-disable-next-line no-empty-pattern
    * getWeeks({}, {call, put}) {
      let res = yield call(getWeeks);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {weeks: res._embedded.list}
        })
      }
    },
    // eslint-disable-next-line no-empty-pattern
    * getHours({}, {call, put}) {
      let res = yield call(getHours);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {hours: res._embedded.list}
        })
      }
    },
    * getTeachers({payload}, {call, put}) {
      const res = yield call(getTeachers, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {teachers: res.object}
        })
      }
    },
    // eslint-disable-next-line no-empty-pattern
    * getSubjects({}, {call, put}) {
      const res = yield call(getSubjects);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {allSubjects: res.object}
        })
      }
    },
    * addSubject({payload}, {call, put}) {
      const res = yield call(addSubject, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            allSubjects: res.object
          }
        })
      }
    },
    * deleteSubject({payload}, {call, put}) {
      const res = yield call(deleteSubject, payload);
      console.log(res);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            allSubjects: res.object
          }
        })
      }
    },
    // eslint-disable-next-line no-empty-pattern
    * getRegions({}, {call, put}) {
      const res = yield call(getRegion);
      if (res.status === 200) {
        yield put({
          type: 'updateState',
          payload: {regions: res.data._embedded.list}
        })
      }
    },
    * getDistricts({payload}, {call, put}) {
      const res = yield call(getDitrict, payload);
      if (res.status === 200) {
        yield put({
          type: 'updateState',
          payload: {districts: res.data._embedded.list}
        })
      }
    },
    * getStudentGroup({payload}, {call, put}) {
      let res = yield call(getStudentGroup, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {studentsGroup: res.object}
        })
      }
    },
    * deleteTeacher({payload}, {call, put, select}) {
      let teachers = yield select(_ => _.globalModel.teachers);
      let res = yield call(deleteTeacher, payload);
      if (res.success) {
        teachers.splice(teachers.findIndex(e => e.id === res.object), 1);
        yield put({
          type: 'updateState',
          payload: {teachers: teachers}
        });
        toast.success(res.message);
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
});
