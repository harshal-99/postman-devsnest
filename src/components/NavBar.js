import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {logoutUser, selectUser} from "../reducers/userReducer";


const NavBar = () => {
	const {user} = useSelector(selectUser)
	const dispatch = useDispatch()

	return (
		<div className="sticky">
			<div className="w-full bg-black">
				<div>
					{user &&
						<button type="button" style={{color: "white"}} color="error"
						        onClick={() => dispatch(logoutUser())}>Logout</button>
					}
					{!user &&
						<>
							<button className="mr-2.5"><Link style={{color: 'white'}} to='/login'>Login</Link></button>
							<button><Link style={{color: 'white'}} to='/signup'>Signup</Link></button>
						</>
					}
				</div>
			</div>
		</div>
	)
}

export default NavBar
