import {createSlice} from "@reduxjs/toolkit";
import requestService from "../service/request.service";

const initialState = {
	requests: [],
	requestIds: []
}
/*
{\
id: '',
url: '',
type: '',
body: '',
headers: [
	{
		id: '',
		key: '',
		value: '',
		checked: '',
	}
]
}
*/

export const requestSlice = createSlice({
	name: "request",
	initialState,
	reducers: {
		setRequests(state, action) {
			action.payload.forEach(request => {
				if (!state.requestIds.includes(request.id)) {
					state.requestIds.push(request.id)
					state.requests.push(request)
				}
			})
		},
		addNewRequest(state, action) {
			const newRequest = action.payload
			if (!state.requestIds.indexOf(newRequest.id)) {
				state.requestIds.push(newRequest.id)
				state.requests.push(newRequest)
			}
		},
		updateRequest(state, action) {
			const request = action.payload
			const index = state.requestIds.indexOf(request.id)
			if (index !== -1) {
				state.requests[index] = request
			}
		},
		deleteRequest(state, action) {
			delete state.requests[action.payload.id]
			state.requestIds = state.requestIds.filter(id => id !== action.payload.id)
		},
		updateHeader(state, action) {
			const savedRequest = action.payload
			const request = state.requests.find(request => request.id === savedRequest.id)
			request.headers = savedRequest.headers
		},
	}
})

export const {setRequests, addNewRequest, updateRequest, deleteRequest, addHeader, deleteHeader} = requestSlice.actions

export const selectRequests = (state) => state.request
export const selectRequestIds = (state) => state.request.requestIds
export const selectRequestById = (state, id) => state.request.requests.find(req => req.id === id)
export default requestSlice.reducer

export const initializeRequests = (user) => {
	return async (dispatch) => {
		const requests = await requestService.getAllRequests(user)
		dispatch(setRequests(requests))
	}
}

export const createNewRequest = (request, user) => {
	return async (dispatch) => {
		try {
			const newRequest = await requestService.addNewRequest(request, user)
			dispatch(addNewRequest(newRequest))
		} catch (e) {
			console.log(e)
		}
	}
}

export const saveRequest = (request, user) => {
	return async (dispatch) => {
		try {
			const updatedRequest = await requestService.updateRequest(request, user)
			dispatch(updateRequest(updatedRequest))
		} catch (e) {
			console.log(e)
		}
	}
}

export const deleteRequestById = (id, user) => {
	return async (dispatch) => {
		try {
			await requestService.deleteRequest(id, user)
			dispatch(deleteRequest(id))
		} catch (e) {
			console.log(e)
		}
	}
}

export const addHeaderToRequest = (requestId, header, user) => {
	return async (dispatch) => {
		try {
			const savedHeader = await requestService.addNewHeader(requestId, header, user)
			dispatch(addHeader(savedHeader))
		} catch (e) {
			console.log(e)
		}
	}
}

export const updateHeader = (requestId, header, user) => {
	return async (dispatch) => {
		try {
			const updatedHeader = await requestService.updateHeader(requestId, header, user)
			dispatch(addHeader(updatedHeader))
		} catch (e) {
			console.log(e)
		}
	}
}
