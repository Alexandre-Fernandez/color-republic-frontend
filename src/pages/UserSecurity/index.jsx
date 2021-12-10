import "./style.css"
import {useState, useEffect} from "react"
import {changeUserPassword, changeUserEmail} from "../../lib/backend"

const UserSecurity = ({}) => {
	const [newEmail, setNewEmail] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [password, setPassword] = useState("")

	const handleSubmit = e => {
		e.preventDefault()
		if(!password) return console.log("Please enter your password")
		if(newEmail) changeUserEmail(password, newEmail)
		.then(() => console.log("Email changed"))
		.catch(err => console.log(err))
		if(newPassword) changeUserPassword(password, newPassword)
		.then(() => console.log("Password changed"))
		.catch(err => console.log(err))
	}

	return <main>
		<form onSubmit={handleSubmit}>
			<input 
				type="email" 
				placeholder="New e-mail"
				value={newEmail}
				onChange={e => setNewEmail(e.target.value)}
			/>
			<input 
				type="password" 
				placeholder="New password"
				value={newPassword}
				onChange={e => setNewPassword(e.target.value)}
			/>
			<input 
				type="password" 
				placeholder="Current password"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<input 
				type="submit" 
				value="Change"
			/>
		</form>

	</main>
}

export default UserSecurity