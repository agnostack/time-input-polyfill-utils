import { Segment } from '../../types'

export type SelectSegment = ($input: HTMLInputElement, segment: Segment) => void
export type SelectNextSegment = ($input: HTMLInputElement) => void
export type SelectPrevSegment = ($input: HTMLInputElement) => void
export type SelectCursorSegment = ($input: HTMLInputElement) => void

export type QuerySelectAll = (selector: string) => HTMLInputElement[]
