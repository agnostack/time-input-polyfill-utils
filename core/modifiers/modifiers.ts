import { TimeObject } from '../../types/timeObject'

export const string12hr = {
	increment: {
		hrs: (time12hr: string): string => '01:30 PM',
	},
}

export const string24hr = {
	increment: {
		hrs: (time24hr: string): string => '13:30',
	},
}

export const object12hr = {
	increment: {
		hrs: (timeObject: TimeObject): TimeObject => ({
			hrs: 1,
			min: 30,
			mode: 'PM',
		}),
	},
}
