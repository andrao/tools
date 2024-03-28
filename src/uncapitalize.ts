/**
 * @interface UncapitalizePhrase
 * @description Capitalize a phrase according to a given format
 */
type UncapitalizePhrase<T extends string> = Uncapitalize<T>;

/**
 * @function uncapitalize
 * @description Uncapitalize an input variable
 */
export function uncapitalize<T extends string>(input: T): UncapitalizePhrase<T> {
    return (input.charAt(0).toLowerCase() + input.slice(1)) as UncapitalizePhrase<T>;
}
