import "./style.css"
import {Link, useRouteMatch} from "react-router-dom"
import {connect} from "react-redux"
import menusSelector from "../../redux/menus/selector"
import {toggleMenu} from "../../redux/menus/actions"
import {useState, useEffect, useRef} from "react"
import ProductCategories from "./sections/ProductCategories"
import ProductTypes from "./sections/ProductTypes"

import ColorPicker from "../../components/ColorPicker"

import sortedProductsSelector from "../../redux/sortedProducts/selector"
import productsSelector from "../../redux/products/selector"

import ToggleButton from "../../components/ToggleButton"

import {binarySearchRange, isInRange} from "../../utils"

import useMedia from "../../hooks/useMedia"

import CustomSelect from "../../components/CustomSelect"
import ProductPeek from "../../components/ProductPeek"


const url = "https://www.celio.com/medias/sys_master/productMedias/productMediasImport/hd9/h66/10104208523294/product-media-import-1097696-1-product.jpg?frz-v=2437"

const MAX_COLOR_DISTANCE = 40000
const RED_THRESHOLD = Math.sqrt(MAX_COLOR_DISTANCE/2)
const GREEN_THRESHOLD = Math.sqrt(MAX_COLOR_DISTANCE/4)
const BLUE_THRESHOLD = Math.sqrt(MAX_COLOR_DISTANCE/3)
/*
rgbDistance = 2 * (c1.r - c2.r)² + 4 * (c1.g - c2.g)² + 3 * (c1.b - c2.b)²
Threshold range approximation for primary colors:
redDistance = abs(c1.r - c2.r) <= sqrt(threshold / 2)
greenDistance = abs(c1.r - c2.r) <= sqrt(threshold / 4)
blueDistance = abs(c1.r - c2.r) <= sqrt(threshold / 3)
*/

const sortingOptions = ["Relevance", "Newest", "Price ➚", "Price ➘"]

const baseImgUrl = "http://localhost:2200"

function getPrimaryColorRange(value, threshold) {
	return [ 
		Math.max(value - threshold, 0),
		Math.min(value + threshold, 255)
	]
}

const ProductView = ({linkTo, imgSrc, name, currentPrice, originalPrice}) => {
	return <article className="product-view">
		<Link to={linkTo}>
			<img src={baseImgUrl + imgSrc}></img>
			<div className="info">
				<p>{name}</p>
				{
					currentPrice === originalPrice || originalPrice == null
					? <p>{currentPrice}</p>
					: <p><span>{originalPrice}</span> {currentPrice}</p>
				}
			</div>
		</Link>
	</article>
}
//todo: close CustomSelect (sorter) on click/tap outside 
const Shop = ({toggleMenu, products, sortedProducts, filterState, sorterState}) => { 
	const {path, url} = useRouteMatch()
	const isMobileScreen = useMedia("(max-width: 768px)")
	const getCurrentCategory = () => path.replace(/\//g, "")
	const getAllSettingKeys = (setting, type = null) => {
		if(type) return Object.keys(sortedProducts[getCurrentCategory()][type][setting])
		const all = new Set()
		for(const typeKey in sortedProducts[getCurrentCategory()]) {
			Object.keys(sortedProducts[getCurrentCategory()][typeKey][setting])
			.forEach(key => all.add(key))
		}
		return [...all]
	}

	const [filter, setFilter] = useState({ 
		category: getCurrentCategory(),
		types: [],
		colors: [], 
		sizes: [],
		tags: []
	})

	useEffect(() => setFilter({ 
		category: getCurrentCategory(),
		types: [],
		colors: [], 
		sizes: [],
		tags: []
	}), [path])

	const toggleFilter = () => toggleMenu("filter")

	const addToFilter = (parameter, data) => setFilter({ 
		...filter, 
		[parameter]: [...filter[parameter], data]
	})
	
	const removeFromFilter = (parameter, data) => {
		const indexOfData = filter[parameter].indexOf(data)
		if(indexOfData === -1) return
		return setFilter({
			...filter, 
			[parameter]: [
				...filter[parameter].slice(0, indexOfData),
				...filter[parameter].slice(indexOfData + 1, filter[parameter].length)
			]
		})
	}

	const isFilterEmpty = () => {
		for(const key in filter) {
			if(key === "category") continue
			if(filter[key].length === 0) continue
			return false
		}
		return true
	}

	//todo: right now filter returns all products matching even once (even when returnAll = true it returns all but sorted) make it more precise ONLY DISPLAY MOST MATCHED MATCHES ?
	const getFilteredProducts = (returnAll = false) => {
		const category = getCurrentCategory()
		let types = sortedProducts[category]
		if(filter.types.length !== 0 
		&& filter.types.length < Object.keys(sortedProducts[getCurrentCategory()]).length) { 
			types = {} 
			for(const type in sortedProducts[category]) {
				if(filter.types.includes(type)) types[type] = sortedProducts[category][type]
			}
		}
		const matches = {} 
		for(const type in types) {
			const isTypeInFilter = filter.types.some(filterType => filterType === type )
			for(const productId of types[type].products) {
				matches[productId] = 0
				if(isTypeInFilter) matches[productId] = 1
			}
			for(const setting in types[type]) {
				if(setting === "products" || Object.keys(filter[setting]).length === 0) continue
				if(setting === "colors" ) {
					for(const filterColor of filter.colors) {
						let range = getPrimaryColorRange( // similar colors
							filterColor.r, RED_THRESHOLD
						)
						range = binarySearchRange(types[type].colors.sortedReds, 
							value => value < range[0] && 1, 
							value => value > range[1] && -1
						) 
						for(const red of types[type].colors.sortedReds.slice(range[0], range[1] + 1)) {
							for(const green in types[type].colors[red]) {
								if(!isInRange(green, getPrimaryColorRange(
									filterColor.g, GREEN_THRESHOLD
								))) continue
								for(const blue in types[type].colors[red][green]) {
									if(!isInRange(blue, getPrimaryColorRange(
										filterColor.b, BLUE_THRESHOLD
									))) continue
									const productIds = types[type].colors[red][green][blue]
									for(const productId of productIds) {
										matches[productId] += 1
									}
								}
							}
						}
					}
					continue
				}
				for(const key of filter[setting]) {
					if(!types[type][setting][key]) continue
					for(const productId of types[type][setting][key]) {
						matches[productId] += 1
					}
				}
			}
		}
		const filteredProducts = Object.entries(matches).sort((a, b) => b[1] - a[1])
		if(returnAll) return filteredProducts.map(entry => entry[0])
		return filteredProducts.filter(entry => entry[1] !== 0).map(entry => entry[0])
	}

	const handleTypeButtons = (isToggled, type) => {
		if(isToggled) return addToFilter("types", type)
		const typeSizes = getAllSettingKeys("sizes", type)
		const typeTags = getAllSettingKeys("tags", type)
		const indexOfData = filter["types"].indexOf(type)
		setFilter({...filter,
			types: [
				...filter.types.slice(0, indexOfData),
				...filter.types.slice(indexOfData + 1, filter.types.length)
			],
			sizes: filter.sizes.filter(size => !typeSizes.includes(size)),
			tags: filter.tags.filter(tag => !typeTags.includes(tag))
		})
	}

	const handleColorPicker = selectedColors => setFilter({...filter,
		colors: [...selectedColors]
	})

	const handleSettingButtons = (isToggled, data, id, setButtonStyle) => {
		if(isToggled) {
			setButtonStyle({background:"#FFCE3E"})
			return addToFilter(data, id)
		}
		setButtonStyle({background:"#181998"})
		removeFromFilter(data, id)
	}

	const [filteredProducts, setFilteredProducts] = useState([])

	const baseSort = useRef([])

	useEffect(() => {
		if(isFilterEmpty()) {
			const filtered = getFilteredProducts(true)
			baseSort.current = [...filtered]
			return setFilteredProducts(filtered)
		}
		const filtered = getFilteredProducts(false)
		baseSort.current = [...filtered]
		setFilteredProducts(filtered)
	}, [filter, sortedProducts])

	const handleSorterClick = () => toggleMenu("sorter")

	const handleSorterChange = (optionId) => {
		if(optionId == 0) return setFilteredProducts([...baseSort.current])
		if(optionId == 1) return setFilteredProducts([...filteredProducts.sort(
			(a, b) => products[b].lastUpdate - products[a].lastUpdate // newest
		)])
		if(optionId == 2) return setFilteredProducts([...filteredProducts.sort( 
			(a, b) => products[a].currentPrice - products[b].currentPrice // price asc
		)])
		if(optionId == 3) return setFilteredProducts([...filteredProducts.sort(
			(a, b) => products[b].currentPrice - products[a].currentPrice // price desc
		)])
	}

	return <main>
		<ProductCategories pathName={path}/>

		<section className={`filter ${filterState && isMobileScreen ? "opened" : ""}`}>
			<h3>FILTER</h3>	
			<div className="filter-parameters">
				<article className="colors">
					<div className="parameter-title">
						<h4>COLORS</h4>
					</div>
					<ColorPicker onChange={handleColorPicker}/>
				</article>
				<article className="sizes">
					<div className="parameter-title">
						<h4>SIZES</h4>
					</div>
					<div className="parameter-buttons">
						{
							filter.types.length === 0
							? getAllSettingKeys("sizes").map((size, i) => <ToggleButton 
									key={i}
									data={"sizes"}
									id={size}
									onClick={handleSettingButtons}
								>
									{size}
								</ToggleButton>
							)
							: filter.types.reduce((acc, cur, i, arr) => {
								getAllSettingKeys("sizes", cur).forEach(size => acc.add(size))
								if(i === arr.length - 1) return [...acc].map(
									(size, i) => <ToggleButton 
										key={i}
										data={"sizes"}
										id={size}
										onClick={handleSettingButtons}
									>
										{size}
									</ToggleButton>)
								return acc
							}, new Set())
						}
					</div>
				</article>
				<article className="tags">
					<div className="parameter-title">
						<h4>TAGS</h4>
					</div>
					<div className="parameter-buttons">
						{
							filter.types.length === 0
							? getAllSettingKeys("tags").map((tag, i) => <ToggleButton 
									key={i}
									data={"tags"}
									id={tag}
									onClick={handleSettingButtons}
									filter={filter}
								>
									{tag}
								</ToggleButton>
							)
							: filter.types.reduce((acc, cur, i, arr) => {
								getAllSettingKeys("tags", cur).forEach(tag => acc.add(tag))
								if(i === arr.length - 1) return [...acc].map(
									(tag, i) => <ToggleButton 
										key={i}
										data={"tags"}
										id={tag}
										onClick={handleSettingButtons}
										filter={filter}
									>
										{tag}
									</ToggleButton>)
								return acc
							}, new Set())
						}
					</div>
				</article>
			</div>
		</section>
		<section className="product-chooser"> 
			<ProductTypes 
				pathName={path} 
				onClick={handleTypeButtons} 
				filter={filter}
			/>
			<section className="product-display">
				<div className="sorter">
					<CustomSelect 
						options={Object.entries(sortingOptions)}
						onChange={handleSorterChange}
						onClick={handleSorterClick}
						condition={sorterState}
					>
						<i className="fas fa-sort-amount-down-alt"></i>
					</CustomSelect>
				</div>
				<div className="products">
					{
						filteredProducts.map(id => <ProductPeek
							key={id} 
							name={products[id].name}
							nameExtension={products[id].nameExtension}
							currentPrice={products[id].currentPrice}
							originalPrice={products[id].originalPrice}
							imgSrc={baseImgUrl + products[id].thumbnail}
							linkTo={`${url}/${id}`}
						/>)
					}
				</div>
				
			</section>
		</section>
		
		<button className="filter-menu" onClick={toggleFilter}>
			<i className="fas fa-filter"></i>
		</button>
	</main>
}

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
