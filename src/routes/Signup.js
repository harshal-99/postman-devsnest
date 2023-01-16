import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
				<TextField label="Username" variant="outlined" id="username" type="text" value={username}
				           onChange={event => setUsername(event.target.value)}/>
				<TextField label="Password" variant="outlined" id="password" type="password" value={password}
				           onChange={event => setPassword(event.target.value)}/>
				<Button variant="contained" type="submit">Signup</Button>
			</form>
		</>
	)
}

export default Signup;
