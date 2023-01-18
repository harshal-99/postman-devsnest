import {useSelector} from "react-redux";

import {selectUser} from "../reducers/userReducer";
import RequestList from "./RequestList";

function Main() {
	const {user} = useSelector(selectUser)

	if (!user) {
		return <div>
			<h2>
				Please login
			</h2>
		</div>
	}

	return (
		<div className="flex w-2/5">
			<RequestList/>
		</div>
	);
}

export default Main;
