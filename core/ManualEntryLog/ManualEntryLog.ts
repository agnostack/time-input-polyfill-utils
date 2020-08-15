import { Segment, Hour12, TimeObject, Minute, Mode } from '../../types/index'
import { maxAndMins } from '../staticValues'

class SegmentLog {
	value: Hour12 | Minute | Mode
	segment: Segment
	entries: Array<number | string> = []

	constructor(startingValue: Hour12 | Minute | Mode, segment: Segment) {
		this.value = startingValue
		this.segment = segment
	}

	/**
	 * Adds a value to the to the log and keeps track of what the end value should be
	 * @param keyName - Expected to be a keyboard key name like "1" or "a"
	 */
	add(keyName: string): void {
		const number = parseInt(keyName)
		const isZero = this.entries.length === 0 && number === 0

		// Handles AM/PM
		if (this.segment === 'mode') {
			if (keyName.toLowerCase() === 'a') {
				this.value = 'AM'
				this.entries = [keyName]
			}
			if (keyName.toLowerCase() === 'p') {
				this.value = 'PM'
				this.entries = [keyName]
			}
		} else if (!isNaN(number) && !isZero) {
			if ([0, 2].includes(this.entries.length)) {
				this.entries = [number]
			} else {
				const fullNumber = parseInt([...this.entries, number].join(''))
				const fullNumberGreaterThanMax = fullNumber > maxAndMins[this.segment].max

				if (fullNumberGreaterThanMax) {
					this.entries = [0, number]
				} else {
					this.entries.push(number)
				}
			}

			this.value = <Hour12 | Minute>parseInt(this.entries.join(''))
		}
	}

	/**
	 * Reset is needed for things like typing "1", then leaving, then coming back.
	 *
	 * The tracker should reset if they are returning.
	 */
	reset(): void {
		this.entries = []
	}

	/**
	 * Deletes the current value. Use this if the user presses delete or backspace.
	 */
	clear(): void {
		this.reset()
		this.value = '--'
	}
}

class SegmentLogHrs extends SegmentLog {
	constructor(startingValue: Hour12) {
		super(startingValue, 'hrs12')
	}
}

class SegmentLogMin extends SegmentLog {
	constructor(startingValue: Minute) {
		super(startingValue, 'minutes')
	}
}

class SegmentLogMode extends SegmentLog {
	constructor(startingValue: Mode) {
		super(startingValue, 'mode')
	}
}

// Note: Due to this being a class, it does not need an interface
/**
 * Used for keeping track of Manual key strokes inside a time input
 * @param timeObject - The current Time object value
 */
export class ManualEntryLog {
	hrs12: SegmentLogHrs
	minutes: SegmentLogMin
	mode: SegmentLogMode

	constructor(timeObject: TimeObject) {
		this.hrs12 = new SegmentLogHrs(timeObject.hrs12)
		this.minutes = new SegmentLogMin(timeObject.minutes)
		this.mode = new SegmentLogMode(timeObject.mode)
	}

	/**
	 * Deletes all of the values for all of the segments.
	 */
	clearAll(): void {
		this.hrs12.clear()
		this.minutes.clear()
		this.mode.clear()
	}
}
