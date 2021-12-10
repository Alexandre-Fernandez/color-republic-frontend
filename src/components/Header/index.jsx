import "./style.css"
import logo from "../../assets/images/logo.png"
import {useEffect} from "react"
import {Link} from "react-router-dom"
import useMedia from "../../hooks/useMedia"
import {connect} from "react-redux"
import menusSelector from "../../redux/menus/selector"
import userSelector from "../../redux/user/selector"
import {toggleMenu, closeAllMenus} from "../../redux/menus/actions"
import {logUserOut} from "../../redux/user/actions"
import CartIcon from "../CartIcon"

/*
// Small devices (landscape phones, 576px+)
@media (min-width: 576px) { ... }

// Medium devices (tablets, 768px+)
@media (min-width: 768px) { ... }

// Large devices (desktops, 992px+)
@media (min-width: 992px) { ... }

// Extra large devices (large desktops, 1200px+)
@media (min-width: 1200px) { ... }
*/

const OPENED = "opened"


const Header = ({isHamburgerOpen, isUserLogged, toggleMenu, closeAllMenus, logout}) => {
	const isMobileScreen = useMedia("(max-width: 768px)")

	useEffect(() => {
		const listener = e => { // on click outside
			let target = e.target
			while(target) {
				if(!target.parentNode) break
				if(target.classList.contains(OPENED)) break
				target = target.parentNode
			}
			if(!target.parentNode) closeAllMenus()
		}
		if(isHamburgerOpen) document.addEventListener("click", listener)
		return () => document.removeEventListener("click", listener)
	}, [isHamburgerOpen])

	const toggleHamburger = () => toggleMenu("hamburger")

	return <header>
		<div className="xl-width">
			<Link to="/">
				<div className="logo">
					<img src={logo} className="logo-img" alt="Color Republic logo"/>
					<h1 className="logo-text">COLOR REPUBLIC</h1>
				</div>
			</Link>
			<nav>
				<ul className={`main-nav ${isHamburgerOpen && isMobileScreen ? OPENED : ""}`}>
					<li>
						<Link to="/men" onClick={toggleHamburger}>MEN</Link>
					</li>
					<li>
						<Link to="/men" onClick={toggleHamburger}>WOMEN</Link>
					</li>
					<li>
						<a onClick={toggleHamburger}>INSIDE COLOR REPUBLIC</a>
					</li>
				</ul>
				<ul className="nav-icons">
					<li>
						<a><i className="fas fa-search"></i></a>
					</li>
					<li>
						<Link to="/user"><i className="fas fa-user"></i></Link>
					</li>
					<li>
						<CartIcon linkTo="/cart" />
					</li>
					{
						isUserLogged && <li>
							<button onClick={logout}>
								<i className="fas fa-power-off"></i>
							</button>
						</li>
					}
				</ul>
				<button onClick={toggleHamburger} className="hamburger-menu">
					<i className="fas fa-bars"></i>
				</button>
			</nav>
		</div>
	</header>
}


export default connect(
	state => ({
		isHamburgerOpen: menusSelector(state).hamburger,
		isUserLogged: userSelector(state).email ? true : false
	}), 
	dispatch => ({
		toggleMenu: menuId => dispatch(toggleMenu(menuId)),
		closeAllMenus: () => dispatch(closeAllMenus()),
		logout: () => dispatch(logUserOut())
	})
)(Header)