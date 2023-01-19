import {useDispatch, useSelector} from "react-redux";
import {deleteHeaderById, selectRequestHeader, updateHeader} from "../reducers/requestReducer";
import {selectUser} from "../reducers/userReducer";

const HeaderInput = ({requestId, headerId}) => {
	const dispatch = useDispatch();
	const header = useSelector(state => selectRequestHeader(state, requestId, headerId));
	const {user} = useSelector(selectUser);
	const handleChange = (key, newValue) => {
		const newHeader = {...header}
		newHeader[key] = newValue;
		dispatch(updateHeader({requestId, header: newHeader}))
	}
	return (
		<li key={header.id}>
			<input className="border border-black" type="checkbox" value={header.checked}
			       onChange={e => handleChange('checked', e.target.checked)}/>
			<input className="border border-black" type="text" id="key" value={header.key}
			       placeholder="key"
			       onChange={e => handleChange('key', e.target.value)}/>
			<input className="border border-black" type="text" id="value" value={header.value}
			       placeholder="value"
			       onChange={e => handleChange('value', e.target.value)}/>
			<button type="button"
			        className="border border-black"
			        onClick={() => dispatch(deleteHeaderById(requestId, headerId, user))}
			>Delete
			</button>
		</li>
	)
}

export default HeaderInput
