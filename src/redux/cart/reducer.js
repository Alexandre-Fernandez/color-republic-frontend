import types from "./types"
import config from "../../global/config"
/*
{
	id: {
		sizeName: quantity
		M: 5
		S: 3
	}
}
*/

const LOCAL_STORAGE_KEY = config.localStorage.cart

export default function cartReducer(state = {}, action) {
	switch(action.type) {
		case types.INIT_CART: {
			return action.payload
		}
		case types.ADD_TO_CART: {
			const newState = {...state,
				[action.payload.id]: {...state[action.payload.id],
					[action.payload.size]: (
						state[action.payload.id]?.[action.payload.size] || 0
					) + action.payload.quantity
				}
			}
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState))
			return newState
		}
		case types.REMOVE_FROM_CART: {
			const newState = {...state}
			if(newState[action.payload.id][action.payload.size] - action.payload.quantity <= 0) {
				delete newState[action.payload.id][action.payload.size]
				if(Object.keys(newState[action.payload.id]).length === 0) {
					delete newState[action.payload.id]
				}
				localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState))
				return newState
			}
			newState[action.payload.id][action.payload.size] -= action.payload.quantity
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState))
			return newState
		}
		case types.REMOVE_ALL_FROM_CART: {
			const newState = {...state}
			delete newState[action.payload.id][action.payload.size]
			if(Object.keys(newState[action.payload.id]).length === 0) {
				delete newState[action.payload.id]
			}
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState))
			return newState
		}
		case types.CLEAR_CART: {
			return {}
		}
		default:
			return state
	}
}