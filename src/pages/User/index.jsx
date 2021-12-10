import "./style.css"
import {useState} from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import userSelector from "../../redux/user/selector"
import Login from "../../components/Login"
import Register from "../../components/Register"

import {getUserAddresses} from "../../lib/backend"

const User = ({isLogged, isAdmin}) => {
	const [isNewUser, setIsNewUser] = useState(false)

	const handleRadio = e => {
		if(e.target.value === "newUser") return setIsNewUser(true)
		setIsNewUser(false)
	}

	
	return <main>
		{
			isLogged 
			? 
			<section className="user-account">
				<Link to="/user/orders">
					<div>
						<h4>Orders</h4>
					</div>
				</Link>
				<Link to="/user/security">
					<div>
						<h4>Security</h4>
					</div>
				</Link>
				<Link to="/user/addresses">
					<div>
						<h4>Addresses</h4>
					</div>
				</Link>
				{
					isAdmin && <Link to="/user/admin">
						<div>
							<h4>Admin panel</h4>
						</div>
					</Link>
				}
			</section>
			: 
			<section className="login-register">
				<div>
					<p>Do you have a color republic account ?</p>

					<input 
						type="radio" 
						id="new-user" 
						value="newUser" 
						checked={isNewUser}
						onChange={handleRadio}
					/>
					<label htmlFor="new-user">No, create a new account</label>

					<input 
						type="radio" 
						id="old-user" 
						value="oldUser" 
						checked={!isNewUser}
						onChange={handleRadio}
					/>
					<label htmlFor="old-user">Yes, log in with your account</label>
				</div>
				{
					isNewUser ? <Register /> : <Login />
				}
			</section>
		}

		

	</main>

}

export default connect(
	state => ({
		isLogged: userSelector(state).email ? true : false,
		isAdmin: userSelector(state).role === "admin"
	}), 
	null
)(User)