import "./style.css"
import latestMen from "../../../../assets/images/home/latest-men.png"
import latestWomen from "../../../../assets/images/home/latest-women.png"
import {Link} from "react-router-dom"


const latestMenStyle = {
	backgroundImage: `url(${latestMen})`, 
	backgroundSize: "cover",
	backgroundPosition: "50% 10%"
}
const latestWomenStyle = {
	backgroundImage: `url(${latestWomen})`, 
	backgroundSize: "cover",
	backgroundPosition: "50% 20%"
}


const LatestSection = props => {
	return <section className="latest">
		<div className="background">
			<div className="left"></div>
			<div className="right"></div>
		</div>
		<div className="latest-text">
			<h3>LATEST</h3>
		</div>
		<div className="latest-items">
			<article className="men" style={latestMenStyle}>
				<Link to="/men"><h4>MEN</h4></Link>
			</article>
			<article className="women" style={latestWomenStyle}>
				<Link to="/women"><h4>WOMEN</h4></Link>
			</article>
		</div>
	</section>
}


export default LatestSection
