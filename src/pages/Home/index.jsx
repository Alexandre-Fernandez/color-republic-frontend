import LandingSection from "./sections/LandingSection"
import WelcomeSection from "./sections/WelcomeSection"
import LatestSection from "./sections/LatestSection"

const Home = props => {
	return <main>
		<LandingSection />
		<WelcomeSection />
		<LatestSection />
	</main>
}


export default Home