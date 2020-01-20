import { toArray } from '../converters/converters'
import { Segment } from '../../types'

export function _$$(selector: string) {
	var elements = document.querySelectorAll(selector)
	return toArray(elements)
}

export const select = ($input: HTMLInputElement) => ({
	segment(segment: Segment) { },
	nextSegment() { },
	prevSegment() { },
	cursorSegment() { },
})
