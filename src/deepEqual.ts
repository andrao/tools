import equal from 'fast-deep-equal/react';

/**
 * @function deepEqual
 * @description Evaluate if two objects equal all the way down
 */
export function deepEqual<T>(...args: [T, T]): boolean {
    return equal(...args);
}
