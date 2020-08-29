import {checkCode, register, regStaffAndTeacher} from "../service";
import {toast} from "react-toastify";
import router from "umi/router";

export default ({
  namespace: 'registerModel',
  state: {
    code:'',
    letRegisterPage:false
  },
  subscriptions: {},
  effects: {
    *regStaffAndTeacher({payload},{call,put}){
      const res = yield call(regStaffAndTeacher,payload);
      if (res.success){
        router.push("/cabinet")
      }
    },
    *register({payload},{call,put}){
      const res = yield call(register,payload);
      if (res.success){
        router.push("/cabinet")
      }
    },
    *checkCode({payload},{call,put}){
      const res = yield call(checkCode,payload);
      if (res.success){
        yield put({
          type:'updateState',
          payload:{letRegisterPage: true}
        });
        router.push("/checkRegister/register")
      }else {
        toast.error("wrong code");
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
