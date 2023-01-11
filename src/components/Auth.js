import {createContext, useContext, useState} from "react";
import AuthService from "../service/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
	const [user, setUser] = useState(null);

	const loginFromLocalStorage = (user) => {
		setUser(user)
	}

	const login = async (user, callback) => {
		try {
			const data = await AuthService.login(user)
			setUser(data)
			localStorage.setItem("user", JSON.stringify(data))
			callback()
		} catch (e) {
			return e.response.data.error
		}
	}

	const logout = (callback) => {
		localStorage.removeItem("user")
		setUser(null)
		if (typeof callback === "function") {
			callback()
		}
	}

	return <AuthContext.Provider value={{user, login, logout, loginFromLocalStorage}}>
		{children}
	</AuthContext.Provider>
}

export const useAuth = () => {
	return useContext(AuthContext)
}
