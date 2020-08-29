export default ({
  namespace: 'staffModel',
  state: {
    showModal:false
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
