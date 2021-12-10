import "./style.css"
import {useState, useEffect} from "react"




const IdButton = ({children, onClick, className, id}) => {
	const handleClick = () => onClick(id)

	return <button className={className} onClick={handleClick}>
		{children}
	</button>
}


const CustomSelect = ({children, options, caption, onChange, onClick, condition}) => {
	const [isToggled, setIsToggled] = useState(false)
	const [currentOptionId, setCurrentOptionId] = useState(options[0][0])

	const handleMainClick = () => {
		onClick(!isToggled) // isToggled will still change even if !condition
		setIsToggled(!isToggled) 
	}

	const handleOptionClick = (id) => {
		if(id === currentOptionId) return
		setCurrentOptionId(id)
	}

	useEffect(() => {
		onChange(currentOptionId)
	}, [currentOptionId])

	useEffect(() => {
		if(condition != null && !condition) setIsToggled(false)
	}, [condition])

	return <div className={`custom-select ${
		condition == null 
		? isToggled ? " opened" : "" 
		: isToggled && condition ? " opened" : "" 
	}`}>
		{
			children 
			? <button 
				className="main-button"
				onClick={handleMainClick} 
			>
				{children}
			</button>
			: options.filter(o => o[0] === currentOptionId).map(o => <IdButton 
				className="main-button"
				key={o[0]} 
				id={o[0]} 
				onClick={handleMainClick}
			>
				{o[1]}
			</IdButton>)
			
		}
		<div className="drop-down">
			{ caption && <p className="caption">{caption}</p>}
			<ul>
				{
					children 
					? options.map(o => <li key={o[0]}>
						<IdButton 
							className={`drop-down-button ${o[0] === currentOptionId ? " selected" : ""}`}
							id={o[0]} 
							onClick={handleOptionClick}
						>
							{o[1]}
						</IdButton>
					</li>)
					: options.filter(o => o[0] !== currentOptionId).map(o => <li key={o[0]}>
						<IdButton 
							className="drop-down-button"
							id={o[0]} 
							onClick={handleOptionClick}
						>
							{o[1]}
						</IdButton>
					</li>)
				}
			</ul>
		</div>
	</div>
}

export default CustomSelect