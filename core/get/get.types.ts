import { String12hr, String24hr, TimeObject, SelectionRange, Segment } from '../../types/index'

interface ExtendedTimeObject extends TimeObject {
	timeObject: TimeObject
}

export type GetString12hr = (string12hr: String12hr) => ExtendedTimeObject
export type GetString24hr = (string24hr: String24hr) => ExtendedTimeObject
export type GetInputValue = (
	$input: HTMLInputElement | null,
) => {
	as12hrString: () => String12hr
	as24hrString: () => String24hr
	asTimeObject: () => TimeObject
}
export type GetLabelTextOf = ($input: HTMLInputElement | null, document?: Document) => string

export type GetCursorSegment = ($input: HTMLInputElement | null) => Segment

export type GetRangeOf = (
	$input: HTMLInputElement | null,
) => {
	rawSelection: () => SelectionRange
	cursorSegment: () => SelectionRange
	nextSegment: () => SelectionRange
	prevSegment: () => SelectionRange
}
export type GetAncestorsOf = (
	$startingElem: HTMLElement | null,
	selectorString?: string,
) => Array<HTMLElement>
