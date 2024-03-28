/**
 * @function isError
 * @description Assert that variable is an Error instance
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isError(input: any): input is Error {
    return input instanceof Error;
}
