import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../reducers/userReducer";
import {updateHeader} from "../reducers/requestReducer";

const HeaderInput = ({requestId, header}) => {
	const dispatch = useDispatch();
	const {user} = useSelector(selectUser)
	const handleChange = (key, newValue) => {
		header[key] = newValue;
		dispatch(updateHeader(requestId, header, user))
	}
	return (
		<div>
			<Checkbox value={header.checked} onChange={e => handleChange('checked', e.target.checked)}/>
			<TextField id="key" label="key" variant="outlined" value={header.key}
			           onChange={e => handleChange('key', e.target.value)}/>
			<TextField id="value" label="value" variant="outlined" value={header.value}
			           onChange={e => handleChange('value', e.target.value)}/>
		</div>
	)
}

export default HeaderInput
