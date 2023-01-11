import {useState} from "react";
import AuthService from "../service/auth.service";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SnackBar from "../components/SnackBar";

const Signup = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)

	const navigate = useNavigate()
	const handleFormSubmit = async (event) => {
		event.preventDefault()

		try {
			await AuthService.signup({username, password})
			navigate('/login', {replace: true})
		} catch (e) {
			setError(e.response.data.error)
		}
	}

	return (
		<form onSubmit={handleFormSubmit}>
			<TextField label="Username" variant="outlined" id="username" type="text" value={username}
			           onChange={event => setUsername(event.target.value)}/>
			<TextField label="Password" variant="outlined" id="password" type="password" value={password}
			           onChange={event => setPassword(event.target.value)}/>
			<Button variant="contained" type="submit">Signup</Button>
			{error && <SnackBar message={error}/>}
		</form>
	)
}

export default Signup;
