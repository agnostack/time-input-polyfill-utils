import { modify } from '../modifiers'
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
			})
		}

		function toggleTimeObject() {
			describe('Time object mode toggle', () => {
				testTimeObject(
					{ hrs24: 0, hrs12: 12, min: 30, mode: 'AM' },
					{ hrs24: 12, hrs12: 12, min: 30, mode: 'PM' },
				)
				testTimeObject(
					{ hrs24: 12, hrs12: 12, min: 30, mode: 'PM' },
					{ hrs24: 0, hrs12: 12, min: 30, mode: 'AM' },
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
