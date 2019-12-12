export const modify12hrString = {
	increment: {
		hrs: {
			toString: (timeString: string) => '01:30 PM',
			toObject: (timeString: string) => ({ hrs: 1, min: 30, mode: 'PM' }),
		},
	},
}
