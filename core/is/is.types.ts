import { Hour24, String12hr, String24hr, TimeObject, DefinedHour24, DefinedHour12 } from '../../types/index'

export interface ValidateTimeStringProps {
	value: string
	format: 'string12hr' | 'string24hr'
	minHrs: DefinedHour24 | DefinedHour12
	maxHrs: DefinedHour24 | DefinedHour12
}

export type IsPmHrs24 = (hrs24: Hour24) => boolean
export type IsPmString12hr = (string12hr: String12hr) => boolean
export type IsPmString24hr = (string24hr: String24hr) => boolean
export type IsPmTimeObject = (timeObject: TimeObject) => boolean

export type IsAmHrs24 = (hrs24: Hour24) => boolean
export type IsAmString12hr = (string12hr: String12hr) => boolean
export type IsAmString24hr = (string24hr: String24hr) => boolean
export type IsAmTimeObject = (timeObject: TimeObject) => boolean

export type IsString12hr = (value: any) => boolean
export type IsString24hr = (value: any) => boolean
export type IsTimeObject = (value: any) => boolean
export type IsCompleteTimeObject = (timeObject: TimeObject) => boolean

export type IsShiftHeldDown = boolean
