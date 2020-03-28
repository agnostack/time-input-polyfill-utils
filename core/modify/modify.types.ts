import { TimeObject, String12hr, String24hr } from "../../types";

export type Integration = 'isolated' | 'integrated'
export type Action = 'increment' | 'decrement'
export type Target = 'hours' | 'minutes' // | 'mode'
export type ToHr = 'to12hr' | 'to24hr'

interface ModifierFunctionProps {
	timeObject: TimeObject
	action: Action
	target: Target
	integration: Integration
	toHr: ToHr
}

export type ModifierFunction = (props: ModifierFunctionProps) => String12hr | String24hr

interface ModifyTimeStringProps {
	timeString: String12hr | String24hr,
	format: 'string12hr' | 'string24hr',
	action: Action,
	target: Target,
	integration: Integration
}

export type ModifyTimeString = (props: ModifyTimeStringProps) => String12hr | String24hr

export interface ModifyString12hr {
	(string12hr: String12hr): {
		increment: {
			hours: {
				isolated: () => String12hr
				integrated: () => String12hr
			}
			minutes: {
				isolated: () => String12hr
				integrated: () => String12hr
			}
		}
		decrement: {
			hours: {
				isolated: () => String12hr
				integrated: () => String12hr
			}
			minutes: {
				isolated: () => String12hr
				integrated: () => String12hr
			}
		},
		toggleMode: () => String12hr
	}
}
export interface ModifyString24hr {
	(string24hr: String24hr): {
		increment: {
			hours: {
				isolated: () => String24hr
				integrated: () => String24hr
			},
			minutes: {
				isolated: () => String24hr
				integrated: () => String24hr
			},
		},
		decrement: {
			hours: {
				isolated: () => String24hr
				integrated: () => String24hr
			},
			minutes: {
				isolated: () => String24hr
				integrated: () => String24hr
			},
		},
		toggleMode: () => String24hr
	}
}
export interface ModifyTimeObject {
	(timeObject: TimeObject): {
		increment: {
			hours: {
				isolated: () => TimeObject
				integrated: () => TimeObject
			},
			minutes: {
				isolated: () => TimeObject
				integrated: () => TimeObject
			},
		},
		decrement: {
			hours: {
				isolated: () => TimeObject
				integrated: () => TimeObject
			},
			minutes: {
				isolated: () => TimeObject
				integrated: () => TimeObject
			},
		},
		toggleMode: () => TimeObject
	}
}