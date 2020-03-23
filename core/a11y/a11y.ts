import { a11yID } from "../../cypress/support/staticTestValues"
import { get } from "../get/get"

type Announcement = 'initial' | 'select' | 'update'

// TO DO: convert to new types format
export const a11y = {
	create(document: Document = window.document): HTMLDivElement {
		var $block = document.createElement('div')
		$block.setAttribute('aria-live', 'polite')
		$block.setAttribute(
			'style',
			'position: absolute; opacity: 0; height: 0; width: 0; overflow: hidden; pointer-events: none;'
		)
		$block.id = a11yID
		document.querySelector('body').appendChild($block)
		return $block
	},
	update($input: HTMLInputElement, announcementArray: Array<Announcement>, document: Document = window.document) {
		const currentSegment = get.rangeOf($input).cursorSegment().segment

		var values = get.inputValue($input).asTimeObject()
		var value = values[currentSegment]
		var segmentValue = value == '--' ? 'blank' : value

		var segmentName = {
			hrs12: 'Hours',
			min: 'Minutes',
			mode: 'AM/PM',
		}[currentSegment]

		var announcements = {
			initial: '$label grouping $fullValue.',
			select: '$segmentName spin button $segmentValue.',
			update: '$segmentValue.',
		}

		var textArray = announcementArray.map((key: Announcement) => announcements[key])

		var fullValue = $input.value.replace(/--/g, 'blank')

		var html = `<p>${textArray.join('</p><p>')}</p>`
		const labelText = get.labelTextOf($input, document)
		html = html.replace(/\$label/g, labelText)
		html = html.replace(/\$segmentName/g, segmentName)
		html = html.replace(/\$segmentValue/g, `${segmentValue}`)
		html = html.replace(/\$fullValue/g, fullValue)

		document.getElementById(a11yID).innerHTML = html

		return html
	}
}
