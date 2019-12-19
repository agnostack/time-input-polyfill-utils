import { modify } from './modifiers'

/* global describe, it, expect */

const modifierTest = ({ before, after, prop, format, modification }) => {
	it(`${before} => ${after}`, () => {
		expect(modify[format](before)[modification][prop]()).to.equal(after)
	})
}

const deepModifierTest = ({ before, after, prop, format = 'timeObject', modification }) => {
	it(`${JSON.stringify(before)} => ${JSON.stringify(after)}`, () => {
		expect(modify[format](before)[modification][prop]()).to.deep.equal(after)
	})
}

describe('Increment hours', () => {
	//////////////////////////////////////////

	describe('Increment 12hr hours using hrs12', () => {
		const hrs12hrIncrement = ({ before, after }) => {
			modifierTest({
				before,
				after,
				prop: 'hrs12',
				format: 'string12hr',
				modification: 'increment',
			})
		}
		hrs12hrIncrement({ before: '09:00 AM', after: '10:00 AM' })
		hrs12hrIncrement({ before: '12:30 PM', after: '01:30 PM' })
		// incrementing hours does not affect AM/PM
		hrs12hrIncrement({ before: '11:00 PM', after: '12:00 PM' })
	})

	describe('Increment 24hr hour using hrs12', () => {
		const hrs24hrIncrement = ({ before, after }) => {
			modifierTest({
				before,
				after,
				prop: 'hrs12',
				format: 'string24hr',
				modification: 'increment',
			})
		}
		hrs24hrIncrement({ before: '09:00', after: '10:00' })
		hrs24hrIncrement({ before: '11:30', after: '00:30' })
		hrs24hrIncrement({ before: '12:30', after: '13:30' })
		hrs24hrIncrement({ before: '23:00', after: '12:00' })
	})

	describe('Increment object hours', () => {
		const hrsObjectIncrement = ({ before, after }) => {
			deepModifierTest({ before, after, prop: 'hrs12', modification: 'increment' })
		}

		hrsObjectIncrement({
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

		hrsObjectIncrement({
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

		hrsObjectIncrement({
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
