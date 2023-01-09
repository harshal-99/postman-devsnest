import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import {useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

function App() {
	const requestType = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
	const [request, setRequest] = useState(requestType[0]);
	const [requestBody, setRequestBody] = useState('')
	const [url, setUrl] = useState('');
	const [response, setResponse] = useState('');

	function handleSelectChange(event) {
		setRequest(event.target.value);
	}

	async function sendRequest() {
		console.log(request, url, requestBody);
		let response
		switch (request) {
			case 'GET': {
				response = await axios.get(url);
				break;
			}
			case 'DELETE' : {
				response = await axios.delete(url);
				break;
			}
			case 'POST': {
				response = await axios.post(url, requestBody);
			}
		}
		setResponse(response.data);
		console.log(response.data);
	}

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<div className="flex justify-around w-full">
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
				<TextField className="w-3/5" id="url" label='URL' variant="outlined"
				           value={url} onChange={e => setUrl(e.target.value)}
				/>
				<Button variant="contained" onClick={sendRequest}>Send</Button>
			</div>
			<TextField
				label="Request Body"
				id='text-field'
				value={requestBody}
				onChange={e => setRequestBody(e.target.value)}
				multiline
			></TextField>
			<div>
				Response Body
			</div>
			<div className="border-4">
				<pre><code>
					{JSON.stringify(response, null, 4)}
				</code></pre>
			</div>
		</div>
	);
}

export default App;
