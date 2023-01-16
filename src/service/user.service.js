import axios from "axios";
import {REACT_APP_BACKEND_URL} from "../utils/config";

const addUser = async (username, password) => {
	const response = await axios.post(REACT_APP_BACKEND_URL + '/api/auth/login', {username, password})
	return response.data
}

const signup = async (username, password) => {
	const response = await axios.post(REACT_APP_BACKEND_URL + '/api/auth/signup', {username, password})
	return response.data
}

const isTokenValid = async (token) => {
	try {
		const response = await axios.get(REACT_APP_BACKEND_URL + '/api/auth', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		return response.data
	} catch (e) {
		if (e.response.data.error === 'token expired') {
			window.localStorage.clear()
		}
		return false
	}
}

const userService = {addUser, signup, isTokenValid}

export default userService
