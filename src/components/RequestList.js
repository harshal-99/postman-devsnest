import Button from "@mui/material/Button";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createNewRequest, initializeRequests, selectRequestIds} from "../reducers/requestReducer";
import {selectUser} from "../reducers/userReducer";
import {Box, List, ListItem} from "@mui/material";
import RequestCard from "./RequestCard";

const RequestList = () => {

	const dispatch = useDispatch()
	const {user} = useSelector(selectUser)
	const requests = useSelector(selectRequestIds)

	useEffect(() => {
		dispatch(initializeRequests(user))
	}, [dispatch, user])

	return (
		<div className="w-full">
			<div className="flex justify-between">
				<div>Create New Request</div>
				<Button variant="contained" onClick={() => dispatch(createNewRequest(
					{type: '', url: '', body: '', headers: []}, user))}>+</Button>
			</div>
			<Box>
				<List>
					{requests.map(request => {
						return <ListItem sx={{display: 'flex', 'justifyContent': 'space-around'}} key={request}>
							<RequestCard key={request} requestId={request}/>
						</ListItem>
					})}
				</List>
			</Box>
		</div>
	)
}


export default RequestList
