import { toArray } from '../convert/convert'
import { get } from '../get/get'
import { ranges } from '../staticValues'
import { Select, QuerySelectAll } from './select.types'

export const _$$: QuerySelectAll = selector => {
	const elements = document.querySelectorAll(selector)
	return toArray(elements)
}

export const select: Select = $input => ({
	segment(segment): void {
		$input.setSelectionRange(ranges[segment].start, ranges[segment].end)
	},
	nextSegment(): void {
		const { start, end } = get.rangeOf($input).nextSegment()
		$input.setSelectionRange(start, end)
	},
	prevSegment(): void {
		const { start, end } = get.rangeOf($input).prevSegment()
		$input.setSelectionRange(start, end)
	},
	cursorSegment(): void {
		const { start, end } = get.rangeOf($input).cursorSegment()
		$input.setSelectionRange(start, end)
	},
})
