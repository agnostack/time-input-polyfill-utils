import { modify } from './modifiers'

/* global describe, it, expect */

describe('Modify initial string values', () => {
	//////////////////////////////////////////

	describe('Increment 12hr hours', () => {
		it('09:00 AM => 10:00 AM', () => {
			expect(modify.string12hr('09:00 AM').increment.hrs()).to.equal('10:00 AM')
		})
		it('12:30 PM => 01:30 PM', () => {
			expect(modify.string12hr('12:30 PM').increment.hrs()).to.equal('01:30 PM')
		})
		it('11:00 PM => 12:00 AM', () => {
			expect(modify.string12hr('12:30 PM').increment.hrs()).to.equal('12:00 AM')
		})
	})

	describe('Increment 24hr hours', () => {
		it('09:00 => 10:00', () => {
			expect(modify.string24hr('09:00').increment.hrs()).to.equal('10:00')
		})
		it('12:30 => 13:30', () => {
			expect(modify.string24hr('12:30').increment.hrs()).to.equal('13:30')
		})
		it('23:00 => 00:00', () => {
			expect(modify.string24hr('23:00').increment.hrs()).to.equal('00:00')
		})
	})

	describe('Increment object hours', () => {
		it('{hrs24:9, hrs12:9, min:0, mode:AM} => {hrs24:10, hrs12:10, min:0, mode:AM}', () => {
			expect(
				modify
					.timeObject({
						hrs24: 9,
						hrs12: 9,
						min: 0,
						mode: 'AM',
					})
					.increment.hrs(),
			).to.equal({
				hrs24: 10,
				hrs12: 10,
				min: 0,
				mode: 'AM',
			})
		})
		it('{hrs24:12, hrs12:12, min:30, mode:PM} => {hrs24:13, hrs12:1, min:30, mode:PM}', () => {
			expect(
				modify
					.timeObject({
						hrs24: 12,
						hrs12: 12,
						min: 30,
						mode: 'PM',
					})
					.increment.hrs(),
			).to.equal({
				hrs24: 13,
				hrs12: 1,
				min: 30,
				mode: 'PM',
			})
		})
		it('{hrs24: 23, hrs12: 11, min:0, mode:PM} => {hrs24: 0, hrs12: 12, min:0, mode:AM}', () => {
			expect(
				modify.timeObject({ hrs24: 23, hrs12: 11, min: 0, mode: 'PM' }).increment.hrs(),
			).to.equal({
				hrs24: 0,
				hrs12: 12,
				min: 0,
				mode: 'AM',
			})
		})
	})
})
