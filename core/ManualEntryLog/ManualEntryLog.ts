import { Segment, Hour12, TimeObject } from '../../types/index'

class SegmentLogHrs {
	value: Hour12
	entries: Array<number>

	constructor(startingValue: Hour12) {
		this.value = startingValue

		const doubleDigits: Array<Hour12> = [10, 11, 12]

		if (doubleDigits.indexOf(startingValue)) {
			const singleDigit = <10 | 11 | 12>startingValue - 10
			this.entries = [1, singleDigit]
		} else if (startingValue !== '--') {
			this.entries = [startingValue]
		} else {
			this.entries = []
		}
	}

	add(value: string): void {
		const number = parseInt(value)
		if (!isNaN(number)) {
			if (number > 1) {
				this.entries = [0, number]
			} else {
				if (number === 1) {

				}
				if (this.entries.length === 0) {
					this.entries = [number]
				}
				if (this.entries.length === 1) {
					this.entries.push(number)
				}
				if (this.entries.length === 2) {
					this.entries = [number]
				}
			}
		}

		if (this.entries[0] === 0 ||)
	}

	clear(): void {
		this.entries = []
		this.value = '--'
	}
}

// Note: Due to this being a class, it does not need an interface
export class ManualEntryLog {
	hrs12: SegmentLogHrs
	min: SegmentLogMin
	mode: SegmentLogMode

	constructor(timeObject: TimeObject) {
		this.hrs12 = new SegmentLogHrs(timeObject.hrs12)
		this.min = new SegmentLogMin(timeObject.min)
		this.mode = new SegmentLogMode(timeObject.mode)
	}

	clear(segment: Segment): void {
		this[segment] = []
	}

	clearAll(): void {
		this.hrs12.clear()
		this.min = []
		this.mode = []
	}

	add(segment: Segment, entry: number | string): void {
		this[segment].add(entry)
	}
}
