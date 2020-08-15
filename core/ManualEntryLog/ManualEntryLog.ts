import { Segment, Hour12, TimeObject, Minute, Mode, String12hr } from '../../types/index'
import { maxAndMins } from '../staticValues'
import { toLeadingZero } from '../utils/utils'

type UpdateFunc = () => void

class SegmentLog {
	value: Hour12 | Minute | Mode
	segment: Segment
	entries: Array<number | string> = []
	update: UpdateFunc

	constructor(startingValue: Hour12 | Minute | Mode, segment: Segment, update: UpdateFunc) {
		this.value = startingValue
		this.segment = segment
		this.update = update
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

		this.update()
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
		this.update()
	}
}

class SegmentLogHrs extends SegmentLog {
	constructor(startingValue: Hour12, update: UpdateFunc) {
		super(startingValue, 'hrs12', update)
	}
}

class SegmentLogMin extends SegmentLog {
	constructor(startingValue: Minute, update: UpdateFunc) {
		super(startingValue, 'minutes', update)
	}
}

class SegmentLogMode extends SegmentLog {
	constructor(startingValue: Mode, update: UpdateFunc) {
		super(startingValue, 'mode', update)
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
	fullValue12hr: String12hr

	constructor(timeObject: TimeObject) {
		this.hrs12 = new SegmentLogHrs(timeObject.hrs12, () => this.update())
		this.minutes = new SegmentLogMin(timeObject.minutes, () => this.update())
		this.mode = new SegmentLogMode(timeObject.mode, () => this.update())
		this.fullValue12hr = this.getFullValue12hr()
	}

	update(): void {
		this.fullValue12hr = this.getFullValue12hr()
	}

	getFullValue12hr(): String12hr {
		return [
			toLeadingZero(this.hrs12.value),
			':',
			toLeadingZero(this.minutes.value),
			' ',
			this.mode.value,
		].join('')
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
