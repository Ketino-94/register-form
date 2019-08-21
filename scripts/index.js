import React from 'react'
import ReactDOM from 'react-dom'

import App from './app';

import store from "./store";
import { Provider } from "react-redux";

window.store = store;

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('body')
);