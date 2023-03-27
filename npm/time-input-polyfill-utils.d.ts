type DefinedHour12 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Hour12 = null | DefinedHour12;
type Hour24 = null | DefinedHour24;
type DefinedHour24 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;

type Minute = null | DefinedMinute;
type DefinedMinute = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59;

type Mode = null | 'AM' | 'PM';
type GuaranteedMode = 'AM' | 'PM';

interface A11yCreate {
    (document?: Document): HTMLDivElement;
}
interface A11yUpdate {
    ($input: HTMLInputElement | null, announcementArray: Array<'initial' | 'select' | 'update'>, document?: Document): string;
}
type A11yClear = (document?: Document) => void;
type GetA11yValue = (document?: Document) => string;
type GetA11yElement = (document?: Document) => HTMLDivElement | null;

interface ConvertString12hr {
    (string12hr: String12hr): {
        to24hr: () => String24hr;
        toTimeObject: () => TimeObject;
    };
}
interface ConvertString24hr {
    (string24hr: String24hr): {
        to12hr: () => String12hr;
        toTimeObject: () => TimeObject;
    };
}
interface ConvertTimeObject {
    (timeObject: TimeObject, skipValidation?: boolean): {
        to12hr: () => String12hr;
        to24hr: () => String24hr;
    };
}
interface ConvertHours24 {
    (hours24: Hour24): {
        toHours12: () => Hour12;
    };
}
interface ConvertDateObject {
    (date: Date): {
        to12hr: () => String12hr;
        to24hr: () => String24hr;
        toTimeObject: () => TimeObject;
    };
}

type Flash24hrTime = ($input: HTMLInputElement) => void;

interface ExtendedTimeObject extends TimeObject {
    timeObject: TimeObject;
}
type GetString12hr = (string12hr: String12hr) => ExtendedTimeObject;
type GetString24hr = (string24hr: String24hr) => ExtendedTimeObject;
type GetInputValue = ($input: HTMLInputElement | null) => {
    as12hrString: () => String12hr;
    as24hrString: () => String24hr;
    asTimeObject: () => TimeObject;
};
type GetLabelTextOf = ($input: HTMLInputElement | null, document?: Document) => string;
type GetCursorSegment = ($input: HTMLInputElement | null) => Segment;
type GetNextPrevSegment = ($inputOrSegment: HTMLInputElement | Segment | null) => Segment;
type GetRangeOf = ($input: HTMLInputElement | null) => {
    rawSelection: () => SelectionRange;
    cursorSegment: () => SelectionRange;
    nextSegment: () => SelectionRange;
    prevSegment: () => SelectionRange;
};
type GetAncestorsOf = ($startingElem: AnyHtmlElement | null, selectorString?: string) => Array<AnyHtmlElement>;

type IsPmHrs24 = (hrs24: Hour24) => boolean;
type IsPmString12hr = (string12hr: String12hr) => boolean;
type IsPmString24hr = (string24hr: String24hr) => boolean;
type IsPmTimeObject = (timeObject: TimeObject) => boolean;
type IsAmHrs24 = (hrs24: Hour24) => boolean;
type IsAmString12hr = (string12hr: String12hr) => boolean;
type IsAmString24hr = (string24hr: String24hr) => boolean;
type IsAmTimeObject = (timeObject: TimeObject) => boolean;
type IsString12hr = (value: any) => boolean;
type IsString24hr = (value: any) => boolean;
type IsTimeObject = (value: any) => boolean;
type IsCompleteTimeObject = (timeObject: TimeObject) => boolean;
type IsShiftHeldDown = boolean;

type BlankFunc = () => void;
type zeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type GenericEntry = zeroToNine | 'a' | 'p' | string;
type GenericEntries = Array<GenericEntry>;
interface SegmentLogConstructor {
    startingValue: Hour12 | Minute | Mode;
    segment: Segment;
    onUpdate: BlankFunc;
    onLimitHit: BlankFunc;
}
declare class SegmentLog {
    value: Hour12 | Minute | Mode;
    segment: Segment;
    entries: GenericEntries;
    update: () => void;
    limitHit: () => void;
    constructor({ startingValue, segment, onUpdate, onLimitHit }: SegmentLogConstructor);
    /**
     * Adds a value to the to the log and keeps track of what the end value should be
     * @param keyName - Expected to be a keyboard key name like "1" or "a"
     */
    add(keyName: string): void;
    /**
     * Reset is needed for things like typing "1", then leaving, then coming back.
     *
     * The tracker should reset if they are returning.
     */
    reset(): void;
    /**
     * Deletes the current value. Use this if the user presses delete or backspace.
     */
    clear(): void;
}
interface ManualEntryLogConstructor {
    /** The current Time object value */
    timeObject: TimeObject;
    /** Callback function for when the values change */
    onUpdate?: (entryLog: ManualEntryLog) => void;
    /** Callback function for when the manual entry exceeds the maximum range */
    onLimitHit?: (entryLog: ManualEntryLog) => void;
}
/**
 * Used for keeping track of Manual key strokes inside a time input
 */
declare class ManualEntryLog {
    hrs12: SegmentLog;
    minutes: SegmentLog;
    mode: SegmentLog;
    fullValue12hr: String12hr;
    constructor({ timeObject, onUpdate, onLimitHit, }: ManualEntryLogConstructor);
    /**
     * Deletes all of the values for all of the segments.
     */
    clearAll(): void;
}

interface ModifyString12hr {
    (string12hr: String12hr): {
        increment: {
            hrs12: {
                isolated: () => String12hr;
                integrated: () => String12hr;
            };
            minutes: {
                isolated: () => String12hr;
                integrated: () => String12hr;
            };
            mode: {
                isolated: () => String12hr;
                integrated: () => String12hr;
            };
            cursorSegment: ($input: HTMLInputElement | null) => {
                isolated: () => String12hr;
                integrated: () => String12hr;
            };
        };
        decrement: {
            hrs12: {
                isolated: () => String12hr;
                integrated: () => String12hr;
            };
            minutes: {
                isolated: () => String12hr;
                integrated: () => String12hr;
            };
            mode: {
                isolated: () => String12hr;
                integrated: () => String12hr;
            };
            cursorSegment: ($input: HTMLInputElement | null) => {
                isolated: () => String12hr;
                integrated: () => String12hr;
            };
        };
        clear: {
            hrs12: () => String12hr;
            minutes: () => String12hr;
            mode: () => String12hr;
            all: () => String12hr;
        };
        toggleMode: (preferredModeWhenNull: GuaranteedMode, isIntegrated: boolean) => String12hr;
    };
}
interface ModifyString24hr {
    (string24hr: String24hr): {
        increment: {
            hrs24: {
                isolated: () => String24hr;
                integrated: () => String24hr;
            };
            minutes: {
                isolated: () => String24hr;
                integrated: () => String24hr;
            };
            mode: {
                isolated: () => String24hr;
                integrated: () => String24hr;
            };
        };
        decrement: {
            hrs24: {
                isolated: () => String24hr;
                integrated: () => String24hr;
            };
            minutes: {
                isolated: () => String24hr;
                integrated: () => String24hr;
            };
            mode: {
                isolated: () => String24hr;
                integrated: () => String24hr;
            };
        };
        toggleMode: (preferredModeWhenNull: GuaranteedMode, isIntegrated: boolean) => String24hr;
    };
}
interface ModifyTimeObject {
    (timeObject: TimeObject): {
        increment: {
            hrs12: {
                isolated: () => TimeObject;
                integrated: () => TimeObject;
            };
            hrs24: {
                isolated: () => TimeObject;
                integrated: () => TimeObject;
            };
            minutes: {
                isolated: () => TimeObject;
                integrated: () => TimeObject;
            };
            mode: {
                isolated: () => TimeObject;
                integrated: () => TimeObject;
            };
            cursorSegment: ($input: HTMLInputElement | null) => {
                isolated: () => TimeObject;
                integrated: () => TimeObject;
            };
        };
        decrement: {
            hrs12: {
                isolated: () => TimeObject;
                integrated: () => TimeObject;
            };
            hrs24: {
                isolated: () => TimeObject;
                integrated: () => TimeObject;
            };
            minutes: {
                isolated: () => TimeObject;
                integrated: () => TimeObject;
            };
            mode: {
                isolated: () => TimeObject;
                integrated: () => TimeObject;
            };
            cursorSegment: ($input: HTMLInputElement | null) => {
                isolated: () => TimeObject;
                integrated: () => TimeObject;
            };
        };
        clear: {
            hrs12: () => TimeObject;
            hrs24: () => TimeObject;
            minutes: () => TimeObject;
            mode: () => TimeObject;
            all: () => TimeObject;
        };
        toggleMode: (preferredModeWhenNull: GuaranteedMode, isIntegrated: boolean) => TimeObject;
    };
}

type Regex = {
    string12hr: RegExp;
    /** Allows hours and minutes to have only 1 number */
    lenientString12hr: RegExp;
    string24hr: RegExp;
    /** Allows hours and minutes to have only 1 number */
    lenientString24hr: RegExp;
    alphaNumericKeyName: RegExp;
};

type SelectSegment = ($input: HTMLInputElement | null, segment?: Segment) => void;
type SelectNextSegment = ($input: HTMLInputElement | null) => void;
type SelectPrevSegment = ($input: HTMLInputElement | null) => void;
type SelectCursorSegment = ($input: HTMLInputElement | null) => void;
type QuerySelectAll = <ElemType extends AnyHtmlElement = AnyHtmlElement>(selector: string, startingElem?: AnyHtmlElement | Document) => Array<ElemType>;

type ToArray = <T>(arrayLikeThing: ArrayLike<T>) => Array<T>;
type ToNumber = (value: number | string | null) => null | number;
type ToLeadingZero = (value: number | string | null) => string;
type ToLeadingZero12HrString = (value: string | null | undefined) => string;
type MatchesTimeObject = (timeObjA: TimeObject, timeObjB: TimeObject) => boolean;

type ValidateString12hr = (string12hr: String12hr) => boolean;
type ValidateString24hr = (string24hr: String24hr) => boolean;
type ValidateTimeObject = (timeObject: TimeObject) => boolean;
type ValidateHours24 = (hrs24: Hour24) => boolean;

interface TimeObject {
    hrs24: Hour24;
    hrs12: Hour12;
    minutes: Minute;
    mode: Mode;
}
interface PartialTimeObject {
    hrs24?: Hour24;
    hrs12?: Hour12;
    minutes?: Minute;
    mode?: Mode;
}
type TimeObjectKey = keyof TimeObject;

interface Polyfill {
    /** Create the element that holds the screen reader text inside it. */
    a11yCreate: A11yCreate;
    /** Utility function for updating the screen reader text. */
    a11yUpdate: A11yUpdate;
    /** Utility function for clearing out the screen reader text. */
    a11yClear: A11yClear;
    /** Return the current screen reader text content. */
    getA11yValue: GetA11yValue;
    /** Return the element holding the screen reader text. */
    getA11yElement: GetA11yElement;
    /** Utility function for turning a node list of HTML elements into an array of HTML elements. */
    toArray: ToArray;
    /** Utility for converting a string to a number. */
    toNumber: ToNumber;
    /** Utility for adding a leading zero to single digit numbers. */
    toLeadingZero: ToLeadingZero;
    /** Utility for converting a single digit 12hr time to a double digit 12hr time. */
    toLeadingZero12HrString: ToLeadingZero12HrString;
    /** Utility for checking if 2 time objects match. */
    matchesTimeObject: MatchesTimeObject;
    /** Briefly switch an input element to display 24 hour time instead of 12 hour time. Primarily useful when submitting forms. */
    flash24hrTime: Flash24hrTime;
    /** Utility for converting a 12 hour time string into either a 24 hour string or a time object. */
    convertString12hr: ConvertString12hr;
    /** Utility for converting a 24 hour time string into either a 12 hour string or a time object. */
    convertString24hr: ConvertString24hr;
    /** Utility for converting a time object into either a 12 hour string or a 24 hour string. */
    convertTimeObject: ConvertTimeObject;
    /** Utility for converting a 24hr hours number into a 12hr hours number. */
    convertHours24: ConvertHours24;
    /** Utility for converting a date object into either a 12hr string, a 24hr string or a time object. */
    convertDateObject: ConvertDateObject;
    /** Essentiallly an alias for `convertString12hr(string12hr).toTimeObject()` */
    getString12hr: GetString12hr;
    /** Essentiallly an alias for `convertString24hr(string24hr).toTimeObject()` */
    getString24hr: GetString24hr;
    /** Retrieve the current input value as either a 12hr string, a 24hr string or a time object. */
    getInputValue: GetInputValue;
    /** Retrieve the label text of an input element. */
    getLabelTextOf: GetLabelTextOf;
    /** Retrieve the currently selected segment. */
    getCursorSegment: GetCursorSegment;
    /** Retrieve the segment before the selected segment. */
    getPrevSegment: GetNextPrevSegment;
    /** Retrieve the segment after the selected segment. */
    getNextSegment: GetNextPrevSegment;
    /** Retrieve the cursor ranges of various segments. Used for making selections. */
    getRangeOf: GetRangeOf;
    /** Retrieve a list of ancestor elements for a specific element. */
    getAncestorsOf: GetAncestorsOf;
    /** Retrieve the current state of the `[shift]` key. */
    isShiftHeldDown: IsShiftHeldDown;
    /** Check if a 24hr hours value is a PM value. */
    isPmHrs24: IsPmHrs24;
    /** Check if a 12hr string value is a PM value. */
    isPmString12hr: IsPmString12hr;
    /** Check if a 24hr string value is a PM value. */
    isPmString24hr: IsPmString24hr;
    /** Check if a time object is a PM value. */
    isPmTimeObject: IsPmTimeObject;
    /** Check if a 24hr hours value is an AM value. */
    isAmHrs24: IsAmHrs24;
    /** Check if a 12hr string value is a AM value. */
    isAmString12hr: IsAmString12hr;
    /** Check if a 24hr string value is a AM value. */
    isAmString24hr: IsAmString24hr;
    /** Check if a time object is a AM value. */
    isAmTimeObject: IsAmTimeObject;
    /** Check if a value is a time object */
    isTimeObject: IsTimeObject;
    /** Check if a time object has no null any values. */
    isCompleteTimeObject: IsCompleteTimeObject;
    /** Check if a value is in a 12hr string format. */
    isString12hr: IsString12hr;
    /** Check if a value is in a 24hr string format. */
    isString24hr: IsString24hr;
    /** Utility for keeping track of manually entered times. */
    ManualEntryLog: typeof ManualEntryLog;
    /** Utility for incrementing or decrementing a 12hr string */
    modifyString12hr: ModifyString12hr;
    /** Utility for incrementing or decrementing a 24hr string */
    modifyString24hr: ModifyString24hr;
    /** Utility for incrementing or decrementing a time object */
    modifyTimeObject: ModifyTimeObject;
    /** Regular expressions for checking if time strings match the expected format. */
    regex: Regex;
    /** Essentially `document.querySelectAll()` but it returns an array of elements instead of a node list. */
    selectAll: QuerySelectAll;
    /** Select a specific segment of a time input polyfill. */
    selectSegment: SelectSegment;
    /** Select the segment after the selected segment of a time input polyfill. */
    selectNextSegment: SelectNextSegment;
    /** Select the segment before the selected segment of a time input polyfill. */
    selectPrevSegment: SelectPrevSegment;
    /** Select the segment that the cursor is currently sitting in. */
    selectCursorSegment: SelectCursorSegment;
    /** Check if a string is a valid 12hr time string */
    validateString12hr: ValidateString12hr;
    /** Check if a string is a valid 24hr time string */
    validateString24hr: ValidateString24hr;
    /** Check if a string is a valid time object */
    validateTimeObject: ValidateTimeObject;
    /** Check if a number is a valid 24hr hours value */
    validateHours24: ValidateHours24;
    /** The cursor ranges for each of the segments. */
    ranges: Ranges;
    /** The cursor ranges for each of the segments in the order that the segments appear. */
    rangesList: Array<SelectionRange>;
    /** The maximum and minimum values for hours (24hr), hours (12hr), and minutes. */
    maxAndMins: MaxAndMins;
    /** An array of each of the segment names in order of appearance. */
    segments: Array<Segment>;
    /** An array of each of each the keys in a time object. */
    timeObjectKeys: Array<TimeObjectKey>;
    /** The id for the screen reader accessibility block that is generated */
    a11yID: string;
}

type Hrs24 = 'hrs24';
type Hrs12 = 'hrs12';
type minutes = 'minutes';
type Md = 'mode';
type Segment = Hrs12 | minutes | Md;

type SelectionIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type SelectionRange = {
    start: SelectionIndex;
    end: SelectionIndex;
    segment: Segment;
};

interface Ranges {
    hrs12: SelectionRange;
    minutes: SelectionRange;
    mode: SelectionRange;
}
interface MaxAndMins {
    hrs24: {
        min: DefinedHour24;
        max: DefinedHour24;
    };
    hrs12: {
        min: DefinedHour12;
        max: DefinedHour12;
    };
    minutes: {
        min: DefinedMinute;
        max: DefinedMinute;
    };
}

type String12hr = string;
type String24hr = string;
type Dashes = '--';

/**
 * Get the union type of all the values in an object type `T`
 * https://github.com/piotrwitek/utility-types
 */
type Values<T extends object> = T[keyof T];
type AnyHtmlElement = Values<HTMLElementTagNameMap>;

declare global {
    interface Window {
        timeInputPolyfillUtils: Polyfill;
        supportsTime?: boolean;
    }
}

export { AnyHtmlElement, Dashes, DefinedHour12, DefinedHour24, DefinedMinute, GuaranteedMode, Hour12, Hour24, Hrs12, Hrs24, MaxAndMins, Md, Minute, Mode, PartialTimeObject, Polyfill, Ranges, Segment, SelectionIndex, SelectionRange, String12hr, String24hr, TimeObject, TimeObjectKey, Values, minutes };
