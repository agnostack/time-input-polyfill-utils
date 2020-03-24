import { Hour24, Hour12, String12hr, String24hr, TimeObject } from "../../types";

export interface ValidateTimeStringProps {
	value: string
	format: 'string12hr' | 'string24hr'
	minHrs: Hour24 | Hour12
	maxHrs: Hour24 | Hour12
}

export interface Is {
	PM: {
		hrs24: (hrs24: Hour24) => Boolean
		string12hr: (string12hr: String12hr) => Boolean
		string24hr: (string24hr: String24hr) => Boolean
		timeObject: (timeObject: TimeObject) => Boolean
	}
	AM: {
		hrs24: (hrs24: Hour24) => Boolean
		string12hr: (string12hr: String12hr) => Boolean
		string24hr: (string24hr: String24hr) => Boolean
		timeObject: (timeObject: TimeObject) => Boolean
	}
	timeObject: (value: any) => Boolean
	string12hr: (value: any) => Boolean
	string24hr: (value: any) => Boolean
}
