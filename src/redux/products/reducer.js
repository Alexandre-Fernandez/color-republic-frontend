import types from "./types"

const INITIAL_STATE = {}


export default function productsReducer(state = INITIAL_STATE, action) {
	switch(action.type) {
		case types.INIT_PRODUCTS:
			return action.payload
		default:
			return state
	}
}



/*
sortingMap (need to put this on sorting component)

	tags: {
		jean: [1],
		retro: [1],	
		regular: [1],
	},
	colors: {
		"063089114": [1]
	},
	sizes: {
		S: [1]
	}, 
	etc

*/


/* PRODUCT MODELS

{
	"id": 5,
	"product_line_id": 1,
	"category": "men",
	"type": "shirt",
	"name": "Pique cotton polo",
	"name_extension": "(Cherry red)",
	"description": "This slim, short-sleeved pique polo shirt in cotton plays on the trend, with tricolor stripes on the sleeves and collar.",
	"current_price": 12,
	"original_price": 19.99,
	"img_srcs": [
		"/images/products/product-media-import-1080328-1-product.jpg",
		"/images/products/product-media-import-1080328-2-product.jpg",
		"/images/products/product-media-import-1080328-4-product.jpg"
	],
	"last_update": "2021-07-16T12:01:22.000Z",
	"colors": [
		{
			"r": 119,
			"g": 6,
			"b": 33
		}
	],
	"sizes": [
		"XS",
		"S",
		"M",
		"L",
		"XL"
	],
	"tags": [
		"cotton",
		"polo",
		"short-sleeve",
		"slim"
	]
}

*/