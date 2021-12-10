import Header from "../components/Header"
import Footer from "../components/Footer"

const MainLayout = props => {
	return <>
		<Header { ...props } />
		{ props.children }
		<Footer { ...props } />
	</>
}

export default MainLayout