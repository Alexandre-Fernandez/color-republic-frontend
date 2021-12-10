import "./style.css"
import {connect} from "react-redux"
import productsSelector from "../../../../redux/products/selector"
import menusSelector from "../../../../redux/menus/selector"
import {toggleMenu} from "../../../../redux/menus/actions"
import CustomSelect from "../../../../components/CustomSelect"


const url = "https://www.celio.com/medias/sys_master/productMedias/productMediasImport/hd9/h66/10104208523294/product-media-import-1097696-1-product.jpg?frz-v=2437"

const sortingParams = ["Relevance", "Newest", "Price ➚", "Price ➘"]

const Product = ({linkTo, imgSrc, name, currentPrice, originalPrice}) => {
	return <article className="product">
		<a href={linkTo}>
			<img src={imgSrc}></img>
			<div className="info">
				<p>{name}</p>
				{
					currentPrice === originalPrice || originalPrice == null
					? <p>{currentPrice}</p>
					: <p><span>{originalPrice}</span> {currentPrice}</p>
				}
			</div>
		</a>
	</article>
}

const ProductOverview = ({filteredProducts, products, sortingState}) => {

	return <section className="product-overview">
		<div className="sorter">
			<CustomSelect 
				options={Object.entries(sortingParams)}
				onChange={(a) => console.log(a)}
			>
				<i className="fas fa-sort-amount-down-alt"></i>
			</CustomSelect>
		</div>
		<div className="products">
			<Product 
				linkTo={url} 
				imgSrc={url} 
				name={"Pique cotton polo" + " " + "(Cherry red)"} 
				currentPrice={12} 
				originalPrice={13}
			/>
		</div>
		
	</section>
}

/*
<button className="sorter-menu">
				<i className="fas fa-sort-amount-down-alt"></i>
		</button>
*/

export default connect(
	state => ({
		sortingState: menusSelector(state).sorting,
		products: productsSelector(state)
	}), 
	dispatch => ({
		toggleMenu: menuId => dispatch(toggleMenu(menuId))
	})
)(ProductOverview)