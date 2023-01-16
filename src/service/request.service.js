import axios from "axios";
import {REACT_APP_BACKEND_URL} from "../utils/config";


const getAllRequests = async (user) => {
	const response = await axios.get(REACT_APP_BACKEND_URL + '/api/request', {
		headers: {
			Authorization: `Bearer ${user.token}`
		},
		query: {
			userId: user.id
		}
	})
	return response.data
}

const addNewRequest = async (request, user) => {
	const response = await axios.post(REACT_APP_BACKEND_URL + '/api/request/0', request, {
		headers: {
			Authorization: `Bearer ${user.token}`
		}
	})
	return response.data
}

const updateRequest = async (request, user) => {
	const response = await axios.post(REACT_APP_BACKEND_URL + '/api/request/' + request.id, request, {
		headers: {
			Authorization: `Bearer ${user.token}`
		}
	})
	return response.data
}

const getRequestById = async (requestId, user) => {
	const response = await axios.get(REACT_APP_BACKEND_URL + '/api/request/' + requestId, {
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

const addNewHeader = async (requestId, header, user) => {
	const response = await axios.post(REACT_APP_BACKEND_URL + '/api/request/' + requestId + '/header/0', header, {
		headers: {
			Authorization: `Bearer ${user.token}`
		}
	})
	return response.data
}

const updateHeader = async (requestId, header, user) => {
	const response = await axios.post(REACT_APP_BACKEND_URL + '/api/request/' + requestId + '/header/' + header.id, header, {
		headers: {
			Authorization: `Bearer ${user.token}`
		}
	})
	return response.data
}

const deleteHeaderFromRequest = async (requestId, headerId, user) => {
	const response = await axios.delete(REACT_APP_BACKEND_URL + '/api/request/' + requestId + '/header/' + headerId, {
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
	getRequestById,
	deleteRequest,
	addNewHeader,
	updateHeader,
	deleteHeaderFromRequest
}

export default requestService
