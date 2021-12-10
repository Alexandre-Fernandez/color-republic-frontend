import "./style.css"
import {connect} from "react-redux"
import ProductBaseInfo from "../../components/ProductBaseInfo"
import cartSelector from "../../redux/cart/selector"
import productsSelector from "../../redux/products/selector"
import {useState, useEffect} from "react"
import {addToCart, removeFromCart, removeAllFromCart, clearCart} from "../../redux/cart/actions"
import {Link, useHistory} from "react-router-dom"
import {createOrder} from "../../lib/backend"


const url = "http://localhost:2200/images/products/product-media-import-1080328-1-product.jpg"

const baseImgUrl = "http://localhost:2200"


const CartItem = ({
	thumbnail, name, nameExtension, currentPrice, originalPrice, amount, size, 
	link, add, remove, removeAll
}) => {
	return <article className="cart-item">
		<Link to={link}>
			<img src={thumbnail}></img>
		</Link>
		<div className="cart-item-info">
			<ProductBaseInfo 
				name={name}
				nameExtension={nameExtension}
				currentPrice={currentPrice}
				originalPrice={originalPrice}
				size={size}
			/>
			<div className="quantity-handler">
				<button 
					className="quantity-button"
					onClick={removeAll}
				>
					<i className="fas fa-trash-alt"></i>
				</button>
				<button
					className="quantity-button"
					onClick={remove}
				>
					<i className="fas fa-minus"></i>
				</button>
				<p>
					<span className="current-amount">{amount}</span>
				</p>
				<button
					className="quantity-button"
					onClick={add}
				>
					<i className="fas fa-plus"></i>
				</button>
			</div>
		</div>
	</article>
}


const Cart = ({products, cart, addToCart, removeFromCart, removeAllFromCart, clearCart}) => {
	const [total, setTotal] = useState(0)
	const history = useHistory()

	useEffect(() => {
		let acc = 0
		for(const id in cart) {
			for(const size in cart[id]) {
				acc += products[id].currentPrice * cart[id][size]
			}
		}
		setTotal(acc)
	}, [cart])


	const handleOrder = async () => {
		try { //todo: handle case where user is not logged and redirect to login page 
			const isSuccess = await createOrder(cart)
			if(isSuccess) {
				clearCart()
				return history.push("/user/orders")
			}
			throw "couldn't create the order"
		}
		catch(err) {
			console.log(err)
		}
	}

	return <main>
		<h2>SHOPPING CART</h2>

		<section className="cart-items">
			{
				Object.entries(cart).reduce((acc, cur) => {
					for(const size in cur[1]) {
						acc.push(<CartItem 
							key={`${cur[0]}-${size}`}
							thumbnail={baseImgUrl + products[cur[0]].thumbnail}
							name={products[cur[0]].name}
							nameExtension={products[cur[0]].nameExtension}
							currentPrice={products[cur[0]].currentPrice}
							originalPrice={products[cur[0]].originalPrice}
							size={size}
							amount={cur[1][size]}
							link={`/${products[cur[0]].category}/${cur[0]}`}
							add={() => addToCart(cur[0], size)}
							remove={() => removeFromCart(cur[0], size)}
							removeAll={() => removeAllFromCart(cur[0], size)}
						/>)
					}
					return acc
				}, [])
			}
		</section>
		<section className="cart-total">
			<p>Total: <span>{total.toFixed(2)}</span></p>
			<button onClick={handleOrder}>
				Order Cart
			</button>
		</section>
			

	</main>
}




export default connect(
	state => ({
		cart: cartSelector(state),
		products: productsSelector(state)
	}), 
	dispatch => ({
		addToCart: (id, size) => dispatch(addToCart(id, size)),
		removeFromCart: (id, size) => dispatch(removeFromCart(id, size)),
		removeAllFromCart: (id, size) => dispatch(removeAllFromCart(id, size)),
		clearCart: () => dispatch(clearCart())
	})
)(Cart)


/*
export default connect(
	state => ({
		sorterState: menusSelector(state).sorter,
		filterState: menusSelector(state).filter,
		products: productsSelector(state),
		sortedProducts: sortedProductsSelector(state)
	}), 
	dispatch => ({
		toggleMenu: menuId => dispatch(toggleMenu(menuId))
	})
)(Shop)


*/