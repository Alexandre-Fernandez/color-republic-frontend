import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import store from "./redux/store"
import App from "./App"
import {initProducts} from "./redux/products/actions"
import {initUser} from "./redux/user/actions"
import {initCart} from "./redux/cart/actions"

store.dispatch(initProducts(50000000000000000000))
store.dispatch(initUser())
store.dispatch(initCart())

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
)

