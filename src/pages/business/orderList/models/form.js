import { queryProjectNotice } from '../services/index';

export default {
  namespace: 'orderList',

  state: {
    list: [],
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(queryProjectNotice, payload);
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
        list: action.payload.data.data,
      };
    },
  },
};
