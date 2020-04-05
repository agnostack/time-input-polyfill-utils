import { String12hr, String24hr, TimeObject, Hour24 } from '../../types'

export type ValidateString12hr = (string12hr: String12hr) => boolean
export type ValidateString24hr = (string24hr: String24hr) => boolean
export type ValidateTimeObject = (timeObject: TimeObject) => boolean
export type ValidateHours24 = (hrs24: Hour24) => boolean
