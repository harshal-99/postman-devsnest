import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";

import {selectUser} from "../reducers/userReducer";
import RequestList from "./RequestList";
import {useLocation} from "react-router-dom";

function Main() {
	const {user} = useSelector(selectUser)

	if (!user) {
		return <Box>
			<Typography component="h2">
				Please login
			</Typography>
		</Box>
	}

	return (
		<div className="flex w-2/5">
			<RequestList/>
		</div>
	);
}

export default Main;
