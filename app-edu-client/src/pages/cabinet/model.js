export default ({
  namespace: 'cabinetModel',
  state: {
    resCabinet: [],
    page: 0,
    size: 5,
    totalElements: 0,
    totalPages: 0,
  },
  subscriptions: {},
  effects: {
    // * cabinet({payload}, {call, put, select}) {
    //   if (!payload) {
    //     let {page, size} = yield select(_ => _.cabinetModel);
    //     payload = {page, size}
    //   }
    //   let res = yield call(cabinet, payload);
    //   if (res.success) {
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         resCabinet: res.object,
    //         page: res.page,
    //         size: res.size,
    //         totalElements: res.totalElements,
    //         totalPages: res.totalPages
    //       }
    //     })
    //   }
    // },
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
