import axios from "axios";
import {REACT_APP_BACKEND_URL} from "../utils/config";


const getAllRequests = async (user) => {
	const response = await axios.get(REACT_APP_BACKEND_URL + '/api/request', {
		headers: {
			Authorization: `Bearer ${user.token}`
		}
	})
	return response.data
}

const addNewRequest = async (request, user) => {
	const response = await axios.post(REACT_APP_BACKEND_URL + '/api/request', request, {
		headers: {
			Authorization: `Bearer ${user.token}`
		}
	})
	return response.data
}

const updateRequest = async (request, user) => {
	const response = await axios.patch(REACT_APP_BACKEND_URL + '/api/request/' + request.id, request, {
		headers: {
			Authorization: `Bearer ${user.token}`
		}
	})
	return response.data
}

const deleteRequest = async (request, user) => {
	const response = await axios.delete(REACT_APP_BACKEND_URL + '/api/request/' + request.id, {
		headers: {
			Authorization: `Bearer ${user.token}`
		}
	})
	return response.data
}

const requestService = {
	getAllRequests,
	addNewRequest,
	updateRequest,
	deleteRequest
}

export default requestService
