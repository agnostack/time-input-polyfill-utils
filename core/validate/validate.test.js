import { validate } from './validate'
import { failTest } from '../../cypress/helpers/failTest'

/* global describe, expect, it */

const writeBadValue = badValue => (typeof badValue === 'string' ? `"${badValue}"` : badValue)

describe('validate 12 hour time', () => {
	const fail12hr = value => {
		it(`"${value}" FAIL`, () => {
			failTest(() => validate.string12hr(value), `"${value}" is not a valid 12 hour time`)
		})
	}
	const pass12hr = value => {
		it(`"${value}" PASS`, () => {
			expect(validate.string12hr(value)).to.equal(true)
		})
	}

	fail12hr('12:00')
	fail12hr('')

	pass12hr('12:00 AM')
	pass12hr('12:59 AM')

	fail12hr('12:60 AM')
	fail12hr('13:00 AM')

	pass12hr('2:00 PM')
	pass12hr('1:-- --')
	pass12hr('01:-- --')
	pass12hr('--:00 --')
	pass12hr('--:-- PM')
	pass12hr('--:-- --')

	fail12hr('--:--')
})

describe('validate 24 hour time', () => {
	const fail24hr = value => {
		it(`"${value}" FAIL`, () => {
			failTest(() => validate.string24hr(value), `"${value}" is not a valid 24 hour time`)
		})
	}
	const pass24hr = value => {
		it(`"${value}" PASS`, () => {
			expect(validate.string24hr(value)).to.equal(true)
		})
	}

	pass24hr('00:00')

	fail24hr('0:00')

	pass24hr('12:00')
	pass24hr('12:59')

	fail24hr('12:60')
	fail24hr('24:00')
	fail24hr('12:00 PM')
	fail24hr('2:00 PM')

	pass24hr('')

	fail24hr('--:--')
	fail24hr('--:-- --')
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
		const invalidProp = propName => {
			it(`"${propName}" property is not valid`, () => {
				const testObject = {
					hrs24: 1,
					hrs12: 1,
					min: 0,
					mode: 'AM',
					[propName]: 1,
				}
				failTest(
					() => validate.timeObject(testObject),
					`The "${propName}" property is not valid, valid properties are "hrs12", "hrs24", "min", and "mode": ${JSON.stringify(
						testObject,
					)}`,
				)
			})
		}

		const invalidProps = ['hrs', 'hour', 'hours', 'hours12', 'hours24', 'mins', 'minutes']
		invalidProps.forEach(prop => invalidProp(prop))
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
