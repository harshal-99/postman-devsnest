import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../components/Auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SnackBar from "../components/SnackBar";

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)

	const navigate = useNavigate()
	const location = useLocation()
	const auth = useAuth()

	const from = location.state?.from || "/"

	const handleSubmit = async (e) => {
		e.preventDefault()
		const response = await auth.login({username, password}, () => navigate(from, {replace: true}))
		if (response) {
			setError(response)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<TextField label="Username" variant="outlined" id="username" type="text" value={username}
			           onChange={event => setUsername(event.target.value)}/>
			<TextField label="Password" variant="outlined" id="password" type="password" value={password}
			           onChange={event => setPassword(event.target.value)}/>
			<Button variant="contained" type="submit">Login</Button>
			{error && <SnackBar message={error}/>}
		</form>
	)
}

export default Login;
