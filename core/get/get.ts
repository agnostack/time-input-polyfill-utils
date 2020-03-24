import { convert } from '../convert/convert'
import { SelectionRange, SelectionIndex, Segment, TimeObject, String12hr, String24hr } from '../../types'
import { ranges, rangesList, segments } from '../staticValues'
import { regex } from '../regex/regex'
import { Get } from './get.types'

const traverseSegmentRanges = ($input: HTMLInputElement, direction: 'forward' | 'backward') => {
	const currentSegmentRange = get.rangeOf($input).cursorSegment()
	const currentType = currentSegmentRange.segment
	const modifier = direction === 'forward' ? 1 : -1
	const nextTypeIndex = rangesList.map(range => range.segment).indexOf(currentType) + modifier
	return rangesList[nextTypeIndex] || currentSegmentRange
}

export const get: Get = {
	string12hr: (string12hr) => {
		const timeObject = convert.string12hr(string12hr).toTimeObject()
		return {
			...timeObject,
			timeObject,
		}
	},
	string24hr: (string24hr) => {
		const timeObject = convert.string24hr(string24hr).toTimeObject()
		return {
			...timeObject,
			timeObject,
		}
	},
	inputValue: ($input) => {
		const value = $input.value
		const is12hrTime = regex.string12hr.test(value)
		const is24hrTime = regex.string24hr.test(value)
		return {
			as12hrString: () => is12hrTime ? value : convert.string24hr(value).to12hr(),
			as24hrString: () => is24hrTime ? value : convert.string12hr(value).to24hr(),
			asTimeObject: () => is12hrTime ? convert.string12hr(value).toTimeObject() : convert.string24hr(value).toTimeObject()
		}
	},
	labelTextOf: ($input, document = window.document) => {
		const labelText =
			aria_labelledby($input, document) ||
			aria_label($input) ||
			for_attribute($input, document) ||
			label_wrapper_element($input) ||
			title_attribute($input)

		if (labelText) return labelText

		console.error('Label text for input not found.', $input)
		throw new Error('Cannot polyfill time input due to a missing label.')
	},
	rangeOf: ($input) => ({
		rawSelection: () => {
			const within = (segment: Segment, value: number, ): Boolean => ranges[segment].start <= value && value <= ranges[segment].end;
			const start = <SelectionIndex>$input.selectionStart
			const end = <SelectionIndex>$input.selectionEnd
			const segment: Segment = within('mode', start) ? 'mode' : within('min', start) ? 'min' : 'hrs12'
			return ({
				start,
				end,
				segment
			})
		},
		cursorSegment() {
			const { segment } = get.rangeOf($input).rawSelection()
			return ranges[segment]
		},
		nextSegment: () => traverseSegmentRanges($input, 'forward'),
		prevSegment: () => traverseSegmentRanges($input, 'backward')
	}),
	ancestorsOf: ($startingElem, selectorString) => {
		// https://stackoverflow.com/a/8729274/1611058
		let $elem = $startingElem
		var ancestors = []
		let i = 0;
		while ($elem) {
			if (i !== 0) {
				ancestors.push($elem)
			}
			var matchesSelector = $elem.msMatchesSelector
				// IE Hack
				? $elem.msMatchesSelector(selectorString)
				: $elem.matches(selectorString)
			if (matchesSelector) {
				return ancestors
			}
			$elem = $elem.parentElement
			i++
		}
		return ancestors
	}
}

function aria_labelledby($input: HTMLInputElement, document: Document = window.document) {
	var ariaLabelByID = $input.getAttribute('aria-labelledby')
	if (ariaLabelByID) {
		var $ariaLabelBy = document.getElementById(ariaLabelByID)
		if ($ariaLabelBy) return $ariaLabelBy.textContent
	}
	return false
}

function aria_label($input: HTMLInputElement) {
	var ariaLabel = $input.getAttribute('aria-label')
	if (ariaLabel) return ariaLabel
	return false
}

function for_attribute($input: HTMLInputElement, document: Document = window.document) {
	if ($input.id) {
		var $forLabel = document.querySelector('label[for="' + $input.id + '"]')
		if ($forLabel) return $forLabel.textContent.trim()
	}
	return false
}

function label_wrapper_element($input: HTMLInputElement) {
	var ancestors = get.ancestorsOf($input, 'label')
	var $parentLabel = ancestors[ancestors.length - 1]
	if ($parentLabel.nodeName == 'LABEL') return $parentLabel.textContent.trim()
	return false
}

function title_attribute($input: HTMLInputElement) {
	var titleLabel = $input.getAttribute('title')
	if (titleLabel) return titleLabel
	return false
}
