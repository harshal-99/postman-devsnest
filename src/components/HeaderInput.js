import TextField from "@mui/material/TextField";
import {Checkbox} from "@mui/material";

const HeaderInput = ({checked, keyValue, value, setVal}) => {
	const handleChange = (key, newValue) => {
		setVal(prev => {
			prev[key] = newValue;
			return {...prev}
		})
	}
	return (
		<div>
			<Checkbox onChange={e => handleChange('checked', e.target.checked)}/>
			<TextField id="key" label="key" variant="outlined" value={keyValue}
			           onChange={e => handleChange('key', e.target.value)}/>
			<TextField id="value" label="value" variant="outlined" value={value}
			           onChange={e => handleChange('value', e.target.value)}/>
		</div>
	)
}

export default HeaderInput
