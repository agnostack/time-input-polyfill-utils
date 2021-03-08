import {
	isPmHrs24,
	isPmString12hr,
	isPmString24hr,
	isPmTimeObject,
	isAmHrs24,
	isAmString12hr,
	isAmString24hr,
	isAmTimeObject,
	isTimeObject,
	isString12hr,
	isString24hr,
} from './is'

isPmTests()
isAmTests()
isTimeObjectTests()
isString12hrTests()
isString24hrTests()

function isPmTests(): void {
	describe('is PM', () => {
		hrs24NumberTests()
		string12hrTests()
		string24hrTests()
		timeObjectTests()

		function hrs24NumberTests(): void {
			describe('hrs24 number', () => {
				it('0 => false', () => {
					expect(isPmHrs24(0)).to.equal(false)
				})
				it('11 => false', () => {
					expect(isPmHrs24(11)).to.equal(false)
				})
				it('12 => true', () => {
					expect(isPmHrs24(12)).to.equal(true)
				})
				it('13 => true', () => {
					expect(isPmHrs24(13)).to.equal(true)
				})
				it('23 => true', () => {
					expect(isPmHrs24(23)).to.equal(true)
				})
				it('-- => false', () => {
					expect(isPmHrs24(null)).to.equal(false)
				})
			})
		}

		function string12hrTests(): void {
			describe('12hr string', () => {
				it('12:00 AM => false', () => {
					expect(isPmString12hr('12:00 AM')).to.equal(false)
				})
				it('11:30 AM => false', () => {
					expect(isPmString12hr('11:30 AM')).to.equal(false)
				})
				it('12:00 PM => true', () => {
					expect(isPmString12hr('12:00 PM')).to.equal(true)
				})
				it('1:30 PM => true', () => {
					expect(isPmString12hr('1:30 PM')).to.equal(true)
				})
				it('--:-- -- => false', () => {
					expect(isPmString12hr('--:-- --')).to.equal(false)
				})
			})
		}

		function string24hrTests(): void {
			describe('24hr string', () => {
				it('00:00 => false', () => {
					expect(isPmString24hr('00:00')).to.equal(false)
				})
				it('11:30 => false', () => {
					expect(isPmString24hr('11:30')).to.equal(false)
				})
				it('12:00 => true', () => {
					expect(isPmString24hr('12:00')).to.equal(true)
				})
				it('13:30 => true', () => {
					expect(isPmString24hr('13:30')).to.equal(true)
				})
				it('"" => false', () => {
					expect(isPmString24hr('')).to.equal(false)
				})
			})
		}

		function timeObjectTests(): void {
			describe('timeObject', () => {
				it('{ hrs24: 12, hrs12: 12, minutes: 00, mode: null } => true', () => {
					expect(isPmTimeObject({ hrs24: 12, hrs12: 12, minutes: 0, mode: null })).to.equal(true)
				})
				it('{ hrs24: 0, hrs12: 12, minutes: 00, mode: null } => true', () => {
					expect(isPmTimeObject({ hrs24: 0, hrs12: 12, minutes: 0, mode: null })).to.equal(false)
				})
				it('{ hrs24: 0, hrs12: 12, minutes: 00, mode: AM } => false', () => {
					expect(isPmTimeObject({ hrs24: 0, hrs12: 12, minutes: 0, mode: 'AM' })).to.equal(
						false,
					)
				})
				it('{ hrs24: 11, hrs12: 11, minutes: 30, mode: AM } => false', () => {
					expect(isPmTimeObject({ hrs24: 11, hrs12: 11, minutes: 30, mode: 'AM' })).to.equal(
						false,
					)
				})
				it('{ hrs24: 12, hrs12: 12, minutes: 0, mode: PM } => true', () => {
					expect(isPmTimeObject({ hrs24: 12, hrs12: 12, minutes: 0, mode: 'PM' })).to.equal(
						true,
					)
				})
				it('{ hrs24: 13, hrs12: 1, minutes: 30, mode: PM } => true', () => {
					expect(isPmTimeObject({ hrs24: 13, hrs12: 1, minutes: 0, mode: 'PM' })).to.equal(
						true,
					)
				})
				it('{ hrs24: --, hrs12: --, minutes: --, mode: -- } => false', () => {
					expect(
						isPmTimeObject({ hrs24: null, hrs12: null, minutes: null, mode: null }),
					).to.equal(false)
				})
			})
		}
	})
}

function isAmTests(): void {
	describe('is AM', () => {
		hrs24NumberTests()
		string12hrTests()
		string24hrTests()
		timeObjectTests()

		function hrs24NumberTests(): void {
			describe('hrs24 number', () => {
				it('0 => true', () => {
					expect(isAmHrs24(0)).to.equal(true)
				})
				it('11 => true', () => {
					expect(isAmHrs24(11)).to.equal(true)
				})
				it('12 => false', () => {
					expect(isAmHrs24(12)).to.equal(false)
				})
				it('13 => false', () => {
					expect(isAmHrs24(13)).to.equal(false)
				})
				it('23 => false', () => {
					expect(isAmHrs24(23)).to.equal(false)
				})
				it('-- => false', () => {
					expect(isAmHrs24(null)).to.equal(false)
				})
			})
		}

		function string12hrTests(): void {
			describe('12hr string', () => {
				it('12:00 AM => true', () => {
					expect(isAmString12hr('12:00 AM')).to.equal(true)
				})
				it('11:30 AM => true', () => {
					expect(isAmString12hr('11:30 AM')).to.equal(true)
				})
				it('12:00 PM => false', () => {
					expect(isAmString12hr('12:00 PM')).to.equal(false)
				})
				it('1:30 PM => false', () => {
					expect(isAmString12hr('1:30 PM')).to.equal(false)
				})
				it('--:-- -- => false', () => {
					expect(isAmString12hr('--:-- --')).to.equal(false)
				})
			})
		}

		function string24hrTests(): void {
			describe('24hr string', () => {
				it('00:00 => true', () => {
					expect(isAmString24hr('00:00')).to.equal(true)
				})
				it('11:30 => true', () => {
					expect(isAmString24hr('11:30')).to.equal(true)
				})
				it('12:00 => false', () => {
					expect(isAmString24hr('12:00')).to.equal(false)
				})
				it('13:30 => false', () => {
					expect(isAmString24hr('13:30')).to.equal(false)
				})
				it('"" => false', () => {
					expect(isAmString24hr('')).to.equal(false)
				})
			})
		}

		function timeObjectTests(): void {
			describe('timeObject', () => {
				it('{ hrs24: 12, hrs12: 12, minutes: 00, mode: null } => false', () => {
					expect(isAmTimeObject({ hrs24: 12, hrs12: 12, minutes: 0, mode: null })).to.equal(false)
				})
				it('{ hrs24: 0, hrs12: 12, minutes: 00, mode: AM } => true', () => {
					expect(isAmTimeObject({ hrs24: 0, hrs12: 12, minutes: 0, mode: 'AM' })).to.equal(
						true,
					)
				})
				it('{ hrs24: 11, hrs12: 11, minutes: 30, mode: AM } => true', () => {
					expect(isAmTimeObject({ hrs24: 11, hrs12: 11, minutes: 30, mode: 'AM' })).to.equal(
						true,
					)
				})
				it('{ hrs24: 12, hrs12: 12, minutes: 0, mode: PM } => false', () => {
					expect(isAmTimeObject({ hrs24: 12, hrs12: 12, minutes: 0, mode: 'PM' })).to.equal(
						false,
					)
				})
				it('{ hrs24: 13, hrs12: 1, minutes: 30, mode: PM } => false', () => {
					expect(isAmTimeObject({ hrs24: 13, hrs12: 1, minutes: 0, mode: 'PM' })).to.equal(
						false,
					)
				})
				it('{ hrs24: --, hrs12: --, minutes: --, mode: -- } => false', () => {
					expect(
						isAmTimeObject({ hrs24: null, hrs12: null, minutes: null, mode: null }),
					).to.equal(false)
				})
			})
		}
	})
}

function isTimeObjectTests(): void {
	describe('is timeObject', () => {
		it('"12:00 AM" => false', () => {
			expect(isTimeObject('12:00 AM')).to.equal(false)
		})
		it('"00:00" => false', () => {
			expect(isTimeObject('00:00')).to.equal(false)
		})
		it('{} => false', () => {
			expect(isTimeObject({})).to.equal(false)
		})
		it('{hrs24: 0} => false', () => {
			expect(isTimeObject({ hrs24: 0 })).to.equal(false)
		})
		it('{hrs24: 0, hrs12: 12} => false', () => {
			expect(isTimeObject({ hrs24: 0, hrs12: 12 })).to.equal(false)
		})
		it('{hrs24: 0, hrs12: 12, minutes: 0} => false', () => {
			expect(isTimeObject({ hrs24: 0, hrs12: 12, minutes: 0 })).to.equal(false)
		})
		it('{hrs: 12, minutes: 0, mode: AM} => false', () => {
			expect(isTimeObject({ hrs: 12, minutes: 0, mode: 'AM' })).to.equal(false)
		})
		it('{hrs: 12, hrs24: 0, hrs12: 12, minutes: 0, mode: AM} => false', () => {
			expect(isTimeObject({ hrs: 12, hrs24: 0, hrs12: 12, minutes: 0, mode: 'AM' })).to.equal(
				false,
			)
		})
		it('{hrs24: 0, hrs12: 12, minutes: 0, mode: AM} => true', () => {
			expect(isTimeObject({ hrs24: 0, hrs12: 12, minutes: 0, mode: 'AM' })).to.equal(true)
		})
	})
}

function isString12hrTests(): void {
	describe('is string 12hr', () => {
		it('"12:00 AM" => true', () => {
			expect(isString12hr('12:00 AM')).to.equal(true)
		})
		it('"--:-- --" => true', () => {
			expect(isString12hr('--:-- --')).to.equal(true)
		})
		it('"00:00" => false', () => {
			expect(isString12hr('00:00')).to.equal(false)
		})
		it('"--:--" => false', () => {
			expect(isString12hr('--:--')).to.equal(false)
		})
		it('{hrs24: 0, hrs12: 12, minutes: 0, mode: AM} => false', () => {
			expect(isString12hr({ hrs24: 0, hrs12: 12, minutes: 0, mode: 'AM' })).to.equal(false)
		})
	})
}

function isString24hrTests(): void {
	describe('is string 24hr', () => {
		it('"12:00 AM" => false', () => {
			expect(isString24hr('12:00 AM')).to.equal(false)
		})
		it('"--:-- --" => false', () => {
			expect(isString24hr('--:-- --')).to.equal(false)
		})
		it('"00:00" => true', () => {
			expect(isString24hr('00:00')).to.equal(true)
		})
		it('"--:--" => false', () => {
			expect(isString24hr('--:--')).to.equal(false)
		})
		it('"" => true', () => {
			expect(isString24hr('')).to.equal(true)
		})
		it('{hrs24: 0, hrs12: 12, minutes: 0, mode: AM} => false', () => {
			expect(isString24hr({ hrs24: 0, hrs12: 12, minutes: 0, mode: 'AM' })).to.equal(false)
		})
	})
}
