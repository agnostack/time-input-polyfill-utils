import { convert } from '../converters/converters'
import { SelectionRange, SelectionIndex, Segment } from '../../types'
import { ranges } from '../staticValues'

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
	rangeOf: ($input: HTMLInputElement) => ({
		fullSelection: (): SelectionRange => ({
			start: <SelectionIndex>$input.selectionStart,
			end: <SelectionIndex>$input.selectionEnd
		}),
		cursorSegment(): SelectionRange {
			const { start } = get.rangeOf($input).fullSelection()
			const inRange = (segment: Segment) => start >= ranges[segment].start && start <= ranges[segment].end

			if (inRange('min')) {
				return ranges.min
			}

			if (inRange('mode')) {
				return ranges.mode
			}

			return ranges.hrs
		},
	})
}
