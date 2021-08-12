import {
	modifierTest,
	deepModifierTest,
	BeforeAfterString,
	BeforeAfterObject,
} from '../../modify.test'
import { modifyString12hr, modifyString24hr, modifyTimeObject } from '../../modify'

export default (): void => {
	describe('Decrement hours', () => {
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
						const decrement12hrIsolated = ({
							before,
							after,
						}: BeforeAfterString): void => {
							modifierTest({
								before,
								after,
								test: () => modifyString12hr(before).decrement.hrs12.isolated(),
							})
						}
						decrement12hrIsolated({
							before: '--:-- --',
							after: `12:-- --`,
						})
						decrement12hrIsolated({
							before: '--:00 AM',
							after: `12:00 AM`,
						})
						decrement12hrIsolated({
							before: '--:00 PM',
							after: `12:00 PM`,
						})
						decrement12hrIsolated({ before: '10:00 AM', after: '09:00 AM' })
						decrement12hrIsolated({ before: '01:30 PM', after: '12:30 PM' })
						// incrementing hours does not affect AM/PM
						decrement12hrIsolated({ before: '12:30 AM', after: '11:30 AM' })
						decrement12hrIsolated({ before: '12:00 PM', after: '11:00 PM' })
					})
				}

				function integratedTests(): void {
					describe('Integrated (12hr)', () => {
						const decrement12hrIntegrated = ({
							before,
							after,
						}: BeforeAfterString): void => {
							modifierTest({
								before,
								after,
								test: () => modifyString12hr(before).decrement.hrs12.integrated(),
							})
						}
						decrement12hrIntegrated({
							before: '--:-- --',
							after: `12:-- --`,
						})
						decrement12hrIntegrated({
							before: '--:00 AM',
							after: `12:00 AM`,
						})
						decrement12hrIntegrated({
							before: '--:00 PM',
							after: `12:00 PM`,
						})
						decrement12hrIntegrated({ before: '10:00 AM', after: '09:00 AM' })
						decrement12hrIntegrated({ before: '01:30 PM', after: '12:30 PM' })
						// incrementing hours DOES affect AM/PM
						decrement12hrIntegrated({ before: '12:30 PM', after: '11:30 AM' })
						decrement12hrIntegrated({ before: '12:00 AM', after: '11:00 PM' })
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
						const decrement24hrIsolated = ({
							before,
							after,
						}: BeforeAfterString): void => {
							modifierTest({
								before,
								after,
								test: () => modifyString24hr(before).decrement.hrs24.isolated(),
							})
						}
						decrement24hrIsolated({ before: '10:00', after: '09:00' })
						decrement24hrIsolated({ before: '00:30', after: '11:30' })
						decrement24hrIsolated({ before: '13:30', after: '12:30' })
						decrement24hrIsolated({ before: '12:00', after: '23:00' })
					})
				}

				function integratedTests(): void {
					describe('Integrated (24hr)', () => {
						const decrement24hrIntegrated = ({
							before,
							after,
						}: BeforeAfterString): void => {
							modifierTest({
								before,
								after,
								test: () => modifyString24hr(before).decrement.hrs24.integrated(),
							})
						}
						decrement24hrIntegrated({ before: '10:00', after: '09:00' })
						decrement24hrIntegrated({ before: '12:30', after: '11:30' })
						decrement24hrIntegrated({ before: '13:30', after: '12:30' })
						decrement24hrIntegrated({ before: '00:00', after: '23:00' })
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
						const decrementObjectIsolated = ({
							before,
							after,
						}: BeforeAfterObject): void => {
							deepModifierTest({
								before,
								after,
								test: () => modifyTimeObject(before).decrement.hrs12.isolated(),
							})
						}

						decrementObjectIsolated({
							before: {
								hrs24: null,
								hrs12: null,
								minutes: null,
								mode: null,
							},
							after: {
								hrs24: 0,
								hrs12: 12,
								minutes: null,
								mode: null,
							},
						})

						decrementObjectIsolated({
							before: {
								hrs24: null,
								hrs12: null,
								minutes: 0,
								mode: 'AM',
							},
							after: {
								hrs24: 0,
								hrs12: 12,
								minutes: 0,
								mode: 'AM',
							},
						})

						decrementObjectIsolated({
							before: {
								hrs24: null,
								hrs12: null,
								minutes: 0,
								mode: 'PM',
							},
							after: {
								hrs24: 12,
								hrs12: 12,
								minutes: 0,
								mode: 'PM',
							},
						})

						decrementObjectIsolated({
							before: {
								hrs24: 10,
								hrs12: 10,
								minutes: 0,
								mode: 'AM',
							},
							after: {
								hrs24: 9,
								hrs12: 9,
								minutes: 0,
								mode: 'AM',
							},
						})

						decrementObjectIsolated({
							before: {
								hrs24: 0,
								hrs12: 12,
								minutes: 30,
								mode: 'AM',
							},
							after: {
								hrs24: 11,
								hrs12: 11,
								minutes: 30,
								mode: 'AM',
							},
						})

						decrementObjectIsolated({
							before: {
								hrs24: 13,
								hrs12: 1,
								minutes: 30,
								mode: 'PM',
							},
							after: {
								hrs24: 12,
								hrs12: 12,
								minutes: 30,
								mode: 'PM',
							},
						})

						decrementObjectIsolated({
							before: {
								hrs24: 12,
								hrs12: 12,
								minutes: 0,
								mode: 'PM',
							},
							after: {
								hrs24: 23,
								hrs12: 11,
								minutes: 0,
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
								before,
								after,
								test: () => modifyTimeObject(before).decrement.hrs12.integrated(),
							})
						}

						decrementObjectIntegrated({
							before: {
								hrs24: null,
								hrs12: null,
								minutes: null,
								mode: null,
							},
							after: {
								hrs24: 0,
								hrs12: 12,
								minutes: null,
								mode: null,
							},
						})

						decrementObjectIntegrated({
							before: {
								hrs24: null,
								hrs12: null,
								minutes: 0,
								mode: 'AM',
							},
							after: {
								hrs24: 0,
								hrs12: 12,
								minutes: 0,
								mode: 'AM',
							},
						})

						decrementObjectIntegrated({
							before: {
								hrs24: null,
								hrs12: null,
								minutes: 0,
								mode: 'PM',
							},
							after: {
								hrs24: 12,
								hrs12: 12,
								minutes: 0,
								mode: 'PM',
							},
						})

						decrementObjectIntegrated({
							before: {
								hrs24: 10,
								hrs12: 10,
								minutes: 0,
								mode: 'AM',
							},
							after: {
								hrs24: 9,
								hrs12: 9,
								minutes: 0,
								mode: 'AM',
							},
						})

						decrementObjectIntegrated({
							before: {
								hrs24: 12,
								hrs12: 12,
								minutes: 30,
								mode: 'PM',
							},
							after: {
								hrs24: 11,
								hrs12: 11,
								minutes: 30,
								mode: 'AM',
							},
						})

						decrementObjectIntegrated({
							before: {
								hrs24: 13,
								hrs12: 1,
								minutes: 30,
								mode: 'PM',
							},
							after: {
								hrs24: 12,
								hrs12: 12,
								minutes: 30,
								mode: 'PM',
							},
						})

						decrementObjectIntegrated({
							before: {
								hrs24: 0,
								hrs12: 12,
								minutes: 0,
								mode: 'AM',
							},
							after: {
								hrs24: 23,
								hrs12: 11,
								minutes: 0,
								mode: 'PM',
							},
						})
					})
				}
			})
		}
	})
}
