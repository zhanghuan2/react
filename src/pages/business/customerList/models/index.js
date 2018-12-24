import { userList } from '../services/index';

export default {
  namespace: 'userList',

  state: {
    list: [],
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(userList, payload);
      yield put({
        type: 'priceList',
        payload: response,
      });
    },
  },

  reducers: {
    priceList(state, action) {
      console.log(action);
      return {
        ...state,
        list: action.payload.data,
      };
    },
  },
};
