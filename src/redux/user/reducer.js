import types from "./types"
import config from "../../global/config"

const LOCAL_STORAGE_KEY = config.localStorage.refreshTokenInfo
const INITIAL_STATE = {
	email: null,
	role: null,
	accessTokenInfo: {
		token: "",
		expiration: 0,
	},
	refreshTokenInfo: {
		token: "",
		expiration: 0,
	}
}


export default function userReducer(state = INITIAL_STATE, action) {
	switch(action.type) {
		case types.LOG_USER_IN: {
			localStorage.setItem(
				LOCAL_STORAGE_KEY, 
				JSON.stringify(action.payload.refreshTokenInfo)
			)
			return action.payload
		}
		case types.LOG_USER_OUT: {
			localStorage.removeItem(LOCAL_STORAGE_KEY)
			return {}
		}
		case types.REFRESH_USER_TOKENS: {
			localStorage.setItem(
				LOCAL_STORAGE_KEY, 
				JSON.stringify(action.payload.refreshTokenInfo)
			)
			return {...state, 
				accessTokenInfo: action.payload.accessTokenInfo,
				refreshTokenInfo: action.payload.refreshTokenInfo
			}
		}
		default:
			return state
	}
}

