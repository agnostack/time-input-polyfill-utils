import { ManualEntryLog } from './ManualEntryLog'

import { segments } from '../staticValues'
import { Segment } from '../../types/index'

const entryLog = new ManualEntryLog()

interface BasicTest {
	description: string
	testName: string
	action?: (segment: Segment) => void
	value: Array<string>
}

const basicTest = ({ description, testName, action, value }: BasicTest): void => {
	describe(description, () => {
		segments.forEach(segment => {
			it(testName.replace('$prop', segment), () => {
				if (action) {
					action(segment)
				}
				expect(entryLog[segment]).to.deep.equal(value)
			})
		})
	})
}

basicTest({
	description: 'Initial values',
	testName: 'Expect $prop to be []',
	value: [],
})
basicTest({
	description: 'Adding 1 to each key',
	testName: 'Adds "1" to $prop',
	action: segment => entryLog.add(segment, '1'),
	value: ['1'],
})
basicTest({
	description: 'Adding a 2nd value to each key',
	testName: 'Adds "2" to $prop',
	action: segment => entryLog.add(segment, '2'),
	value: ['1', '2'],
})

interface SegmentValues {
	hrs12: Array<string>
	min: Array<string>
	mode: Array<string>
}

describe('Clearing each value in each key', () => {
	const clearProp = (segment: Segment, segmentValues: SegmentValues): void => {
		it(`Clears ${segment}`, () => {
			entryLog.clear(segment)
			expect(entryLog.hrs12).to.deep.equal(segmentValues.hrs12)
			expect(entryLog.min).to.deep.equal(segmentValues.min)
			expect(entryLog.mode).to.deep.equal(segmentValues.mode)
		})
	}

	const clear: Array<string> = []
	const filled = ['1', '2']

	clearProp('hrs12', { hrs12: clear, min: filled, mode: filled })
	clearProp('min', { hrs12: clear, min: clear, mode: filled })
	clearProp('mode', { hrs12: clear, min: clear, mode: clear })
})

describe('Clearing all keys at once', () => {
	it('clear all', () => {
		segments.forEach(segment => entryLog.add(segment, '1'))
		entryLog.clearAll()
		segments.forEach(segment => expect(entryLog[segment]).to.deep.equal([]))
	})
})
