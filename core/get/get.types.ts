import { String12hr, String24hr, TimeObject, SelectionRange } from "../../types";

interface ExtendedTimeObject extends TimeObject {
	timeObject: TimeObject
}

export interface Get {
	string12hr: (string12hr: String12hr) => ExtendedTimeObject
	string24hr: (string24hr: String24hr) => ExtendedTimeObject
	inputValue: ($input: HTMLInputElement) => {
		as12hrString: () => String12hr
		as24hrString: () => String24hr
		asTimeObject: () => TimeObject
	}
	labelTextOf: ($input: HTMLInputElement, document: Document) => string
	rangeOf: ($input: HTMLInputElement) => {
		rawSelection: () => SelectionRange,
		cursorSegment: () => SelectionRange,
		nextSegment: () => SelectionRange,
		prevSegment: () => SelectionRange,
	},
	ancestorsOf: ($startingElem: HTMLElement, selectorString?: string) => Array<HTMLElement>
}
