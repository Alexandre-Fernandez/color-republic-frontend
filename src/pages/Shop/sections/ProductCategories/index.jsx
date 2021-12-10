import "./style.css"
import {Link} from "react-router-dom"

const ProductCategories = ({pathName}) => { 
	return <section className="product-categories">
		{pathName === "/men" && 
			<Link to="/women">
				<h3>WOMEN</h3>
				<h2>MEN</h2>
			</Link>
		}
		{pathName === "/women" && 
			<Link to="/men">
				<h3>MEN</h3>
				<h2>WOMEN</h2>
			</Link>
		}
	</section>
}

export default ProductCategories