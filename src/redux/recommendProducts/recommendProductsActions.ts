import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import axios from 'axios';

export const FETCH_RECOMMEND_PRODUCTS_START = 'FETCH_RECOMMEND_PRODUCTS_START'; // 正在調用推薦資訊api
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = 'FETCH_RECOMMEND_PRODUCTS_SUCCESS'; // 推薦資訊api調用成功
export const FETCH_RECOMMEND_PRODUCTS_FAIL = 'FETCH_RECOMMEND_PRODUCTS_FAIL'; // 推薦資訊api調用失敗

interface FetchRecommendProductStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START;
}

interface FetchRecommendProductSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
  payload: any;
}

interface FetchRecommendProductFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
  payload: any;
}

export type RecommendProductAction = FetchRecommendProductStartAction | FetchRecommendProductSuccessAction | FetchRecommendProductFailAction;

export const fetchRecommendProductStartActionCreator = (): FetchRecommendProductStartAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_START,
  };
};

export const fetchRecommendProductSuccessActionCreator = (data): FetchRecommendProductSuccessAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: data,
  };
};

export const fetchRecommendProductFailActionCreator = (error): FetchRecommendProductFailAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: error,
  };
};

// thunk 可以返回一個函數，而不一定是js對象
// 在一個thunk action中可以完成一些列連續的action操作
// 並且可以處理異步邏輯
// 業務邏輯可以從ui層面挪到這裡，代碼分層會更清晰
export const giveMeDataActionCreator = (): ThunkAction<void, RootState, unknown, RecommendProductAction> => async (dispatch, getState) => {
  dispatch(fetchRecommendProductStartActionCreator());
  try {
    const { data } = await axios.get('http://123.56.149.216:8089/api/productCollections');
    dispatch(fetchRecommendProductSuccessActionCreator(data));
  } catch (error) {
    dispatch(fetchRecommendProductFailActionCreator('error'));
  }
};
