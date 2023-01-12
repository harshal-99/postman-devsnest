import {useEffect} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import {useDispatch, useSelector} from "react-redux";
import {loginFromLocalStorage, selectUser} from "./reducers/userReducer";
import {initializeRequests} from "./reducers/requestReducer";

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)

	useEffect(() => {
		dispatch(loginFromLocalStorage())
		dispatch(initializeRequests(user))
	}, [dispatch])


	return (
		<BrowserRouter>
			<NavBar/>
			<Routes>
				<Route path="/" element={<Main/>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/signup" element={<Signup/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
