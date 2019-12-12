import { TimeObject } from '../../types/timeObject'

export const string12hr = {
	increment: {
		hrs: {
			to12hr: (time12hr: string): string => '01:30 PM',
			to24hr: (time12hr: string): string => '13:30',
			toObject: (time12hr: string): TimeObject => ({
				hrs: 1,
				min: 30,
				mode: 'PM',
			}),
		},
	},
}

export const string24hr = {
	increment: {
		hrs: {
			to12hr: (time24hr: string): string => '01:30 PM',
			to24hr: (time24hr: string): string => '13:30',
			toObject: (time24hr: string): TimeObject => ({
				hrs: 1,
				min: 30,
				mode: 'PM',
			}),
		},
	},
}

export const timeObject = {
	increment: {
		hrs: {
			to12hr: (timeObject: TimeObject): string => '01:30 PM',
			to24hr: (timeObject: TimeObject): string => '13:30',
			toObject: (timeObject: TimeObject): TimeObject => ({
				hrs: 1,
				min: 30,
				mode: 'PM',
			}),
		},
	},
}
