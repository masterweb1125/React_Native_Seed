// import ErrorHandler from '../../../Utils/error-handler';

import AxiosCall from "../../../utils/axiosCall";

export const productsFetchStart = () => ({
  type: "PRODUCT_FETCH_START",
});

export const productsFetchSuccess = payload => ({
  type: "PRODUCT_FETCH_SUCCESS",
  payload,
});

export const productsFetchFail = payload => ({
  type: "PRODUCT_FETCH_FAIL",
  payload,
});

export const productsFetchCleanup = () => ({
  type: "PRODUCT_FETCH_CLEANUP",
});

/**
 * @function productsFetch
 * @description This fetches all the products and return an array of products.
 * @returns All the products listing
 */
export const productsFetch = () => async dispatch => {
  try {
    dispatch(productsFetchStart());
    const requestObj = {
      path: 'products',
      method: 'GET',
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(productsFetchSuccess(data));
    dispatch(setAuth())
  } catch (err) {
    // const error = ErrorHandler(err);
    // dispatch(productsFetchFail(error));
  }
};
