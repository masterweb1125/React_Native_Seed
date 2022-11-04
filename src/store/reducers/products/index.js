import { products as initialState } from '../../initialStates';

const productsFetch = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_FETCH_START":
      return {
        ...state,
        isLoading: true,
      };
    case "PRODUCT_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "PRODUCT_FETCH_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "PRODUCT_FETCH_CLEANUP":
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

export default productsFetch;
