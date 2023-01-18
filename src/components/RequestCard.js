import {useDispatch, useSelector} from "react-redux";
import {deleteRequestById, selectRequestById} from "../reducers/requestReducer";
import {Link, useNavigate} from "react-router-dom";
import {selectUser} from "../reducers/userReducer";

const RequestCard = ({requestId}) => {
	const {user} = useSelector(selectUser)
	const navigation = useNavigate()
	const request = useSelector(state => selectRequestById(state, requestId))
	const dispatch = useDispatch()
	return (
		<>
			<div>{request.type}</div>
			<div>{!request.url.length ? 'Enter url' : request.url}</div>
			<Link to={`/request/${requestId}`}>Open</Link>
			<button
				onClick={() => dispatch(deleteRequestById(request.id, user, () => navigation('/', {replace: true})))}>Delete
			</button>
		</>
	)
}

export default RequestCard
