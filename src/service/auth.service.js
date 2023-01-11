import axios from 'axios'
import {REACT_APP_BACKEND_URL} from "../utils/config";

const login = async ({username, password}) => {
	const user = JSON.parse(localStorage.getItem('user'))
	if (user) return user
	const response = await axios
		.post(REACT_APP_BACKEND_URL + '/api/auth/login', {username, password})
	return response.data
}

const signup = async ({username, password}) => {
	const response = await axios
		.post(REACT_APP_BACKEND_URL + '/api/auth/signup', {username, password})
	return response.data
}

const AuthService = {login, signup}

export default AuthService
