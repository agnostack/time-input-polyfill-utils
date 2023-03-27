/* eslint-disable @typescript-eslint/consistent-type-assertions, @typescript-eslint/explicit-function-return-type */
// TODO: explore converting to arrow typing
export const getKeys = <T extends object>(object: T) =>
	Object.keys(object) as Array<keyof typeof object>
