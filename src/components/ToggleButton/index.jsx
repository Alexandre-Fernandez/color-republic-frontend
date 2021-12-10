import {useState, useEffect} from "react"

const ToggleButton = ({children, className, onClick, style, data, id, onRef}) => {
	const [isToggled, setIsToggled] = useState(false)
	const [buttonStyle, setButtonStyle] = useState(style)

	const handleClick = () => {
		const isToggledNow = !isToggled
		setIsToggled(isToggledNow)
		return onClick(isToggledNow, data, id, setButtonStyle)
	}

	useEffect(() => {
		setButtonStyle(style)
	}, [style])

	return <button 
		className={className || "toggle-button"} 
		onClick={handleClick}
		style={buttonStyle || {}}
		ref={onRef}
	>
		{children}
	</button>
}

export default ToggleButton