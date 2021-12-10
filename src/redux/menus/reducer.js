import types from "./types"

export default function menusReducer(state = {}, action) {
	switch(action.type) {
		case types.TOGGLE_MENU: {
			if(state[action.payload]) return {...state, [action.payload]: false}
			const newState = {...state, [action.payload]: true}
			for(const menu in newState) { // closing all the other menus
				if(menu !== action.payload) newState[menu] = false
			}
			return newState
		}
		case types.CLOSE_ALL_MENUS: {
			const newState = {...state}
			for(const menu in newState) {
				newState[menu] = false
			}
			return newState
		}
		default:
			return state
	}
}