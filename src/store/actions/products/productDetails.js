// import ErrorHandler from '../../../Utils/error-handler';

import AxiosCall from "../../../utils/axiosCall";

export const productsDetailsFetchStart = () => ({
  type: "PRODUCT_DETAILS_FETCH_START",
});

export const productsDetailsFetchSuccess = payload => ({
  type: "PRODUCT_DETAILS_FETCH_SUCCESS",
  payload,
});

export const productsDetailsFetchFail = payload => ({
  type: "PRODUCT_DETAILS_FETCH_FAIL",
  payload,
});

export const productsDetailsFetchCleanup = () => ({
  type: "PRODUCT_DETAILS_FETCH_CLEANUP",
});

/**
 * @function productsDetailsFetch
 * @params {id: number} payload
 * @description This fetches all the product's details.
 * @returns All the products details
 */
export const productsDetailsFetch = payload => async dispatch => {
  try {
    dispatch(productsDetailsFetchStart());
    const requestObj = {
      path: `products/${payload.id}`,
      method: 'GET',
    };
    const { data } = await AxiosCall(requestObj);
    console.log(data)
    dispatch(productsDetailsFetchSuccess(data));
    dispatch(setAuth())
  } catch (err) {
    // const error = ErrorHandler(err);
    // dispatch(productsDetailsFetchFail(error));
  }
};
