import {AppBar, Box, Button, Container} from "@mui/material";
import {Link} from "react-router-dom";
import {useAuth} from "./Auth";

const NavBar = () => {
	const auth = useAuth()
	const isLoggedIn = auth?.user
		? <Button variant="outlined" style={{color: "white"}} color="error" onClick={() => auth.logout()}>Logout</Button>
		: <>
			<Button variant="outlined"><Link style={{color: 'white'}} to='/login'>Login</Link></Button>
			<Button variant="outlined"><Link style={{color: 'white'}} to='/signup'>Signup</Link></Button>
		</>
	return (
		<AppBar position="static">
			<Container maxWidth="x1">
				<Box>
					{isLoggedIn}
				</Box>
			</Container>
		</AppBar>
	)
}

export default NavBar
