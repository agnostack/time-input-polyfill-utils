import { a11yID } from '../../cypress/support/staticTestValues'
import { get } from '../get/get'
import { A11yCreate, A11yUpdate } from './a11y.types'

export const a11yCreate: A11yCreate = (document = window.document) => {
	const $block = document.createElement('div')
	$block.setAttribute('aria-live', 'polite')
	$block.setAttribute(
		'style',
		'position: absolute; opacity: 0; height: 0; width: 0; overflow: hidden; pointer-events: none;',
	)
	$block.id = a11yID
	document.querySelector('body').appendChild($block)
	return $block
}

export const a11yUpdate: A11yUpdate = ($input, announcementArray, document = window.document) => {
	const currentSegment = get.rangeOf($input).cursorSegment().segment

	const values = get.inputValue($input).asTimeObject()
	const value = values[currentSegment]
	const segmentValue = value == '--' ? 'blank' : value

	const segmentName = {
		hrs12: 'Hours',
		min: 'Minutes',
		mode: 'AM/PM',
	}[currentSegment]

	const announcements = {
		initial: '$label grouping $fullValue.',
		select: '$segmentName spin button $segmentValue.',
		update: '$segmentValue.',
	}

	const textArray = announcementArray.map(key => announcements[key])

	const fullValue = $input.value.replace(/--/g, 'blank')

	let html = `<p>${textArray.join('</p><p>')}</p>`
	const labelText = get.labelTextOf($input, document)
	html = html.replace(/\$label/g, labelText)
	html = html.replace(/\$segmentName/g, segmentName)
	html = html.replace(/\$segmentValue/g, `${segmentValue}`)
	html = html.replace(/\$fullValue/g, fullValue)

	document.getElementById(a11yID).innerHTML = html

	return html
}
