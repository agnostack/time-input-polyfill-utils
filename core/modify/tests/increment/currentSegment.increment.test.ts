// TO DO: Need to add time object tests
// TO DO: Need to add decrement tests

import { segmentTest } from '../../modify.test'
import { modifyString12hr } from '../../modify'
import { current } from '../../../../helpers/currentDate'
import { Segment } from '../../../../types/index'
import { Integration } from '../../modify.types'

interface CreateSegmentTest {
	segment: Segment
	integration: Integration
	modFunction: Function
}

const createSegmentTest = ({ segment, integration, modFunction }: CreateSegmentTest): Function => {
	return (before: string, after: string): void => {
		segmentTest({
			segment: segment,
			before: before,
			after: after,
			test: $input =>
				// eslint-disable-next-line prettier/prettier
				modFunction(before).increment.currentSegment($input)[integration](),
		})
	}
}

export default (): void => {
	describe('Increment hours', () => {
		isolatedTests()
		integratedTests()

		function isolatedTests(): void {
			describe('Isolated (12hr)', () => {
				describe('hrs12 - Isolated (12hr)', () => {
					const hrs12Test = createSegmentTest({
						segment: 'hrs12',
						integration: 'isolated',
						modFunction: modifyString12hr,
					})
					hrs12Test('--:-- --', `${current.hrs12}:-- --`)
					hrs12Test('--:00 AM', `${current.hrs12}:00 AM`)
					hrs12Test('--:00 PM', `${current.hrs12}:00 PM`)
					hrs12Test('09:00 AM', '10:00 AM')
					hrs12Test('12:30 PM', '01:30 PM')
					// incrementing hours does not affect AM/PM
					hrs12Test('11:30 AM', '12:30 AM')
					hrs12Test('11:00 PM', '12:00 PM')
				})
				describe('min - Isolated (12hr)', () => {
					const minTest = createSegmentTest({
						segment: 'min',
						integration: 'isolated',
						modFunction: modifyString12hr,
					})
					minTest('--:-- --', `--:${current.min} --`)
					minTest('09:-- AM', `09:${current.min} AM`)
					minTest('09:00 AM', '09:01 AM')
					minTest('09:09 PM', '09:10 PM')
					minTest('11:59 AM', '11:00 AM')
					minTest('11:59 PM', '11:00 PM')
				})
				describe('mode - Isolated (12hr)', () => {
					const modeTest = createSegmentTest({
						segment: 'mode',
						integration: 'isolated',
						modFunction: modifyString12hr,
					})
					modeTest('--:-- --', `--:-- ${current.mode}`)
					modeTest('09:00 --', `09:00 ${current.mode}`)
					modeTest('09:00 AM', '09:00 PM')
					modeTest('09:00 PM', '09:00 AM')
					modeTest('11:59 AM', '11:59 PM')
					modeTest('11:59 PM', '11:59 AM')
				})
			})
		}

		function integratedTests(): void {
			describe('Integrated (12hr)', () => {
				describe('hrs12 - Integrated (12hr)', () => {
					const hrs12Test = createSegmentTest({
						segment: 'hrs12',
						integration: 'integrated',
						modFunction: modifyString12hr,
					})
					hrs12Test('--:-- --', `${current.hrs12}:-- --`)
					hrs12Test('--:00 AM', `${current.hrs12}:00 AM`)
					hrs12Test('--:00 PM', `${current.hrs12}:00 PM`)
					hrs12Test('09:00 AM', '10:00 AM')
					hrs12Test('12:30 PM', '01:30 PM')
					// incrementing hours affects AM/PM
					hrs12Test('11:30 AM', '12:30 PM')
					hrs12Test('11:00 PM', '12:00 AM')
				})
				describe('min - Integrated (12hr)', () => {
					const minTest = createSegmentTest({
						segment: 'min',
						integration: 'integrated',
						modFunction: modifyString12hr,
					})
					minTest('--:-- --', `--:${current.min} --`)
					minTest('09:-- AM', `09:${current.min} AM`)
					minTest('09:00 AM', '09:01 AM')
					minTest('09:09 PM', '09:10 PM')
					// incrementing minutes affects hrs12 & AM/PM
					minTest('11:59 AM', '12:00 PM')
					minTest('11:59 PM', '12:00 AM')
				})
				describe('mode - Integrated (12hr)', () => {
					const modeTest = createSegmentTest({
						segment: 'mode',
						integration: 'integrated',
						modFunction: modifyString12hr,
					})
					modeTest('--:-- --', `--:-- ${current.mode}`)
					modeTest('09:00 --', `09:00 ${current.mode}`)
					modeTest('09:00 AM', '09:00 PM')
					modeTest('09:00 PM', '09:00 AM')
					modeTest('11:59 AM', '11:59 PM')
					modeTest('11:59 PM', '11:59 AM')
				})
			})
		}
	})
}
