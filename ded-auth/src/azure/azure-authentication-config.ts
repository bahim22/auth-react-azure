import { Configuration, LogLevel } from "@azure/msal-browser";

const AzureActiveDirectoryAppClientId: any =
	process.env.REACT_APP_AZ_AD_APP_CLIENT_ID;

export const MSAL_CONFIG: Configuration = {
	auth: {
		clientId: AzureActiveDirectoryAppClientId,
	},
	cache: {
		cacheLocation: "sessionStorage",
		storeAuthStateInCookie: false,
	},
	system: {
		loggerOptions: {
			loggerCallback: (level, message, containsPii) => {
				if (containsPii) {
					return;
				}
				switch (level) {
					case LogLevel.Error:
						console.error(message);
						return;
					case LogLevel.Info:
						console.info(message);
						return;
					case LogLevel.Verbose:
						console.debug(message);
						return;
					case LogLevel.Warning:
						console.warn(message);
						return;
				}
			},
		},
	},
};
// reads the app ID from .env, sets session as browser storage instead of cookies, accounts for personal info when logging
