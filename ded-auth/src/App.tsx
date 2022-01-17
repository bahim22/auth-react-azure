import logo from './logo.svg';
import './App.css';

import React, { useState } from "react";
//import AzureAuthenticationContext from "./azure-authentication-context";
import { AccountInfo } from "@azure/msal-browser";
//import { json } from 'stream/consumers';
import AzureAuthenticationButton from './azure/azure-authentication-component';

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
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div>
		);
	};
	// Quick link - user revokes app's permission
	const ShowPermissionRevokeLinks = () => {
		return (
			<div>
				<div>
					<a
						href="https://myapps.microsoft.com"
						target="_blank"
						rel="noreferrer">
						Revoke AAD permission
					</a>
				</div>
				<div>
					<a
						href="https://account.live.com/consent/manage"
						target="_blank"
						rel="noreferrer">
						Revoke Consumer permission
					</a>
				</div>
			</div>
		);
	};

	return (
		<div id="App"  className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to  <code>HimaLand:</code> Dionysus Era
        </p>
        <a
          className="App-link"
          href="https://github.com/bahim22"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Profile
        </a>
      </header>
			<h2>Login to Continue</h2>
			<AzureAuthenticationButton onAuthenticated={onAuthenticated} />
			{currentUser && (
				<div>
					<PrettyPrintJson data={currentUser} />
					<ShowPermissionRevokeLinks />
				</div>
			)}
		</div>
	)
}
/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default App;
