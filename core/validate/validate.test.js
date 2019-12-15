import { validate } from './validate'
import { failTest } from '../../cypress/helpers/failTest'

/* global describe, expect, it */

describe('validate 12 hour time', () => {
	it('"12:00" FAIL', () => {
		failTest(() => validate.string12hr('12:00'), '"12:00" is not a valid 12 hour time')
	})
	it('"" FAIL', () => {
		failTest(() => validate.string12hr(''), '"" is not a valid 12 hour time')
	})
	it('"12:00 AM" PASS', () => {
		expect(validate.string12hr('12:00 AM')).to.equal(true)
	})
	it('"12:59 AM" PASS', () => {
		expect(validate.string12hr('12:59 AM')).to.equal(true)
	})
	it('"12:60 AM" FAIL', () => {
		failTest(() => validate.string12hr('12:60 AM'), '"12:60 AM" is not a valid 12 hour time')
	})
	it('"13:00 AM" FAIL', () => {
		failTest(() => validate.string12hr('13:00 PM'), '"13:00 PM" is not a valid 12 hour time')
	})
	it('"2:00 PM" PASS', () => {
		expect(validate.string12hr('2:00 PM')).to.equal(true)
	})
	it('"--:-- PM" PASS', () => {
		expect(validate.string12hr('--:-- PM')).to.equal(true)
	})
	it('"--:--" FAIL', () => {
		failTest(() => validate.string12hr(''), '"" is not a valid 12 hour time')
	})
})

describe('validate 24 hour time', () => {
	it('"00:00" PASS', () => {
		expect(validate.string24hr('12:00')).to.equal(true)
	})
	it('"12:00" PASS', () => {
		expect(validate.string24hr('12:00')).to.equal(true)
	})
	it('"12:59" PASS', () => {
		expect(validate.string24hr('12:59')).to.equal(true)
	})
	it('"12:60" FAIL', () => {
		failTest(() => validate.string24hr('12:60'), '"12:60" is not a valid 24 hour time')
	})
	it('"24:00" FAIL', () => {
		failTest(() => validate.string24hr('24:00'), '"24:00" is not a valid 24 hour time')
	})
	it('"" PASS', () => {
		expect(validate.string24hr('')).to.equal(true)
	})
	it('"12:00 AM" FAIL', () => {
		failTest(() => validate.string24hr('12:00 AM'), '"12:00 AM" is not a valid 24 hour time')
	})
	it('"2:00 PM" FAIL', () => {
		failTest(() => validate.string24hr('2:00 PM'), '"2:00 PM" is not a valid 24 hour time')
	})
	it('"--:-- PM" FAIL', () => {
		failTest(() => validate.string24hr('--:-- PM'), '"--:-- PM" is not a valid 24 hour time')
	})
})

describe('validate time object', () => {
	it('needs tests written', () => {
		failTest(() => {}, '???')
	})
})
