import { String12hr, String24hr, TimeObject } from "../types";

interface BlankValues {
	string12hr: String12hr
	string24hr: String24hr
	timeObject: TimeObject
}

export const blankValues: BlankValues = {
	string12hr: '--:-- --',
	string24hr: '',
	timeObject: {
		hrs24: '--',
		hrs12: '--',
		min: '--',
		mode: '--',
	},
}
