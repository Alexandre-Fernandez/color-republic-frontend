import "./style.css"
import {connect} from "react-redux"
import {logUserIn} from "../../redux/user/actions"
import config from "../../global/config"
import {useState, useEffect} from "react"
import {getTokens} from "../../lib/backend"

//todo: add style and display errors in html 


const Login = ({login}) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")


	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const loginInfo = await getTokens(email, password)
			login(loginInfo)
		} catch(err) {
			console.log(err)
		}
	}


	return <form className="login-form" onSubmit={handleSubmit}>
		<div>
			<input 
				type="email" 
				name="email"
				placeholder="E-mail address" 
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
			<input 
				type="password" 
				name="password"
				placeholder="Password"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
		</div>
		
		<input 
			type="submit" 
			value="Login"
		/>
	</form>
}


export default connect(
	null, 
	dispatch => ({
		login: (loginInfo) => dispatch(logUserIn(loginInfo))
	})
)(Login)