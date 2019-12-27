import { Hour24 } from '../types'
import { toLeadingZero, convert, is } from '..'

const date = new Date()
const current24hrs = <Hour24>date.getHours()

export const current = {
	hrs24: toLeadingZero(current24hrs),
	hrs12: toLeadingZero(convert.hours24(current24hrs).toHours12()),
	min: toLeadingZero(convert.dateObject(date).toTimeObject().min),
	mode: is.AM.hrs24(current24hrs) ? 'AM' : 'PM',
	date,
}
