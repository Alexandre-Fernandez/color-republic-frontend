import "./style.css"
import {useState} from "react"

const Accordion = ({children, className, name, more, less, opened}) => {
	const [isOpened, setIsOpened] = useState(opened ? true : false)

	return <div className={className || "accordion"}>
		<div className="accordion-tab">
			<div className="accordion-tab-name">
				{name}
			</div>
			<button 
				className="accordion-tab-button"
				onClick={() => setIsOpened(!isOpened)}
			>
				{isOpened ? less || "˄" : more || "˅"}
			</button>
		</div>
		<div className={`accordion-content${isOpened ? "" : " hide-accordion-content"}`}>
				{children}
		</div>
	</div>
}

export default Accordion