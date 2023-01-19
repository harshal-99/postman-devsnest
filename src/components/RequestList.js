import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createNewRequest, initializeRequests, selectRequestIds} from "../reducers/requestReducer";
import {selectUser} from "../reducers/userReducer";
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
				<button className="border border-black" onClick={() => dispatch(createNewRequest(
					{type: '', url: '', body: '', headers: []}, user))}>+
				</button>
			</div>
			<ul>
				{requests.map(request => {
					return <li className="flex justify-around border border-black" key={request}>
						<RequestCard key={request} requestId={request}/>
					</li>
				})}
			</ul>
		</div>
	)
}


export default RequestList
