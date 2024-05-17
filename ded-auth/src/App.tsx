import './App.css';

import React, { useState } from "react";
//import AzureAuthenticationContext from "./azure-authentication-context";
import { AccountInfo } from "@azure/msal-browser";
//import { json } from 'stream/consumers';
import AzureAuthenticationButton from './azure/azure-authentication-component';
import { prettyPrintJson } from 'pretty-print-json';

function App() {
	//current authenticated User
	const [currentUser, setCurrentuser] = useState<AccountInfo>();

	//auth callback
	const onAuthenticated = async (userAccountInfo: AccountInfo) => {
		setCurrentuser(userAccountInfo);
	};

	//render json data in readable format
	const PrettyPrintJson = ({ data }: any) => {
		return (
			<div>
				<pre id="account" className="json-container">{JSON.stringify(data, null, 2)}</pre>
			</div>
		);
	};
	// Quick link - user revokes app's permission
	const ShowPermissionRevokeLinks = () => {
		return (
			<div>
				<div id="wrapper">
					<a
						href="https://myapps.microsoft.com"
						target="_blank"
						rel="noreferrer">
						<span>Revoke Microsoft Entra permission </span>
					</a>
				</div>
				<br />
				<div id="wrapper">
					<a
						href="https://account.live.com/consent/manage"
						target="_blank"
						rel="noreferrer">
						<span>Revoke Microsoft Live permission </span>
					</a>
				</div>
			</div>
		);
	};



	return (
	<div id="App" className="App">
		<header className="App-header">
			<img src='./logo.svg' className="App-logo" alt="logo" />
			<p>
				Dionysus Era Development <code>Microsoft Entra/Azure Authentication</code> Dionysus Era
			</p>
			<a
				className="App-link"
				href="https://github.com/bahim22"
				target="_blank"
				rel="noopener noreferrer"
			>
			Hima Balde GitHub Profile
			</a>
			<h2>Login to Continue</h2>
			<h3>Use a Microsoft Live or 365 Username</h3>
			<AzureAuthenticationButton onAuthenticated={onAuthenticated} />
			{currentUser && (
				<div>
					<PrettyPrintJson data={currentUser} />
					<ShowPermissionRevokeLinks />
				</div>
			)}
		</header>
	</div>
	)
};

export default App;
