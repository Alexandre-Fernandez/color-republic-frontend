const ProductBaseInfo = ({name, nameExtension, currentPrice, originalPrice, size}) => {
	return <div className="product-base-info">
		<p className="product-name">{`${name} ${nameExtension}`}</p>
		{
			size && <p><span className="product-size">{size}</span></p>
		}
		<p className="product-price">
			{
				currentPrice !== originalPrice && originalPrice != null
				&& <span className="original-price">{originalPrice} </span>
			}
			<span className="current-price">{currentPrice}</span>
		</p>
	</div>
}

export default ProductBaseInfo