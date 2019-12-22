import { String12hr, String24hr, TimeObject } from '../../../../types'
import { modifierTest, deepModifierTest, current } from '../../modifiers.test'

interface BeforeAfterString {
	before: String12hr | String24hr
	after: String12hr | String24hr
}

interface BeforeAfterObject {
	before: TimeObject
	after: TimeObject
}

export default () => {
	describe('Increment hours', () => {
		//////////////////////////////////////////

		describe('Increment 12hr hours ignoring mode', () => {
			const increment12hrIsolated = ({ before, after }: BeforeAfterString) => {
				modifierTest({
					before,
					after,
					format: 'string12hr',
					action: 'increment',
					target: 'hours',
					integration: 'isolated',
				})
			}
			increment12hrIsolated({ before: '--:-- --', after: `${current.hrs12}:-- --` })
			increment12hrIsolated({ before: '--:00 AM', after: `${current.hrs12}:00 AM` })
			increment12hrIsolated({ before: '09:00 AM', after: '10:00 AM' })
			increment12hrIsolated({ before: '12:30 PM', after: '01:30 PM' })
			// incrementing hours does not affect AM/PM
			increment12hrIsolated({ before: '11:30 AM', after: '12:30 AM' })
			increment12hrIsolated({ before: '11:00 PM', after: '12:00 PM' })
		})

		describe('Increment 12hr hours affecting mode', () => {
			const increment12hrIntegrated = ({ before, after }: BeforeAfterString) => {
				modifierTest({
					before,
					after,
					format: 'string12hr',
					action: 'increment',
					target: 'hours',
					integration: 'integrated',
				})
			}
			increment12hrIntegrated({ before: '--:-- --', after: `${current.hrs12}:-- --` })
			increment12hrIntegrated({ before: '--:00 AM', after: `${current.hrs12}:00 AM` })
			increment12hrIntegrated({ before: '09:00 AM', after: '10:00 AM' })
			increment12hrIntegrated({ before: '12:30 PM', after: '01:30 PM' })
			// incrementing hours DOES affect AM/PM
			increment12hrIntegrated({ before: '11:30 AM', after: '12:30 PM' })
			increment12hrIntegrated({ before: '11:00 PM', after: '12:00 AM' })
		})

		describe('Increment 24hr hour ignoring mode', () => {
			const increment24hrIsolated = ({ before, after }: BeforeAfterString) => {
				modifierTest({
					before,
					after,
					format: 'string24hr',
					action: 'increment',
					target: 'hours',
					integration: 'isolated',
				})
			}
			increment24hrIsolated({ before: '09:00', after: '10:00' })
			increment24hrIsolated({ before: '11:30', after: '00:30' })
			increment24hrIsolated({ before: '12:30', after: '13:30' })
			increment24hrIsolated({ before: '23:00', after: '12:00' })
		})

		describe('Increment object hours ignoring mode', () => {
			const incrementObjectIsolated = ({ before, after }: BeforeAfterObject) => {
				deepModifierTest({
					before,
					after,
					action: 'increment',
					target: 'hours',
					integration: 'isolated',
				})
			}

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
	})
}
