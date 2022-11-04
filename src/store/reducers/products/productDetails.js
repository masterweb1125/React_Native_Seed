import { productsDetails as initialState } from '../../initialStates';

const productsDetailsFetch = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_DETAILS_FETCH_START":
      return {
        ...state,
        isLoading: true,
      };
    case "PRODUCT_DETAILS_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "PRODUCT_DETAILS_FETCH_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "PRODUCT_DETAILS_FETCH_CLEANUP":
      return {
        ...state,
        isLoading: false,
        isSuccessful: false,
        error: null,
      };
    default:
      return state;
  }
};

export default productsDetailsFetch;
