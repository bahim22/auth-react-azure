import React, { useState } from "react"
import AzureAuthenticationContext from "./azure-authentication-context"
import { AccountInfo } from "@azure/msal-browser"
import { JsxEmit } from "typescript";

const ua = window.Navigator.userAgent;
const msie = ua.indexOf ("MSIE ");
const msie11 = ua.indexOf ("Trident/ ");
const isIE = msie > 0 || msie11 > 0;

//Login & logout button
const AzureAuthenticationButton = ({onAuthenticated }: any): JSX.Element => {
	//Az client context
	const authenticationModule: AzureAuthenticationContext = new AzureAuthenticationContext();
	const [authenticated, setAuthenticated] = useState<Boolean>(false);
	const [user, setUser] = useState<AccountInfo>();
}