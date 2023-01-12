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
headers: []
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
		deleteRequest(state, action) {
			delete state.requests[action.payload.id]
			state.requestIds = state.requestIds.filter(id => id !== action.payload.id)
		}
	}
})

export const {setRequests, addNewRequest, deleteRequest} = requestSlice.actions

export const selectRequests = (state) => state.request

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

export const updateRequest = (request, user) => {
	return async (dispatch) => {
		try {
			const updatedRequest = await requestService.updateRequest(request, user)
			dispatch(addNewRequest(updatedRequest))
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
