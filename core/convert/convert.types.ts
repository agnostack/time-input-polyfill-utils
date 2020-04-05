import { String12hr, String24hr, TimeObject, Hour24, Hour12 } from '../../types/index'

export interface ConvertString12hr {
	(string12hr: String12hr): {
		to24hr: () => String24hr
		toTimeObject: () => TimeObject
	}
}

export interface ConvertString24hr {
	(string24hr: String24hr): {
		to12hr: () => String12hr
		toTimeObject: () => TimeObject
	}
}
export interface ConvertTimeObject {
	(timeObject: TimeObject, skipValidation?: boolean): {
		to12hr: () => String12hr
		to24hr: () => String24hr
	}
}
export interface ConvertHours24 {
	(hours24: Hour24): {
		toHours12: () => Hour12
	}
}
export interface ConvertDateObject {
	(date: Date): {
		to12hr: () => String12hr
		to24hr: () => String24hr
		toTimeObject: () => TimeObject
	}
}
