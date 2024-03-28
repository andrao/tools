/**
 * @const DO_NOT_CAPITALIZE
 * @description Words not to capitalize, unless they are the first in the input
 */
const DO_NOT_CAPITALIZE = [`of`, `a`, `an`, `to`, `from`] as const;

/**
 * @interface TCapitalizationFormat
 * @description Different capitalization formats
 */
export type TCapitalizationFormat = 'first-word' | 'title';

/**
 * @interface CapitalizePhrase
 * @description Capitalize a phrase according to a given format
 */
type CapitalizePhrase<T extends string, S extends TCapitalizationFormat> = S extends 'first-word'
    ? Capitalize<T>
    : CapitalizationIteration<T, true>;

/**
 * @interface CapitalizationIteration
 * @description Iterate through words in a phrase, and conditionally capitalize each
 * - Always calls `Capitalize` if dealing with first word; otherwise uses `ConditionalCapitalize`
 */
type CapitalizationIteration<
    T extends string,
    FirstWord extends boolean,
> = T extends `${infer A} ${infer B}` // If word has a space
    ? FirstWord extends true // and we're dealing with the first word
        ? `${Capitalize<A>} ${CapitalizationIteration<B, false>}`
        : `${ConditionalCapitalize<A>} ${CapitalizationIteration<B, false>}`
    : FirstWord extends true // Else if we're dealing with the first word
      ? Capitalize<T>
      : ConditionalCapitalize<T>;

/**
 * @interface ConditionalCapitalize
 * @description Capitalize a word, unless it's in @const DO_NOT_CAPITALIZE
 */
type ConditionalCapitalize<T extends string> = T extends (typeof DO_NOT_CAPITALIZE)[number]
    ? T
    : Capitalize<T>;

/**
 * @function capitalize
 * @description Capitalize an input variable
 */
export function capitalize<T extends string, S extends TCapitalizationFormat>(
    input: T,
    input_style?: S,
): CapitalizePhrase<T, S> {
    const style = input_style || 'first-word';

    return input
        .split(' ')
        .map((word, index) =>
            index > 0 && style === 'first-word' ? word : conditionallyCapitalize(word),
        )
        .join(' ') as CapitalizePhrase<T, S>;
}

/**
 * @function capitalizeWord
 * @description Conditionally capitalize a word
 */
function conditionallyCapitalize(word: string): string {
    return DO_NOT_CAPITALIZE.includes(word as (typeof DO_NOT_CAPITALIZE)[number])
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1);
}
