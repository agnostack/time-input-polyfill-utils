import { String12hr, String24hr, TimeObject, Hour24, Hour12, Dashes } from "../../types";

export type ToArray = (NodeList: NodeList) => Array<HTMLInputElement>

export type ToNumber = (value: number | string | Dashes) => string | number

export type ToLeadingZero = (value: number | string | Dashes) => string

export interface Convert {
	string12hr: (string12hr: String12hr) => {
		to24hr: () => String24hr
		toTimeObject: () => TimeObject
	}
	string24hr: (string24hr: String24hr) => {
		to12hr: () => String12hr
		toTimeObject: () => TimeObject
	}
	timeObject: (timeObject: TimeObject, skipValidation?: Boolean) => {
		to12hr: () => String12hr
		to24hr: () => String24hr
	}
	hours24: (hours24: Hour24) => {
		toHours12: () => Hour12
	}
	dateObject: (date: Date) => {
		to12hr: () => String12hr
		to24hr: () => String24hr
		toTimeObject: () => TimeObject
	}
}
