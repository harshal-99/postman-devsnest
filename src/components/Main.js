import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import {useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import HeaderInput from "./HeaderInput";
import {useSelector} from "react-redux";
import {selectUser} from "../reducers/userReducer";

function Main() {
	const {user} = useSelector(selectUser)

	const requestType = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
	const [request, setRequest] = useState(requestType[0]);
	const [requestBody, setRequestBody] = useState('')
	const [header, setHeader] = useState({checked: false, key: '', value: ''})
	const [url, setUrl] = useState('');
	const [response, setResponse] = useState('');


	if (!user) {
		return <Box>
			<Typography component="h2">
				Please login
			</Typography>
		</Box>
	}

	function handleSelectChange(event) {
		setRequest(event.target.value);
	}

	async function sendRequest() {
		const configs = {};
		if (header.checked) {
			configs.headers = {[header.key]: header.value}
		}

		let response = ''
		switch (request) {
			case 'GET': {
				response = await axios.get(url, configs);
				break;
			}
			case 'DELETE' : {
				response = await axios.delete(url, configs);
				break;
			}
			case 'POST': {
				let parsedStr
				console.log(requestBody)
				parsedStr = JSON.parse(`${requestBody}`);
				console.log(parsedStr)
			}
		}
		setResponse(response.data);
	}

	return (
		<div className="flex">
			<div className="w-2/5">
				<div className="flex justify-between">
					<div>Create New Request</div>
					<Button variant="contained" onClick={() => console.log('clicked')}>+</Button>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center">
				<div className="flex justify-around w-full mt-5">
					<FormControl variant="standard">
						<InputLabel id="type">Type</InputLabel>
						<Select
							labelId='type'
							id='type'
							value={request}
							label='Type'
							onChange={handleSelectChange}
						>
							{requestType.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
						</Select>
					</FormControl>
					<TextField className="w-3/5 mt-5" id="url" label='URL' variant="outlined"
					           value={url} onChange={e => setUrl(e.target.value)}
					/>
					<Button className="mt-5" variant="contained" onClick={sendRequest}>Send</Button>
				</div>
				<Box className="mt-5">
					<HeaderInput setVal={setHeader} value={header.value} checked={header.checked}
					             keyValue={header.key}/>
				</Box>
				<Box className="mt-5">
					<TextField
						label="Request Body"
						id='text-field'
						value={requestBody}
						onChange={e => setRequestBody(e.target.value)}
						multiline
					></TextField>
				</Box>
				<div className="mt-5">
					Response Body
				</div>
				<div className="border-4 mt-5">
				<pre><code>
					{JSON.stringify(response, null, 4)}
				</code></pre>
				</div>
			</div>
		</div>
	);
}

export default Main;
