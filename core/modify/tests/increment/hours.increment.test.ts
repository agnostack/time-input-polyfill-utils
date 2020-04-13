import {
	modifierTest,
	deepModifierTest,
	current,
	BeforeAfterString,
	BeforeAfterObject,
} from '../../modify.test'
import { Hour24, Hour12 } from '../../../../types/index'
import { modifyString12hr, modifyString24hr, modifyTimeObject } from '../../modify'

export default (): void => {
	describe('Increment hours', () => {
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
								test: () => modifyString12hr(before).increment.hrs12.isolated(),
							})
						}
						increment12hrIsolated({
							before: '--:-- --',
							after: `${current.hrs12}:-- --`,
						})
						increment12hrIsolated({
							before: '--:00 AM',
							after: `${current.hrs12}:00 AM`,
						})
						increment12hrIsolated({
							before: '--:00 PM',
							after: `${current.hrs12}:00 PM`,
						})
						increment12hrIsolated({ before: '09:00 AM', after: '10:00 AM' })
						increment12hrIsolated({ before: '12:30 PM', after: '01:30 PM' })
						// incrementing hours does not affect AM/PM
						increment12hrIsolated({ before: '11:30 AM', after: '12:30 AM' })
						increment12hrIsolated({ before: '11:00 PM', after: '12:00 PM' })
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
								test: () => modifyString12hr(before).increment.hrs12.integrated(),
							})
						}
						increment12hrIntegrated({
							before: '--:-- --',
							after: `${current.hrs12}:-- --`,
						})
						increment12hrIntegrated({
							before: '--:00 AM',
							after: `${current.hrs12}:00 AM`,
						})
						increment12hrIntegrated({
							before: '--:00 PM',
							after: `${current.hrs12}:00 PM`,
						})
						increment12hrIntegrated({ before: '09:00 AM', after: '10:00 AM' })
						increment12hrIntegrated({ before: '12:30 PM', after: '01:30 PM' })
						// incrementing hours DOES affect AM/PM
						increment12hrIntegrated({ before: '11:30 AM', after: '12:30 PM' })
						increment12hrIntegrated({ before: '11:00 PM', after: '12:00 AM' })
					})
				}
			})
		}

		function tests24hr(): void {
			describe('24 hour time', () => {
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
								test: () => modifyString24hr(before).increment.hrs24.isolated(),
							})
						}
						increment24hrIsolated({ before: '09:00', after: '10:00' })
						increment24hrIsolated({ before: '11:30', after: '00:30' })
						increment24hrIsolated({ before: '12:30', after: '13:30' })
						increment24hrIsolated({ before: '23:00', after: '12:00' })
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
								test: () => modifyString24hr(before).increment.hrs24.integrated(),
							})
						}
						increment24hrIntegrated({ before: '09:00', after: '10:00' })
						increment24hrIntegrated({ before: '11:30', after: '12:30' })
						increment24hrIntegrated({ before: '12:30', after: '13:30' })
						increment24hrIntegrated({ before: '23:00', after: '00:00' })
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
								test: () => modifyTimeObject(before).increment.hrs12.isolated(),
							})
						}

						incrementObjectIsolated({
							before: {
								hrs24: '--',
								hrs12: '--',
								min: '--',
								mode: '--',
							},
							after: {
								hrs24: <Hour24>parseInt(current.hrs24),
								hrs12: <Hour12>parseInt(current.hrs12),
								min: '--',
								mode: '--',
							},
						})

						incrementObjectIsolated({
							before: {
								hrs24: '--',
								hrs12: '--',
								min: 0,
								mode: 'AM',
							},
							after: {
								hrs24: <Hour24>(
									(current.mode === 'PM'
										? parseInt(current.hrs24) - 12
										: parseInt(current.hrs24))
								),
								hrs12: <Hour12>parseInt(current.hrs12),
								min: 0,
								mode: 'AM',
							},
						})

						incrementObjectIsolated({
							before: {
								hrs24: '--',
								hrs12: '--',
								min: 0,
								mode: 'PM',
							},
							after: {
								hrs24: <Hour24>(
									(current.mode === 'AM'
										? parseInt(current.hrs12)
										: parseInt(current.hrs24))
								),
								hrs12: <Hour12>parseInt(current.hrs12),
								min: 0,
								mode: 'PM',
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
								hrs24: 10,
								hrs12: 10,
								min: 0,
								mode: 'AM',
							},
						})

						incrementObjectIsolated({
							before: {
								hrs24: 11,
								hrs12: 11,
								min: 30,
								mode: 'AM',
							},
							after: {
								hrs24: 0,
								hrs12: 12,
								min: 30,
								mode: 'AM',
							},
						})

						incrementObjectIsolated({
							before: {
								hrs24: 12,
								hrs12: 12,
								min: 30,
								mode: 'PM',
							},
							after: {
								hrs24: 13,
								hrs12: 1,
								min: 30,
								mode: 'PM',
							},
						})

						incrementObjectIsolated({
							before: {
								hrs24: 23,
								hrs12: 11,
								min: 0,
								mode: 'PM',
							},
							after: {
								hrs24: 12,
								hrs12: 12,
								min: 0,
								mode: 'PM', // modifying hrs does not modify mode
							},
						})
					})
				}

				function integratedTests(): void {
					describe('Integrated (timeObject)', () => {
						const incrementObjectIntegrated = ({
							before,
							after,
						}: BeforeAfterObject): void => {
							deepModifierTest({
								before,
								after,
								test: () => modifyTimeObject(before).increment.hrs12.integrated(),
							})
						}

						incrementObjectIntegrated({
							before: {
								hrs24: '--',
								hrs12: '--',
								min: '--',
								mode: '--',
							},
							after: {
								hrs24: <Hour24>parseInt(current.hrs24),
								hrs12: <Hour12>parseInt(current.hrs12),
								min: '--',
								mode: '--',
							},
						})

						incrementObjectIntegrated({
							before: {
								hrs24: '--',
								hrs12: '--',
								min: 0,
								mode: 'AM',
							},
							after: {
								hrs24: <Hour24>(
									(current.mode === 'PM'
										? parseInt(current.hrs24) - 12
										: parseInt(current.hrs24))
								),
								hrs12: <Hour12>parseInt(current.hrs12),
								min: 0,
								mode: 'AM',
							},
						})

						incrementObjectIntegrated({
							before: {
								hrs24: '--',
								hrs12: '--',
								min: 0,
								mode: 'PM',
							},
							after: {
								hrs24: <Hour24>(
									(current.mode === 'AM'
										? parseInt(current.hrs12)
										: parseInt(current.hrs24))
								),
								hrs12: <Hour12>parseInt(current.hrs12),
								min: 0,
								mode: 'PM',
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
								hrs24: 10,
								hrs12: 10,
								min: 0,
								mode: 'AM',
							},
						})

						incrementObjectIntegrated({
							before: {
								hrs24: 11,
								hrs12: 11,
								min: 30,
								mode: 'AM',
							},
							after: {
								hrs24: 12,
								hrs12: 12,
								min: 30,
								mode: 'PM',
							},
						})

						incrementObjectIntegrated({
							before: {
								hrs24: 12,
								hrs12: 12,
								min: 30,
								mode: 'PM',
							},
							after: {
								hrs24: 13,
								hrs12: 1,
								min: 30,
								mode: 'PM',
							},
						})

						incrementObjectIntegrated({
							before: {
								hrs24: 23,
								hrs12: 11,
								min: 0,
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
