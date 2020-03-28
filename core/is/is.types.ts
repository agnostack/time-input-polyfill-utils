import { Hour24, Hour12, String12hr, String24hr, TimeObject } from '../../types'

export interface ValidateTimeStringProps {
	value: string
	format: 'string12hr' | 'string24hr'
	minHrs: Hour24 | Hour12
	maxHrs: Hour24 | Hour12
}

export interface Is {
	PM: {
		hrs24: (hrs24: Hour24) => boolean
		string12hr: (string12hr: String12hr) => boolean
		string24hr: (string24hr: String24hr) => boolean
		timeObject: (timeObject: TimeObject) => boolean
	}
	AM: {
		hrs24: (hrs24: Hour24) => boolean
		string12hr: (string12hr: String12hr) => boolean
		string24hr: (string24hr: String24hr) => boolean
		timeObject: (timeObject: TimeObject) => boolean
	}
	timeObject: (value: any) => boolean
	string12hr: (value: any) => boolean
	string24hr: (value: any) => boolean
}
