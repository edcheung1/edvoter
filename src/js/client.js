import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Featured from "./pages/Featured";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Polls from "./pages/Polls";
import Settings from "./pages/Settings";

const app = document.getElementById('app');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Featured}></IndexRoute>
			<Route path="login" component={Login}></Route>
			<Route path="polls(/:poll)" component={Polls}></Route>
			<Route path="settings" component={Settings}></Route>
		</Route>
	</Router>,
app);