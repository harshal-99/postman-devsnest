import React from 'react';
import ReactDOM from 'react-dom/client';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

import './index.css';
import App from './App';
import userReducer from "./reducers/userReducer";
import requestReducer from "./reducers/requestReducer";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RequestDetail from "./components/RequestDetail";
import Signup from "./routes/Signup";
import Login from "./routes/Login";

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore(
	{
		reducer: {
			user: userReducer,
			request: requestReducer,
		}
	}
)

const router = createBrowserRouter([
	{
		path: '/',
		element: <Provider store={store}><App/></Provider>,
		children: [
			{
				path: '/request/:requestId',
				element: <RequestDetail/>
			},
		]
	},
	{
		path: '/login',
		element: <Provider store={store}><Login/></Provider>,
	},
	{
		path: '/signup',
		element: <Provider store={store}><Signup/></Provider>,
	}

])

root.render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>
);

