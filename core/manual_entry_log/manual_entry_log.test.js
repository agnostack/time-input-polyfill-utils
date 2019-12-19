import { manual_entry_log } from './manual_entry_log'
import { TimeObjectKeys } from '../../types/timeObject'

/* global describe, expect, it */

const entryLog = new manual_entry_log()

const basicTest = ({ description, testName, action, value }) => {
	describe(description, () => {
		TimeObjectKeys.forEach(key => {
			it(testName.replace('$prop', key), () => {
				if (action) {
					action(key)
				}
				expect(entryLog[key]).to.deep.equal(value)
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
	action: key => entryLog.add(key, '1'),
	value: [1],
})
basicTest({
	description: 'Adding a 2nd value to each key',
	testName: 'Adds "2" to $prop',
	action: key => entryLog.add(key, '2'),
	value: [1, 2],
})

describe('Clearing each value in each key', () => {
	const clearProp = (prop, propValues) => {
		it(`Clears ${prop}`, () => {
			entryLog.clear(prop)
			expect(entryLog.hrs24).to.deep.equal(propValues.hrs24)
			expect(entryLog.hrs12).to.deep.equal(propValues.hrs12)
			expect(entryLog.min).to.deep.equal(propValues.min)
			expect(entryLog.mode).to.deep.equal(propValues.mode)
		})
	}

	const clear = []
	const filled = [1, 2]

	clearProp('hrs24', { hrs24: clear, hrs12: filled, min: filled, mode: filled })
	clearProp('hrs12', { hrs24: clear, hrs12: clear, min: filled, mode: filled })
	clearProp('min', { hrs24: clear, hrs12: clear, min: clear, mode: filled })
	clearProp('mode', { hrs24: clear, hrs12: clear, min: clear, mode: clear })
})

describe('Clearing all keys at once', () => {
	it('clear all', () => {
		TimeObjectKeys.forEach(key => entryLog.add(key, '1'))
		entryLog.clearAll()
		TimeObjectKeys.forEach(key => expect(entryLog[key]).to.deep.equal([]))
	})
})
