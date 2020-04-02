import { Hour24, Mode } from '../types'
import { toLeadingZero, isAmHrs24, convertHours24, convertDateObject } from '..'

const date = new Date()
const current24hrs = <Hour24>date.getHours()

export const current = {
	hrs24: toLeadingZero(current24hrs),
	hrs12: toLeadingZero(convertHours24(current24hrs).toHours12()),
	min: toLeadingZero(convertDateObject(date).toTimeObject().min),
	mode: <Mode>(isAmHrs24(current24hrs) ? 'AM' : 'PM'),
	date,
	string24hr: convertDateObject(date).to24hr(),
	string12hr: convertDateObject(date).to12hr(),
	timeObject: convertDateObject(date).toTimeObject(),
}
