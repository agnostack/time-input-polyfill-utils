import {
	modifierTest,
	deepModifierTest,
	current,
	BeforeAfterString,
	BeforeAfterObject,
	CommonSettingsString,
	CommonSettingsObject,
} from '../../modify.test'
import { Minute } from '../../../../types'

export default (): void => {
	describe('Decrement minutes', () => {
		//////////////////////////////////////////

		tests12hr()
		tests24hr()
		testsTimeObject()

		function tests12hr(): void {
			describe('12 hour time', () => {
				const settings: CommonSettingsString = {
					format: 'string12hr',
					action: 'decrement',
					target: 'minutes',
				}

				isolatedTests()
				integratedTests()

				function isolatedTests(): void {
					describe('Isolated (12hr)', () => {
						const decrement12hrIsolated = ({
							before,
							after,
						}: BeforeAfterString): void => {
							modifierTest({
								...settings,
								before,
								after,
								integration: 'isolated',
							})
						}
						decrement12hrIsolated({ before: '--:-- --', after: `--:${current.min} --` })
						decrement12hrIsolated({ before: '09:-- AM', after: `09:${current.min} AM` })
						decrement12hrIsolated({ before: '09:01 AM', after: '09:00 AM' })
						decrement12hrIsolated({ before: '09:10 PM', after: '09:09 PM' })
						decrement12hrIsolated({ before: '11:00 AM', after: '11:59 AM' })
						decrement12hrIsolated({ before: '11:00 PM', after: '11:59 PM' })
					})
				}

				function integratedTests(): void {
					describe('Integrated (12hr)', () => {
						const decrement12hrIntegrated = ({
							before,
							after,
						}: BeforeAfterString): void => {
							modifierTest({
								...settings,
								before,
								after,
								integration: 'integrated',
							})
						}
						decrement12hrIntegrated({
							before: '--:-- --',
							after: `--:${current.min} --`,
						})
						decrement12hrIntegrated({
							before: '09:-- AM',
							after: `09:${current.min} AM`,
						})
						decrement12hrIntegrated({ before: '09:01 AM', after: '09:00 AM' })
						decrement12hrIntegrated({ before: '09:10 PM', after: '09:09 PM' })
						decrement12hrIntegrated({ before: '01:00 PM', after: '12:59 PM' })
						// decrementing minutes DOES affect AM/PM
						decrement12hrIntegrated({ before: '12:00 PM', after: '11:59 AM' })
						decrement12hrIntegrated({ before: '12:00 AM', after: '11:59 PM' })
					})
				}
			})
		}

		function tests24hr(): void {
			describe('24 hour time', () => {
				const settings: CommonSettingsString = {
					format: 'string24hr',
					action: 'decrement',
					target: 'minutes',
				}

				isolatedTests()
				integratedTests()

				function isolatedTests(): void {
					describe('Isolated (24hr)', () => {
						const decrement24hrIsolated = ({
							before,
							after,
						}: BeforeAfterString): void => {
							modifierTest({
								...settings,
								before,
								after,
								integration: 'isolated',
							})
						}
						decrement24hrIsolated({ before: '09:01', after: '09:00' })
						decrement24hrIsolated({ before: '09:10', after: '09:09' })
						decrement24hrIsolated({ before: '11:00', after: '11:59' })
						decrement24hrIsolated({ before: '12:00', after: '12:59' })
						decrement24hrIsolated({ before: '23:00', after: '23:59' })
					})
				}

				function integratedTests(): void {
					describe('Integrated (24hr)', () => {
						const decrement24hrIntegrated = ({
							before,
							after,
						}: BeforeAfterString): void => {
							modifierTest({
								...settings,
								before,
								after,
								integration: 'integrated',
							})
						}
						decrement24hrIntegrated({ before: '09:01', after: '09:00' })
						decrement24hrIntegrated({ before: '09:10', after: '09:09' })
						decrement24hrIntegrated({ before: '12:00', after: '11:59' })
						decrement24hrIntegrated({ before: '13:00', after: '12:59' })
						decrement24hrIntegrated({ before: '00:00', after: '23:59' })
					})
				}
			})
		}

		function testsTimeObject(): void {
			describe('Time object', () => {
				const settings: CommonSettingsObject = {
					format: 'timeObject',
					action: 'decrement',
					target: 'minutes',
				}

				isolatedTests()
				integratedTests()

				function isolatedTests(): void {
					describe('Isolated (timeObject)', () => {
						const decrementObjectIsolated = ({
							before,
							after,
						}: BeforeAfterObject): void => {
							deepModifierTest({
								...settings,
								before,
								after,
								integration: 'isolated',
							})
						}

						decrementObjectIsolated({
							before: {
								hrs24: 9,
								hrs12: 9,
								min: '--',
								mode: 'AM',
							},
							after: {
								hrs24: 9,
								hrs12: 9,
								min: <Minute>parseInt(current.min),
								mode: 'AM',
							},
						})

						decrementObjectIsolated({
							before: {
								hrs24: 9,
								hrs12: 9,
								min: 1,
								mode: 'AM',
							},
							after: {
								hrs24: 9,
								hrs12: 9,
								min: 0,
								mode: 'AM',
							},
						})

						decrementObjectIsolated({
							before: {
								hrs24: 9,
								hrs12: 9,
								min: 10,
								mode: 'AM',
							},
							after: {
								hrs24: 9,
								hrs12: 9,
								min: 9,
								mode: 'AM',
							},
						})

						decrementObjectIsolated({
							before: {
								hrs24: 11,
								hrs12: 11,
								min: 0,
								mode: 'AM',
							},
							after: {
								hrs24: 11,
								hrs12: 11,
								min: 59,
								mode: 'AM',
							},
						})

						decrementObjectIsolated({
							before: {
								hrs24: 12,
								hrs12: 12,
								min: 0,
								mode: 'PM',
							},
							after: {
								hrs24: 12,
								hrs12: 12,
								min: 59,
								mode: 'PM',
							},
						})

						decrementObjectIsolated({
							before: {
								hrs24: 23,
								hrs12: 11,
								min: 0,
								mode: 'PM',
							},
							after: {
								hrs24: 23,
								hrs12: 11,
								min: 59,
								mode: 'PM', // modifying hrs does not modify mode
							},
						})
					})
				}

				function integratedTests(): void {
					describe('Integrated (timeObject)', () => {
						const decrementObjectIntegrated = ({
							before,
							after,
						}: BeforeAfterObject): void => {
							deepModifierTest({
								...settings,
								before,
								after,
								integration: 'integrated',
							})
						}

						decrementObjectIntegrated({
							before: {
								hrs24: 9,
								hrs12: 9,
								min: '--',
								mode: 'AM',
							},
							after: {
								hrs24: 9,
								hrs12: 9,
								min: <Minute>parseInt(current.min),
								mode: 'AM',
							},
						})

						decrementObjectIntegrated({
							before: {
								hrs24: 9,
								hrs12: 9,
								min: 1,
								mode: 'AM',
							},
							after: {
								hrs24: 9,
								hrs12: 9,
								min: 0,
								mode: 'AM',
							},
						})

						decrementObjectIntegrated({
							before: {
								hrs24: 9,
								hrs12: 9,
								min: 10,
								mode: 'AM',
							},
							after: {
								hrs24: 9,
								hrs12: 9,
								min: 9,
								mode: 'AM',
							},
						})

						decrementObjectIntegrated({
							before: {
								hrs24: 12,
								hrs12: 12,
								min: 0,
								mode: 'PM',
							},
							after: {
								hrs24: 11,
								hrs12: 11,
								min: 59,
								mode: 'AM',
							},
						})

						decrementObjectIntegrated({
							before: {
								hrs24: 13,
								hrs12: 1,
								min: 0,
								mode: 'PM',
							},
							after: {
								hrs24: 12,
								hrs12: 12,
								min: 59,
								mode: 'PM',
							},
						})

						decrementObjectIntegrated({
							before: {
								hrs24: 0,
								hrs12: 12,
								min: 0,
								mode: 'AM',
							},
							after: {
								hrs24: 23,
								hrs12: 11,
								min: 59,
								mode: 'PM', // modifying hrs does not modify mode
							},
						})
					})
				}
			})
		}
	})
}
