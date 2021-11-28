import { AnyHtmlElement, TimeObject } from '../../types/index'

export type ToArray = <ElementType extends AnyHtmlElement>(NodeList: NodeList) => Array<ElementType>

export type ToNumber = (value: number | string | null) => null | number

export type ToLeadingZero = (value: number | string | null) => string

export type ToLeadingZero12HrString = (value: string | null | undefined) => string

export type MatchesTimeObject = (timeObjA: TimeObject, timeObjB: TimeObject) => boolean
