import { convert_number } from '../converters/converters'

export const get_values = (timeString: string) => {
	var regEx = /([0-9-]{1,2})\:([0-9-]{1,2})\s?(AM|PM|\-\-)?/
	var result = regEx.exec(timeString)

	return {
		hrs: convert_number(result[1]),
		min: convert_number(result[2]),
		mode: result[3],
	}
}
