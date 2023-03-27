(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('browser-monads-ts')) :
    typeof define === 'function' && define.amd ? define(['browser-monads-ts'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["browser-monads-ts"]));
})(this, (function (browserMonadsTs) { 'use strict';

    const blankValues = {
        string12hr: '--:-- --',
        string24hr: '',
        timeObject: {
            hrs24: null,
            hrs12: null,
            minutes: null,
            mode: null,
        },
    };

    // This is intentionally separate from index.ts since it needs to be downloaded in modern browsers
    // https://stackoverflow.com/a/10199306/1611058
    function get_time_support() {
        if (!browserMonadsTs.exists(browserMonadsTs.window) || !browserMonadsTs.exists(browserMonadsTs.document)) {
            return false;
        }
        const input = browserMonadsTs.document.createElement('input');
        input.setAttribute('type', 'time');
        const notValid = 'not-a-time';
        input.setAttribute('value', notValid);
        return input.value !== notValid;
    }
    const supportsTime = get_time_support();
    if (browserMonadsTs.exists(browserMonadsTs.window)) {
        browserMonadsTs.window.supportsTime = supportsTime;
    }

    /* eslint-disable @typescript-eslint/consistent-type-assertions, @typescript-eslint/explicit-function-return-type */
    // TODO: explore converting to arrow typing
    const getKeys = (object) => Object.keys(object);

    const regex = {
        string12hr: /^([0-9-]{2}):([0-9-]{2})\s(AM|PM|--)$/,
        lenientString12hr: /^([0-9-]{1,2}):([0-9-]{1,2})\s(AM|PM|--|-)$/,
        string24hr: /^$|^([0-9]{2}):([0-9]{2})$/,
        lenientString24hr: /^$|^([0-9]{1,2}):([0-9]{1,2})$/,
        alphaNumericKeyName: /^[A-z0-9]$/,
    };

    const ranges = {
        hrs12: { start: 0, end: 2, segment: 'hrs12' },
        minutes: { start: 3, end: 5, segment: 'minutes' },
        mode: { start: 6, end: 8, segment: 'mode' },
    };
    const rangesList = [ranges.hrs12, ranges.minutes, ranges.mode];
    const maxAndMins = {
        hrs24: { min: 0, max: 23 },
        hrs12: { min: 1, max: 12 },
        minutes: { min: 0, max: 59 },
    };
    const segments = ['hrs12', 'minutes', 'mode'];
    const timeObjectKeys = ['hrs24', 'hrs12', 'minutes', 'mode'];
    const a11yID = 'time-input-polyfill-accessibility-block';

    const toArray = (arrayLikeThing) => Array.prototype.slice.call(arrayLikeThing, 0);
    const toNumber = (value) => {
        const number = Number(value);
        return isNaN(number) ? null : number;
    };
    const toLeadingZero = (value) => {
        if (value === null || value === '-')
            return '--';
        const number = Number(value);
        if (isNaN(number) && typeof value !== 'number')
            return value;
        return number < 10 ? `0${number}` : `${number}`;
    };
    const toLeadingZero12HrString = (value) => {
        if (!value)
            return '--:-- --';
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_val, hrs, minutes, mode] = regex.lenientString12hr.exec(value) || [];
        return `${toLeadingZero(hrs)}:${toLeadingZero(minutes)} ${toLeadingZero(mode)}`;
    };
    const matchesTimeObject = (timeObjA, timeObjB) => {
        return JSON.stringify(timeObjA) === JSON.stringify(timeObjB);
    };

    let isShiftHeldDown = false;
    if (browserMonadsTs.exists(browserMonadsTs.window) && browserMonadsTs.window.addEventListener) {
        browserMonadsTs.window.addEventListener('keyup', (e) => (isShiftHeldDown = e.shiftKey));
        browserMonadsTs.window.addEventListener('keydown', (e) => (isShiftHeldDown = e.shiftKey));
    }
    const isValidTimeString = ({ value, format, minHrs, maxHrs }) => {
        const isFormatValid = regex[format].test(value);
        if (!isFormatValid)
            return false;
        const parsedString = regex[format].exec(value) || [];
        const hrsVal = toNumber(parsedString[1]);
        const minsVal = toNumber(parsedString[2]);
        const isHrsValid = hrsVal === null || (hrsVal >= minHrs && hrsVal <= maxHrs);
        const isMinsValid = minsVal === null || (minsVal >= 0 && minsVal <= 59);
        return isHrsValid && isMinsValid;
    };
    const isPmHrs24 = (hrs24) => hrs24 !== null && 12 <= hrs24 && hrs24 < 24;
    const isPmString12hr = (string12hr) => { var _a; return ((_a = regex.string12hr.exec(string12hr)) === null || _a === void 0 ? void 0 : _a[3]) === 'PM'; };
    const isPmString24hr = (string24hr) => {
        var _a;
        if (string24hr === '')
            return false;
        const hrs24 = toNumber(((_a = regex.string24hr.exec(string24hr)) === null || _a === void 0 ? void 0 : _a[1]) || '');
        return typeof hrs24 == 'number' && hrs24 > 11;
    };
    const isPmTimeObject = (timeObject) => {
        if (!timeObject.mode && timeObject.hrs24 !== null) {
            return timeObject.hrs24 > 11;
        }
        return timeObject.mode === 'PM';
    };
    const isAmHrs24 = (hrs24) => hrs24 !== null && !isPmHrs24(hrs24);
    const isAmString12hr = (string12hr) => regex.string12hr.test(string12hr) &&
        string12hr.indexOf('--') === -1 &&
        !isPmString12hr(string12hr);
    const isAmString24hr = (string24hr) => string24hr !== '' && !isPmString24hr(string24hr);
    const isAmTimeObject = (timeObject) => !isPmTimeObject(timeObject) && isCompleteTimeObject(timeObject);
    // TODO: explore converting to arrow typing
    const isTimeObject = (value) => {
        if (typeof value === 'undefined' || typeof value !== 'object')
            return false;
        const keys = Object.keys(value);
        if (keys.length === 0)
            return false;
        const filteredKeys = timeObjectKeys.filter((key) => keys.indexOf(key) === -1);
        const additionalKeys = keys.filter((key) => {
            // key might not be a TimeObjectKey but that is exactly what I'm checking for here
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            return timeObjectKeys.indexOf(key) === -1;
        });
        return filteredKeys.length === 0 && additionalKeys.length === 0;
    };
    const isCompleteTimeObject = (timeObject) => {
        if (!isTimeObject(timeObject)) {
            return false;
        }
        return getKeys(timeObject).every((key) => timeObject[key] !== null);
    };
    const isString12hr = (value) => isValidTimeString({ value, format: 'string12hr', minHrs: 1, maxHrs: 12 });
    const isString24hr = (value) => {
        if (value === '')
            return true;
        return isValidTimeString({ value, format: 'string24hr', minHrs: 0, maxHrs: 23 });
    };

    const writeBadValue = (badValue) => {
        if (typeof badValue === 'string') {
            return `"${badValue}"`;
        }
        if (badValue === null) {
            return 'null';
        }
        if (badValue === undefined) {
            return 'undefined';
        }
        return badValue;
    };
    const validateString12hr = (string12hr) => {
        if (!isString12hr(string12hr)) {
            throw new Error(`"${string12hr}" is not a valid 12 hour time, use the format "HH:MM AM/PM"`);
        }
        return true;
    };
    const validateString24hr = (string24hr) => {
        if (!isString24hr(string24hr)) {
            const extra = (/-/.test(string24hr) &&
                ' Use an empty string instead of "--:--" to represent a blank value') ||
                (/24:\d\d/.test(string24hr) && ' Use "00" instead of "24".') ||
                '';
            throw new Error(`"${string24hr}" is not a valid 24 hour time.${extra}`);
        }
        return true;
    };
    const validateTimeObject = (timeObject) => {
        const { hrs24, hrs12, minutes, mode } = timeObject;
        if (!isTimeObject(timeObject)) {
            throw new Error(`${JSON.stringify(timeObject)} is not a valid time object. Must be in the format {hrs24: 0, hrs12: 12, minutes: 0, mode: 'AM'} (12:00 AM)`);
        }
        const isValid = (variable, varName, lower, upper) => {
            if ((typeof variable === 'string' && variable !== '--') ||
                (typeof variable === 'number' && (variable > upper || variable < lower))) {
                const badValue = writeBadValue(variable);
                throw new Error(`${varName} (${badValue}) is invalid, "${varName}" must be a number ${lower}-${upper} or null`);
            }
        };
        isValid(hrs24, 'hrs24', 0, 23);
        isValid(hrs12, 'hrs12', 1, 12);
        isValid(minutes, 'minutes', 0, 59);
        const validModes = ['AM', 'PM', null];
        if (validModes.indexOf(mode) < 0) {
            throw new Error(`Mode (${writeBadValue(mode)}) is invalid. Valid values are: ${validModes
            .map((val) => writeBadValue(val))
            .join(', ')}`);
        }
        if (hrs24 !== null && hrs12 === null) {
            throw new Error(`hrs12 (${hrs12}) must not be null if hrs24 (${hrs24}) has a value`);
        }
        if ((hrs24 === 0 && hrs12 !== 12) ||
            (hrs24 !== null && hrs12 !== hrs24 && hrs24 < 13 && hrs24 !== 0) ||
            (typeof hrs24 === 'number' && hrs24 > 12 && hrs12 !== hrs24 - 12)) {
            throw new Error(`hrs12 (${hrs12}) should be equal to or 12 hours behind hrs24 (${hrs24})`);
        }
        if (mode !== null &&
            ((hrs24 && hrs24 >= 12 && mode !== 'PM') || (hrs24 && hrs24 <= 11 && mode !== 'AM'))) {
            if (mode === 'PM') {
                throw new Error(`If mode (${mode}) is "PM", hrs24 (${hrs24}) should be greater than or equal to 12`);
            }
            else {
                throw new Error(`If mode (${mode}) is "AM", hrs24 (${hrs24}) should be less than or equal to 11`);
            }
        }
        if (mode === null && hrs24 !== null) {
            throw new Error(`If mode is null, hrs24 (${hrs24}) must be null as well. It is not possible to know the correct hrs24 value if mode is null`);
        }
        if (mode !== null && hrs12 !== null && hrs24 === null) {
            throw new Error(`If mode (${mode}) and hrs12 (${hrs12}) are defined then hrs24 (${hrs24}) must be defined as well`);
        }
        return true;
    };
    const validateHours24 = (hrs24) => {
        if ((typeof hrs24 !== 'number' && hrs24 !== '--') ||
            (typeof hrs24 === 'number' && (hrs24 < 0 || hrs24 > 23))) {
            throw new Error(`"${hrs24}" must be a number between 0 and 23 or null, use 0 instead of 24`);
        }
        return true;
    };

    const convertString12hr = (string12hr) => {
        validateString12hr(string12hr);
        return {
            to24hr() {
                if (/-/.test(string12hr))
                    return '';
                const timeObject = convertString12hr(string12hr).toTimeObject();
                return convertTimeObject(timeObject).to24hr();
            },
            toTimeObject() {
                const result = regex.string12hr.exec(string12hr) || [];
                const [hrs12, minutes, mode] = [
                    toNumber(result[1]),
                    toNumber(result[2]),
                    (result[3] === '--' ? null : result[3]),
                ];
                const getHrs24 = () => {
                    if (typeof hrs12 === 'number') {
                        if (mode === null && hrs12 === 12) {
                            return 0;
                        }
                        if (mode === 'PM') {
                            if (hrs12 === 12) {
                                return 12;
                            }
                            else if (hrs12 + 12 > 23) {
                                return (hrs12 + 12 - 24);
                            }
                            else {
                                return (hrs12 + 12);
                            }
                        }
                        else if (mode === 'AM' && hrs12 === 12) {
                            return 0;
                        }
                        else {
                            return hrs12;
                        }
                    }
                    return null;
                };
                const nullifyDashes = (value) => value === '--' ? null : value;
                const newMode = nullifyDashes(mode);
                const hrs24 = newMode ? getHrs24() : null;
                const timeObject = {
                    hrs24,
                    hrs12: nullifyDashes(hrs12),
                    minutes: nullifyDashes(minutes),
                    mode: newMode,
                };
                validateTimeObject(timeObject);
                return timeObject;
            },
        };
    };
    const convertString24hr = (string24hr) => {
        validateString24hr(string24hr);
        return {
            to12hr() {
                if (string24hr === blankValues.string24hr) {
                    return blankValues.string12hr;
                }
                const timeObject = convertString24hr(string24hr).toTimeObject();
                return convertTimeObject(timeObject).to12hr();
            },
            toTimeObject() {
                if (string24hr === blankValues.string24hr) {
                    return blankValues.timeObject;
                }
                // string24hr
                const regResult = regex.string24hr.exec(string24hr) || [];
                const [hrsString24, minString] = [regResult[1], regResult[2]];
                const [hrs24, minutes] = [toNumber(hrsString24), toNumber(minString)];
                const timeObject = {
                    hrs24,
                    hrs12: convertHours24(hrs24).toHours12(),
                    minutes,
                    mode: (isAmString24hr(string24hr) && 'AM') ||
                        (isPmString24hr(string24hr) && 'PM') ||
                        null,
                };
                validateTimeObject(timeObject);
                return timeObject;
            },
        };
    };
    const convertTimeObject = (timeObject, skipValidation = false) => {
        if (!skipValidation) {
            validateTimeObject(timeObject);
        }
        const { hrs24, hrs12, minutes, mode } = timeObject;
        const hrsString24 = toLeadingZero(hrs24);
        const hrsString12 = toLeadingZero(hrs12);
        const minString = toLeadingZero(minutes);
        return {
            to12hr: () => `${hrsString12}:${minString} ${mode || '--'}`,
            to24hr: () => {
                const string24hr = `${hrsString24}:${minString}`;
                if (/-/.test(string24hr))
                    return '';
                return string24hr;
            },
        };
    };
    const convertHours24 = (hours24) => {
        validateHours24(hours24);
        const getHours12 = () => {
            if (typeof hours24 === 'number') {
                if (hours24 <= 12) {
                    if (hours24 === 0) {
                        return 12;
                    }
                    else {
                        return hours24;
                    }
                }
                else {
                    return (hours24 - 12);
                }
            }
            return hours24;
        };
        return {
            toHours12: () => getHours12(),
        };
    };
    const convertDateObject = (date) => {
        return {
            to12hr() {
                const timeObject = convertDateObject(date).toTimeObject();
                return convertTimeObject(timeObject).to12hr();
            },
            to24hr() {
                const timeObject = convertDateObject(date).toTimeObject();
                return convertTimeObject(timeObject).to24hr();
            },
            toTimeObject() {
                const [hrs24, minutes] = [date.getHours(), date.getMinutes()];
                const hrs12 = convertHours24(hrs24).toHours12();
                const mode = isAmHrs24(hrs24) ? 'AM' : 'PM';
                return { hrs24, hrs12, minutes, mode };
            },
        };
    };

    const traverseSegmentRanges = ($input, direction) => {
        const cursorSegmentRange = getRangeOf($input).cursorSegment();
        const currentType = cursorSegmentRange.segment;
        const modifier = direction === 'forward' ? 1 : -1;
        const nextTypeIndex = rangesList.map((range) => range.segment).indexOf(currentType) + modifier;
        return rangesList[nextTypeIndex] || cursorSegmentRange;
    };
    const getString12hr = (string12hr) => {
        const timeObject = convertString12hr(string12hr).toTimeObject();
        return Object.assign(Object.assign({}, timeObject), { timeObject });
    };
    const getString24hr = (string24hr) => {
        const timeObject = convertString24hr(string24hr).toTimeObject();
        return Object.assign(Object.assign({}, timeObject), { timeObject });
    };
    const getInputValue = ($input) => {
        const value = ($input === null || $input === void 0 ? void 0 : $input.value) || '';
        const is12hrTime = regex.string12hr.test(value);
        const is24hrTime = regex.string24hr.test(value);
        return {
            as12hrString: () => (is12hrTime ? value : convertString24hr(value).to12hr()),
            as24hrString: () => (is24hrTime ? value : convertString12hr(value).to24hr()),
            asTimeObject: () => is12hrTime
                ? convertString12hr(value).toTimeObject()
                : convertString24hr(value).toTimeObject(),
        };
    };
    const getLabelTextOf = ($input, document = browserMonadsTs.window.document) => {
        if (!$input)
            return '';
        const labelText = aria_labelledby($input, document) ||
            aria_label($input) ||
            for_attribute($input, document) ||
            label_wrapper_element($input) ||
            title_attribute($input);
        if (labelText)
            return labelText;
        console.error('Label text for input not found.', $input);
        throw new Error('Cannot polyfill time input due to a missing label.');
    };
    const getCursorSegment = ($input) => getRangeOf($input).cursorSegment().segment;
    const getPrevSegment = ($inputOrSegment) => {
        if (typeof $inputOrSegment === 'string') {
            if ($inputOrSegment === 'hrs12')
                return 'hrs12';
            if ($inputOrSegment === 'minutes')
                return 'hrs12';
            if ($inputOrSegment === 'mode')
                return 'minutes';
        }
        return getRangeOf($inputOrSegment).prevSegment().segment;
    };
    const getNextSegment = ($inputOrSegment) => {
        if (typeof $inputOrSegment === 'string') {
            if ($inputOrSegment === 'hrs12')
                return 'minutes';
            if ($inputOrSegment === 'minutes')
                return 'mode';
            if ($inputOrSegment === 'mode')
                return 'mode';
        }
        return getRangeOf($inputOrSegment).nextSegment().segment;
    };
    const getRangeOf = ($input) => ({
        rawSelection: () => {
            if (!$input) {
                return {
                    start: 0,
                    end: 0,
                    segment: 'hrs12',
                };
            }
            const within = (segment, value) => ranges[segment].start <= value && value <= ranges[segment].end;
            const start = $input.selectionStart;
            const end = $input.selectionEnd;
            const segment = (within('mode', start) && 'mode') || (within('minutes', start) && 'minutes') || 'hrs12';
            return {
                start,
                end,
                segment,
            };
        },
        cursorSegment() {
            const { segment } = getRangeOf($input).rawSelection();
            return ranges[segment];
        },
        nextSegment: () => traverseSegmentRanges($input, 'forward'),
        prevSegment: () => traverseSegmentRanges($input, 'backward'),
    });
    const getAncestorsOf = ($startingElem, selectorString) => {
        // https://stackoverflow.com/a/8729274/1611058
        let $elem = $startingElem;
        const ancestors = [];
        let i = 0;
        while ($elem) {
            if (i !== 0) {
                ancestors.push($elem);
            }
            if (selectorString) {
                const matchesSelector = $elem.msMatchesSelector
                    ? $elem.msMatchesSelector(selectorString) // IE Hack
                    : $elem.matches(selectorString);
                if (matchesSelector) {
                    return ancestors;
                }
            }
            $elem = $elem === null || $elem === void 0 ? void 0 : $elem.parentElement;
            i++;
        }
        return ancestors;
    };
    const elemText = ($elem) => { var _a; return ((_a = $elem === null || $elem === void 0 ? void 0 : $elem.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ''; };
    function aria_labelledby($input, document = browserMonadsTs.window.document) {
        const ariaLabelByID = $input === null || $input === void 0 ? void 0 : $input.getAttribute('aria-labelledby');
        if (ariaLabelByID) {
            const $ariaLabelBy = document.getElementById(ariaLabelByID);
            return elemText($ariaLabelBy);
        }
        return '';
    }
    function aria_label($input) {
        const ariaLabel = $input.getAttribute('aria-label');
        return ariaLabel || '';
    }
    function for_attribute($input, document = browserMonadsTs.window.document) {
        const $forLabel = (document.querySelector('label[for="' + $input.id + '"]'));
        return elemText($forLabel);
    }
    function label_wrapper_element($input) {
        const ancestors = getAncestorsOf($input, 'label');
        const $parentLabel = ancestors[ancestors.length - 1];
        if ($parentLabel.nodeName == 'LABEL')
            return elemText($parentLabel);
        return '';
    }
    function title_attribute($input) {
        const titleLabel = $input.getAttribute('title');
        return titleLabel || '';
    }

    const a11yCreate = (document = browserMonadsTs.window.document) => {
        var _a;
        const $block = document.createElement('div');
        $block.setAttribute('aria-live', 'polite');
        $block.setAttribute('style', 'position: absolute; opacity: 0; height: 0; width: 0; overflow: hidden; pointer-events: none;');
        $block.id = a11yID;
        (_a = document.querySelector('body')) === null || _a === void 0 ? void 0 : _a.appendChild($block);
        return $block;
    };
    const a11yUpdate = ($input, announcementArray, document = browserMonadsTs.window.document) => {
        if (!$input)
            return '';
        a11yClear(document);
        const cursorSegment = getCursorSegment($input);
        const values = getInputValue($input).asTimeObject();
        const value = values[cursorSegment];
        const segmentValue = value === null ? 'blank' : value;
        const segmentName = {
            hrs12: 'Hours',
            minutes: 'Minutes',
            mode: 'AM/PM',
        }[cursorSegment];
        const announcements = {
            initial: '$label grouping $fullValue.',
            select: '$segmentName spin button $segmentValue.',
            update: '$segmentValue.',
        };
        const textArray = announcementArray.map((key) => announcements[key]);
        const fullValue = $input.value.replace(/--/g, 'blank');
        let html = `<p>${textArray.join('</p><p>')}</p>`;
        const labelText = getLabelTextOf($input, document);
        html = html.replace(/\$label/g, labelText);
        html = html.replace(/\$segmentName/g, segmentName);
        html = html.replace(/\$segmentValue/g, `${segmentValue}`);
        html = html.replace(/\$fullValue/g, fullValue);
        const $a11y = document.getElementById(a11yID);
        if ($a11y) {
            $a11y.innerHTML = html;
        }
        return html;
    };
    const a11yClear = (document = browserMonadsTs.window.document) => {
        const $a11y = document.getElementById(a11yID);
        if ($a11y) {
            $a11y.innerHTML = '';
        }
    };
    const getA11yValue = (document = browserMonadsTs.window.document) => {
        const $a11y = document.getElementById(a11yID);
        return ($a11y === null || $a11y === void 0 ? void 0 : $a11y.textContent) ? $a11y.textContent : '';
    };
    const getA11yElement = (document = browserMonadsTs.window.document) => {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return document.getElementById(a11yID);
    };

    // Used for quickly switching an input from 12hr to 24hr then back to 12hr.
    // This is useful when the user submits forms.
    // It will sends 24hr time to the server on submit like modern browsers do.
    // Not adding a form event listener, different frameworks might handle submit differently
    const flash24hrTime = ($input) => {
        const value12hr = $input.value;
        $input.value = convertString12hr(value12hr).to24hr();
        setTimeout(() => {
            $input.value = value12hr;
        }, 1);
    };

    const convertEntriesToNumber = (entries) => {
        return parseInt(entries.join(''));
    };
    class SegmentLog {
        constructor({ startingValue, segment, onUpdate, onLimitHit }) {
            this.entries = [];
            this.value = startingValue;
            this.segment = segment;
            this.update = () => onUpdate();
            this.limitHit = () => onLimitHit();
        }
        /**
         * Adds a value to the to the log and keeps track of what the end value should be
         * @param keyName - Expected to be a keyboard key name like "1" or "a"
         */
        add(keyName) {
            const number = parseInt(keyName);
            const isZero = number === 0;
            const isNumber = !isNaN(number);
            // Handles AM/PM
            if (this.segment === 'mode') {
                if (keyName.toLowerCase() === 'a') {
                    this.value = 'AM';
                    this.entries = [keyName];
                }
                if (keyName.toLowerCase() === 'p') {
                    this.value = 'PM';
                    this.entries = [keyName];
                }
                // Handles Hours and Minutes
            }
            else if (isNumber) {
                /*
                    12:30 AM >> type 1 (hrs) >> [1] >> 01:30 AM
                    12:30 AM >> type 1 > 2 (hrs) >> [1,2] >> 12:30 AM

                    12:30 AM >> type 2 (hrs) >> [2] >> 02:30 AM
                    12:30 AM >> type 2 > 1 (hrs) >> [1] >> 01:30 AM
                    12:30 AM >> type 2 > 1 > 2 (hrs) >> [1,2] >> 12:30 AM

                    12:30 AM >> type 0 (hrs) >> [1,2] >> 12:30 AM
                */
                const isGreaterThanMax = (number) => {
                    if (this.segment !== 'mode') {
                        return number > maxAndMins[this.segment].max;
                    }
                    return false;
                };
                const isFirst = this.entries.length === 0;
                const isSecond = this.entries.length === 1;
                const isThird = this.entries.length === 2;
                const isSecondZero = isZero && isSecond && this.entries[0] === 0;
                if (this.segment === 'hrs12') {
                    if ((isFirst || isThird) && isZero) {
                        this.entries = [0];
                        this.value = 12;
                        this.update();
                        return;
                    }
                    else if (isSecondZero) {
                        this.entries = [0, 0];
                        this.value = 12;
                        this.limitHit();
                        this.update();
                        return;
                    }
                }
                else if (this.segment === 'minutes') {
                    if ((isFirst || isThird) && isZero) {
                        this.entries = [0];
                        this.value = 0;
                        this.update();
                        return;
                    }
                    else if (isSecondZero) {
                        this.entries = [0, 0];
                        this.value = 0;
                        this.limitHit();
                        this.update();
                        return;
                    }
                }
                if (isZero && isSecond) {
                    const isHrsSegment = this.segment === 'hrs12';
                    const max = isHrsSegment ? 1 : 5;
                    if (this.entries[0] > max) {
                        this.entries = [0];
                        this.value = isHrsSegment ? 12 : 0;
                    }
                    else {
                        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                        this.entries.push(number);
                        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                        this.value = convertEntriesToNumber(this.entries);
                        this.limitHit();
                    }
                    this.update();
                    return;
                }
                const newEntries = [...this.entries, number];
                const newValue = convertEntriesToNumber(newEntries);
                if (isGreaterThanMax(newValue)) {
                    this.value = number;
                    this.entries = [number];
                    if (isGreaterThanMax(number * 10)) {
                        this.limitHit();
                    }
                }
                else {
                    this.value = newValue;
                    this.entries = newEntries;
                    if (newEntries.length === 2 || isGreaterThanMax(number * 10)) {
                        this.limitHit();
                    }
                }
            }
            this.update();
        }
        /**
         * Reset is needed for things like typing "1", then leaving, then coming back.
         *
         * The tracker should reset if they are returning.
         */
        reset() {
            this.entries = [];
        }
        /**
         * Deletes the current value. Use this if the user presses delete or backspace.
         */
        clear() {
            this.reset();
            this.value = null;
            this.update();
        }
    }
    /**
     * Used for keeping track of Manual key strokes inside a time input
     */
    class ManualEntryLog {
        constructor({ timeObject, onUpdate = () => { }, onLimitHit = () => { }, }) {
            const getFullValue12hr = () => {
                return [
                    toLeadingZero(this.hrs12.value),
                    ':',
                    toLeadingZero(this.minutes.value),
                    ' ',
                    this.mode.value || '--',
                ].join('');
            };
            const update = () => {
                this.fullValue12hr = getFullValue12hr();
                if (onUpdate) {
                    onUpdate(this);
                }
            };
            const limitHit = () => {
                if (onLimitHit) {
                    onLimitHit(this);
                }
            };
            this.hrs12 = new SegmentLog({
                startingValue: timeObject.hrs12,
                segment: 'hrs12',
                onUpdate: update,
                onLimitHit: limitHit,
            });
            this.minutes = new SegmentLog({
                startingValue: timeObject.minutes,
                segment: 'minutes',
                onUpdate: update,
                onLimitHit: limitHit,
            });
            this.mode = new SegmentLog({
                startingValue: timeObject.mode,
                segment: 'mode',
                onUpdate: update,
                onLimitHit: limitHit,
            });
            this.fullValue12hr = getFullValue12hr();
        }
        /**
         * Deletes all of the values for all of the segments.
         */
        clearAll() {
            this.hrs12.clear();
            this.minutes.clear();
            this.mode.clear();
        }
    }

    const modifyString12hr = (string12hr) => {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const modeToggle = (preferredModeWhenNull) => ({
            isolated: () => modifyString12hr(string12hr).toggleMode(preferredModeWhenNull, false),
            integrated: () => modifyString12hr(string12hr).toggleMode(preferredModeWhenNull, true),
        });
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const cursorSegmentModifier = (action) => ($input) => {
            const segment = getCursorSegment($input);
            return modifyString12hr(string12hr)[action][segment];
        };
        const modify = (modification, skipValidation) => {
            const timeObject = convertString12hr(string12hr).toTimeObject();
            const modified = modification(timeObject);
            return convertTimeObject(modified, skipValidation).to12hr();
        };
        return {
            increment: {
                hrs12: {
                    isolated: () => modify((timeObject) => modifyTimeObject(timeObject).increment.hrs12.isolated()),
                    integrated: () => modify((timeObject) => modifyTimeObject(timeObject).increment.hrs12.integrated()),
                },
                minutes: {
                    isolated: () => modify((timeObject) => modifyTimeObject(timeObject).increment.minutes.isolated()),
                    integrated: () => modify((timeObject) => modifyTimeObject(timeObject).increment.minutes.integrated()),
                },
                mode: modeToggle('AM'),
                cursorSegment: cursorSegmentModifier('increment'),
            },
            decrement: {
                hrs12: {
                    isolated: () => modify((timeObject) => modifyTimeObject(timeObject).decrement.hrs12.isolated()),
                    integrated: () => modify((timeObject) => modifyTimeObject(timeObject).decrement.hrs12.integrated()),
                },
                minutes: {
                    isolated: () => modify((timeObject) => modifyTimeObject(timeObject).decrement.minutes.isolated()),
                    integrated: () => modify((timeObject) => modifyTimeObject(timeObject).decrement.minutes.integrated()),
                },
                mode: modeToggle('PM'),
                cursorSegment: cursorSegmentModifier('decrement'),
            },
            toggleMode: (preferredModeWhenNull, isIntegrated) => modify((timeObject) => modifyTimeObject(timeObject).toggleMode(preferredModeWhenNull, isIntegrated), true),
            clear: {
                hrs12: () => modify((timeObject) => modifyTimeObject(timeObject).clear.hrs12()),
                minutes: () => modify((timeObject) => modifyTimeObject(timeObject).clear.minutes()),
                mode: () => modify((timeObject) => modifyTimeObject(timeObject).clear.mode()),
                all: () => modify((timeObject) => modifyTimeObject(timeObject).clear.all()),
            },
        };
    };
    const modifyString24hr = (string24hr) => {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const modeToggle = (preferredModeWhenNull) => ({
            isolated: () => modifyString24hr(string24hr).toggleMode(preferredModeWhenNull, false),
            integrated: () => modifyString24hr(string24hr).toggleMode(preferredModeWhenNull, true),
        });
        const modify = (modification, skipValidation) => {
            const timeObject = convertString24hr(string24hr).toTimeObject();
            const modified = modification(timeObject);
            return convertTimeObject(modified, skipValidation).to24hr();
        };
        return {
            increment: {
                hrs24: {
                    isolated: () => modify((timeObject) => modifyTimeObject(timeObject).increment.hrs24.isolated()),
                    integrated: () => modify((timeObject) => modifyTimeObject(timeObject).increment.hrs24.integrated()),
                },
                minutes: {
                    isolated: () => modify((timeObject) => modifyTimeObject(timeObject).increment.minutes.isolated()),
                    integrated: () => modify((timeObject) => modifyTimeObject(timeObject).increment.minutes.integrated()),
                },
                mode: modeToggle('AM'),
            },
            decrement: {
                hrs24: {
                    isolated: () => modify((timeObject) => modifyTimeObject(timeObject).decrement.hrs24.isolated()),
                    integrated: () => modify((timeObject) => modifyTimeObject(timeObject).decrement.hrs24.integrated()),
                },
                minutes: {
                    isolated: () => modify((timeObject) => modifyTimeObject(timeObject).decrement.minutes.isolated()),
                    integrated: () => modify((timeObject) => modifyTimeObject(timeObject).decrement.minutes.integrated()),
                },
                mode: modeToggle('PM'),
            },
            toggleMode: (preferredModeWhenNull, isIntegrated) => modify((timeObject) => modifyTimeObject(timeObject).toggleMode(preferredModeWhenNull, isIntegrated), true),
        };
    };
    const modifyTimeObject = (timeObject) => {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const modeToggle = (preferredModeWhenNull) => ({
            isolated: () => modifyTimeObject(timeObject).toggleMode(preferredModeWhenNull, false),
            integrated: () => modifyTimeObject(timeObject).toggleMode(preferredModeWhenNull, true),
        });
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const cursorSegmentModifier = (action) => ($input) => {
            const segment = getCursorSegment($input);
            return modifyTimeObject(timeObject)[action][segment];
        };
        return {
            increment: {
                hrs12: {
                    isolated: () => nudgeIsolatedTimeObjectHrs('up', timeObject),
                    integrated: () => nudgeIntegratedTimeObjectHrs('up', timeObject),
                },
                // hrs24 is just an alias for hrs12 since the 24hr doesn't matter
                hrs24: {
                    isolated: () => modifyTimeObject(timeObject).increment.hrs12.isolated(),
                    integrated: () => modifyTimeObject(timeObject).increment.hrs12.integrated(),
                },
                minutes: {
                    isolated: () => {
                        const { minutes } = timeObject;
                        const newMin = minutes === maxAndMins.minutes.max
                            ? maxAndMins.minutes.min
                            : nudgeMinutes(minutes, 'up');
                        return Object.assign(Object.assign({}, timeObject), { minutes: newMin });
                    },
                    integrated: () => {
                        const { minutes } = timeObject;
                        if (minutes === maxAndMins.minutes.max) {
                            return nudgeIntegratedTimeObjectHrs('up', Object.assign(Object.assign({}, timeObject), { minutes: maxAndMins.minutes.min }));
                        }
                        return Object.assign(Object.assign({}, timeObject), { minutes: nudgeMinutes(minutes, 'up') });
                    },
                },
                mode: modeToggle('AM'),
                cursorSegment: cursorSegmentModifier('increment'),
            },
            decrement: {
                hrs12: {
                    isolated: () => nudgeIsolatedTimeObjectHrs('down', timeObject),
                    integrated: () => nudgeIntegratedTimeObjectHrs('down', timeObject),
                },
                // hrs24 is just an alias for hrs12 since the 24hr doesn't matter
                hrs24: {
                    isolated: () => modifyTimeObject(timeObject).decrement.hrs12.isolated(),
                    integrated: () => modifyTimeObject(timeObject).decrement.hrs12.integrated(),
                },
                minutes: {
                    isolated: () => {
                        const { minutes } = timeObject;
                        const newMin = minutes === maxAndMins.minutes.min
                            ? maxAndMins.minutes.max
                            : nudgeMinutes(minutes, 'down');
                        return Object.assign(Object.assign({}, timeObject), { minutes: newMin });
                    },
                    integrated: () => {
                        const { minutes } = timeObject;
                        if (minutes === maxAndMins.minutes.min) {
                            return nudgeIntegratedTimeObjectHrs('down', Object.assign(Object.assign({}, timeObject), { minutes: maxAndMins.minutes.max }));
                        }
                        return Object.assign(Object.assign({}, timeObject), { minutes: nudgeMinutes(minutes, 'down') });
                    },
                },
                mode: modeToggle('PM'),
                cursorSegment: cursorSegmentModifier('decrement'),
            },
            toggleMode: (preferredModeWhenNull, isIntegrated) => {
                const { hrs12, hrs24, mode } = timeObject;
                const returnVal = Object.assign({}, timeObject);
                const isAM = isAmTimeObject(timeObject);
                const get24HrHours = (targetMode) => {
                    let hrs24Calculation;
                    if (hrs12 === null) {
                        hrs24Calculation = null;
                    }
                    else {
                        const is12 = hrs12 === 12;
                        const hours24hr = {
                            am: is12 ? 0 : hrs12,
                            pm: is12 ? 12 : hrs12 + 12,
                        };
                        hrs24Calculation = (targetMode === 'AM' ? hours24hr.am : hours24hr.pm);
                    }
                    return hrs24Calculation;
                };
                if (mode === null) {
                    if (isIntegrated && hrs24 !== null) {
                        returnVal.mode = hrs24 > 11 ? 'PM' : 'AM';
                        returnVal.hrs24 = hrs24;
                    }
                    else {
                        returnVal.mode = preferredModeWhenNull;
                        returnVal.hrs24 = get24HrHours(preferredModeWhenNull);
                    }
                }
                else {
                    returnVal.mode = isAM ? 'PM' : 'AM';
                    returnVal.hrs24 = get24HrHours(isAM ? 'PM' : 'AM');
                }
                if (hrs12 === null && mode === null) {
                    return returnVal;
                }
                return straightenTimeObject('hrs24', returnVal);
            },
            clear: {
                hrs24: () => (Object.assign(Object.assign({}, timeObject), { hrs12: null, hrs24: null })),
                hrs12: () => (Object.assign(Object.assign({}, timeObject), { hrs12: null, hrs24: null })),
                minutes: () => (Object.assign(Object.assign({}, timeObject), { minutes: null })),
                mode: () => (Object.assign(Object.assign({}, timeObject), { mode: null, hrs24: null })),
                all: () => blankValues.timeObject,
            },
        };
    };
    const nudgeMinutes = (minutes, direction) => {
        const modifier = direction === 'up' ? 1 : -1;
        const newMinutes = direction === 'up' ? 0 : 59;
        return (minutes === null ? newMinutes : minutes + modifier);
    };
    const nudgeIsolatedTimeObjectHrs = (direction, timeObject) => {
        return nudgeTimeObjectHrs({
            direction,
            timeObject,
            integration: 'isolated',
            blankCallback: (copiedObject) => {
                if (direction === 'up') {
                    if (copiedObject.mode === 'PM') {
                        copiedObject.hrs24 = 13;
                        copiedObject.hrs12 = 1;
                    }
                    else if (copiedObject.mode === 'AM') {
                        copiedObject.hrs24 = 1;
                        copiedObject.hrs12 = 1;
                    }
                    else {
                        copiedObject.hrs12 = 1;
                    }
                }
                else {
                    if (copiedObject.mode === 'PM') {
                        copiedObject.hrs24 = 12;
                        copiedObject.hrs12 = 12;
                    }
                    else if (copiedObject.mode === 'AM') {
                        copiedObject.hrs24 = 0;
                        copiedObject.hrs12 = 12;
                    }
                    else {
                        copiedObject.hrs12 = 12;
                    }
                }
                return copiedObject;
            },
        });
    };
    const nudgeIntegratedTimeObjectHrs = (direction, timeObject) => {
        return nudgeTimeObjectHrs({
            direction,
            timeObject,
            integration: 'integrated',
            blankCallback: (copiedObject) => {
                // If hours is blank, then it is better to increment in isolation
                return nudgeIsolatedTimeObjectHrs(direction, copiedObject);
            },
        });
    };
    const nudgeTimeObjectHrs = ({ direction, timeObject, integration, blankCallback, }) => {
        const hrsType = (integration === 'integrated' ? 'hrs24' : 'hrs12');
        const hrs = timeObject[hrsType];
        const copiedObject = Object.assign({}, timeObject);
        const isUp = direction === 'up';
        const limit = isUp ? maxAndMins[hrsType].max : maxAndMins[hrsType].min;
        const opposingLimit = isUp ? maxAndMins[hrsType].min : maxAndMins[hrsType].max;
        const modifier = isUp ? 1 : -1;
        if (typeof hrs === 'number') {
            if (hrs === limit) {
                copiedObject[hrsType] = opposingLimit;
            }
            else {
                copiedObject[hrsType] = (hrs + modifier);
            }
            return straightenTimeObject(hrsType, copiedObject);
        }
        else {
            return blankCallback(straightenTimeObject(hrsType, copiedObject));
        }
    };
    const straightenTimeObject = (basedOn, invalidTimeObj) => {
        const { hrs24, hrs12, minutes } = invalidTimeObj;
        const mode = straightenTimeObjectMode(basedOn, invalidTimeObj);
        const isAM = mode === 'AM';
        const use12hr = basedOn === 'hrs12';
        const get12hrBasedOn24hr = () => {
            const hr12 = (hrs24 !== null && hrs24 > 12 ? hrs24 - 12 : hrs24);
            if (hr12 === 0) {
                return 12;
            }
            return hr12;
        };
        const get24hrBasedOn12hr = () => {
            const hr24 = mode === null
                ? null
                : (!isAM && hrs12 !== null && hrs12 !== 12 ? hrs12 + 12 : hrs12);
            if (hr24 === null) {
                return null;
            }
            if (hr24 === 24) {
                return 0;
            }
            if (hr24 >= 12 && isAM) {
                return (hr24 - 12);
            }
            return hr24;
        };
        const newTimeObject = {
            hrs12: use12hr ? hrs12 : get12hrBasedOn24hr(),
            hrs24: use12hr ? get24hrBasedOn12hr() : hrs24,
            minutes,
            mode,
        };
        return newTimeObject;
    };
    const straightenTimeObjectMode = (basedOn, invalidTimeObj) => {
        const { hrs24, mode } = invalidTimeObj;
        if (mode === null) {
            return null;
        }
        if (basedOn === 'hrs12') {
            return mode === null ? 'AM' : mode;
        }
        if (basedOn === 'hrs24' && invalidTimeObj.hrs24 === null && mode !== null) {
            return mode;
        }
        return hrs24 && hrs24 > 11 ? 'PM' : 'AM';
    };

    const selectAll = (selector, startingElem = browserMonadsTs.document) => {
        const elements = startingElem.querySelectorAll(selector);
        return toArray(elements);
    };
    const selectSegment = ($input, segment = 'hrs12') => {
        if (!$input)
            return;
        $input.setSelectionRange(ranges[segment].start, ranges[segment].end);
    };
    const selectNextSegment = ($input) => {
        if (!$input)
            return;
        const { start, end } = getRangeOf($input).nextSegment();
        $input.setSelectionRange(start, end);
    };
    const selectPrevSegment = ($input) => {
        if (!$input)
            return;
        const { start, end } = getRangeOf($input).prevSegment();
        $input.setSelectionRange(start, end);
    };
    const selectCursorSegment = ($input) => {
        if (!$input)
            return;
        const { start, end } = getRangeOf($input).cursorSegment();
        $input.setSelectionRange(start, end);
    };

    var utils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        a11yCreate: a11yCreate,
        a11yUpdate: a11yUpdate,
        a11yClear: a11yClear,
        getA11yValue: getA11yValue,
        getA11yElement: getA11yElement,
        convertString12hr: convertString12hr,
        convertString24hr: convertString24hr,
        convertTimeObject: convertTimeObject,
        convertHours24: convertHours24,
        convertDateObject: convertDateObject,
        flash24hrTime: flash24hrTime,
        getString12hr: getString12hr,
        getString24hr: getString24hr,
        getInputValue: getInputValue,
        getLabelTextOf: getLabelTextOf,
        getCursorSegment: getCursorSegment,
        getPrevSegment: getPrevSegment,
        getNextSegment: getNextSegment,
        getRangeOf: getRangeOf,
        getAncestorsOf: getAncestorsOf,
        get isShiftHeldDown () { return isShiftHeldDown; },
        isPmHrs24: isPmHrs24,
        isPmString12hr: isPmString12hr,
        isPmString24hr: isPmString24hr,
        isPmTimeObject: isPmTimeObject,
        isAmHrs24: isAmHrs24,
        isAmString12hr: isAmString12hr,
        isAmString24hr: isAmString24hr,
        isAmTimeObject: isAmTimeObject,
        isTimeObject: isTimeObject,
        isCompleteTimeObject: isCompleteTimeObject,
        isString12hr: isString12hr,
        isString24hr: isString24hr,
        ManualEntryLog: ManualEntryLog,
        modifyString12hr: modifyString12hr,
        modifyString24hr: modifyString24hr,
        modifyTimeObject: modifyTimeObject,
        regex: regex,
        selectAll: selectAll,
        selectSegment: selectSegment,
        selectNextSegment: selectNextSegment,
        selectPrevSegment: selectPrevSegment,
        selectCursorSegment: selectCursorSegment,
        ranges: ranges,
        rangesList: rangesList,
        maxAndMins: maxAndMins,
        segments: segments,
        timeObjectKeys: timeObjectKeys,
        a11yID: a11yID,
        toArray: toArray,
        toNumber: toNumber,
        toLeadingZero: toLeadingZero,
        toLeadingZero12HrString: toLeadingZero12HrString,
        matchesTimeObject: matchesTimeObject,
        validateString12hr: validateString12hr,
        validateString24hr: validateString24hr,
        validateTimeObject: validateTimeObject,
        validateHours24: validateHours24
    });

    if (browserMonadsTs.exists(browserMonadsTs.window)) {
        browserMonadsTs.window.timeInputPolyfillUtils = utils;
    }

}));
