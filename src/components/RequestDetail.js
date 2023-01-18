import {useParams} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addHeaderToRequest, saveRequest, selectRequestById, updateRequest} from "../reducers/requestReducer";
import HeaderInput from "./HeaderInput";
import axios from "axios";
import {selectUser} from "../reducers/userReducer";

const RequestDetail = () => {
	const {user} = useSelector(selectUser)
	const {requestId} = useParams()
	const request = useSelector(state => selectRequestById(state, requestId));
	const [response, setResponse] = useState(null)
	const requestType = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
	const dispatch = useDispatch()

	const parseCurl = str => {

		const requestDetails = {}
		let strs = str.split(' ')
		strs.forEach(str => str.trim())
		strs = strs.filter(str => str.length)
		console.log(strs)
		const requestIndex = strs.indexOf('--request')
		if (requestIndex !== -1) {
			requestDetails.type = strs[requestIndex + 1]
		}
		const bodyIndex = strs.indexOf('--data-raw')
		if (bodyIndex !== -1) {
			requestDetails.body = strs[bodyIndex + 1]
		}
		const urlIndex = strs.indexOf('--url')
		if (urlIndex !== -1) {
			requestDetails.url = strs[urlIndex + 1]
		}
		return requestDetails
	}

	function handleChange(key, value) {
		const newRequest = {...request}
		newRequest[key] = value
		dispatch(updateRequest(newRequest))
		if (key === 'body') {
			console.log(parseCurl(value))
		}
	}

	const exportToCurl = (request) => {
		let headers = []
		request.headers.forEach(header => {
			if (header.key?.length && header.value?.length) {
				headers.push(`-H "${header.key}: ${header.value}"`)
			}
		})
		return `curl --request ${request.type} --url ${request.url} --data-raw '${request.body}' ${headers.join(' ')}`
	}
	const addNewHeader = () => {
		dispatch(addHeaderToRequest(request.id, {key: '', value: '', checked: ''}, user))
	}

	async function sendRequest() {
		const configs = {};
		for (const header of request.headers) {
			if (header.checked) {
				configs.headers = {[header.key]: header.value}
			}
		}

		dispatch(saveRequest(request, user))
		let response = null
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
				response = await axios.post(request.url, parsedStr, configs);
				break;
			}
			default: {
				console.log('default')
			}
		}
		let responseHeaders = []
		for (let key in response.headers) {
			responseHeaders.push([key, response.headers[key]])
		}
		response.headers = responseHeaders
		setResponse(response)
	}

	if (!request) {
		return <div>Loading...</div>
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="flex justify-around w-full mt-5">
				<label>Type</label>
				<select
					id='type'
					value={request.type}

					onChange={e => handleChange('type', e.target.value)}
				>
					{requestType.map(type => <option key={type} value={type}>{type}</option>)}
				</select>

				<input type="text" className="w-3/5 mt-5" id="url"
				       value={request.url} onChange={e => handleChange('url', e.target.value)}/>
				<button className="mt-5" onClick={sendRequest}>Send</button>
			</div>
			<div className="flex justify-around w-full">
				<button onClick={addNewHeader}>Add Header</button>
				<button onClick={() => {
					navigator.clipboard.writeText(exportToCurl(request)).then(r => console.log('success'))
				}}>Export to cURL
				</button>
			</div>
			<ul className="mt-5">
				{request.headers.map(header =>
					<HeaderInput key={header.id} requestId={request.id} headerId={header.id}/>
				)}
			</ul>
			<div className="mt-5">
				<input
					type="text"
					id='text-field'
					value={request.body}
					onChange={e => handleChange('body', e.target.value)}
				/>
			</div>
			{response &&
				<>
					<div className="mt-5">
						Response Body
					</div>
					<div>Status Code {response.status}</div>
					<div className="grid grid-cols-2 w-72">
						<div className="border border-black">Key</div>
						<div className="border border-black">Value</div>
						{response.headers.map(val => {
							return (
								<>
									<div className="border border-black" key={val[0]}>{val[0]}</div>
									<div className="border border-black" key={val[1]}>{val[1]}</div>
								</>
							)
						})}
					</div>
					<div className="border-4 mt-5">
						<pre>
						<code>
							{JSON.stringify(response.data, null, 4)}
						</code>
						</pre>
					</div>
				</>
			}
		</div>
	)
}

export default RequestDetail
