import { segmentTest, segmentTimeObjectTest } from '../../modify.test'
import { Segment, TimeObject } from '../../../../types/index'
import { Integration } from '../../modify.types'

interface CreateSegmentTest {
	segment?: Segment
	integration: Integration
}

const createSegmentTest = ({ segment, integration }: CreateSegmentTest): Function => {
	return (before: string, after: string): void => {
		segmentTest({
			segment: segment,
			before: before,
			after: after,
			action: 'increment',
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
			action: 'increment',
			integration,
		})
	}
}

export default (): void => {
	describe('Increment tests - Current segment', () => {
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
				function hoursTests(hrs12Test: Function): void {
					hrs12Test('--:-- --', `01:-- --`)
					hrs12Test('--:00 AM', `01:00 AM`)
					hrs12Test('--:00 PM', `01:00 PM`)
					hrs12Test('09:00 AM', '10:00 AM')
					hrs12Test('12:30 PM', '01:30 PM')
					// incrementing hours does not affect AM/PM
					hrs12Test('11:30 AM', '12:30 AM')
					hrs12Test('11:00 PM', '12:00 PM')
				}
				// if segment is not known, it should default to hrs12 behavior
				describe('undefined segment - (defaults to hrs12)', () => {
					const hrs12Test = createSegmentTest({
						integration: 'isolated',
					})
					hoursTests(hrs12Test)
				})
				describe('hrs12 - Isolated (12hr)', () => {
					const hrs12Test = createSegmentTest({
						segment: 'hrs12',
						integration: 'isolated',
					})
					hoursTests(hrs12Test)
				})
				describe('minutes - Isolated (12hr)', () => {
					const minTest = createSegmentTest({
						segment: 'minutes',
						integration: 'isolated',
					})
					minTest('--:-- --', `--:00 --`)
					minTest('09:-- AM', `09:00 AM`)
					minTest('09:00 AM', '09:01 AM')
					minTest('09:09 PM', '09:10 PM')
					minTest('11:59 AM', '11:00 AM')
					minTest('11:59 PM', '11:00 PM')
				})
				describe('mode - Isolated (12hr)', () => {
					const modeTest = createSegmentTest({
						segment: 'mode',
						integration: 'isolated',
					})
					modeTest('--:-- --', `--:-- AM`)
					modeTest('09:00 --', `09:00 AM`)
					modeTest('09:00 AM', '09:00 PM')
					modeTest('09:00 PM', '09:00 AM')
					modeTest('11:59 AM', '11:59 PM')
					modeTest('11:59 PM', '11:59 AM')
				})
			})
		}

		function integrated12HrStringTests(): void {
			describe('Integrated (12hr)', () => {
				function hoursTests(hrs12Test: Function): void {
					hrs12Test('--:-- --', `01:-- --`)
					hrs12Test('--:00 AM', `01:00 AM`)
					hrs12Test('--:00 PM', `01:00 PM`)
					hrs12Test('09:00 AM', '10:00 AM')
					hrs12Test('12:30 PM', '01:30 PM')
					// incrementing hours affects AM/PM
					hrs12Test('11:30 AM', '12:30 PM')
					hrs12Test('11:00 PM', '12:00 AM')
				}

				describe('undefined segment - (defaults to hrs12)', () => {
					const hrs12Test = createSegmentTest({
						integration: 'integrated',
					})
					hoursTests(hrs12Test)
				})
				describe('hrs12 - Integrated (12hr)', () => {
					const hrs12Test = createSegmentTest({
						segment: 'hrs12',
						integration: 'integrated',
					})
					hoursTests(hrs12Test)
				})
				describe('minutes - Integrated (12hr)', () => {
					const minTest = createSegmentTest({
						segment: 'minutes',
						integration: 'integrated',
					})
					minTest('--:-- --', `--:00 --`)
					minTest('09:-- AM', `09:00 AM`)
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
					})
					modeTest('--:-- --', `--:-- AM`)
					modeTest('09:00 --', `09:00 AM`)
					modeTest('09:00 AM', '09:00 PM')
					modeTest('09:00 PM', '09:00 AM')
					modeTest('11:59 AM', '11:59 PM')
					modeTest('11:59 PM', '11:59 AM')
				})
			})
		}

		function isolatedTimeObjectTests(): void {
			describe('Isolated (Time Object)', () => {
				undefinedTests()
				hour12Tests()
				minuteTests()
				modeTests()

				function hoursTests(hrs12Test: Function): void {
					hrs12Test(
						{ hrs24: null, hrs12: null, minutes: null, mode: null },
						{
							hrs24: 1,
							hrs12: 1,
							minutes: null,
							mode: null,
						},
					)

					hrs12Test(
						{ hrs24: null, hrs12: null, minutes: 0, mode: 'AM' },
						{
							hrs24: 1,
							hrs12: 1,
							minutes: 0,
							mode: 'AM',
						},
					)

					hrs12Test(
						{ hrs24: null, hrs12: null, minutes: 0, mode: 'PM' },
						{
							hrs24: 13,
							hrs12: 1,
							minutes: 0,
							mode: 'PM',
						},
					)

					hrs12Test(
						{ hrs24: 9, hrs12: 9, minutes: 0, mode: 'AM' },
						{ hrs24: 10, hrs12: 10, minutes: 0, mode: 'AM' },
					)

					hrs12Test(
						{ hrs24: 11, hrs12: 11, minutes: 30, mode: 'AM' },
						{ hrs24: 0, hrs12: 12, minutes: 30, mode: 'AM' },
					)

					hrs12Test(
						{ hrs24: 12, hrs12: 12, minutes: 30, mode: 'PM' },
						{ hrs24: 13, hrs12: 1, minutes: 30, mode: 'PM' },
					)

					hrs12Test(
						{ hrs24: 23, hrs12: 11, minutes: 0, mode: 'PM' },
						{ hrs24: 12, hrs12: 12, minutes: 0, mode: 'PM' },
					)
				}

				function undefinedTests(): void {
					describe('undefined segment - (defaults to hrs12) Time Object', () => {
						const hrs12Test = createSegmentTimeObjectTest({
							segment: 'hrs12',
							integration: 'isolated',
						})
						hoursTests(hrs12Test)
					})
				}

				function hour12Tests(): void {
					describe('hrs12 - Isolated (Time Object)', () => {
						const hrs12Test = createSegmentTimeObjectTest({
							segment: 'hrs12',
							integration: 'isolated',
						})

						hoursTests(hrs12Test)
					})
				}
				function minuteTests(): void {
					describe('minutes - Isolated (Time Object)', () => {
						const minutesTest = createSegmentTimeObjectTest({
							segment: 'minutes',
							integration: 'isolated',
						})

						minutesTest(
							{ hrs24: 9, hrs12: 9, minutes: null, mode: 'AM' },
							{ hrs24: 9, hrs12: 9, minutes: 0, mode: 'AM' },
						)

						minutesTest(
							{ hrs24: 9, hrs12: 9, minutes: 0, mode: 'AM' },
							{ hrs24: 9, hrs12: 9, minutes: 1, mode: 'AM' },
						)

						minutesTest(
							{ hrs24: 9, hrs12: 9, minutes: 9, mode: 'AM' },
							{ hrs24: 9, hrs12: 9, minutes: 10, mode: 'AM' },
						)

						minutesTest(
							{ hrs24: 11, hrs12: 11, minutes: 59, mode: 'AM' },
							{ hrs24: 11, hrs12: 11, minutes: 0, mode: 'AM' },
						)

						minutesTest(
							{ hrs24: 12, hrs12: 12, minutes: 59, mode: 'PM' },
							{ hrs24: 12, hrs12: 12, minutes: 0, mode: 'PM' },
						)

						minutesTest(
							{ hrs24: 23, hrs12: 11, minutes: 59, mode: 'PM' },
							// modifying hrs does not modify mode
							{ hrs24: 23, hrs12: 11, minutes: 0, mode: 'PM' },
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
							{ hrs24: 11, hrs12: 11, minutes: 30, mode: 'AM' },
							{ hrs24: 23, hrs12: 11, minutes: 30, mode: 'PM' },
						)
						modeTest(
							{ hrs24: 13, hrs12: 1, minutes: 30, mode: 'PM' },
							{ hrs24: 1, hrs12: 1, minutes: 30, mode: 'AM' },
						)
						modeTest(
							{ hrs24: 0, hrs12: 12, minutes: 30, mode: 'AM' },
							{ hrs24: 12, hrs12: 12, minutes: 30, mode: 'PM' },
						)
						modeTest(
							{ hrs24: 12, hrs12: 12, minutes: 30, mode: 'PM' },
							{ hrs24: 0, hrs12: 12, minutes: 30, mode: 'AM' },
						)
						modeTest(
							{ hrs24: null, hrs12: null, minutes: null, mode: null },
							{ hrs24: null, hrs12: null, minutes: null, mode: 'AM' },
						)
						modeTest(
							{ hrs24: 0, hrs12: 12, minutes: 30, mode: null },
							{
								hrs24: 0,
								hrs12: 12,
								minutes: 30,
								mode: 'AM',
							},
						)
						modeTest(
							{ hrs24: 12, hrs12: 12, minutes: 30, mode: null },
							{
								hrs24: 12,
								hrs12: 12,
								minutes: 30,
								mode: 'PM',
							},
						)
						modeTest(
							{ hrs24: 11, hrs12: 11, minutes: 30, mode: null },
							{
								hrs24: 11,
								hrs12: 11,
								minutes: 30,
								mode: 'AM',
							},
						)
						modeTest(
							{ hrs24: 1, hrs12: 1, minutes: 30, mode: null },
							{
								hrs24: 1,
								hrs12: 1,
								minutes: 30,
								mode: 'AM',
							},
						)
					})
				}
			})
		}

		function integratedTimeObjectTests(): void {
			describe('Integrated (Time Object)', () => {
				undefinedTests()
				hour12Tests()
				minuteTests()
				modeTests()

				function hoursTests(hrs12Test: Function): void {
					hrs12Test(
						{ hrs24: null, hrs12: null, minutes: null, mode: null },
						{
							hrs24: 1,
							hrs12: 1,
							minutes: null,
							mode: null,
						},
					)

					hrs12Test(
						{ hrs24: null, hrs12: null, minutes: 0, mode: 'AM' },
						{
							hrs24: 1,
							hrs12: 1,
							minutes: 0,
							mode: 'AM',
						},
					)

					hrs12Test(
						{ hrs24: null, hrs12: null, minutes: 0, mode: 'PM' },
						{
							hrs24: 13,
							hrs12: 1,
							minutes: 0,
							mode: 'PM',
						},
					)

					hrs12Test(
						{ hrs24: 9, hrs12: 9, minutes: 0, mode: 'AM' },
						{ hrs24: 10, hrs12: 10, minutes: 0, mode: 'AM' },
					)

					hrs12Test(
						{ hrs24: 11, hrs12: 11, minutes: 30, mode: 'AM' },
						{ hrs24: 12, hrs12: 12, minutes: 30, mode: 'PM' },
					)

					hrs12Test(
						{ hrs24: 12, hrs12: 12, minutes: 30, mode: 'PM' },
						{ hrs24: 13, hrs12: 1, minutes: 30, mode: 'PM' },
					)

					hrs12Test(
						{ hrs24: 23, hrs12: 11, minutes: 0, mode: 'PM' },
						{ hrs24: 0, hrs12: 12, minutes: 0, mode: 'AM' },
					)
				}

				function undefinedTests(): void {
					describe('undefined segment - (defaults to hrs12) Time Object', () => {
						const hrs12Test = createSegmentTimeObjectTest({
							integration: 'integrated',
						})
						hoursTests(hrs12Test)
					})
				}

				function hour12Tests(): void {
					describe('hrs12 - Integrated (Time Object)', () => {
						const hrs12Test = createSegmentTimeObjectTest({
							segment: 'hrs12',
							integration: 'integrated',
						})

						hoursTests(hrs12Test)
					})
				}
				function minuteTests(): void {
					describe('minutes - Integrated (Time Object)', () => {
						const minutesTest = createSegmentTimeObjectTest({
							segment: 'minutes',
							integration: 'integrated',
						})

						minutesTest(
							{ hrs24: 9, hrs12: 9, minutes: null, mode: 'AM' },
							{ hrs24: 9, hrs12: 9, minutes: 0, mode: 'AM' },
						)

						minutesTest(
							{ hrs24: 9, hrs12: 9, minutes: 0, mode: 'AM' },
							{ hrs24: 9, hrs12: 9, minutes: 1, mode: 'AM' },
						)

						minutesTest(
							{ hrs24: 9, hrs12: 9, minutes: 9, mode: 'AM' },
							{ hrs24: 9, hrs12: 9, minutes: 10, mode: 'AM' },
						)

						minutesTest(
							{ hrs24: 11, hrs12: 11, minutes: 59, mode: 'AM' },
							{ hrs24: 12, hrs12: 12, minutes: 0, mode: 'PM' },
						)

						minutesTest(
							{ hrs24: 12, hrs12: 12, minutes: 59, mode: 'PM' },
							{ hrs24: 13, hrs12: 1, minutes: 0, mode: 'PM' },
						)

						minutesTest(
							{ hrs24: 23, hrs12: 11, minutes: 59, mode: 'PM' },
							// modifying hrs does not modify mode
							{ hrs24: 0, hrs12: 12, minutes: 0, mode: 'AM' },
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
							{ hrs24: 11, hrs12: 11, minutes: 30, mode: 'AM' },
							{ hrs24: 23, hrs12: 11, minutes: 30, mode: 'PM' },
						)
						modeTest(
							{ hrs24: 13, hrs12: 1, minutes: 30, mode: 'PM' },
							{ hrs24: 1, hrs12: 1, minutes: 30, mode: 'AM' },
						)
						modeTest(
							{ hrs24: 0, hrs12: 12, minutes: 30, mode: 'AM' },
							{ hrs24: 12, hrs12: 12, minutes: 30, mode: 'PM' },
						)
						modeTest(
							{ hrs24: 12, hrs12: 12, minutes: 30, mode: 'PM' },
							{ hrs24: 0, hrs12: 12, minutes: 30, mode: 'AM' },
						)
						modeTest(
							{ hrs24: null, hrs12: null, minutes: null, mode: null },
							{ hrs24: null, hrs12: null, minutes: null, mode: 'AM' },
						)
						modeTest(
							{ hrs24: 0, hrs12: 12, minutes: 30, mode: null },
							{
								hrs24: 0,
								hrs12: 12,
								minutes: 30,
								mode: 'AM',
							},
						)
						modeTest(
							{ hrs24: 12, hrs12: 12, minutes: 30, mode: null },
							{
								hrs24: 12,
								hrs12: 12,
								minutes: 30,
								mode: 'PM',
							},
						)
						modeTest(
							{ hrs24: 11, hrs12: 11, minutes: 30, mode: null },
							{
								hrs24: 11,
								hrs12: 11,
								minutes: 30,
								mode: 'AM',
							},
						)
						modeTest(
							{ hrs24: 1, hrs12: 1, minutes: 30, mode: null },
							{
								hrs24: 1,
								hrs12: 1,
								minutes: 30,
								mode: 'AM',
							},
						)
					})
				}
			})
		}
	})
}
