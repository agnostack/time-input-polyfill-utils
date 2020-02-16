import { a11yID } from "../../cypress/support/staticTestValues"

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
}
