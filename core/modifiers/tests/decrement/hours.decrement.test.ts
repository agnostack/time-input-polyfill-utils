import {
	modifierTest,
	deepModifierTest,
	current,
	BeforeAfterString,
	BeforeAfterObject,
	CommonSettingsString,
	CommonSettingsObject,
} from '../../modifiers.test'
import { Hour24, Hour12 } from '../../../../types'

export default () => {
	describe('Decrement hours', () => {
		//////////////////////////////////////////

		describe('12 hour time', () => {
			const settings: CommonSettingsString = {
				format: 'string12hr',
				action: 'decrement',
				target: 'hours',
			}

			describe('Isolated (12hr)', () => {
				const decrement12hrIsolated = ({ before, after }: BeforeAfterString) => {
					modifierTest({
						...settings,
						before,
						after,
						integration: 'isolated',
					})
				}
				decrement12hrIsolated({ before: '--:-- --', after: `${current.hrs12}:-- --` })
				decrement12hrIsolated({ before: '--:00 AM', after: `${current.hrs12}:00 AM` })
				decrement12hrIsolated({ before: '10:00 AM', after: '09:00 AM' })
				decrement12hrIsolated({ before: '01:30 PM', after: '12:30 PM' })
				// incrementing hours does not affect AM/PM
				decrement12hrIsolated({ before: '12:30 AM', after: '11:30 AM' })
				decrement12hrIsolated({ before: '12:00 PM', after: '11:00 PM' })
			})

			describe('Integrated (12hr)', () => {
				const decrement12hrIntegrated = ({ before, after }: BeforeAfterString) => {
					modifierTest({
						...settings,
						before,
						after,
						integration: 'integrated',
					})
				}
				decrement12hrIntegrated({ before: '--:-- --', after: `${current.hrs12}:-- --` })
				decrement12hrIntegrated({ before: '--:00 AM', after: `${current.hrs12}:00 AM` })
				decrement12hrIntegrated({ before: '10:00 AM', after: '09:00 AM' })
				decrement12hrIntegrated({ before: '01:30 PM', after: '12:30 PM' })
				// incrementing hours DOES affect AM/PM
				decrement12hrIntegrated({ before: '12:30 PM', after: '11:30 AM' })
				decrement12hrIntegrated({ before: '12:00 AM', after: '11:00 PM' })
			})
		})

		describe('24 hour time', () => {
			const settings: CommonSettingsString = {
				format: 'string24hr',
				action: 'decrement',
				target: 'hours',
			}
			describe('Isolated (24hr)', () => {
				const decrement24hrIsolated = ({ before, after }: BeforeAfterString) => {
					modifierTest({
						...settings,
						before,
						after,
						integration: 'isolated',
					})
				}
				decrement24hrIsolated({ before: '10:00', after: '09:00' })
				decrement24hrIsolated({ before: '00:30', after: '11:30' })
				decrement24hrIsolated({ before: '13:30', after: '12:30' })
				decrement24hrIsolated({ before: '12:00', after: '23:00' })
			})

			describe('Integrated (24hr)', () => {
				const decrement24hrIntegrated = ({ before, after }: BeforeAfterString) => {
					modifierTest({
						...settings,
						before,
						after,
						integration: 'integrated',
					})
				}
				decrement24hrIntegrated({ before: '10:00', after: '09:00' })
				decrement24hrIntegrated({ before: '12:30', after: '11:30' })
				decrement24hrIntegrated({ before: '13:30', after: '12:30' })
				decrement24hrIntegrated({ before: '00:00', after: '23:00' })
			})
		})

		describe('Time object', () => {
			const settings: CommonSettingsObject = {
				format: 'timeObject',
				action: 'decrement',
				target: 'hours',
			}
			describe('Isolated (timeObject)', () => {
				const decrementObjectIsolated = ({ before, after }: BeforeAfterObject) => {
					deepModifierTest({
						...settings,
						before,
						after,
						integration: 'isolated',
					})
				}

				decrementObjectIsolated({
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

				decrementObjectIsolated({
					before: {
						hrs24: '--',
						hrs12: '--',
						min: 0,
						mode: 'AM',
					},
					after: {
						hrs24: <Hour24>parseInt(current.hrs24),
						hrs12: <Hour12>parseInt(current.hrs12),
						min: 0,
						mode: 'AM',
					},
				})

				decrementObjectIsolated({
					before: {
						hrs24: 10,
						hrs12: 10,
						min: 0,
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
						hrs24: 0,
						hrs12: 12,
						min: 30,
						mode: 'AM',
					},
					after: {
						hrs24: 11,
						hrs12: 11,
						min: 30,
						mode: 'AM',
					},
				})

				decrementObjectIsolated({
					before: {
						hrs24: 13,
						hrs12: 1,
						min: 30,
						mode: 'PM',
					},
					after: {
						hrs24: 12,
						hrs12: 12,
						min: 30,
						mode: 'PM',
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
						hrs24: 23,
						hrs12: 11,
						min: 0,
						mode: 'PM', // modifying hrs does not modify mode
					},
				})
			})

			describe('Integrated (timeObject)', () => {
				const decrementObjectIntegrated = ({ before, after }: BeforeAfterObject) => {
					deepModifierTest({
						...settings,
						before,
						after,
						integration: 'integrated',
					})
				}

				decrementObjectIntegrated({
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

				decrementObjectIntegrated({
					before: {
						hrs24: '--',
						hrs12: '--',
						min: 0,
						mode: 'AM',
					},
					after: {
						hrs24: <Hour24>parseInt(current.hrs24),
						hrs12: <Hour12>parseInt(current.hrs12),
						min: 0,
						mode: 'AM',
					},
				})

				decrementObjectIntegrated({
					before: {
						hrs24: 10,
						hrs12: 10,
						min: 0,
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
						hrs24: 12,
						hrs12: 12,
						min: 30,
						mode: 'PM',
					},
					after: {
						hrs24: 11,
						hrs12: 11,
						min: 30,
						mode: 'AM',
					},
				})

				decrementObjectIntegrated({
					before: {
						hrs24: 13,
						hrs12: 1,
						min: 30,
						mode: 'PM',
					},
					after: {
						hrs24: 12,
						hrs12: 12,
						min: 30,
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
						min: 0,
						mode: 'PM',
					},
				})
			})
		})
	})
}
