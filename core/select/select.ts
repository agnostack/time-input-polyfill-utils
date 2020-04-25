import { toArray } from '../utils/utils'
import { getRangeOf } from '../get/get'
import { ranges } from '../staticValues'
import {
	QuerySelectAll,
	SelectSegment,
	SelectNextSegment,
	SelectPrevSegment,
	SelectCursorSegment,
} from './select.types'

export const _$$: QuerySelectAll = selector => {
	const elements = document.querySelectorAll(selector)
	return toArray(elements)
}

export const selectSegment: SelectSegment = ($input, segment = 'hrs12') => {
	if (!$input) return
	$input.setSelectionRange(ranges[segment].start, ranges[segment].end)
}
export const selectNextSegment: SelectNextSegment = $input => {
	if (!$input) return
	const { start, end } = getRangeOf($input).nextSegment()
	$input.setSelectionRange(start, end)
}
export const selectPrevSegment: SelectPrevSegment = $input => {
	if (!$input) return
	const { start, end } = getRangeOf($input).prevSegment()
	$input.setSelectionRange(start, end)
}
export const selectCursorSegment: SelectCursorSegment = $input => {
	if (!$input) return
	const { start, end } = getRangeOf($input).cursorSegment()
	$input.setSelectionRange(start, end)
}
