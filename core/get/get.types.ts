import { String12hr, String24hr, TimeObject, SelectionRange } from '../../types/index'

interface ExtendedTimeObject extends TimeObject {
	timeObject: TimeObject
}

export type GetString12hr = (string12hr: String12hr) => ExtendedTimeObject
export type GetString24hr = (string24hr: String24hr) => ExtendedTimeObject
export type GetInputValue = (
	$input: HTMLInputElement,
) => {
	as12hrString: () => String12hr
	as24hrString: () => String24hr
	asTimeObject: () => TimeObject
}
export type GetLabelTextOf = ($input: HTMLInputElement, document: Document) => string
export type GetRangeOf = (
	$input: HTMLInputElement,
) => {
	rawSelection: () => SelectionRange
	cursorSegment: () => SelectionRange
	nextSegment: () => SelectionRange
	prevSegment: () => SelectionRange
}
export type GetAncestorsOf = (
	$startingElem: HTMLElement,
	selectorString?: string,
) => Array<HTMLElement>
