import { Segment } from "./segment"

export type SelectionIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type SelectionRange = {
	start: SelectionIndex,
	end: SelectionIndex,
	segment?: Segment
}
