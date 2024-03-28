import clo from 'clone';

/**
 * @function clone
 * @description Clone an input variable
 */
export function clone<T>(input: T): T {
    return clo(input);
}
