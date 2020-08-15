import { modifyString12hr, modifyTimeObject } from '../modify'
import { TimeObject, Segment } from '../../../types/index'

export default (): void => {
	describe('Clear tests', (): void => {
		string12hrTests()
		timeObjectTests()

		function string12hrTests(): void {
			describe('Clear string12hr', () => {
				it('Clear hrs12', () => {
					expect(modifyString12hr('12:00 AM').clear.hrs12()).to.equal('--:00 AM')
				})

				it('Clear minutes', () => {
					expect(modifyString12hr('12:00 AM').clear.minutes()).to.equal('12:-- AM')
				})

				it('Clear mode', () => {
					expect(modifyString12hr('12:00 AM').clear.mode()).to.equal('12:00 --')
				})

				it('Clear all', () => {
					expect(modifyString12hr('12:00 AM').clear.all()).to.equal('--:-- --')
				})
			})
		}
		function timeObjectTests(): void {
			describe('Clear timeObject', () => {
				const test = (
					segment: Segment | 'hrs24' | 'all',
					before: TimeObject,
					after: TimeObject,
				): void => {
					it(`Clear ${segment}`, () => {
						expect(modifyTimeObject(before).clear[segment]()).to.deep.equal(after)
					})
				}

				test(
					'hrs24',
					{ hrs24: 0, hrs12: 12, minutes: 0, mode: 'AM' },
					{ hrs24: '--', hrs12: '--', minutes: 0, mode: 'AM' },
				)
				test(
					'hrs12',
					{ hrs24: 0, hrs12: 12, minutes: 0, mode: 'AM' },
					{ hrs24: '--', hrs12: '--', minutes: 0, mode: 'AM' },
				)
				test(
					'minutes',
					{ hrs24: 0, hrs12: 12, minutes: 0, mode: 'AM' },
					{ hrs24: 0, hrs12: 12, minutes: '--', mode: 'AM' },
				)
				test(
					'mode',
					{ hrs24: 0, hrs12: 12, minutes: 0, mode: 'AM' },
					{ hrs24: 0, hrs12: 12, minutes: 0, mode: '--' },
				)
				test(
					'all',
					{ hrs24: 0, hrs12: 12, minutes: 0, mode: 'AM' },
					{ hrs24: '--', hrs12: '--', minutes: '--', mode: '--' },
				)
			})
		}
	})
}
