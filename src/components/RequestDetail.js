import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import {useLocation} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveRequest, selectRequestById} from "../reducers/requestReducer";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Box} from "@mui/material";
import HeaderInput from "./HeaderInput";
import axios from "axios";
import {selectUser} from "../reducers/userReducer";

const RequestDetail = () => {
	const {user} = useSelector(selectUser)
	const location = useLocation();
	const requestId = location.pathname.split('/').pop()
	const [request, setRequest] = useState(useSelector(state => selectRequestById(state, requestId)))
	const requestType = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
	const dispatch = useDispatch()

	function handleChange(key, value) {
		setRequest(prev => {
			const newValue = {...prev}
			newValue[key] = value
			return newValue
		});
	}

	async function sendRequest() {
		const configs = {};
		for (const header of request.headers) {
			if (header.checked) {
				configs.headers = {[header.key]: header.value}
			}
		}

		dispatch(saveRequest(request, user))

		let response = ''
		switch (request.type) {
			case 'GET': {
				response = await axios.get(request.url, configs);
				break;
			}
			case 'DELETE' : {
				response = await axios.delete(request.url, configs);
				break;
			}
			case 'POST': {
				let parsedStr

				parsedStr = JSON.parse(`${request.body}`);
				break;
			}
			default: {
				console.log('default')
			}
		}

	}



	return (
		<div className="flex flex-col justify-center items-center">
			<div className="flex justify-around w-full mt-5">
				<InputLabel id="type">Type</InputLabel>
				<Select
					labelId='type'
					id='type'
					value={request.type}
					label='Type'
					onChange={e => handleChange('type', e.target.value)}
				>
					{requestType.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
				</Select>

				<TextField className="w-3/5 mt-5" id="url" label='URL' variant="outlined"
				           value={request.url} onChange={e => handleChange('url', e.target.value)}/>
				<Button className="mt-5" variant="contained" onClick={sendRequest}>Send</Button>
			</div>
			<div className="flex justify-around w-full">
				<Button variant="contained">Add Header</Button>
				<div>Headers</div>
				<Button variant="contained">Delete Header</Button>
			</div>
			<Box className="mt-5">
				{request.headers.map(header =>
					<HeaderInput key={header.id} requestId={request.id} header={header}/>
				)}

			</Box>
			<Box className="mt-5">
				{/*				<TextField
					label="Request Body"
					id='text-field'
					value={requestBody}
					onChange={e => setRequestBody(e.target.value)}
					multiline
				></TextField>*/}
			</Box>
			<div className="mt-5">
				Response Body
			</div>
			<div className="border-4 mt-5">
				<pre><code>
				{/*	{JSON.stringify(response, null, 4)}*/}
				</code></pre>
			</div>
		</div>
	)
}

export default RequestDetail
