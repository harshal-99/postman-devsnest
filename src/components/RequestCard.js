import {useDispatch, useSelector} from "react-redux";
import {deleteRequestById, selectRequestById} from "../reducers/requestReducer";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {selectUser} from "../reducers/userReducer";

const RequestCard = ({requestId}) => {
	const {user} = useSelector(selectUser)
	const request = useSelector(state => selectRequestById(state, requestId))
	const dispatch = useDispatch()
	return (
		<>
			<div>{request.type}</div>
			<div>{!request.url.length ? 'Enter url' : request.url}</div>
			<Link to={`/request/${requestId}`}>Open</Link>
			<Button variant="contained" onClick={() => dispatch(deleteRequestById(request.id, user))}>Delete</Button>
		</>
	)
}

export default RequestCard
