import "./style.css"
import {useState, useEffect} from "react"
import {getAddresses, createAddress} from "../../lib/backend"

const UserAddresses = ({}) => {
	const [addresses, setAddresses] = useState(null)
	const [fullName, setFullName] = useState("")
	const [address, setAddress] = useState("")
	const [additionalInformation, setAdditionalInformation] = useState("")
	const [zip, setZip] = useState("")
	const [city, setCity] = useState("")
	const [state, setState] = useState("")
	const [country, setCountry] = useState("")
	const [phone, setPhone] = useState("")




	useEffect(() => { //optimize by storing in user reducer
		getAddresses()
		.then(res => setAddresses(res))
		.catch(err => console.log(err))
	}, [])

	const handleSubmit = e => {
		e.preventDefault()
		createAddress(fullName, address, city, zip, state, country, additionalInformation, phone)
		.then(() => console.log("address created")) //todo reset addresses
		.catch(err => console.log(err))
	}

	return <main>
		<form className="add-address" onSubmit={handleSubmit}>
			<input 
				type="text" 
				placeholder="Full name"
				value={fullName}
				onChange={e => setFullName(e.target.value)}
			/>
			<input 
				type="text" 
				placeholder="Address"
				value={address}
				onChange={e => setAddress(e.target.value)}
			/>
			<input 
				type="text" 
				placeholder="Additional Information"
				value={additionalInformation}
				onChange={e => setAdditionalInformation(e.target.value)}
			/>
			<input 
				type="text" 
				placeholder="Postal Code"
				value={zip}
				onChange={e => setZip(e.target.value)}
			/>
			<input 
				type="text" 
				placeholder="City"
				value={city}
				onChange={e => setCity(e.target.value)}
			/>
			<input 
			type="text" 
			placeholder="State"
			value={state}
			onChange={e => setState(e.target.value)}
			/>
			<input 
				type="text" 
				placeholder="Country"
				value={country}
				onChange={e => setCountry(e.target.value)}
			/>
			<input 
				type="text" 
				placeholder="Phone"
				value={phone}
				onChange={e => setPhone(e.target.value)}
			/>
			<input type="submit" value="Add new address" />
		</form>
		{ //todo make addresses into its own component and add functionality for edit/delete
			addresses 
			? addresses.map((address, i) => <div key={i}> 
				<h4>{address.fullName}</h4>
				<p>{address.address}</p>
				{
					address.additionalInformation &&
					<p>{address.additionalInformation}</p>
				}
				<p>{`${address.zip} - ${address.city}`}</p>
				<p>{`${address.state}, ${address.country}`}</p>
				{
					address.phone &&
					<p>{address.phone}</p>
				}
			</div>)
			: "Loading..."
		}
	</main>
}

export default UserAddresses