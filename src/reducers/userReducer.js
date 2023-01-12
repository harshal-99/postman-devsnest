import {createSlice} from "@reduxjs/toolkit"
import userService from "../service/user.service";

const initialState = {
	user: null,
}

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload
			window.localStorage.setItem("user", JSON.stringify(action.payload))
		},
		clearUser(state) {
			state.user = null
			window.localStorage.removeItem("user")
		}
	}
})

export const {setUser, clearUser} = userSlice.actions

export const selectUser = (state) => state.user

export default userSlice.reducer

export const loginUser = (username, password, cb) => {
	return async (dispatch) => {
		try {
			const user = await userService.addUser(username, password)
			dispatch(setUser(user))
			cb()
		} catch (e) {
			console.log(e)
		}
	}
}

export const logoutUser = () => {
	return async (dispatch) => {
		dispatch(clearUser())
	}
}

export const loginFromLocalStorage = () => {
	return async (dispatch) => {
		const savedUser = window.localStorage.getItem('user')
		if (!savedUser) return
		const user = JSON.parse(savedUser)
		if (user) {
			dispatch(setUser(user))
		}
	}
}

export const signUpUser = (username, password, cb) => {
	return async () => {
		const {error} = await userService.signup(username, password)
		if (error) console.log(error)
		cb()
	}
}
