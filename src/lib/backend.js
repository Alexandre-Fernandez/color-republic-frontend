import config from "../global/config"
import store from "../redux/store"
import userSelector from "../redux/user/selector"
import {refreshUserTokens} from "../redux/user/actions"

const USERS = config.api.backend.url + config.api.backend.endpoints.users
const USER_ADDRESSES = USERS + "/addresses"
const USER_PASSWORD = USERS + "/password"
const USER_EMAIL = USERS + "/email"
const USER_ORDERS = USERS + "/orders"
const TOKENS = config.api.backend.url + config.api.backend.endpoints.tokens

//todo add check keyword for todos

export const getTokens = async (email, password) => {
	const res = await fetch(TOKENS, {
		method: "GET",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Basic ${encodeURI(email + " " + password)}`
		}
	})
	const content = await res.json()
	if(!res.ok) return Promise.reject(content.message)
	return content
}


export const refreshTokens = async refreshTokenInfo => {
	if(Date.now() >= refreshTokenInfo.expiration) return Promise.reject("Refresh token invalid")
	const res = await fetch(TOKENS, {
		method: "PUT",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({grant_type: refreshTokenInfo.token})
	})
	
	const content = await res.json()
	if(!res.ok) return Promise.reject(content.message)
	store.dispatch(refreshUserTokens(content))
}


export const createUser = async (email, password) => {
	const res = await fetch(USERS, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({email, password})
	})
	const content = await res.json()
	if(!res.ok) return Promise.reject(content.message)
	return content
}


export const getAddresses = async () => {
	try {
		if(isAccessTokenExpired()) await refreshTokens(getRefreshTokenInfo())
		const res = await fetch(USER_ADDRESSES, {
			method: "GET",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": `Bearer ${getAccessTokenInfo().token}`
			}
		})
		const content = await res.json()
		if(!res.ok) Promise.reject(content.message)
		return content
	} catch (err) {
		return Promise.reject(err)
	}
}


export const createAddress = async (
	fullName, address, city, zip, state, country, additionalInformation = "", phone = ""
) => {
	try {
		if(isAccessTokenExpired()) await refreshTokens(getRefreshTokenInfo())
		const res = await fetch(USER_ADDRESSES, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": `Bearer ${getAccessTokenInfo().token}`
			},
			body: JSON.stringify({
				fullName, address, city, zip, state, country, additionalInformation, phone
			})
		})
		return res.ok
		/*
		const content = await res.json() //todo content is nothing since backend is using sendStatus make new standard when we dont expect response
		if(!res.ok) return Promise.reject(content.message) 
		return true
		*/
	} catch (err) {
		return Promise.reject(err)
	}
}


export const changeUserPassword = async (password, newPassword) => {
	try {
		if(isAccessTokenExpired()) await refreshTokens(getRefreshTokenInfo())
		const res = await fetch(USER_PASSWORD, {
			method: "PUT",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": `Bearer ${getAccessTokenInfo().token}`
			},
			body: JSON.stringify({password, newPassword})
		})
		if(res.bodyUsed) {
			const body = await res.json()
			if(res.ok) return Promise.resolve(body)
			return Promise.reject(body)
		}
		else {
			if(res.ok) return Promise.resolve(true)
			return Promise.reject(false)
		}
	} catch (err) {
		return Promise.reject(err)
	}
}


export const changeUserEmail = async (password, newEmail) => {
	try {
		if(isAccessTokenExpired()) await refreshTokens(getRefreshTokenInfo())
		const res = await fetch(USER_EMAIL, {
			method: "PUT",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": `Bearer ${getAccessTokenInfo().token}`
			},
			body: JSON.stringify({password, newEmail})
		})
		return res.ok
	} catch (err) {
		return Promise.reject(err)
	}
}



export const createOrder = async (cart) => {
	try {
		if(isAccessTokenExpired()) await refreshTokens(getRefreshTokenInfo())
		const res = await fetch(USER_ORDERS, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": `Bearer ${getAccessTokenInfo().token}`
			},
			body: JSON.stringify({cart})
		})
		return res.ok
	} catch (err) {
		return Promise.reject(err)
	}
}


export const getOrders = async (cart) => {
	try {
		if(isAccessTokenExpired()) await refreshTokens(getRefreshTokenInfo())
		const res = await fetch(USER_ORDERS, {
			method: "GET",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": `Bearer ${getAccessTokenInfo().token}`
			}
		})
		const content = await res.json()
		if(!res.ok) Promise.reject(content.message)
		return content
	} catch (err) {
		return Promise.reject(err)
	}
}


function isAccessTokenExpired() {
	const expiration = userSelector(store.getState())?.accessTokenInfo?.expiration
	if(Date.now() >= expiration - 3000) return true
	return false
}


function getAccessTokenInfo() {
	return userSelector(store.getState()).accessTokenInfo
}


function getRefreshTokenInfo() {
	return userSelector(store.getState()).refreshTokenInfo
}