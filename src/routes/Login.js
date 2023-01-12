import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SnackBar from "../components/SnackBar";
import {useDispatch} from "react-redux";
import {loginUser} from "../reducers/userReducer";

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)

	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()

	const from = location.state?.from || "/"

	const handleSubmit = async (e) => {
		e.preventDefault()
		dispatch(loginUser(username, password, () => navigate('/', {replace: true})))
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
