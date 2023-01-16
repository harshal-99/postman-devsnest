import {useSelector} from "react-redux";
import {selectRequestById} from "../reducers/requestReducer";
import {Link} from "react-router-dom";

const RequestCard = ({requestId}) => {

	const request = useSelector(state => selectRequestById(state, requestId))

	return (
		<>
			<div>{request.type}</div>
			<div>{!request.url.length ? 'Enter url' : request.url}</div>
			<Link to={`/request/${requestId}`}>Open</Link>

		</>
	)
}

export default RequestCard
