/**
 * @function safe
 * @description Variable wrap when you _know_ it's defined
 */
export function safe<T>(input: T | undefined): Exclude<T, undefined> {
    if (input === undefined) {
        throw new Error(`safe(): input is undefined`);
    }

    return input as Exclude<T, undefined>;
}

/**
 * @function safeFilter
 * @description Filter out null and undefined values from array
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function safeFilter<T extends Array<any>>(
    input: T,
): Array<Exclude<T[number], null | undefined>> {
    return input.filter(i => i !== null && i !== undefined) as Array<
        Exclude<T[number], null | undefined>
    >;
}
