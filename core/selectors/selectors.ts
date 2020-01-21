import { toArray } from '../converters/converters'
import { Segment } from '../../types'
import { get } from '../getters/getters'
import { ranges } from '../staticValues'

export function _$$(selector: string) {
	var elements = document.querySelectorAll(selector)
	return toArray(elements)
}

export const select = ($input: HTMLInputElement) => ({
	segment(segment: Segment) {
		$input.setSelectionRange(ranges[segment].start, ranges[segment].end)
	},
	nextSegment() { },
	prevSegment() { },
	cursorSegment() {
		const { start, end } = get.rangeOf($input).cursorSegment()
		$input.setSelectionRange(start, end)
	},
})
