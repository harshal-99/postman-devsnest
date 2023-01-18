import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {loginUser} from "../reducers/userReducer";
import NavBar from "../components/NavBar";

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleSubmit = async (e) => {
		e.preventDefault()
		dispatch(loginUser(username, password, () => navigate('/', {replace: true})))
	}

	return (
		<>
			<NavBar/>
			<form className="mt-1.5" onSubmit={handleSubmit}>
				<input id="username" type="text" value={username}
				       className="border-2 border-black" placeholder="Username"
				       onChange={event => setUsername(event.target.value)}/>
				<input id="password" type="password" value={password}
				       className="border-2 border-black" placeholder="Password"
				       onChange={event => setPassword(event.target.value)}/>
				<button type="submit">Login</button>
			</form>
		</>
	)
}

export default Login;
