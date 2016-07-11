import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory, browserHistory } from "react-router";

import Featured from "./pages/Featured";
import Layout from "./pages/Layout";
import Polls from "./pages/Polls";
import MyPolls from "./pages/MyPolls";
import NewPoll from "./pages/NewPoll";

const app = document.getElementById('app');

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Featured}></IndexRoute>
			<Route path="mypolls" component={MyPolls}></Route>
			<Route path="polls(/:poll)" component={Polls}></Route>
			<Route path="newpoll" component={NewPoll}></Route>
		</Route>
	</Router>,
app);