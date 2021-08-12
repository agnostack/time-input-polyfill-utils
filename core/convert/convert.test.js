import { failTest } from '../../cypress/support/failTest'
import { CurrentDate } from '../../helpers/currentDate'
import {
	convertDateObject,
	convertHours24,
	convertString12hr,
	convertString24hr,
	convertTimeObject,
} from './convert'

/* global describe, it, expect */

convert_hours24_to_hours12()

convert_24hr_time()
convert_12hr_time()
convert_time_object()
convert_date_object()

function convert_hours24_to_hours12() {
	describe('convertHours24', () => {
		it('Expect "abc" to fail', () => {
			failTest(
				() => convertHours24('abc').toHours12(),
				'"abc" must be a number between 0 and 23 or null, use 0 instead of 24',
			)
		})
		it('Expect -1 hrs to fail', () => {
			failTest(
				() => convertHours24(-1).toHours12(),
				'"-1" must be a number between 0 and 23 or null, use 0 instead of 24',
			)
		})
		it('Expect 0 hrs to be 12', () => {
			expect(convertHours24(0).toHours12()).to.equal(12)
		})
		it('Expect 5 hrs to be 5', () => {
			expect(convertHours24(5).toHours12()).to.equal(5)
		})
		it('Expect 13 hrs to be 1', () => {
			expect(convertHours24(13).toHours12()).to.equal(1)
		})
		it('Expect 23 hrs to be 11', () => {
			expect(convertHours24(23).toHours12()).to.equal(11)
		})
		it('Expect 24 hrs to fail', () => {
			failTest(
				() => convertHours24(24).toHours12(),
				'"24" must be a number between 0 and 23 or null, use 0 instead of 24',
			)
		})
	})
}

function convert_24hr_time() {
	describe('Convert 24hr', () => {
		hr24_to_hr12()
		hr24_to_time_object()

		function hr24_to_hr12() {
			describe('24hr to 12hr', () => {
				it('Expect "" to be "--:-- --"', () => {
					expect(convertString24hr('').to12hr()).to.equal('--:-- --')
				})
				it('Expect "--:--" to error', () => {
					failTest(
						() => convertString24hr('--:--').to12hr(),
						'"--:--" is not a valid 24 hour time. Use an empty string instead of "--:--" to represent a blank value',
					)
				})
				it('Expect "00:00" to be "12:00 AM"', () => {
					expect(convertString24hr('00:00').to12hr()).to.equal('12:00 AM')
				})
				it('Expect "5:30" to error', () => {
					failTest(
						() => convertString24hr('5:30').to12hr(),
						'"5:30" is not a valid 24 hour time.',
					)
					expect(convertString24hr('05:30').to12hr()).to.equal('05:30 AM')
				})
				it('Expect "05:30" to be "05:30 AM"', () => {
					expect(convertString24hr('05:30').to12hr()).to.equal('05:30 AM')
				})
				it('Expect "11:00" to be "11:00 AM"', () => {
					expect(convertString24hr('11:00').to12hr()).to.equal('11:00 AM')
				})
				it('Expect "12:00" to be "12:00 PM"', () => {
					expect(convertString24hr('12:00').to12hr()).to.equal('12:00 PM')
				})
				it('Expect "13:00" to be "01:00 PM"', () => {
					expect(convertString24hr('13:00').to12hr()).to.equal('01:00 PM')
				})
				it('Expect "00:00" to be "12:00 AM"', () => {
					expect(convertString24hr('00:00').to12hr()).to.equal('12:00 AM')
				})
				it('Expect "24:30" to error', () => {
					failTest(
						() => convertString24hr('24:30').to12hr(),
						'"24:30" is not a valid 24 hour time. Use "00" instead of "24".',
					)
				})
				it('Expect "25:30" to error', () => {
					failTest(
						() => convertString24hr('25:30').to12hr(),
						'"25:30" is not a valid 24 hour time.',
					)
				})
			})
		}

		function hr24_to_time_object() {
			describe('24hr to time object', () => {
				it('Expect "" to be {hrs24: null, hrs12: null, minutes: null, mode: null}', () => {
					expect(convertString24hr('').toTimeObject()).to.deep.equal({
						hrs24: null,
						hrs12: null,
						minutes: null,
						mode: null,
					})
				})
				it('Expect "00:00" to be {hrs24: 0, hrs12: 12, minutes: 0, mode: "AM"}', () => {
					expect(convertString24hr('00:00').toTimeObject()).to.deep.equal({
						hrs24: 0,
						hrs12: 12,
						minutes: 0,
						mode: 'AM',
					})
				})
				it('Expect "05:30" to be {hrs24: 5, hrs12: 5, minutes: 30, mode: "AM"}', () => {
					expect(convertString24hr('05:30').toTimeObject()).to.deep.equal({
						hrs24: 5,
						hrs12: 5,
						minutes: 30,
						mode: 'AM',
					})
				})
				it('Expect "11:00" to be {hrs24: 11, hrs12: 11, minutes: 0, mode: "AM"}', () => {
					expect(convertString24hr('11:00').toTimeObject()).to.deep.equal({
						hrs24: 11,
						hrs12: 11,
						minutes: 0,
						mode: 'AM',
					})
				})
				it('Expect "12:00" to be {hrs24: 12, hrs12: 12, minutes: 0, mode: "PM"}', () => {
					expect(convertString24hr('12:00').toTimeObject()).to.deep.equal({
						hrs24: 12,
						hrs12: 12,
						minutes: 0,
						mode: 'PM',
					})
				})
				it('Expect "13:00" to be {hrs24: 13, hrs12: 1, minutes: 0, mode: "PM"}', () => {
					expect(convertString24hr('13:00').toTimeObject()).to.deep.equal({
						hrs24: 13,
						hrs12: 1,
						minutes: 0,
						mode: 'PM',
					})
				})
				it('Expect "00:00" to be {hrs24: 0, hrs12: 12, minutes: 0, mode: "AM"}', () => {
					expect(convertString24hr('00:00').toTimeObject()).to.deep.equal({
						hrs24: 0,
						hrs12: 12,
						minutes: 0,
						mode: 'AM',
					})
				})
				it('Expect "24:30" to error', () => {
					failTest(
						() => convertString24hr('24:30').toTimeObject(),
						'"24:30" is not a valid 24 hour time. Use "00" instead of "24".',
					)
				})
				it('Expect "25:30" to error', () => {
					failTest(
						() => convertString24hr('25:30').toTimeObject(),
						'"25:30" is not a valid 24 hour time.',
					)
				})
			})
		}
	})
}

function convert_12hr_time() {
	describe('Convert 12hr', () => {
		hr12_to_hr24()
		hr12_to_time_object()

		function hr12_to_hr24() {
			describe('12hr to 24hr', () => {
				it('Expect "--:--" to fail', () => {
					failTest(
						() => convertString12hr('--:--').to24hr(),
						'"--:--" is not a valid 12 hour time, use the format "HH:MM AM/PM"',
					)
				})
				it('Expect "--:-- --" to be ""', () => {
					expect(convertString12hr('--:-- --').to24hr()).to.equal('')
				})
				it('Expect "01:-- --" to be ""', () => {
					expect(convertString12hr('01:-- --').to24hr()).to.equal('')
				})
				it('Expect "--:02 --" to be ""', () => {
					expect(convertString12hr('--:02 --').to24hr()).to.equal('')
				})
				it('Expect "--:-- AM" to be ""', () => {
					expect(convertString12hr('--:-- AM').to24hr()).to.equal('')
				})
				it('Expect "12:00 AM" to be "00:00"', () => {
					expect(convertString12hr('12:00 AM').to24hr()).to.equal('00:00')
				})
				it('Expect "05:30 AM" to be "05:30"', () => {
					expect(convertString12hr('05:30 AM').to24hr()).to.equal('05:30')
				})
				it('Expect "11:00 AM" to be "11:00"', () => {
					expect(convertString12hr('11:00 AM').to24hr()).to.equal('11:00')
				})
				it('Expect "12:00 PM" to be "12:00"', () => {
					expect(convertString12hr('12:00 PM').to24hr()).to.equal('12:00')
				})
				it('Expect "01:00 PM" to be "13:00"', () => {
					expect(convertString12hr('01:00 PM').to24hr()).to.equal('13:00')
				})
				it('Expect "11:30 PM" to be "23:30"', () => {
					expect(convertString12hr('11:30 PM').to24hr()).to.equal('23:30')
				})
				it('Expect "13:30" to fail', () => {
					failTest(
						() => convertString12hr('13:30').to12hr(),
						'"13:30" is not a valid 12 hour time, use the format "HH:MM AM/PM"',
					)
				})
				it('Expect "13:30 PM" to fail', () => {
					failTest(
						() => convertString12hr('13:30 PM').to24hr(),
						'"13:30 PM" is not a valid 12 hour time, use the format "HH:MM AM/PM"',
					)
				})
			})
		}

		function hr12_to_time_object() {
			describe('12hr to time object', () => {
				it('Expect "--:--" to fail', () => {
					failTest(
						() => convertString12hr('--:--').toTimeObject(),
						'"--:--" is not a valid 12 hour time, use the format "HH:MM AM/PM"',
					)
				})
				it('Expect "--:-- --" to be {hrs24: null, hrs12: null, minutes: null, mode: null}', () => {
					expect(convertString12hr('--:-- --').toTimeObject()).to.deep.equal({
						hrs24: null,
						hrs12: null,
						minutes: null,
						mode: null,
					})
				})
				it('Expect "01:-- --" to be {hrs24: 1, hrs12: 1, minutes: null, mode: null}', () => {
					expect(convertString12hr('01:-- --').toTimeObject()).to.deep.equal({
						hrs24: 1,
						hrs12: 1,
						minutes: null,
						mode: null,
					})
				})
				it('Expect "--:02 --" to be {hrs24: null, hrs12: null, minutes: 2, mode: null}', () => {
					expect(convertString12hr('--:02 --').toTimeObject()).to.deep.equal({
						hrs24: null,
						hrs12: null,
						minutes: 2,
						mode: null,
					})
				})
				it('Expect "--:-- AM" to be {hrs24: null, hrs12: null, minutes: null, mode: "AM"}', () => {
					expect(convertString12hr('--:-- AM').toTimeObject()).to.deep.equal({
						hrs24: null,
						hrs12: null,
						minutes: null,
						mode: 'AM',
					})
				})
				it('Expect "12:00 AM" to be {hrs24: 0, hrs12: 12, minutes: 0, mode: "AM"}', () => {
					expect(convertString12hr('12:00 AM').toTimeObject()).to.deep.equal({
						hrs24: 0,
						hrs12: 12,
						minutes: 0,
						mode: 'AM',
					})
				})
				it('Expect "05:30 AM" to be {hrs24: 5, hrs12: 5, minutes: 30, mode: "AM"}', () => {
					expect(convertString12hr('05:30 AM').toTimeObject()).to.deep.equal({
						hrs24: 5,
						hrs12: 5,
						minutes: 30,
						mode: 'AM',
					})
				})
				it('Expect "11:00 AM" to be {hrs24: 11, hrs12: 11, minutes: 0, mode: "AM"}', () => {
					expect(convertString12hr('11:00 AM').toTimeObject()).to.deep.equal({
						hrs24: 11,
						hrs12: 11,
						minutes: 0,
						mode: 'AM',
					})
				})
				it('Expect "12:00 PM" to be {hrs24: 12, hrs12: 12, minutes: 0, mode: "PM"}', () => {
					expect(convertString12hr('12:00 PM').toTimeObject()).to.deep.equal({
						hrs24: 12,
						hrs12: 12,
						minutes: 0,
						mode: 'PM',
					})
				})
				it('Expect "01:00 PM" to be {hrs24: 13, hrs12: 1, minutes: 0, mode: "PM"}', () => {
					expect(convertString12hr('01:00 PM').toTimeObject()).to.deep.equal({
						hrs24: 13,
						hrs12: 1,
						minutes: 0,
						mode: 'PM',
					})
				})
				it('Expect "11:30 PM" to be {hrs24: 23, hrs12: 11, minutes: 30, mode: "PM"}', () => {
					expect(convertString12hr('11:30 PM').toTimeObject()).to.deep.equal({
						hrs24: 23,
						hrs12: 11,
						minutes: 30,
						mode: 'PM',
					})
				})
				it('Expect "13:30" to fail', () => {
					failTest(
						() => convertString12hr('13:30').toTimeObject(),
						'"13:30" is not a valid 12 hour time, use the format "HH:MM AM/PM"',
					)
				})
				it('Expect "13:30 PM" to fail', () => {
					failTest(
						() => convertString12hr('13:30 PM').toTimeObject(),
						'"13:30 PM" is not a valid 12 hour time, use the format "HH:MM AM/PM"',
					)
				})
			})
		}
	})
}

function convert_time_object() {
	// See core/validate/validate.test.js for time object validation tests
	describe('convert time object', () => {
		const timeTest = (method) => {
			return (timeObject, result) => {
				const objectString = JSON.stringify(timeObject)
				it(`Expect ${objectString} to be "${result}"`, () => {
					expect(convertTimeObject(timeObject)[method]()).to.deep.equal(result)
				})
			}
		}

		timeObject_to_24hr()
		timeObject_to_12hr()

		function timeObject_to_24hr() {
			describe('time object to 24hr', () => {
				const timeTest24hr = timeTest('to24hr')
				timeTest24hr(
					{
						hrs24: null,
						hrs12: null,
						minutes: null,
						mode: null,
					},
					'',
				)

				timeTest24hr(
					{
						hrs24: 1,
						hrs12: 1,
						minutes: null,
						mode: null,
					},
					'',
				)

				timeTest24hr(
					{
						hrs24: null,
						hrs12: null,
						minutes: 2,
						mode: null,
					},
					'',
				)

				timeTest24hr(
					{
						hrs24: null,
						hrs12: null,
						minutes: null,
						mode: 'AM',
					},
					'',
				)

				timeTest24hr(
					{
						hrs24: 0,
						hrs12: 12,
						minutes: 0,
						mode: 'AM',
					},
					'00:00',
				)

				timeTest24hr(
					{
						hrs24: 5,
						hrs12: 5,
						minutes: 30,
						mode: 'AM',
					},
					'05:30',
				)

				timeTest24hr(
					{
						hrs24: 11,
						hrs12: 11,
						minutes: 0,
						mode: 'AM',
					},
					'11:00',
				)

				timeTest24hr(
					{
						hrs24: 12,
						hrs12: 12,
						minutes: 0,
						mode: 'PM',
					},
					'12:00',
				)

				timeTest24hr(
					{
						hrs24: 13,
						hrs12: 1,
						minutes: 0,
						mode: 'PM',
					},
					'13:00',
				)

				timeTest24hr(
					{
						hrs24: 23,
						hrs12: 11,
						minutes: 30,
						mode: 'PM',
					},
					'23:30',
				)
			})
		}

		function timeObject_to_12hr() {
			describe('time object to 12hr', () => {
				const timeTest12hr = timeTest('to12hr')
				timeTest12hr(
					{
						hrs24: null,
						hrs12: null,
						minutes: null,
						mode: null,
					},
					'--:-- --',
				)

				timeTest12hr(
					{
						hrs24: 1,
						hrs12: 1,
						minutes: null,
						mode: null,
					},
					'01:-- --',
				)

				timeTest12hr(
					{
						hrs24: null,
						hrs12: null,
						minutes: 2,
						mode: null,
					},
					'--:02 --',
				)

				timeTest12hr(
					{
						hrs24: null,
						hrs12: null,
						minutes: null,
						mode: 'AM',
					},
					'--:-- AM',
				)

				timeTest12hr(
					{
						hrs24: 0,
						hrs12: 12,
						minutes: 0,
						mode: 'AM',
					},
					'12:00 AM',
				)

				timeTest12hr(
					{
						hrs24: 5,
						hrs12: 5,
						minutes: 30,
						mode: 'AM',
					},
					'05:30 AM',
				)

				timeTest12hr(
					{
						hrs24: 11,
						hrs12: 11,
						minutes: 0,
						mode: 'AM',
					},
					'11:00 AM',
				)

				timeTest12hr(
					{
						hrs24: 12,
						hrs12: 12,
						minutes: 0,
						mode: 'PM',
					},
					'12:00 PM',
				)

				timeTest12hr(
					{
						hrs24: 13,
						hrs12: 1,
						minutes: 0,
						mode: 'PM',
					},
					'01:00 PM',
				)

				timeTest12hr(
					{
						hrs24: 23,
						hrs12: 11,
						minutes: 30,
						mode: 'PM',
					},
					'11:30 PM',
				)
			})
		}
	})
}

function convert_date_object() {
	describe('Convert date object', () => {
		const current = new CurrentDate()

		const dateTest = (method) => {
			return (result) => {
				const resultString = typeof result === 'string' ? result : JSON.stringify(result)
				it(`Expect date to be "${resultString}"`, () => {
					expect(convertDateObject(current.date)[method]()).to.deep.equal(result)
				})
			}
		}

		describe('date to 24hr', () => {
			current.reInitialize()
			const dateTest24hr = dateTest('to24hr')
			dateTest24hr(`${current.hrs24}:${current.minutes}`)
		})

		describe('date to 12hr', () => {
			current.reInitialize()
			const dateTest12hr = dateTest('to12hr')
			dateTest12hr(`${current.hrs12}:${current.minutes} ${current.mode}`)
		})

		describe('date to time object', () => {
			current.reInitialize()
			const dateTest12hr = dateTest('toTimeObject')
			dateTest12hr({
				hrs24: parseInt(current.hrs24),
				hrs12: parseInt(current.hrs12),
				minutes: parseInt(current.minutes),
				mode: current.mode,
			})
		})
	})
}
