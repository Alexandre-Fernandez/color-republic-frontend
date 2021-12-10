import "./style.css"
import {connect} from "react-redux"
import {logUserIn} from "../../redux/user/actions"
import config from "../../global/config"
import {useState, useEffect} from "react"
import {createUser} from "../../lib/backend"

//todo: add style and display errors in html 


const Register = ({logUserIn}) => {
	const [email, setEmail] = useState("")
	const [emailConfirmation, setEmailConfirmation] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")


	const handleSubmit = async e => {
		e.preventDefault()
		if(!email || email !== emailConfirmation) return console.log(
			"emails are not the same"
		)
		if(!password || password !== passwordConfirmation) return console.log(
			"passwords are not the same"
		)
		try {
			const loginInfo = await createUser(email, password)
			logUserIn(loginInfo)
		} catch(err) {
			console.log(err)
		}
	}


	return <form className="register-form" onSubmit={handleSubmit}>
		<div>
			<input 
				type="email" 
				name="email"
				placeholder="E-mail address" 
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
			<input 
				type="email" 
				name="emailConfirmation" 
				placeholder="Confirm your e-mail address" 
				value={emailConfirmation}
				onChange={e => setEmailConfirmation(e.target.value)}
			/>
		</div>

		<div>
			<input 
				type="password" 
				name="password"
				placeholder="Password"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<input 
				type="password" 
				name="passwordConfirmation"
				placeholder="Confirm your password"
				value={passwordConfirmation}
				onChange={e => setPasswordConfirmation(e.target.value)}
			/>
		</div>

		<input 
			type="submit" 
			value="Register" 
		/>
	</form>

}

export default connect(
	null, 
	dispatch => ({
		logUserIn: (loginInfo) => dispatch(logUserIn(loginInfo))
	})
)(Register)