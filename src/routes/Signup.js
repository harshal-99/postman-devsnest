import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {signUpUser} from "../reducers/userReducer";
import NavBar from "../components/NavBar";

const Signup = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const handleFormSubmit = async (event) => {
		event.preventDefault()
		dispatch(signUpUser(username, password, () => navigate('/login', {replace: true})))
	}

	return (
		<>
			<NavBar/>
			<form className="mt-1.5" onSubmit={handleFormSubmit}>
				<input id="username" type="text" value={username}
				       className="border-2 border-black" placeholder="Username"
				       onChange={event => setUsername(event.target.value)}/>
				<input id="password" type="password" value={password}
				       className="border-2 border-black" placeholder="Password"
				       onChange={event => setPassword(event.target.value)}/>
				<button type="submit">Signup</button>
			</form>
		</>
	)
}

export default Signup;
