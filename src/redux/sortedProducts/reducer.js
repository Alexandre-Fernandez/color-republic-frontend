import types from "./types"

const INITIAL_STATE = {}


export default function sortedProductsReducer(state = INITIAL_STATE, action) {
	switch(action.type) {
		case types.INIT_SORTED_PRODUCTS:
			return action.payload
		default:
			return state
	}
}