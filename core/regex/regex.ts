import { Regex } from './regex.types'

export const regex: Regex = {
	string12hr: /^([0-9-]{2}):([0-9-]{2})\s(AM|PM|--)$/,
	lenientString12hr: /^([0-9-]{1,2}):([0-9-]{1,2})\s(AM|PM|--|-)$/,
	string24hr: /^$|^([0-9]{2}):([0-9]{2})$/,
	lenientString24hr: /^$|^([0-9]{1,2}):([0-9]{1,2})$/,
	alphaNumericKeyName: /^[A-z0-9]$/,
}
