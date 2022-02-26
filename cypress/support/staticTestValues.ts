import { String12hr, String24hr, TimeObject } from '../../types/index'

export const inputID = 'testInput'
export const inputPreFilledID = 'testInputPreFilled'

export const preFilledValues = {
	string12hr: '12:00 AM' as String12hr,
	string24hr: '00:00' as String24hr,
	timeObject: {
		hrs24: 0,
		hrs12: 12,
		minutes: 0,
		mode: 'AM',
	} as TimeObject,
}
