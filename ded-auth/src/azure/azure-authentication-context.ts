//import {AzureAuthenticationContext} from './azure-authentication-context'
import {MSAL_CONFIG} from './azure-authentication-config'
import
{ PublicClientApplication,
	AuthenticationResult,
	AccountInfo,
	EndSessionRequest,
  RedirectRequest,
  PopupRequest,
} from "@azure/msal-browser";

export class AzureAuthenticationContext {
	private MYMSALObj: PublicClientApplication = new PublicClientApplication(
		MSAL_CONFIG
	);
	private account?: AccountInfo;
	private loginRedirectRequest?: RedirectRequest;
	private loginRequest?: PopupRequest;

	public isAuthticationConfigured = false;

	constructor() {
		// @ts-ignore
		this.account = null;
		this.setRequestObjects();
		if (MSAL_CONFIG?.auth?.clientId) {
			this.isAuthticationConfigured = true;
		}
	}
	private setRequestObjects(): void {
		this.loginRequest = {
			scopes: [],
			prompt: "select_account",
		};

		this.loginRedirectRequest = {
			...this.loginRequest,
			redirectStartPage: window.location.href,
		};
	}

	login(signInType: string, setUser: any): void {
		if (signInType === "loginPopup") {
			this.MYMSALObj.loginPopup(this.loginRequest)
				.then((resp: AuthenticationResult) => {
					this.handleResponse(resp, setUser);
				})
				.catch((err) => {
					console.error(err);
				});
		} else if (signInType === "loginRedirect") {
			this.MYMSALObj.loginRedirect(this.loginRedirectRequest);
		}
	}

	logout(account: AccountInfo): void {
		const logOutRequest: EndSessionRequest = {
			account,
		};

		this.MYMSALObj.logout(logOutRequest);
	} //Deprecated logout function. Use logoutRedirect or logoutPopup instead
	handleResponse(response: AuthenticationResult, incomingFunction: any) {
		if (response !==null && response.account !==null) {
			this.account = response.account;
		} else {
			this.account = this.getAccount ();
		}

		if (this.account) {
			incomingFunction(this.account);
		}
	}
	private getAccount(): AccountInfo | undefined {
		console.log('loadAuthModeule');
		const currentAccounts = this.MYMSALObj.getAllAccounts();
		if (currentAccounts === null) {
			//@ts-ignore
			console.log("No accounts detected");
			return undefined;
		}

		if (currentAccounts.length > 1) {
			//TBD: add choose acct code here
			// @ts-ignore
			console.log(
				"multiple accounts detected, need to add choose account code."
			);
			return currentAccounts[0];
		}	else if (currentAccounts.length === 1) {
			return currentAccounts[0];
		}
	}
};

export default AzureAuthenticationContext;
