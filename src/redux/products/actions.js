import types from "./types" 
import config from "../../global/config"
import {initSortedProducts} from "../sortedProducts/actions"
import {toSqlDate} from "../../utils"

const API_PRODUCTS = config.api.backend.url + config.api.backend.endpoints.products
const API_UPDATES = config.api.backend.url + config.api.backend.endpoints.updates
const LOCAL_STORAGE_KEY = config.localStorage.products

//TODO: refactor product management, only get what is needed instead of all products at beginning

export const initProducts = (updateDelay) => {
	return async dispatch => {
		try {
			let persistedProducts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
			if(!persistedProducts) { 
				persistedProducts = {
					lastUpdate: Date.now(),
					products: {}
				}
				const products = await fetch(API_PRODUCTS).then(res => res.json())
				for(const product of products) {
					product.lastUpdate = new Date(product.lastUpdate).getTime()
					persistedProducts.products[product.id] = product
				}
			}
			if(Date.now() - persistedProducts.lastUpdate > updateDelay) {
				console.log(Date.now() - persistedProducts.lastUpdate)
				const changedProducts = await fetch(`${API_UPDATES}?after=${
					toSqlDate(new Date()).replace(/ /g, "+") // FIXME: THIS IS TELLING ATTACKERS WHAT DB WE ARE USING, SEND NORMAL DATE AND FORMAT IT IN BACKEND
				}`).then(res => res.json())
				for(const id of changedProducts.deleted) { //add a way to reset client side DB from backend //not needed anymore, it's better to refactor this make normal api calls
					delete persistedProducts[id]
				}
				for(const product of changedProducts.updated) {
					persistedProducts[product.id] = product
				}
				persistedProducts.lastUpdate = Date.now()
			}
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(persistedProducts))
			dispatch({
				type: types.INIT_PRODUCTS,
				payload: persistedProducts.products
			})
			dispatch(initSortedProducts(persistedProducts.products))
		} catch(err) {
			dispatch({
				type: types.INIT_PRODUCTS,
				payload: {},
				error: err
			})
		}
	}
}
