import {combineReducers} from "redux"
import productsReducer from "./products/reducer"
import sortedProductsReducer from "./sortedProducts/reducer"
import menusReducer from "./menus/reducer"
import cartReReducer from "./cart/reducer"
import userReducer from "./user/reducer"

const rootReducer = combineReducers({
	products: productsReducer,
	sortedProducts: sortedProductsReducer,
	menus: menusReducer,
	cart: cartReReducer,
	user: userReducer
})

export default rootReducer
