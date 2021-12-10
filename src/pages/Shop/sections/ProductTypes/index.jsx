import "./style.css"
import ToggleButton from "../../../../components/ToggleButton"
import {useState, useRef, useEffect} from "react"

const DEFAULT_FONT_SIZE = 0.1725

const ClipPathButton = ({children, fontSize, clipPath, onClick, data, filter}) => {
	const isToggledRef = useRef(false)
	const [contentStyle, setContentStyle] = useState({background:"#181998"}) 
	const [textStyle, setTextStyle] = useState({})
	const buttonRef = useRef(null)
	const [buttonWidth, setButtonWidth] = useState(0)

	const handleRef = ref => buttonRef.current = ref
	const resizeListener = () => buttonRef?.current && setButtonWidth(
		buttonRef.current.offsetWidth
	)
	
	useEffect(() => {
		resizeListener()
		window.addEventListener("resize", resizeListener)
		return () => window.removeEventListener("resize", resizeListener)
	}, [])

	useEffect(() => setTextStyle({
		fontSize: `${buttonWidth * (fontSize || DEFAULT_FONT_SIZE)}px`
	}), [buttonWidth])

	const handleClick = (isToggled) => {
		isToggledRef.current = isToggled
		onClick(isToggled, data)
		if(isToggled) return setContentStyle({background:"#FFCE3E"})
		setContentStyle({background:"#181998"})
	}

	return <ToggleButton className="clip-path-button" onClick={handleClick} onRef={handleRef}>
		<div className="content" style={contentStyle}>
			<div className="clip-path" style={{clipPath}}></div>
			{children && <p className="text" style={textStyle}>{children}</p>}
		</div>
	</ToggleButton>
}


//todo: find a way to modify height (vh) of this section depending on nb of buttons (women buttons should be 6 vs 4 for men) 

const ProductTypes = ({pathName, onClick, filter}) => { 
	return <section className="product-types">
		{
			(pathName === "/men" && <div className="type-btn-wrapper">
				<ClipPathButton 
					clipPath="polygon(40% 5%, 60% 5%, 65% 8%, 80% 11%, 90% 20%, 100% 99%, 80% 100%, 78% 85%, 77% 100%, 23% 100%, 22% 85%, 20% 100%, 0 99%, 10% 20%, 20% 11%, 35% 8%)"
					onClick={onClick}
					data={"jacket"}
					filter={filter}
				>
					JACKETS
				</ClipPathButton>
				<ClipPathButton 
					clipPath="polygon(40% 0, 60% 0, 61% 8%, 90% 15%, 100% 88%, 83% 88%, 75% 50%, 75% 100%, 25% 100%, 25% 50%, 17% 88%, 0 88%, 10% 15%, 39% 8%)"
					onClick={onClick}
					data={"sweater"}
					filter={filter}
				>
					SWEATERS
				</ClipPathButton>
				<ClipPathButton 
					clipPath="polygon(39% 8%, 43% 12%, 57% 12%, 61% 8%, 75% 10%, 100% 30%, 90% 50%, 75% 45%, 75% 100%, 25% 100%, 25% 45%, 10% 50%, 0 30%, 25% 10%)"
					onClick={onClick}
					data={"shirt"}
					filter={filter}
				>
					SHIRTS
				</ClipPathButton>
				<ClipPathButton 
					clipPath="polygon(25% 8%, 75% 8%, 89% 100%, 59% 100%, 50% 50%, 41% 100%, 11% 100%)"
					onClick={onClick}
					data={"trousers"}
					filter={filter}
				>
					TROUSERS
				</ClipPathButton>
			</div>)

			|| (pathName === "/women" && <div className="type-btn-wrapper">
				
			</div>)
		}
	</section>
}

export default ProductTypes