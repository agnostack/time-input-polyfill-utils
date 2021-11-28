export type Regex = {
	string12hr: RegExp
	/** Allows hours and minutes to have only 1 number */
	lenientString12hr: RegExp
	string24hr: RegExp
	/** Allows hours and minutes to have only 1 number */
	lenientString24hr: RegExp
	alphaNumericKeyName: RegExp
}
