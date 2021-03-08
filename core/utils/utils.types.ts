import { TimeObject } from '../../types/index'

export type ToArray = (NodeList: NodeList) => Array<HTMLInputElement>

export type ToNumber = (value: number | string | null) => null | number

export type ToLeadingZero = (value: number | string | null) => string

export type MatchesTimeObject = (timeObjA: TimeObject, timeObjB: TimeObject) => boolean
