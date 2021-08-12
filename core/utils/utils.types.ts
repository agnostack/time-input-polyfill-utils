import { TimeObject } from '../../types/index'
import { AnyHtmlElement } from '../../types/utilTypes'

export type ToArray = <ElementType extends AnyHtmlElement>(NodeList: NodeList) => Array<ElementType>

export type ToNumber = (value: number | string | null) => null | number

export type ToLeadingZero = (value: number | string | null) => string

export type MatchesTimeObject = (timeObjA: TimeObject, timeObjB: TimeObject) => boolean
