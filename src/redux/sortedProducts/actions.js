import types from "./types" 


export const initSortedProducts = products => {
	const sortedProducts = {}
	for(const id in products) { // populating 
		const product = products[id]
		if(!sortedProducts[product.category]) sortedProducts[product.category] = {}
		if(!sortedProducts[product.category][product.type]) {
			sortedProducts[product.category][product.type] = {}
			sortedProducts[product.category][product.type].products = []
			sortedProducts[product.category][product.type].tags = {}
			sortedProducts[product.category][product.type].sizes = {}
			sortedProducts[product.category][product.type].colors = {}
			sortedProducts[product.category][product.type].colors.sortedReds = []
		}
		const container = sortedProducts[product.category][product.type]
		container.products.push(product.id)
		for(const tagName of product.tags) {
			if(!container.tags[tagName]) container.tags[tagName] = []
			container.tags[tagName].push(product.id)
		}
		for(const sizeName of product.sizes) {
			if(!container.sizes[sizeName]) container.sizes[sizeName] = []
			container.sizes[sizeName].push(product.id)
		}
		for(const color of product.colors) {
			if(!container.colors[color.r]) container.colors[color.r] = {}
			if(!container.colors[color.r][color.g]) 
				container.colors[color.r][color.g] = {}
			if(!container.colors[color.r][color.g][color.b]) 
				container.colors[color.r][color.g][color.b] = []
			container.colors[color.r][color.g][color.b].push(product.id)
			container.colors.sortedReds.push(color.r)
		}
	}
	for(const category in sortedProducts) { // sorting
		for(const type in sortedProducts[category]) {
			sortedProducts[category][type].products.sort((a, b) => a.lastUpdate - b.lastUpdate)
			sortedProducts[category][type].colors.sortedReds = [...new Set( 
				sortedProducts[category][type].colors.sortedReds 
			)]
			sortedProducts[category][type].colors.sortedReds.sort((a,b) => a - b)
		}
	}
	return {
		type: types.INIT_SORTED_PRODUCTS,
		payload: sortedProducts
	}
}
