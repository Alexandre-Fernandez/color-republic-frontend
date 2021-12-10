import "./assets/style/base.css"
import "./theme.css"
import {Switch, Route} from 'react-router-dom'
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import User from "./pages/User"
import UserAddresses from "./pages/UserAddresses"
import UserSecurity from "./pages/UserSecurity"
import UserOrders from "./pages/UserOrders"

//todo a better way to do nested routes/layouts must exist 

const App = () => {
	return <div className="App">
		<Switch>
			<Route exact path="/">
				<MainLayout>
					<Home/>
				</MainLayout>
			</Route> 
			<Route exact path={["/men", "/women"]}>
				<MainLayout>
					<Shop/>
				</MainLayout>
			</Route> 
			<Route exact path={["/men/:id", "/women/:id"]}>
				<MainLayout>
					<ProductDetails/>
				</MainLayout>
			</Route> 
			<Route exact path="/cart">
				<MainLayout>
					<Cart />
				</MainLayout>
			</Route> 
			<Route exact path="/user">
				<MainLayout>
					<User />
				</MainLayout>
			</Route> 
			<Route exact path="/user/orders">
				<MainLayout>
					<UserOrders />
				</MainLayout>
			</Route>
			<Route exact path="/user/security">
				<MainLayout>
					<UserSecurity />
				</MainLayout>
			</Route>
			<Route exact path="/user/addresses">
				<MainLayout>
					<UserAddresses />
				</MainLayout>
			</Route>
			<Route exact path="/user/admin">
				<MainLayout>

				</MainLayout>
			</Route>
		</Switch>
	</div>
}


export default App

/*
			<Route exact path="/men" render={() => 
				<MainLayout>
					<Shop category="men"/>
				</MainLayout>
			} />
			<Route exact path="/women" render={() => 
				<MainLayout>
					<Shop category="women"/>
				</MainLayout>
			} />
*/

/*
import {connect} from "react-redux"
import sortedProductsSelector from "./redux/sortedProducts/selector"

export default connect(
	state => ({
		sortedProducts: sortedProductsSelector(state)
	}), 
	null
)(App)
*/