import {useEffect} from "react";
import {Outlet} from 'react-router-dom'
import {useDispatch} from "react-redux";

import NavBar from "./components/NavBar";
import Main from "./components/Main";
import {loginFromLocalStorage} from "./reducers/userReducer";

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

