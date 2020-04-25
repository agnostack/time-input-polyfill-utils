import { loadTestPage } from '../../cypress/support/loadTestPage'
import { flash24hrTime } from './flash24hrTime'

describe('Flash 24hr time', () => {
	it('Expect 08:30 PM -> 20:30 -> 08:30 PM', async () => {
		const { $input } = await loadTestPage()
		$input.value = '08:30 PM'
		flash24hrTime($input)
		expect($input.value).to.equal('20:30')
		await new Promise(resolve => {
			setTimeout(() => {
				resolve()
			}, 1)
		})
		expect($input.value).to.equal('08:30 PM')
	})
})
