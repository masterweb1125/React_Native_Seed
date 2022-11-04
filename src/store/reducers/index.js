import { combineReducers } from "redux";
import productsFetch from "./products"
import productsDetailsFetch from "./products/productDetails"
const rootReducer = combineReducers({
    productsFetch,
    productsDetailsFetch
})

export default rootReducer