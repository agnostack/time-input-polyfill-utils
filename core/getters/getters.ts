import { convert } from '../converters/converters'
import { SelectionRange, SelectionIndex, Segment } from '../../types'
import { ranges, rangesList } from '../staticValues'

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
