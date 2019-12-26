import { modify } from './modifiers'
import { convert, toLeadingZero } from '../converters/converters'

import { Hour24, TimeObject, String12hr, String24hr } from '../../types'

import hoursTests from './tests/increment/hours.increment.test'

interface ModifierTest {
	action: 'increment' | 'decrement'
	target: 'hours' // | 'minutes' | 'mode'
	integration: 'isolated' | 'integrated'
}

interface StringModifierTest extends ModifierTest {
	format: 'string24hr' | 'string12hr'
	before: String24hr | String12hr
	after: String24hr | String12hr
}

interface ObjectModifierTest extends ModifierTest {
	format?: 'timeObject'
	before: TimeObject
	after: TimeObject
}

export interface BeforeAfterString {
	before: String12hr | String24hr
	after: String12hr | String24hr
}

export interface BeforeAfterObject {
	before: TimeObject
	after: TimeObject
}

export interface CommonSettingsString {
	format: 'string24hr' | 'string12hr'
	action: 'increment' | 'decrement'
	target: 'hours' // | 'minutes' | 'mode'
}

export interface CommonSettingsObject {
	format: 'timeObject'
	action: 'increment' | 'decrement'
	target: 'hours' // | 'minutes' | 'mode'
}

export function modifierTest({
	before,
	after,
	format,
	action,
	target,
	integration,
}: StringModifierTest) {
	it(`${before} => ${after}`, () => {
		expect(modify[format](before)[action][target][integration]()).to.equal(after)
	})
}

export function deepModifierTest({
	before,
	after,
	format = 'timeObject',
	action,
	target,
	integration,
}: ObjectModifierTest) {
	it(`${JSON.stringify(before)} => ${JSON.stringify(after)}`, () => {
		expect(modify[format](before)[action][target][integration]()).to.deep.equal(after)
	})
}

const current24hrs = <Hour24>new Date().getHours()
export const current = {
	hrs24: toLeadingZero(current24hrs),
	hrs12: toLeadingZero(convert.hours24(current24hrs).toHours12()),
}

hoursTests()
