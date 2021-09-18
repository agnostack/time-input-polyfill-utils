import { convertTimeObject } from '../../../convert/convert'
import { modifyString12hr, modifyTimeObject } from '../../modify'
import {
	BeforeAfterObject,
	BeforeAfterString,
	deepModifierTest,
	modifierTest,
	PlusSegment,
} from '../../modify.test'

export default (): void => {
	describe('Increment walk through', () => {
		//////////////////////////////////////////

		tests12hr()
		testsTimeObject()

		function tests12hr(): void {
			describe('12 hour time', () => {
				const decrement12hr = ({
					before,
					after,
					segment,
				}: PlusSegment<BeforeAfterString>): void => {
					describe(`${segment} | ${before} => ${after}`, () => {
						// isolated
						modifierTest({
							before,
							after,
							test: () => modifyString12hr(before).increment[segment].isolated(),
						})
						// integrated
						modifierTest({
							before,
							after,
							test: () => modifyString12hr(before).increment[segment].integrated(),
						})
					})
				}
				decrement12hr({
					before: '--:-- --',
					after: '01:-- --',
					segment: 'hrs12',
				})
				decrement12hr({
					before: '01:-- --',
					after: '01:00 --',
					segment: 'minutes',
				})
				decrement12hr({
					before: '01:00 --',
					after: '01:00 AM',
					segment: 'mode',
				})
			})
		}

		function testsTimeObject(): void {
			describe('Time object', () => {
				const decrementObject = ({
					before,
					after,
					segment,
				}: PlusSegment<BeforeAfterObject>): void => {
					const beforeString = convertTimeObject(before).to12hr()
					const afterString = convertTimeObject(after).to12hr()
					describe(`${segment} | ${beforeString} => ${afterString}`, () => {
						// isolated
						deepModifierTest({
							before,
							after,
							test: () => modifyTimeObject(before).increment[segment].isolated(),
						})
						// integrated
						deepModifierTest({
							before,
							after,
							test: () => modifyTimeObject(before).increment[segment].integrated(),
						})
					})
				}

				decrementObject({
					segment: 'hrs12',
					before: {
						hrs24: null,
						hrs12: null,
						minutes: null,
						mode: null,
					},
					after: {
						hrs24: null,
						hrs12: 1,
						minutes: null,
						mode: null,
					},
				})

				decrementObject({
					segment: 'minutes',
					before: {
						hrs24: null,
						hrs12: 1,
						minutes: null,
						mode: null,
					},
					after: {
						hrs24: null,
						hrs12: 1,
						minutes: 0,
						mode: null,
					},
				})

				decrementObject({
					segment: 'mode',
					before: {
						hrs24: null,
						hrs12: 1,
						minutes: 0,
						mode: null,
					},
					after: {
						hrs24: 1,
						hrs12: 1,
						minutes: 0,
						mode: 'AM',
					},
				})
			})
		}
	})
}
