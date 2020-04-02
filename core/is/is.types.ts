import { Hour24, Hour12, String12hr, String24hr, TimeObject } from '../../types'

export interface ValidateTimeStringProps {
	value: string
	format: 'string12hr' | 'string24hr'
	minHrs: Hour24 | Hour12
	maxHrs: Hour24 | Hour12
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
