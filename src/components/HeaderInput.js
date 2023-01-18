import {useDispatch, useSelector} from "react-redux";
import {selectRequestHeader, updateHeader} from "../reducers/requestReducer";

const HeaderInput = ({requestId, headerId}) => {
	const dispatch = useDispatch();
	const header = useSelector(state => selectRequestHeader(state, requestId, headerId));
	const handleChange = (key, newValue) => {
		const newHeader = {...header}
		newHeader[key] = newValue;
		dispatch(updateHeader({requestId, header: newHeader}))
	}
	return (
		<li key={header.id}>
			<input type="checkbox" value={header.checked} onChange={e => handleChange('checked', e.target.checked)}/>
			<input type="text" id="key" value={header.key}
			       onChange={e => handleChange('key', e.target.value)}/>
			<input type="text" id="value" value={header.value}
			       onChange={e => handleChange('value', e.target.value)}/>
		</li>
	)
}

export default HeaderInput
