const config = {
	api: {
		backend: {
			url: "http://localhost:2200",
			endpoints: {
				products: "/products",
				updates: "/updates",
				users: "/users", 
				tokens: "/tokens"
			}
		}
	},

	localStorage : {
		products: "products",
		cart: "cart",
		refreshTokenInfo: "refreshTokenInfo"
	}

	
}

export default config