import { convert } from '../converters/converters'
import { SelectionRange, SelectionIndex } from '../../types'

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
	selectedRangeOf: ($input: HTMLInputElement): SelectionRange => ({
		start: <SelectionIndex>$input.selectionStart, end: <SelectionIndex>$input.selectionEnd
	})
}
