import { toArray } from '../convert/convert'
import { Segment } from '../../types'
import { get } from '../get/get'
import { ranges } from '../staticValues'

export function _$$(selector: string) {
	var elements = document.querySelectorAll(selector)
	return toArray(elements)
}

export const select = ($input: HTMLInputElement) => ({
	segment(segment: Segment) {
		$input.setSelectionRange(ranges[segment].start, ranges[segment].end)
	},
	nextSegment() {
		const { start, end } = get.rangeOf($input).nextSegment()
		$input.setSelectionRange(start, end)
	},
	prevSegment() {
		const { start, end } = get.rangeOf($input).prevSegment()
		$input.setSelectionRange(start, end)
	},
	cursorSegment() {
		const { start, end } = get.rangeOf($input).cursorSegment()
		$input.setSelectionRange(start, end)
	},
})
