import { Segment } from "../../types";

export interface Select {
	($input: HTMLInputElement): {
		segment(segment: Segment): void
		nextSegment(): void
		prevSegment(): void
		cursorSegment(): void
	}
}

export interface QuerySelectAll {
	(selector: string): HTMLInputElement[]
}
