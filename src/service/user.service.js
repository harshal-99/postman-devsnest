import {REACT_APP_BACKEND_URL} from "../utils/config";
import axios from "axios";

const addUser = async (username, password) => {
	const response = await axios.post(REACT_APP_BACKEND_URL + '/api/auth/login', {username, password})
	return response.data
}

const signup = async (username, password) => {
	const response = await axios.post(REACT_APP_BACKEND_URL + '/api/auth/signup', {username, password})
	return response.data
}

const userService = {addUser, signup}

export default userService
