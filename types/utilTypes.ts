/**
 * Get the union type of all the values in an object type `T`
 * https://github.com/piotrwitek/utility-types
 */
export type Values<T extends object> = T[keyof T]

export type AnyHtmlElement = Values<HTMLElementTagNameMap>
