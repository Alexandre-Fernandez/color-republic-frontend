import {useState, useEffect} from 'react'

function getWindowSize() {
	return {
		width: window.innerWidth,
		height: window.innerHeight
	}
}

const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState(getWindowSize())
	useEffect(() => {
		const listener = () => setWindowSize(getWindowSize())
		window.addEventListener("resize", listener)
		return () => window.removeEventListener("resize", listener)
	}, [])
	return windowSize
}

export default useWindowSize