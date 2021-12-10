import "./style.css"
import {useState, useRef} from "react"
import {connect} from "react-redux"
import {useParams} from "react-router"
import productsSelector from "../../redux/products/selector"
import ProductBaseInfo from "../../components/ProductBaseInfo"
import Accordion from "../../components/Accordion"
import ToggleButton from "../../components/ToggleButton"
import {addToCart} from "../../redux/cart/actions"

const baseImgUrl = "http://localhost:2200"

const ProductDetails = ({products, addToCart}) => {
	const {id} = useParams()
	const {current: product} = useRef(products[id])
	const [currentSize, setCurrentSize] = useState(null)

	const handleAddToCart = () => {
		if(!currentSize) return //TODO: add some kind of error msg 
		addToCart(id, currentSize)
	}

	return <main>
		<section className="product-images">
			<img src={baseImgUrl + product.thumbnail} />
		</section>
		<section className="product-details">
			<ProductBaseInfo 
				name={product.name}
				nameExtension={product.nameExtension}
				currentPrice={product.currentPrice}
				originalPrice={product.originalPrice}
			/>
			<div className="product-cart">
				<div className="product-sizes">
					{
						product.sizes.map(size => <ToggleButton
							className="product-size"
							key={size}
							style={
								size === currentSize
								? {background:"#FFCE3E"} 
								: {background:"#181998"}
							}
							onClick={() => setCurrentSize(size)}
						>
							{size}
						</ToggleButton>)
					}
				</div>
				<button className="add-to-cart" onClick={handleAddToCart}>
					ADD TO CART
				</button>
			</div>
			<Accordion 
				name="Description"
				more={<i className="fas fa-chevron-down"></i>}
				less={<i className="fas fa-chevron-up"></i>}
			>
				<p>{product.description}</p>
			</Accordion>
		</section>
		
	</main>
} 

export default connect(
	state => ({
		products: productsSelector(state)
	}), 
	dispatch => ({
		addToCart: (productId, productSize) => dispatch(
			addToCart(productId, productSize)
		)
	})
)(ProductDetails)
