// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getKeys = <T extends object>(object: T) =>
	Object.keys(object) as Array<keyof typeof object>
