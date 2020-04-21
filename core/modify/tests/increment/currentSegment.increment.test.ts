import { segmentTest } from '../../modify.test'
import { modifyString12hr } from '../../modify'
import { current } from '../../../../helpers/currentDate'

export default (): void => {
	describe('Increment hours', () => {
		isolatedTests()

		function isolatedTests(): void {
			describe('Isolated (12hr)', () => {
				describe('hrs12 - Isolated (12hr)', () => {
					const hrs12Test = (before: string, after: string): void => {
						segmentTest({
							segment: 'hrs12',
							before: before,
							after: after,
							test: $input =>
								modifyString12hr(before)
									.increment.currentSegment($input)
									.isolated(),
						})
					}
					hrs12Test('--:-- --', `${current.hrs12}:-- --`)
					hrs12Test('--:00 AM', `${current.hrs12}:00 AM`)
					hrs12Test('--:00 PM', `${current.hrs12}:00 PM`)
					hrs12Test('09:00 AM', '10:00 AM')
					hrs12Test('12:30 PM', '01:30 PM')
					// incrementing hours does not affect AM/PM
					hrs12Test('11:30 AM', '12:30 AM')
					hrs12Test('11:00 PM', '12:00 PM')
				})
			})
		}
	})
}
