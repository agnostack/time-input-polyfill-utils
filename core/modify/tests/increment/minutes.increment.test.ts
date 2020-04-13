import {
	modifierTest,
	deepModifierTest,
	current,
	BeforeAfterString,
	BeforeAfterObject,
} from '../../modify.test'
import { Minute } from '../../../../types'
import { modifyString12hr, modifyString24hr, modifyTimeObject } from '../../modify'

export default (): void => {
	describe('Increment minutes', () => {
		//////////////////////////////////////////

		tests12hr()
		tests24hr()
		testsTimeObject()

		function tests12hr(): void {
			describe('12 hour time', () => {
				isolatedTests()
				integratedTests()

				function isolatedTests(): void {
					describe('Isolated (12hr)', () => {
						const increment12hrIsolated = ({
							before,
							after,
						}: BeforeAfterString): void => {
							modifierTest({
								before,
								after,
								test: () => modifyString12hr(before).increment.min.isolated(),
							})
						}
						increment12hrIsolated({ before: '--:-- --', after: `--:${current.min} --` })
						increment12hrIsolated({ before: '09:-- AM', after: `09:${current.min} AM` })
						increment12hrIsolated({ before: '09:00 AM', after: '09:01 AM' })
						increment12hrIsolated({ before: '09:09 PM', after: '09:10 PM' })
						increment12hrIsolated({ before: '11:59 AM', after: '11:00 AM' })
						increment12hrIsolated({ before: '11:59 PM', after: '11:00 PM' })
					})
				}

				function integratedTests(): void {
					describe('Integrated (12hr)', () => {
						const increment12hrIntegrated = ({
							before,
							after,
						}: BeforeAfterString): void => {
							modifierTest({
								before,
								after,
								test: () => modifyString12hr(before).increment.min.integrated(),
							})
						}
						increment12hrIntegrated({
							before: '--:-- --',
							after: `--:${current.min} --`,
						})
						increment12hrIntegrated({
							before: '09:-- AM',
							after: `09:${current.min} AM`,
						})
						increment12hrIntegrated({ before: '09:00 AM', after: '09:01 AM' })
						increment12hrIntegrated({ before: '09:09 PM', after: '09:10 PM' })
						increment12hrIntegrated({ before: '12:59 PM', after: '01:00 PM' })
						// incrementing minutes DOES affect AM/PM
						increment12hrIntegrated({ before: '11:59 AM', after: '12:00 PM' })
						increment12hrIntegrated({ before: '11:59 PM', after: '12:00 AM' })
					})
				}
			})
		}

		function tests24hr(): void {
			describe('24 hour time', () => {
				const settings: CommonSettingsString = {
					format: 'string24hr',
					action: 'increment',
					target: 'minutes',
				}

				isolatedTests()
				integratedTests()

				function isolatedTests(): void {
					describe('Isolated (24hr)', () => {
						const increment24hrIsolated = ({
							before,
							after,
						}: BeforeAfterString): void => {
							modifierTest({
								before,
								after,
								test: () => modifyString24hr(before).increment.min.isolated(),
							})
						}
						increment24hrIsolated({ before: '09:00', after: '09:01' })
						increment24hrIsolated({ before: '09:09', after: '09:10' })
						increment24hrIsolated({ before: '11:59', after: '11:00' })
						increment24hrIsolated({ before: '12:59', after: '12:00' })
						increment24hrIsolated({ before: '23:59', after: '23:00' })
					})
				}

				function integratedTests(): void {
					describe('Integrated (24hr)', () => {
						const increment24hrIntegrated = ({
							before,
							after,
						}: BeforeAfterString): void => {
							modifierTest({
								before,
								after,
								test: () => modifyString24hr(before).increment.min.integrated(),
							})
						}
						increment24hrIntegrated({ before: '09:00', after: '09:01' })
						increment24hrIntegrated({ before: '09:09', after: '09:10' })
						increment24hrIntegrated({ before: '11:59', after: '12:00' })
						increment24hrIntegrated({ before: '12:59', after: '13:00' })
						increment24hrIntegrated({ before: '23:59', after: '00:00' })
					})
				}
			})
		}

		function testsTimeObject(): void {
			describe('Time object', () => {
				isolatedTests()
				integratedTests()

				function isolatedTests(): void {
					describe('Isolated (timeObject)', () => {
						const incrementObjectIsolated = ({
							before,
							after,
						}: BeforeAfterObject): void => {
							deepModifierTest({
								before,
								after,
								test: () => modifyTimeObject(before).increment.min.isolated(),
							})
						}

						incrementObjectIsolated({
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

						incrementObjectIsolated({
							before: {
								hrs24: 9,
								hrs12: 9,
								min: 0,
								mode: 'AM',
							},
							after: {
								hrs24: 9,
								hrs12: 9,
								min: 1,
								mode: 'AM',
							},
						})

						incrementObjectIsolated({
							before: {
								hrs24: 9,
								hrs12: 9,
								min: 9,
								mode: 'AM',
							},
							after: {
								hrs24: 9,
								hrs12: 9,
								min: 10,
								mode: 'AM',
							},
						})

						incrementObjectIsolated({
							before: {
								hrs24: 11,
								hrs12: 11,
								min: 59,
								mode: 'AM',
							},
							after: {
								hrs24: 11,
								hrs12: 11,
								min: 0,
								mode: 'AM',
							},
						})

						incrementObjectIsolated({
							before: {
								hrs24: 12,
								hrs12: 12,
								min: 59,
								mode: 'PM',
							},
							after: {
								hrs24: 12,
								hrs12: 12,
								min: 0,
								mode: 'PM',
							},
						})

						incrementObjectIsolated({
							before: {
								hrs24: 23,
								hrs12: 11,
								min: 59,
								mode: 'PM',
							},
							after: {
								hrs24: 23,
								hrs12: 11,
								min: 0,
								mode: 'PM', // modifying hrs does not modify mode
							},
						})
					})
				}

				function integratedTests(): void {
					describe('Integrated (timeObject)', (): void => {
						const incrementObjectIntegrated = ({
							before,
							after,
						}: BeforeAfterObject): void => {
							deepModifierTest({
								before,
								after,
								test: () => modifyTimeObject(before).increment.min.integrated(),
							})
						}

						incrementObjectIntegrated({
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

						incrementObjectIntegrated({
							before: {
								hrs24: 9,
								hrs12: 9,
								min: 0,
								mode: 'AM',
							},
							after: {
								hrs24: 9,
								hrs12: 9,
								min: 1,
								mode: 'AM',
							},
						})

						incrementObjectIntegrated({
							before: {
								hrs24: 9,
								hrs12: 9,
								min: 9,
								mode: 'AM',
							},
							after: {
								hrs24: 9,
								hrs12: 9,
								min: 10,
								mode: 'AM',
							},
						})

						incrementObjectIntegrated({
							before: {
								hrs24: 11,
								hrs12: 11,
								min: 59,
								mode: 'AM',
							},
							after: {
								hrs24: 12,
								hrs12: 12,
								min: 0,
								mode: 'PM',
							},
						})

						incrementObjectIntegrated({
							before: {
								hrs24: 12,
								hrs12: 12,
								min: 59,
								mode: 'PM',
							},
							after: {
								hrs24: 13,
								hrs12: 1,
								min: 0,
								mode: 'PM',
							},
						})

						incrementObjectIntegrated({
							before: {
								hrs24: 23,
								hrs12: 11,
								min: 59,
								mode: 'PM',
							},
							after: {
								hrs24: 0,
								hrs12: 12,
								min: 0,
								mode: 'AM', // modifying hrs does not modify mode
							},
						})
					})
				}
			})
		}
	})
}
