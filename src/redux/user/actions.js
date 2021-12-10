import types from "./types" 
import config from "../../global/config"

const LOCAL_STORAGE_KEY = config.localStorage.refreshTokenInfo
const API_REFRESH = config.api.backend.url + config.api.backend.endpoints.tokens


export const initUser = () => {
	return async dispatch => {
		try {
			const refreshTokenInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
			if(refreshTokenInfo && Date.now() < refreshTokenInfo.expiration) {
				const res = await fetch(API_REFRESH, {
					method: "PUT",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({grant_type: refreshTokenInfo.token})
				})
				const content = await res.json()
				if(!res.ok) throw content.error
				return dispatch(logUserIn(content))
			}
			localStorage.removeItem(LOCAL_STORAGE_KEY)
		} catch (err) {
			localStorage.removeItem(LOCAL_STORAGE_KEY)
			console.log(err)
		}
	}
}


export const logUserIn = ({accessTokenInfo, refreshTokenInfo}) => {
	const userInfo = {email: refreshTokenInfo.email, role: refreshTokenInfo.role}
	delete refreshTokenInfo.email
	delete refreshTokenInfo.role
	return {
		type: types.LOG_USER_IN,
		payload: {...userInfo, accessTokenInfo, refreshTokenInfo}
	}
}


export const logUserOut = () => ({
	type: types.LOG_USER_OUT
})


export const refreshUserTokens = ({accessTokenInfo, refreshTokenInfo}) => {
	delete refreshTokenInfo.email
	delete refreshTokenInfo.role
	return {
		type: types.REFRESH_USER_TOKENS,
		payload: {accessTokenInfo, refreshTokenInfo}
	}
}