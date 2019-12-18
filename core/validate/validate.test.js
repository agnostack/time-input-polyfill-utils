import { validate } from './validate'
import { failTest } from '../../cypress/helpers/failTest'

/* global describe, expect, it */

const writeBadValue = badValue => (typeof badValue === 'string' ? `"${badValue}"` : badValue)

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
	it('basic time object', () => {
		expect(validate.timeObject({ hrs24: 13, hrs12: 1, min: 0, mode: 'PM' })).to.equal(true)
	})
	it('hrs12 & hrs24 mismatch', () => {
		failTest(
			() => validate.timeObject({ hrs24: 1, hrs12: 1, min: 0, mode: 'PM' }),
			'If mode is "PM", hrs24 should be 12 hours ahead of hrs12',
		)
	})
	describe('invalid properties', () => {
		it('"hrs" property is not valid', () => {
			failTest(
				() => validate.timeObject({ hrs: 1, min: 0, mode: 'AM' }),
				'the "hrs" property is not valid, valid properties are "hrs12", "hrs24", "min", and "mode": { "hrs": 1, "min": 0, "mode": "AM" }',
			)
		})
		it('"hour" property is not valid', () => {
			failTest(
				() => validate.timeObject({ hour: 1, min: 0, mode: 'AM' }),
				'the "hour" property is not valid, valid properties are "hrs12", "hrs24", "min", and "mode": { "hour": 1, "min": 0, "mode": "AM" }',
			)
		})
		it('"hours" property is not valid', () => {
			failTest(
				() => validate.timeObject({ hours: 1, min: 0, mode: 'AM' }),
				'the "hours" property is not valid, valid properties are "hrs12", "hrs24", "min", and "mode": { "hours": 1, "min": 0, "mode": "AM" }',
			)
		})
		it('"hours12" property is not valid', () => {
			failTest(
				() => validate.timeObject({ hours12: 1, min: 0, mode: 'AM' }),
				'the "hours12" property is not valid, valid properties are "hrs12", "hrs24", "min", and "mode": { "hrs24": 1, "hours12": 1, "min": 0, "mode": "AM" }',
			)
		})
		it('"hours24" property is not valid', () => {
			failTest(
				() => validate.timeObject({ hours24: 1, min: 0, mode: 'AM' }),
				'the "hours24" property is not valid, valid properties are "hrs12", "hrs24", "min", and "mode": { "hours24": 1, "hrs12": 1, "min": 0, "mode": "AM" }',
			)
		})
		it('"mins" property is not valid', () => {
			failTest(
				() => validate.timeObject({ hrs: 1, mins: 0, mode: 'AM' }),
				'the "mins" property is not valid, valid properties are "hrs12", "hrs24", "min", and "mode": { "hrs24": 1, "hrs12": 1, "mins": 0, "mode": "AM" }',
			)
		})
		it('"minutes" property is not valid', () => {
			failTest(
				() => validate.timeObject({ hrs24: 1, hrs12: 1, minutes: 0, mode: 'AM' }),
				'the "minutes" property is not valid, valid properties are "hrs12", "hrs24", "min", and "mode": { "hrs24": 1, "hrs12": 1, "minutes": 0, "mode": "AM" }',
			)
		})
	})
	describe('invalid property types', () => {
		const numberTypeCheck = ({ propName, lower, upper }) => {
			const validTimeObject = { hrs24: 1, hrs12: 1, min: 0, mode: 'AM' }
			const goodValue = validTimeObject[propName]
			const badPropValues = [`${goodValue}`, goodValue + 1, goodValue - 1]
			const badTimeObjects = badPropValues.map(badValue => ({
				...validTimeObject,
				[propName]: badValue,
			}))

			const testNames = [
				`"${propName}" is an invalid string`,
				`"${propName}" is out of upper range (${upper + 1})`,
				`"${propName}" is out of lower range (${lower - 1})`,
			]

			describe(propName, () => {
				testNames.forEach((testName, index) => {
					const badValue = writeBadValue(badPropValues[index])
					it(testName, () => {
						failTest(
							() => validate.timeObject(badTimeObjects[index]),
							`"${propName}" must be a number ${lower}-${upper} or "--": ${propName} = ${badValue}`,
						)
					})
				})
			})
		}

		numberTypeCheck({ propName: 'hrs24', lower: 0, upper: 23 })
		numberTypeCheck({ propName: 'hrs12', lower: 1, upper: 12 })
		numberTypeCheck({ propName: 'min', lower: 0, upper: 59 })

		describe('mode', () => {
			const modeTest = (testName, mode) => {
				const badValue = writeBadValue(mode)
				it(testName, () => {
					failTest(
						() => validate.timeObject({ hrs24: 1, hrs12: 1, min: 0, mode }),
						`Mode value is invalid, valid mode values are "AM", "PM", and "--": mode = ${badValue}`,
					)
				})
			}
			modeTest('empty string invalid', '')
			modeTest('lower case is invalid', 'am')
			modeTest('nonsense is invalid', 'abc')
			modeTest('numbers are invalid', 1)
		})
	})

	describe('missing properties', () => {
		const validTimeObject = { hrs24: 1, hrs12: 1, min: 0, mode: 'AM' }

		const missingPropTest = missingProp => {
			const badTimeObject = { ...validTimeObject }
			delete badTimeObject[missingProp]

			it(`${missingProp} property is missing`, () => {
				failTest(
					() => validate.timeObject(badTimeObject),
					`timeObject is missing the "${missingProp}" property: ${JSON.stringify(
						badTimeObject,
					)}`,
				)
			})
		}

		missingPropTest('hrs24')
		missingPropTest('hrs12')
		missingPropTest('min')
		missingPropTest('mode')
	})
})
