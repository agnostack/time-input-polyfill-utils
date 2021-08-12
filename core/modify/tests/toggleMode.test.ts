import { modifyString12hr, modifyString24hr, modifyTimeObject } from '../modify'
import { GuaranteedMode, TimeObject } from '../../../types/index'

export default (): void => {
	describe('Mode toggle', (): void => {
		toggle12hr()
		toggle24hr()
		toggleTimeObject()

		function createStringTestFunction(modifierFunction: Function): Function {
			return (input: string, expectation: string): void => {
				const inputName = input || '""'
				const expectationName = expectation || '""'
				describe(`${inputName} => ${expectationName}`, () => {
					it(`toggleMode: ${inputName} => ${expectationName}`, () => {
						expect(modifierFunction(input).toggleMode()).to.equal(expectation)
					})
					it(`increment-isolated: ${inputName} => ${expectationName}`, () => {
						expect(modifierFunction(input).increment.mode.isolated()).to.equal(
							expectation,
						)
					})
					it(`increment-integrated: ${inputName} => ${expectationName}`, () => {
						expect(modifierFunction(input).increment.mode.integrated()).to.equal(
							expectation,
						)
					})
					it(`decrement-isolated: ${inputName} => ${expectationName}`, () => {
						expect(modifierFunction(input).decrement.mode.isolated()).to.equal(
							expectation,
						)
					})
					it(`decrement-integrated: ${inputName} => ${expectationName}`, () => {
						expect(modifierFunction(input).decrement.mode.integrated()).to.equal(
							expectation,
						)
					})
				})
			}
		}

		function toggle12hr(): void {
			const test = createStringTestFunction(modifyString12hr)
			describe('12 hour mode toggle', () => {
				test('12:30 PM', '12:30 AM')
				test('12:30 AM', '12:30 PM')
				test('11:30 AM', '11:30 PM')
				test('01:30 PM', '01:30 AM')
				test('01:-- PM', '01:-- AM')
				test('--:30 PM', '--:30 AM')
				test('12:30 --', `12:30 AM`)
				test('12:-- --', `12:-- AM`)
				test('--:30 --', `--:30 AM`)
				test('--:-- --', `--:-- AM`)
			})
		}

		function toggle24hr(): void {
			const test = createStringTestFunction(modifyString24hr)
			describe('24 hour mode toggle', () => {
				test('00:30', '12:30')
				test('12:30', '00:30')
				test('11:30', '23:30')
				test('13:30', '01:30')
				test('', '')
			})
		}

		function toggleTimeObject(): void {
			describe('Time object mode toggle', () => {
				testTimeObject(
					{ hrs24: 11, hrs12: 11, minutes: 30, mode: 'AM' },
					{ hrs24: 23, hrs12: 11, minutes: 30, mode: 'PM' },
				)
				testTimeObject(
					{ hrs24: 13, hrs12: 1, minutes: 30, mode: 'PM' },
					{ hrs24: 1, hrs12: 1, minutes: 30, mode: 'AM' },
				)
				testTimeObject(
					{ hrs24: 0, hrs12: 12, minutes: 30, mode: 'AM' },
					{ hrs24: 12, hrs12: 12, minutes: 30, mode: 'PM' },
				)
				testTimeObject(
					{ hrs24: 12, hrs12: 12, minutes: 30, mode: 'PM' },
					{ hrs24: 0, hrs12: 12, minutes: 30, mode: 'AM' },
				)
				testTimeObject(
					{ hrs24: 13, hrs12: 1, minutes: null, mode: 'PM' },
					{ hrs24: 1, hrs12: 1, minutes: null, mode: 'AM' },
				)
				testTimeObject(
					{ hrs24: 13, hrs12: 1, minutes: null, mode: 'PM' },
					{ hrs24: 1, hrs12: 1, minutes: null, mode: 'AM' },
				)
				testTimeObject(
					{ hrs24: null, hrs12: null, minutes: 30, mode: 'PM' },
					{ hrs24: null, hrs12: null, minutes: 30, mode: 'AM' },
				)
				testTimeObject(
					{ hrs24: null, hrs12: null, minutes: null, mode: null },
					{ hrs24: null, hrs12: null, minutes: null, mode: 'AM' },
				)
				testTimeObject(
					{ hrs24: 12, hrs12: 12, minutes: 30, mode: null },
					{
						hrs24: 12,
						hrs12: 12,
						minutes: 30,
						mode: 'PM',
					},
				)
				testTimeObject(
					{ hrs24: 11, hrs12: 11, minutes: 30, mode: null },
					{
						hrs24: 11,
						hrs12: 11,
						minutes: 30,
						mode: 'AM',
					},
				)
				testTimeObject(
					{ hrs24: 1, hrs12: 1, minutes: 30, mode: null },
					{
						hrs24: 1,
						hrs12: 1,
						minutes: 30,
						mode: 'AM',
					},
				)
				testTimeObject(
					{ hrs24: 1, hrs12: 1, minutes: null, mode: null },
					{
						hrs24: 1,
						hrs12: 1,
						minutes: null,
						mode: 'AM',
					},
				)
				testTimeObject(
					{ hrs24: null, hrs12: null, minutes: 30, mode: null },
					{
						hrs24: null,
						hrs12: null,
						minutes: 30,
						mode: 'AM',
					},
				)
			})

			function testTimeObject(input: TimeObject, expectation: TimeObject, preferredModeWhenNull: GuaranteedMode = 'AM'): void {
				const inputName = JSON.stringify(input)
				const expectationName = JSON.stringify(expectation)

				describe(`${inputName} => ${expectationName}`, () => {
					it(`toggleMode: ${inputName} => ${expectationName}`, () => {
						expect(modifyTimeObject(input).toggleMode(preferredModeWhenNull)).to.deep.equal(expectation)
					})
					it(`increment-isolated: ${inputName} => ${expectationName}`, () => {
						expect(modifyTimeObject(input).increment.mode.isolated()).to.deep.equal(
							expectation,
						)
					})
					it(`increment-integrated: ${inputName} => ${expectationName}`, () => {
						expect(modifyTimeObject(input).increment.mode.integrated()).to.deep.equal(
							expectation,
						)
					})
					it(`decrement-isolated: ${inputName} => ${expectationName}`, () => {
						expect(modifyTimeObject(input).decrement.mode.isolated()).to.deep.equal(
							expectation,
						)
					})
					it(`decrement-integrated: ${inputName} => ${expectationName}`, () => {
						expect(modifyTimeObject(input).decrement.mode.integrated()).to.deep.equal(
							expectation,
						)
					})
				})
			}
		}
	})
}
