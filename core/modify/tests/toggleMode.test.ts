import { modify } from '../modify'
import { TimeObject } from '../../../types'
import { current } from '../../../helpers/currentDate'

export default () => {
	describe('Mode toggle', () => {
		toggle12hr()
		toggle24hr()
		toggleTimeObject()

		function toggle12hr() {
			describe('12 hour mode toggle', () => {
				it('12:30 PM => 12:30 AM', () => {
					expect(modify.string12hr('12:30 AM').toggleMode()).to.equal('12:30 PM')
				})
				it('12:30 AM => 12:30 PM', () => {
					expect(modify.string12hr('12:30 AM').toggleMode()).to.equal('12:30 PM')
				})
				it('11:30 AM => 11:30 PM', () => {
					expect(modify.string12hr('11:30 AM').toggleMode()).to.equal('11:30 PM')
				})
				it('01:30 PM => 01:30 AM', () => {
					expect(modify.string12hr('01:30 PM').toggleMode()).to.equal('01:30 AM')
				})
				it(`12:30 -- => 12:30 ${current.mode}`, () => {
					expect(modify.string12hr('12:30 --').toggleMode()).to.equal(`12:30 ${current.mode}`)
				})
				it(`--:-- -- => --:-- ${current.mode}`, () => {
					expect(modify.string12hr('--:-- --').toggleMode()).to.equal(`--:-- ${current.mode}`)
				})
			})
		}

		function toggle24hr() {
			describe('24 hour mode toggle', () => {
				it('00:30 => 12:30', () => {
					expect(modify.string24hr('00:30').toggleMode()).to.equal('12:30')
				})
				it('12:30 => 00:30', () => {
					expect(modify.string24hr('00:30').toggleMode()).to.equal('12:30')
				})
				it('11:30 => 23:30', () => {
					expect(modify.string24hr('11:30').toggleMode()).to.equal('23:30')
				})
				it('13:30 => 01:30', () => {
					expect(modify.string24hr('13:30').toggleMode()).to.equal('01:30')
				})
				it('"" => ""', () => {
					expect(modify.string24hr('').toggleMode()).to.equal('')
				})
			})
		}

		function toggleTimeObject() {
			describe('Time object mode toggle', () => {
				testTimeObject(
					{ hrs24: 11, hrs12: 11, min: 30, mode: 'AM' },
					{ hrs24: 23, hrs12: 11, min: 30, mode: 'PM' },
				)
				testTimeObject(
					{ hrs24: 13, hrs12: 1, min: 30, mode: 'PM' },
					{ hrs24: 1, hrs12: 1, min: 30, mode: 'AM' },
				)
				testTimeObject(
					{ hrs24: 0, hrs12: 12, min: 30, mode: 'AM' },
					{ hrs24: 12, hrs12: 12, min: 30, mode: 'PM' },
				)
				testTimeObject(
					{ hrs24: 12, hrs12: 12, min: 30, mode: 'PM' },
					{ hrs24: 0, hrs12: 12, min: 30, mode: 'AM' },
				)
				testTimeObject(
					{ hrs24: '--', hrs12: '--', min: '--', mode: '--' },
					{ hrs24: '--', hrs12: '--', min: '--', mode: current.mode },
				)
				testTimeObject(
					{ hrs24: 12, hrs12: 12, min: 30, mode: '--' },
					{
						hrs24: current.mode === 'AM' ? 0 : 12,
						hrs12: 12,
						min: 30,
						mode: current.mode,
					},
				)
				testTimeObject(
					{ hrs24: 11, hrs12: 11, min: 30, mode: '--' },
					{
						hrs24: current.mode === 'AM' ? 11 : 23,
						hrs12: 11,
						min: 30,
						mode: current.mode,
					},
				)
				testTimeObject(
					{ hrs24: 1, hrs12: 1, min: 30, mode: '--' },
					{
						hrs24: current.mode === 'AM' ? 1 : 13,
						hrs12: 1,
						min: 30,
						mode: current.mode,
					},
				)

				function testTimeObject(input: TimeObject, expectedOutput: TimeObject) {
					const inputString = JSON.stringify(input)
					const outputString = JSON.stringify(expectedOutput)

					it(`${inputString} => ${outputString}`, () => {
						expect(modify.timeObject(input).toggleMode()).to.deep.equal(expectedOutput)
					})
				}
			})
		}
	})
}
