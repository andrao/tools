/**
 * @function timeoutPromise
 * @description async setTimeout()
 */
export function timeoutPromise(timeout_in_ms: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, timeout_in_ms);
    });
}
