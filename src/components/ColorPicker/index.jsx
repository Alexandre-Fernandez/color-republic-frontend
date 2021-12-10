import "./style.css"
import {useState, useRef, useEffect} from "react"
import {RgbColorPicker} from "react-colorful"
import ToggleButton from "../ToggleButton"


const MAX_COLORS = 4

const ColorButton = ({currentColor, onClick, id}) => {
	const isToggledRef = useRef(false)
	const [style, setStyle] = useState({})

	const handleClick = (isToggled) => {
		isToggledRef.current = isToggled
		onClick(isToggled, id)
		setStyle({ // also triggers re-render for isToggledRef
			backgroundColor: `rgb(${currentColor.r},${currentColor.g},${currentColor.b})`
		}) 
	}

	useEffect(() => {
		if(isToggledRef.current) return
		setStyle({
			backgroundColor: `rgb(${currentColor.r},${currentColor.g},${currentColor.b})`
		})
	}, [currentColor])

	return <ToggleButton
		className="color-button" 
		onClick={handleClick}
		style={style}
	>
		{
			isToggledRef.current 
			? <i className="fas fa-times"></i> 
			: <i className="fas fa-plus"></i>
		}
	</ToggleButton>
}

const ColorPicker = ({onChange}) => {
	const lastId = useRef(0)
	const getNewId =() => ++lastId.current
	const [currentColor, setCurrentColor] = useState({r: 255, g:0, b: 0})
	const [colorButtons, setColorButtons] = useState({0: null})

	const handleColorButtons = (isToggled, id) => {
		if(isToggled) {
			const buttons = {...colorButtons, [id]: {...currentColor}}
			const colors = Object.values(buttons)
			onChange(colors)
			if(colors.length >= MAX_COLORS) return setColorButtons(buttons)
			buttons[getNewId()] = null
			return setColorButtons(buttons)
		}
		const {[id]: removed, ...buttons} = colorButtons
		const colors = Object.values(buttons).filter(clr => clr != null)
		onChange(colors)
		if(colors.length === MAX_COLORS - 1) buttons[getNewId()] = null
		setColorButtons(buttons)
	}

	return <div className="color-picker">
		<RgbColorPicker color={currentColor} onChange={setCurrentColor} />
		<div className="color-buttons">
			{
				Object.entries(colorButtons).map(button => <ColorButton
					key={button[0]}
					id={button[0]}
					currentColor={currentColor}
					onClick={handleColorButtons}
				/>)
			}
		</div>
	</div>
}

export default ColorPicker