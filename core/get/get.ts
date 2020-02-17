import { convert } from '../convert/convert'
import { SelectionRange, SelectionIndex, Segment, TimeObject, String12hr, String24hr } from '../../types'
import { ranges, rangesList } from '../staticValues'
import { regex } from '../regex/regex'

const traverseSegmentRanges = ($input: HTMLInputElement, direction: 'forward' | 'backward') => {
	const currentSegmentRange = get.rangeOf($input).cursorSegment()
	const currentType = currentSegmentRange.type
	const modifier = direction === 'forward' ? 1 : -1
	const nextTypeIndex = rangesList.map(range => range.type).indexOf(currentType) + modifier
	return rangesList[nextTypeIndex] || currentSegmentRange
}

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
	inputValue: ($input: HTMLInputElement) => {
		const value = $input.value
		const is12hrTime = regex.string12hr.test(value)
		const is24hrTime = regex.string24hr.test(value)
		return {
			as12hrString: (): String12hr => is12hrTime ? value : convert.string24hr(value).to12hr(),
			as24hrString: (): String24hr => is24hrTime ? value : convert.string12hr(value).to24hr(),
			asTimeObject: (): TimeObject => is12hrTime ? convert.string12hr(value).toTimeObject() : convert.string24hr(value).toTimeObject()
		}
	},
	rangeOf: ($input: HTMLInputElement) => ({
		fullSelection: (): SelectionRange => ({
			start: <SelectionIndex>$input.selectionStart,
			end: <SelectionIndex>$input.selectionEnd,
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
		nextSegment: () => traverseSegmentRanges($input, 'forward'),
		prevSegment: () => traverseSegmentRanges($input, 'backward')
	})
}
