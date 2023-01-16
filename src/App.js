import {useEffect} from "react";
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";

import Login from "./routes/Login";
import Signup from "./routes/Signup";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import {loginFromLocalStorage, selectUser} from "./reducers/userReducer";
import RequestDetail from "./components/RequestDetail";

const App = () => {
	const dispatch = useDispatch()


	useEffect(() => {
		dispatch(loginFromLocalStorage())
	}, [dispatch])


	return (
		<>
			<NavBar/>
			<div className="flex">
				<Main/>
				<div className="w-3/5">
					<Outlet/>
				</div>
			</div>
		</>
	);
}

export default App;
