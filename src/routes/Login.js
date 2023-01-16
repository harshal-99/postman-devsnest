import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
				<TextField label="Username" variant="outlined" id="username" type="text" value={username}
				           onChange={event => setUsername(event.target.value)}/>
				<TextField label="Password" variant="outlined" id="password" type="password" value={password}
				           onChange={event => setPassword(event.target.value)}/>
				<Button variant="contained" type="submit">Login</Button>
			</form>
		</>
	)
}

export default Login;
