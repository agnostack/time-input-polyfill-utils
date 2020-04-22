// TO DO: Add tests for when segment is undefined

import { segmentTest, segmentTimeObjectTest } from '../../modify.test'
import { current } from '../../../../helpers/currentDate'
import { Segment, TimeObject, Hour24, Hour12, Minute } from '../../../../types/index'
import { Integration } from '../../modify.types'

interface CreateSegmentTest {
	segment: Segment
	integration: Integration
}

const createSegmentTest = ({ segment, integration }: CreateSegmentTest): Function => {
	return (before: string, after: string): void => {
		segmentTest({
			segment: segment,
			before: before,
			after,
			action: 'decrement',
			integration,
		})
	}
}

const createSegmentTimeObjectTest = ({ segment, integration }: CreateSegmentTest): Function => {
	return (before: TimeObject, after: TimeObject): void => {
		segmentTimeObjectTest({
			segment,
			before,
			after,
			action: 'decrement',
			integration,
		})
	}
}

export default (): void => {
	describe('Decrement tests - Current segment', () => {
		describe('12 hour tests', () => {
			isolated12hrStringTests()
			integrated12HrStringTests()
		})

		describe('Time Object Tests', () => {
			isolatedTimeObjectTests()
			integratedTimeObjectTests()
		})

		function isolated12hrStringTests(): void {
			describe('Isolated (12hr)', () => {
				describe('hrs12 - Isolated (12hr)', () => {
					const hrs12Test = createSegmentTest({
						segment: 'hrs12',
						integration: 'isolated',
					})

					hrs12Test('--:-- --', `${current.hrs12}:-- --`)
					hrs12Test('--:00 AM', `${current.hrs12}:00 AM`)
					hrs12Test('--:00 PM', `${current.hrs12}:00 PM`)
					hrs12Test('10:00 AM', '09:00 AM')
					hrs12Test('01:30 PM', '12:30 PM')
					// incrementing hours does not affect AM/PM
					hrs12Test('12:30 AM', '11:30 AM')
					hrs12Test('12:00 PM', '11:00 PM')
				})
				describe('min - Isolated (12hr)', () => {
					const minTest = createSegmentTest({
						segment: 'min',
						integration: 'isolated',
					})
					minTest('--:-- --', `--:${current.min} --`)
					minTest('09:-- AM', `09:${current.min} AM`)
					minTest('09:01 AM', '09:00 AM')
					minTest('09:10 PM', '09:09 PM')
					minTest('11:00 AM', '11:59 AM')
					minTest('11:00 PM', '11:59 PM')
				})
				describe('mode - Isolated (12hr)', () => {
					const modeTest = createSegmentTest({
						segment: 'mode',
						integration: 'isolated',
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

		function integrated12HrStringTests(): void {
			describe('Integrated (12hr)', () => {
				describe('hrs12 - Integrated (12hr)', () => {
					const hrs12Test = createSegmentTest({
						segment: 'hrs12',
						integration: 'integrated',
					})

					hrs12Test('--:-- --', `${current.hrs12}:-- --`)
					hrs12Test('--:00 AM', `${current.hrs12}:00 AM`)
					hrs12Test('--:00 PM', `${current.hrs12}:00 PM`)
					hrs12Test('10:00 AM', '09:00 AM')
					hrs12Test('01:30 PM', '12:30 PM')
					// incrementing hours DOES affect AM/PM
					hrs12Test('12:30 PM', '11:30 AM')
					hrs12Test('12:00 AM', '11:00 PM')
				})
				describe('min - Integrated (12hr)', () => {
					const minTest = createSegmentTest({
						segment: 'min',
						integration: 'integrated',
					})
					minTest('--:-- --', `--:${current.min} --`)
					minTest('09:-- AM', `09:${current.min} AM`)
					minTest('09:01 AM', '09:00 AM')
					minTest('09:10 PM', '09:09 PM')
					minTest('01:00 PM', '12:59 PM')
					// decrementing minutes DOES affect AM/PM
					minTest('12:00 PM', '11:59 AM')
					minTest('12:00 AM', '11:59 PM')
				})
				describe('mode - Integrated (12hr)', () => {
					const modeTest = createSegmentTest({
						segment: 'mode',
						integration: 'integrated',
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

		function isolatedTimeObjectTests(): void {
			describe('Isolated (Time Object)', () => {
				hour12Tests()
				minuteTests()
				modeTests()

				function hour12Tests(): void {
					describe('hrs12 - Isolated (Time Object)', () => {
						const hrs12Test = createSegmentTimeObjectTest({
							segment: 'hrs12',
							integration: 'isolated',
						})

						hrs12Test(
							{ hrs24: '--', hrs12: '--', min: '--', mode: '--' },
							{
								hrs24: <Hour24>parseInt(current.hrs24),
								hrs12: <Hour12>parseInt(current.hrs12),
								min: '--',
								mode: '--',
							},
						)

						hrs12Test(
							{ hrs24: '--', hrs12: '--', min: 0, mode: 'AM' },
							{
								hrs24: <Hour24>(
									(current.mode === 'PM'
										? parseInt(current.hrs24) - 12
										: parseInt(current.hrs24))
								),
								hrs12: <Hour12>parseInt(current.hrs12),
								min: 0,
								mode: 'AM',
							},
						)

						hrs12Test(
							{ hrs24: '--', hrs12: '--', min: 0, mode: 'PM' },
							{
								hrs24: <Hour24>(
									(current.mode === 'AM'
										? parseInt(current.hrs12)
										: parseInt(current.hrs24))
								),
								hrs12: <Hour12>parseInt(current.hrs12),
								min: 0,
								mode: 'PM',
							},
						)

						hrs12Test(
							{ hrs24: 10, hrs12: 10, min: 0, mode: 'AM' },
							{ hrs24: 9, hrs12: 9, min: 0, mode: 'AM' },
						)

						hrs12Test(
							{ hrs24: 0, hrs12: 12, min: 30, mode: 'AM' },
							{ hrs24: 11, hrs12: 11, min: 30, mode: 'AM' },
						)

						hrs12Test(
							{ hrs24: 13, hrs12: 1, min: 30, mode: 'PM' },
							{ hrs24: 12, hrs12: 12, min: 30, mode: 'PM' },
						)

						hrs12Test(
							{ hrs24: 12, hrs12: 12, min: 0, mode: 'PM' },
							// modifying hrs does not modify mode
							{ hrs24: 23, hrs12: 11, min: 0, mode: 'PM' },
						)
					})
				}
				function minuteTests(): void {
					describe('minutes - Isolated (Time Object)', () => {
						const minutesTest = createSegmentTimeObjectTest({
							segment: 'min',
							integration: 'isolated',
						})

						minutesTest(
							{ hrs24: 9, hrs12: 9, min: '--', mode: 'AM' },
							{ hrs24: 9, hrs12: 9, min: <Minute>parseInt(current.min), mode: 'AM' },
						)
						minutesTest(
							{ hrs24: 9, hrs12: 9, min: 1, mode: 'AM' },
							{ hrs24: 9, hrs12: 9, min: 0, mode: 'AM' },
						)
						minutesTest(
							{ hrs24: 9, hrs12: 9, min: 10, mode: 'AM' },
							{ hrs24: 9, hrs12: 9, min: 9, mode: 'AM' },
						)
						minutesTest(
							{ hrs24: 11, hrs12: 11, min: 0, mode: 'AM' },
							{ hrs24: 11, hrs12: 11, min: 59, mode: 'AM' },
						)
						minutesTest(
							{ hrs24: 12, hrs12: 12, min: 0, mode: 'PM' },
							{ hrs24: 12, hrs12: 12, min: 59, mode: 'PM' },
						)
						minutesTest(
							{ hrs24: 23, hrs12: 11, min: 0, mode: 'PM' },
							// modifying hrs does not modify mode
							{ hrs24: 23, hrs12: 11, min: 59, mode: 'PM' },
						)
					})
				}
				function modeTests(): void {
					describe('mode - Isolated (Time Object)', () => {
						const modeTest = createSegmentTimeObjectTest({
							segment: 'mode',
							integration: 'isolated',
						})

						modeTest(
							{ hrs24: 11, hrs12: 11, min: 30, mode: 'AM' },
							{ hrs24: 23, hrs12: 11, min: 30, mode: 'PM' },
						)
						modeTest(
							{ hrs24: 13, hrs12: 1, min: 30, mode: 'PM' },
							{ hrs24: 1, hrs12: 1, min: 30, mode: 'AM' },
						)
						modeTest(
							{ hrs24: 0, hrs12: 12, min: 30, mode: 'AM' },
							{ hrs24: 12, hrs12: 12, min: 30, mode: 'PM' },
						)
						modeTest(
							{ hrs24: 12, hrs12: 12, min: 30, mode: 'PM' },
							{ hrs24: 0, hrs12: 12, min: 30, mode: 'AM' },
						)
						modeTest(
							{ hrs24: '--', hrs12: '--', min: '--', mode: '--' },
							{ hrs24: '--', hrs12: '--', min: '--', mode: current.mode },
						)
						modeTest(
							{ hrs24: 12, hrs12: 12, min: 30, mode: '--' },
							{
								hrs24: current.mode === 'AM' ? 0 : 12,
								hrs12: 12,
								min: 30,
								mode: current.mode,
							},
						)
						modeTest(
							{ hrs24: 11, hrs12: 11, min: 30, mode: '--' },
							{
								hrs24: current.mode === 'AM' ? 11 : 23,
								hrs12: 11,
								min: 30,
								mode: current.mode,
							},
						)
						modeTest(
							{ hrs24: 1, hrs12: 1, min: 30, mode: '--' },
							{
								hrs24: current.mode === 'AM' ? 1 : 13,
								hrs12: 1,
								min: 30,
								mode: current.mode,
							},
						)
					})
				}
			})
		}

		function integratedTimeObjectTests(): void {
			describe('Integrated (Time Object)', () => {
				hour12Tests()
				minuteTests()
				modeTests()

				function hour12Tests(): void {
					describe('hrs12 - Integrated (Time Object)', () => {
						const hrs12Test = createSegmentTimeObjectTest({
							segment: 'hrs12',
							integration: 'integrated',
						})

						hrs12Test(
							{ hrs24: '--', hrs12: '--', min: '--', mode: '--' },
							{
								hrs24: <Hour24>parseInt(current.hrs24),
								hrs12: <Hour12>parseInt(current.hrs12),
								min: '--',
								mode: '--',
							},
						)

						hrs12Test(
							{ hrs24: '--', hrs12: '--', min: 0, mode: 'AM' },
							{
								hrs24: <Hour24>(
									(current.mode === 'PM'
										? parseInt(current.hrs24) - 12
										: parseInt(current.hrs24))
								),
								hrs12: <Hour12>parseInt(current.hrs12),
								min: 0,
								mode: 'AM',
							},
						)

						hrs12Test(
							{ hrs24: '--', hrs12: '--', min: 0, mode: 'PM' },
							{
								hrs24: <Hour24>(
									(current.mode === 'AM'
										? parseInt(current.hrs12)
										: parseInt(current.hrs24))
								),
								hrs12: <Hour12>parseInt(current.hrs12),
								min: 0,
								mode: 'PM',
							},
						)

						hrs12Test(
							{ hrs24: 10, hrs12: 10, min: 0, mode: 'AM' },
							{
								hrs24: 9,
								hrs12: 9,
								min: 0,
								mode: 'AM',
							},
						)

						hrs12Test(
							{ hrs24: 12, hrs12: 12, min: 30, mode: 'PM' },
							{ hrs24: 11, hrs12: 11, min: 30, mode: 'AM' },
						)

						hrs12Test(
							{ hrs24: 13, hrs12: 1, min: 30, mode: 'PM' },
							{ hrs24: 12, hrs12: 12, min: 30, mode: 'PM' },
						)

						hrs12Test(
							{ hrs24: 0, hrs12: 12, min: 0, mode: 'AM' },
							{ hrs24: 23, hrs12: 11, min: 0, mode: 'PM' },
						)
					})
				}
				function minuteTests(): void {
					describe('minutes - Integrated (Time Object)', () => {
						const minutesTest = createSegmentTimeObjectTest({
							segment: 'min',
							integration: 'integrated',
						})

						minutesTest(
							{ hrs24: 9, hrs12: 9, min: '--', mode: 'AM' },
							{
								hrs24: 9,
								hrs12: 9,
								min: <Minute>parseInt(current.min),
								mode: 'AM',
							},
						)

						minutesTest(
							{ hrs24: 9, hrs12: 9, min: 1, mode: 'AM' },
							{ hrs24: 9, hrs12: 9, min: 0, mode: 'AM' },
						)

						minutesTest(
							{ hrs24: 9, hrs12: 9, min: 10, mode: 'AM' },
							{ hrs24: 9, hrs12: 9, min: 9, mode: 'AM' },
						)

						minutesTest(
							{ hrs24: 12, hrs12: 12, min: 0, mode: 'PM' },
							{ hrs24: 11, hrs12: 11, min: 59, mode: 'AM' },
						)

						minutesTest(
							{ hrs24: 13, hrs12: 1, min: 0, mode: 'PM' },
							{ hrs24: 12, hrs12: 12, min: 59, mode: 'PM' },
						)

						minutesTest(
							{ hrs24: 0, hrs12: 12, min: 0, mode: 'AM' },
							// modifying hrs does not modify mode
							{ hrs24: 23, hrs12: 11, min: 59, mode: 'PM' },
						)
					})
				}
				function modeTests(): void {
					describe('mode - Integrated (Time Object)', () => {
						const modeTest = createSegmentTimeObjectTest({
							segment: 'mode',
							integration: 'integrated',
						})

						modeTest(
							{ hrs24: 11, hrs12: 11, min: 30, mode: 'AM' },
							{ hrs24: 23, hrs12: 11, min: 30, mode: 'PM' },
						)
						modeTest(
							{ hrs24: 13, hrs12: 1, min: 30, mode: 'PM' },
							{ hrs24: 1, hrs12: 1, min: 30, mode: 'AM' },
						)
						modeTest(
							{ hrs24: 0, hrs12: 12, min: 30, mode: 'AM' },
							{ hrs24: 12, hrs12: 12, min: 30, mode: 'PM' },
						)
						modeTest(
							{ hrs24: 12, hrs12: 12, min: 30, mode: 'PM' },
							{ hrs24: 0, hrs12: 12, min: 30, mode: 'AM' },
						)
						modeTest(
							{ hrs24: '--', hrs12: '--', min: '--', mode: '--' },
							{ hrs24: '--', hrs12: '--', min: '--', mode: current.mode },
						)
						modeTest(
							{ hrs24: 12, hrs12: 12, min: 30, mode: '--' },
							{
								hrs24: current.mode === 'AM' ? 0 : 12,
								hrs12: 12,
								min: 30,
								mode: current.mode,
							},
						)
						modeTest(
							{ hrs24: 11, hrs12: 11, min: 30, mode: '--' },
							{
								hrs24: current.mode === 'AM' ? 11 : 23,
								hrs12: 11,
								min: 30,
								mode: current.mode,
							},
						)
						modeTest(
							{ hrs24: 1, hrs12: 1, min: 30, mode: '--' },
							{
								hrs24: current.mode === 'AM' ? 1 : 13,
								hrs12: 1,
								min: 30,
								mode: current.mode,
							},
						)
					})
				}
			})
		}
	})
}
