import { manual_entry_log } from './manual_entry_log'
import { TimeObjectKeys } from '../../types/timeObject'

/* global describe, expect, it */

const entryLog = new manual_entry_log()

const basicTest = (testDescription, testName, expectedValue) => {
	describe(testDescription, () => {
		TimeObjectKeys.forEach(key => {
			it(testName.replace('$prop', key), () => {
				expect(entryLog[key]).to.deep.equal(expectedValue)
			})
		})
	})
}

basicTest('Initial values', 'Expect $prop to be []', [])
basicTest('Adding 1 to each key', 'Adds "1" to $prop', [1])
basicTest('Adding a 2nd value to each key', 'Adds "2" to $prop', [1, 2])

describe('Clearing each value in each key', () => {
	const clearProp = ({ prop, propVals }) => {
		it(`Clears ${prop}`, () => {
			entryLog.clear(prop)
			expect(entryLog.hrs24).to.deep.equal(propVals.hrs24)
			expect(entryLog.hrs12).to.deep.equal(propVals.hrs12)
			expect(entryLog.min).to.deep.equal(propVals.min)
			expect(entryLog.mode).to.deep.equal(propVals.mode)
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
