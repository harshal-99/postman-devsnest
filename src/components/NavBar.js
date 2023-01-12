import {AppBar, Box, Button, Container} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser, selectUser} from "../reducers/userReducer";


const NavBar = () => {
	const {user} = useSelector(selectUser)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const isLoggedIn = user
		? <Button variant="outlined" style={{color: "white"}} color="error"
		          onClick={() => dispatch(logoutUser())}>Logout</Button>
		: <>
			<Button variant="outlined"><Link style={{color: 'white'}} to='/login'>Login</Link></Button>
			<Button variant="outlined"><Link style={{color: 'white'}} to='/signup'>Signup</Link></Button>
		</>
	return (
		<AppBar position="static">
			<Container maxWidth="x1">
				<Box>
					{user &&
						<Button variant="outlined" style={{color: "white"}} color="error"
						        onClick={() => dispatch(logoutUser())}>Logout</Button>
					}
					{!user &&
						<>
							<Button variant="outlined"><Link style={{color: 'white'}} to='/login'>Login</Link></Button>
							<Button variant="outlined"><Link style={{color: 'white'}} to='/signup'>Signup</Link></Button>
						</>
					}
				</Box>
			</Container>
		</AppBar>
	)
}

export default NavBar
