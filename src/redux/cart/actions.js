import types from "./types" 
import config from "../../global/config"

const LOCAL_STORAGE_KEY = config.localStorage.cart


export const initCart = () => {
	return dispatch => {
		const cart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
		if(cart) return dispatch({
			type: types.INIT_CART,
			payload: cart
		})
	}
}

export const addToCart = (id, size, quantity = 1) => ({
	type: types.ADD_TO_CART,
	payload: {id, size, quantity}
})


export const removeFromCart = (id, size, quantity = 1) => ({
	type: types.REMOVE_FROM_CART,
	payload: {id, size, quantity}
})


export const removeAllFromCart = (id, size) => ({
	type: types.REMOVE_ALL_FROM_CART,
	payload: {id, size}
})


export const clearCart = () => ({
	type: types.CLEAR_CART
})