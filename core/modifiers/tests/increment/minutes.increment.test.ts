import {
	modifierTest,
	deepModifierTest,
	current,
	BeforeAfterString,
	BeforeAfterObject,
	CommonSettingsString,
	CommonSettingsObject,
} from '../../modifiers.test'
import { Minute } from '../../../../types'

export default () => {
	describe('Increment minutes', () => {
		//////////////////////////////////////////

		tests12hr()
		tests24hr()
		testsTimeObject()

		function tests12hr() {
			describe('12 hour time', () => {
				const settings: CommonSettingsString = {
					format: 'string12hr',
					action: 'increment',
					target: 'minutes',
				}

				isolatedTests()
				integratedTests()

				function isolatedTests() {
					describe('Isolated (12hr)', () => {
						const increment12hrIsolated = ({ before, after }: BeforeAfterString) => {
							modifierTest({
								...settings,
								before,
								after,
								integration: 'isolated',
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

				function integratedTests() {
					describe('Integrated (12hr)', () => {
						const increment12hrIntegrated = ({ before, after }: BeforeAfterString) => {
							modifierTest({
								...settings,
								before,
								after,
								integration: 'integrated',
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

		function tests24hr() {
			describe('24 hour time', () => {
				const settings: CommonSettingsString = {
					format: 'string24hr',
					action: 'increment',
					target: 'minutes',
				}

				isolatedTests()
				integratedTests()

				function isolatedTests() {
					describe('Isolated (24hr)', () => {
						const increment24hrIsolated = ({ before, after }: BeforeAfterString) => {
							modifierTest({
								...settings,
								before,
								after,
								integration: 'isolated',
							})
						}
						increment24hrIsolated({ before: '09:00', after: '09:01' })
						increment24hrIsolated({ before: '09:09', after: '09:10' })
						increment24hrIsolated({ before: '11:59', after: '11:00' })
						increment24hrIsolated({ before: '12:59', after: '12:00' })
						increment24hrIsolated({ before: '23:59', after: '23:00' })
					})
				}

				function integratedTests() {
					describe('Integrated (24hr)', () => {
						const increment24hrIntegrated = ({ before, after }: BeforeAfterString) => {
							modifierTest({
								...settings,
								before,
								after,
								integration: 'integrated',
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

		function testsTimeObject() {
			describe('Time object', () => {
				const settings: CommonSettingsObject = {
					format: 'timeObject',
					action: 'increment',
					target: 'minutes',
				}

				isolatedTests()
				integratedTests()

				function isolatedTests() {
					describe('Isolated (timeObject)', () => {
						const incrementObjectIsolated = ({ before, after }: BeforeAfterObject) => {
							deepModifierTest({
								...settings,
								before,
								after,
								integration: 'isolated',
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

				function integratedTests() {
					describe('Integrated (timeObject)', () => {
						const incrementObjectIntegrated = ({
							before,
							after,
						}: BeforeAfterObject) => {
							deepModifierTest({
								...settings,
								before,
								after,
								integration: 'integrated',
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
