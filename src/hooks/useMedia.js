import {useState, useEffect} from "react"

const useMedia = (query) => {
	const media = window.matchMedia(query)
	const [matches, setMatches] = useState(media.matches)
	useEffect(() => {
		const listener = e => setMatches(e.target.matches)
		media.addEventListener("change", listener)
		return () => media.removeEventListener("change", listener)
	}, [media, matches])
	return matches
}

export default useMedia