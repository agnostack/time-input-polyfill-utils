import { Dashes, TimeObject } from '../../types/index'

export type ToArray = (NodeList: NodeList) => Array<HTMLInputElement>

export type ToNumber = (value: number | string | Dashes) => string | number

export type ToLeadingZero = (value: number | string | Dashes) => string

export type MatchesTimeObject = (timeObjA: TimeObject, timeObjB: TimeObject) => boolean
