import "./style.css"
import {useMemo} from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import cartSelector from "../../redux/cart/selector"


const CartIcon = ({linkTo, cart}) => {
	const cartSize = useMemo(() => {
		let acc = 0
		for(const id in cart) {
			for(const size in cart[id]) {
				acc += cart[id][size]
			}
		}
		return acc
	}, [cart])

	return <Link to={linkTo} className="cart-link">
		<i className="fas fa-shopping-cart"></i>
		<div className={`cart-size${cartSize ? "" : " hide-cart-size"}`}>
			{cartSize}
		</div>
	</Link>
}


export default connect(
	state => ({
		cart: cartSelector(state)
	}), 
	null
)(CartIcon)