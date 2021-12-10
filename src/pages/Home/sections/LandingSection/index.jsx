import "./style.css"
import mobileVideo from "../../../../assets/videos/home-video.mp4"
import mobileThumbnail from "../../../../assets/images/home/home-thumbnail-mobile.png"
import desktopVideo from "../../../../assets/videos/home-video.mp4"
import desktopThumbnail from "../../../../assets/images/home/home-thumbnail.png"
import useMedia from "../../../../hooks/useMedia"
import {useState, useEffect} from "react"


function getSeason(monthOffset = 0) {
	let month = new Date().getMonth() + monthOffset
	if(month < 0) month += 12
	if(month < 2 || month === 11) return "WINTER"
	if(month < 5) return "SPRING"
	if(month < 8) return "SUMMER"
	return "AUTUMN"
}


function getRandomColor(exclude) {
	const rd = Math.floor(Math.random() * 16)
	const colors = [
		"#E80006", "#ED4F00", "#F48300", "#FFC200", "#F4E900", "#67B300", 
		"#00A236", "#00A47D", "#009FC6", "#005BAA", "#000D7A", "#120076", 
		"#3E0076", "#630078", "#BB006F", "#BA0045"
	]
	if(colors[rd] === exclude) return getRandomColor(exclude)
	return colors[rd]
}


const LandingSection = props => {
	const [spanColor, setSpanColor] = useState("#E80006")

	const isMobileScreen = useMedia("(max-width: 768px)")
	
	useEffect(() => {
		const spanTimeout = setTimeout(() => setSpanColor(getRandomColor(spanColor)), 2000)
		return () => clearTimeout(spanTimeout)
	}, [spanColor])

	return <section className="landing">
		<div className="heading">
			<h2>YOUR {getSeason(1)} IN<span style={{color: spanColor}}> COLOR</span></h2>
			<button className="btn-empty">DISCOVER</button>
		</div>
		<div className="video-container">
			<video poster={isMobileScreen ? mobileThumbnail : desktopThumbnail} autoPlay loop muted>
				<source src={isMobileScreen ? mobileVideo : desktopVideo} type="video/mp4" />
			</video>
		</div>
	</section>
}


export default LandingSection