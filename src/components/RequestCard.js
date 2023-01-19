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
			<div className="border border-black">{request.type}</div>
			<div className="border border-black">{!request.url.length ? 'Enter url' : request.url}</div>
			<Link className="border border-black" to={`/request/${requestId}`}>Open</Link>
			<button className="border border-black"
				onClick={() => dispatch(deleteRequestById(request.id, user, () => navigation('/', {replace: true})))}>Delete
			</button>
		</>
	)
}

export default RequestCard
