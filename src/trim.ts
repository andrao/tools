/**
 * @const SPLITTER
 * @description High-entropy string used to split and rejoin text
 */
const SPLITTER = Math.random().toString();

/**
 * @const LIST_STRING_START
 * @description Regular expression to match the start of a list string
 */
const LIST_STRING_START = /^(-|\d+(\.|\)))/;

/**
 * @function trim
 * @description Trims lone, multi-line text strings into a condensed form that maintains double line breaks
 */
export function trim(input: string): string {
    return (
        input
            .split('\n')
            .map(s => s.trim())
            // Prune leading empty line
            .filter((s, i) => (i === 0 && !s ? false : true))
            // Maintain double line breaks
            .join(SPLITTER)
            .split(`${SPLITTER}${SPLITTER}`)
            .join('\n\n')
            .split(SPLITTER)
            // Maintain bullet format, numbered list
            .map(s => (LIST_STRING_START.test(s) ? `${SPLITTER}${s}` : s))
            .join(' ')
            .split(SPLITTER)
            .map(s => s.trim())
            // Prune leading empty line
            .filter((s, i) => (i === 0 && !s ? false : true))
            .join('\n')
    );
}
