import { convert } from '../converters/converters'

export const get = {
	string12hr: (string12hr: string) => {
		const timeObject = convert.string12hr(string12hr).toTimeObject()
		return {
			...timeObject,
			timeObject,
		}
	},
	string24hr: (string24hr: string) => {
		const timeObject = convert.string24hr(string24hr).toTimeObject()
		return {
			...timeObject,
			timeObject,
		}
	},
}
