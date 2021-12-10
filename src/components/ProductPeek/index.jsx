import "./style.css"
import {Link} from "react-router-dom"
import ProductBaseInfo from "../ProductBaseInfo"

const ProductPeek = ({name, nameExtension, currentPrice, originalPrice, imgSrc, linkTo}) => {
	return <article className="product-peek">
		<Link to={linkTo}>
			<img src={imgSrc}></img>
			<ProductBaseInfo 
				name={name}
				nameExtension={nameExtension}
				currentPrice={currentPrice}
				originalPrice={originalPrice}
			/>
		</Link>
	</article>
}

export default ProductPeek