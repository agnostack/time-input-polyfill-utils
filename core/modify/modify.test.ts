import { TimeObject, String12hr, String24hr } from '../../types/index'

import hoursIncrementTests from './tests/increment/hours.increment.test'
import hoursDecrementTests from './tests/decrement/hours.decrement.test'
import minutesIncrementTests from './tests/increment/minutes.increment.test'
import minutesDecrementTests from './tests/decrement/minutes.decrement.test'
import toggleModeTest from './tests/toggleMode.test'

export { current } from '../../helpers/currentDate'

type TimeStringFormat = 'string24hr' | 'string12hr'

interface StringModifierTest {
	before: String24hr | String12hr
	after: String24hr | String12hr
	test: () => String24hr | String12hr
}

interface ObjectModifierTest {
	before: TimeObject
	after: TimeObject
	test: () => TimeObject
}

export interface BeforeAfterString {
	before: String12hr | String24hr
	after: String12hr | String24hr
}

export interface BeforeAfterObject {
	before: TimeObject
	after: TimeObject
}

export function modifierTest({ before, after, test }: StringModifierTest): void {
	it(`${before} => ${after}`, () => {
		expect(test()).to.equal(after)
	})
}

export function deepModifierTest({ before, after, test }: ObjectModifierTest): void {
	it(`${JSON.stringify(before)} => ${JSON.stringify(after)}`, () => {
		expect(test()).to.deep.equal(after)
	})
}

describe('Hours', () => {
	hoursIncrementTests()
	hoursDecrementTests()
})

describe('Minutes', () => {
	minutesIncrementTests()
	minutesDecrementTests()
})

toggleModeTest()
