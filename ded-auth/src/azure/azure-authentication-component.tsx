import React, { useState } from "react"
import AzureAuthenticationContext from "./azure-authentication-context"
import { AccountInfo } from "@azure/msal-browser"

const ua = window.Navigator.userAgent;
const msie = ua.indexOf ("MSIE ");
const msie11
const isIE
