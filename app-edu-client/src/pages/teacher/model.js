export default ({
  namespace: 'teacherModel',
  state: {
    showModal:false,
    teacher:{},
    groupsName:[]
  },
  subscriptions: {},
  effects: {

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
