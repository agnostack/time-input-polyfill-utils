import { is } from './is'

describe('is PM', () => {
	describe('hrs24', () => {
		it('0 => false', () => {
			expect(is.PM.hrs24(0)).to.equal(false)
		})
		it('11 => false', () => {
			expect(is.PM.hrs24(11)).to.equal(false)
		})
		it('12 => true', () => {
			expect(is.PM.hrs24(12)).to.equal(true)
		})
		it('13 => true', () => {
			expect(is.PM.hrs24(13)).to.equal(true)
		})
		it('23 => true', () => {
			expect(is.PM.hrs24(23)).to.equal(true)
		})
		it('-- => false', () => {
			expect(is.PM.hrs24('--')).to.equal(false)
		})
	})

	describe('12hr', () => {
		it('12:00 AM => false', () => {
			expect(is.PM.string12hr('12:00 AM')).to.equal(false)
		})
		it('11:30 AM => false', () => {
			expect(is.PM.string12hr('11:30 AM')).to.equal(false)
		})
		it('12:00 PM => true', () => {
			expect(is.PM.string12hr('12:00 PM')).to.equal(true)
		})
		it('1:30 PM => true', () => {
			expect(is.PM.string12hr('1:30 PM')).to.equal(true)
		})
		it('--:-- -- => false', () => {
			expect(is.PM.string12hr('--:-- --')).to.equal(false)
		})
	})

	describe('24hr', () => {
		it('00:00 => false', () => {
			expect(is.PM.string24hr('00:00')).to.equal(false)
		})
		it('11:30 => false', () => {
			expect(is.PM.string24hr('11:30')).to.equal(false)
		})
		it('12:00 => true', () => {
			expect(is.PM.string24hr('12:00')).to.equal(true)
		})
		it('13:30 => true', () => {
			expect(is.PM.string24hr('13:30')).to.equal(true)
		})
		it('"" => false', () => {
			expect(is.PM.string24hr('')).to.equal(false)
		})
	})

	describe('timeObject', () => {
		it('{ hrs24: 0, hrs12: 12, min: 00, mode: AM } => false', () => {
			expect(is.PM.timeObject({ hrs24: 0, hrs12: 12, min: 0, mode: 'AM' })).to.equal(false)
		})
		it('{ hrs24: 11, hrs12: 11, min: 30, mode: AM } => false', () => {
			expect(is.PM.timeObject({ hrs24: 11, hrs12: 11, min: 30, mode: 'AM' })).to.equal(false)
		})
		it('{ hrs24: 12, hrs12: 12, min: 0, mode: PM } => true', () => {
			expect(is.PM.timeObject({ hrs24: 12, hrs12: 12, min: 0, mode: 'PM' })).to.equal(true)
		})
		it('{ hrs24: 13, hrs12: 1, min: 30, mode: PM } => true', () => {
			expect(is.PM.timeObject({ hrs24: 13, hrs12: 1, min: 0, mode: 'PM' })).to.equal(true)
		})
		it('{ hrs24: --, hrs12: --, min: --, mode: -- } => false', () => {
			expect(is.PM.timeObject({ hrs24: '--', hrs12: '--', min: '--', mode: '--' })).to.equal(
				false,
			)
		})
	})
})

describe('is AM', () => {
	describe('hrs24', () => {
		it('0 => true', () => {
			expect(is.AM.hrs24(0)).to.equal(true)
		})
		it('11 => true', () => {
			expect(is.AM.hrs24(11)).to.equal(true)
		})
		it('12 => false', () => {
			expect(is.AM.hrs24(12)).to.equal(false)
		})
		it('13 => false', () => {
			expect(is.AM.hrs24(13)).to.equal(false)
		})
		it('23 => false', () => {
			expect(is.AM.hrs24(23)).to.equal(false)
		})
		it('-- => false', () => {
			expect(is.AM.hrs24('--')).to.equal(false)
		})
	})

	describe('12hr', () => {
		it('12:00 AM => true', () => {
			expect(is.AM.string12hr('12:00 AM')).to.equal(true)
		})
		it('11:30 AM => true', () => {
			expect(is.AM.string12hr('11:30 AM')).to.equal(true)
		})
		it('12:00 PM => false', () => {
			expect(is.AM.string12hr('12:00 PM')).to.equal(false)
		})
		it('1:30 PM => false', () => {
			expect(is.AM.string12hr('1:30 PM')).to.equal(false)
		})
		it('--:-- -- => false', () => {
			expect(is.AM.string12hr('--:-- --')).to.equal(false)
		})
	})

	describe('24hr', () => {
		it('00:00 => true', () => {
			expect(is.AM.string24hr('00:00')).to.equal(true)
		})
		it('11:30 => true', () => {
			expect(is.AM.string24hr('11:30')).to.equal(true)
		})
		it('12:00 => false', () => {
			expect(is.AM.string24hr('12:00')).to.equal(false)
		})
		it('13:30 => false', () => {
			expect(is.AM.string24hr('13:30')).to.equal(false)
		})
		it('"" => false', () => {
			expect(is.AM.string24hr('')).to.equal(false)
		})
	})

	describe('timeObject', () => {
		it('{ hrs24: 0, hrs12: 12, min: 00, mode: AM } => true', () => {
			expect(is.AM.timeObject({ hrs24: 0, hrs12: 12, min: 0, mode: 'AM' })).to.equal(true)
		})
		it('{ hrs24: 11, hrs12: 11, min: 30, mode: AM } => true', () => {
			expect(is.AM.timeObject({ hrs24: 11, hrs12: 11, min: 30, mode: 'AM' })).to.equal(true)
		})
		it('{ hrs24: 12, hrs12: 12, min: 0, mode: PM } => false', () => {
			expect(is.AM.timeObject({ hrs24: 12, hrs12: 12, min: 0, mode: 'PM' })).to.equal(false)
		})
		it('{ hrs24: 13, hrs12: 1, min: 30, mode: PM } => false', () => {
			expect(is.AM.timeObject({ hrs24: 13, hrs12: 1, min: 0, mode: 'PM' })).to.equal(false)
		})
		it('{ hrs24: --, hrs12: --, min: --, mode: -- } => false', () => {
			expect(is.AM.timeObject({ hrs24: '--', hrs12: '--', min: '--', mode: '--' })).to.equal(
				false,
			)
		})
	})
})

describe('is timeObject', () => {
	it('"12:00 AM" => false', () => {
		expect(is.timeObject('12:00 AM')).to.equal(false)
	})
	it('"00:00" => false', () => {
		expect(is.timeObject('00:00')).to.equal(false)
	})
	it('{} => false', () => {
		expect(is.timeObject({})).to.equal(false)
	})
	it('{hrs24: 0} => false', () => {
		expect(is.timeObject({ hrs24: 0 })).to.equal(false)
	})
	it('{hrs24: 0, hrs12: 12} => false', () => {
		expect(is.timeObject({ hrs24: 0, hrs12: 12 })).to.equal(false)
	})
	it('{hrs24: 0, hrs12: 12, min: 0} => false', () => {
		expect(is.timeObject({ hrs24: 0, hrs12: 12, min: 0 })).to.equal(false)
	})
	it('{hrs: 12, min: 0, mode: AM} => false', () => {
		expect(is.timeObject({ hrs: 12, min: 0, mode: 'AM' })).to.equal(false)
	})
	it('{hrs24: 0, hrs12: 12, min: 0, mode: AM} => true', () => {
		expect(is.timeObject({ hrs24: 0, hrs12: 12, min: 0, mode: 'AM' })).to.equal(true)
	})
})

describe('is timeObject', () => {
	it('"12:00 AM" => false', () => {
		expect(is.timeObject('12:00 AM')).to.equal(false)
	})
	it('"00:00" => false', () => {
		expect(is.timeObject('00:00')).to.equal(false)
	})
	it('{} => false', () => {
		expect(is.timeObject({})).to.equal(false)
	})
	it('{hrs24: 0} => false', () => {
		expect(is.timeObject({ hrs24: 0 })).to.equal(false)
	})
	it('{hrs24: 0, hrs12: 12} => false', () => {
		expect(is.timeObject({ hrs24: 0, hrs12: 12 })).to.equal(false)
	})
	it('{hrs24: 0, hrs12: 12, min: 0} => false', () => {
		expect(is.timeObject({ hrs24: 0, hrs12: 12, min: 0 })).to.equal(false)
	})
	it('{hrs24: 0, hrs12: 12, min: 0, mode: AM} => true', () => {
		expect(is.timeObject({ hrs24: 0, hrs12: 12, min: 0, mode: 'AM' })).to.equal(true)
	})
})

describe('is string 12hr', () => {
	it('"12:00 AM" => true', () => {
		expect(is.string12hr('12:00 AM')).to.equal(true)
	})
	it('"--:-- --" => true', () => {
		expect(is.string12hr('--:-- --')).to.equal(true)
	})
	it('"00:00" => false', () => {
		expect(is.string12hr('00:00')).to.equal(false)
	})
	it('"--:--" => false', () => {
		expect(is.string12hr('--:--')).to.equal(false)
	})
	it('{hrs24: 0, hrs12: 12, min: 0, mode: AM} => false', () => {
		expect(is.string12hr({ hrs24: 0, hrs12: 12, min: 0, mode: 'AM' })).to.equal(false)
	})
})

describe('is string 24hr', () => {
	it('"12:00 AM" => false', () => {
		expect(is.string24hr('12:00 AM')).to.equal(false)
	})
	it('"--:-- --" => false', () => {
		expect(is.string24hr('--:-- --')).to.equal(false)
	})
	it('"00:00" => true', () => {
		expect(is.string24hr('00:00')).to.equal(true)
	})
	it('"--:--" => false', () => {
		expect(is.string24hr('--:--')).to.equal(false)
	})
	it('"" => true', () => {
		expect(is.string24hr('')).to.equal(true)
	})
	it('{hrs24: 0, hrs12: 12, min: 0, mode: AM} => false', () => {
		expect(is.string24hr({ hrs24: 0, hrs12: 12, min: 0, mode: 'AM' })).to.equal(false)
	})
})
