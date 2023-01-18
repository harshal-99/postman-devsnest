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
			if (state.requestIds.indexOf(newRequest.id) === -1) {
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
			state.requests = state.requests.filter(request => request.id !== action.payload)
			state.requestIds = state.requestIds.filter(id => id !== action.payload)
		},
		addHeader(state, action) {
			const newHeader = action.payload.header
			const index = state.requestIds.indexOf(action.payload.requestId)
			if (index !== -1) {
				state.requests[index].headers.push(newHeader)
			}
		},
		updateHeader(state, action) {
			const requestId = action.payload.requestId
			const request = state.requests.find(request => request.id === requestId)
			if (request) {
				const updatedHeader = action.payload.header
				const foundHeader = request.headers.find(header => header.id === updatedHeader.id)
				if (foundHeader) {
					foundHeader.key = updatedHeader.key
					foundHeader.value = updatedHeader.value
					foundHeader.checked = updatedHeader.checked
				}
			}
		},
	}
})

export const {setRequests, addNewRequest, updateRequest, deleteRequest, addHeader, updateHeader} = requestSlice.actions

export const selectRequests = (state) => state.request
export const selectRequestIds = (state) => state.request.requestIds
export const selectRequestById = (state, id) => state.request.requests.find(req => req.id === id)
export const selectRequestHeader = (state, requestId, headerId) => {
	const request = state.request.requests.find(req => req.id === requestId)
	if (!request) {
		return null
	}
	return request.headers.find(header => header.id === headerId)
}
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
			throw e
			// console.log(e)
		}
	}
}

export const deleteRequestById = (id, user, cb) => {
	return async (dispatch) => {
		try {
			await requestService.deleteRequest(id, user)
			dispatch(deleteRequest(id))
			cb()
		} catch (e) {
			console.log(e)
		}
	}
}

export const addHeaderToRequest = (requestId, header, user) => {
	return async (dispatch) => {
		try {
			const savedRequest = await requestService.addNewHeader(requestId, header, user)
			dispatch(updateRequest(savedRequest))
		} catch (e) {
			console.log(e)
		}
	}
}

/*
export const updateHeader = (requestId, header, user) => {
	return async (dispatch) => {
		try {
			console.log(header)
			const savedRequest = await requestService.updateHeader(requestId, header, user)
			dispatch(updateRequest(savedRequest))
		} catch (e) {
			console.log(e)
		}
	}
}
*/
