import {getPayments} from "../service";

export default ({
  namespace: 'paymentModel',
  state: {
    page: 0,
    size: 5,
    totalElements: '',
    totalPages: '',
    showModal: false,
    payments: [],
  },
  subscriptions: {},
  effects: {
    * getPayments({payload}, {call, put, select}) {
      if (!payload) {
        let {page, size} = yield select(_ => _.paymentModel);
        payload = {page, size}
      }
      let res = yield call(getPayments, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            payments: res.object,
            page: res.page,
            size: res.size,
            totalElements: res.totalElements,
            totalPages: res.totalPages
          }
        });
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
