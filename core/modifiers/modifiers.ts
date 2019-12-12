import { TimeObject } from '../../types/timeObject'

export const modify = {
	string12hr: (time12hr: string) => ({
		increment: {
			hrs: (): string => '01:30 PM',
		},
	}),
	string24hr: (time24hr: string) => ({
		increment: {
			hrs: (): string => '13:30',
		},
	}),
	timeObject: (timeObject: TimeObject) => ({
		increment: {
			hrs: (): TimeObject => ({
				hrs: 1,
				min: 30,
				mode: 'PM',
			}),
		},
	}),
}
