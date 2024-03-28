import { timeoutPromise } from './timeoutPromise';

/**
 * @function asyncInterval
 * @description Repeat async function on interval until condition satisfied
 */
export async function asyncInterval(
    fcn: () => Promise<boolean>,
    {
        interval_in_ms,
        max_time_in_ms,
    }: {
        interval_in_ms: number;
        max_time_in_ms: number;
    },
): Promise<void> {
    const start_time = Date.now();

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-condition
    while (true) {
        const result = await fcn();

        // If condition satisfied, quit
        if (result) break;

        // Wait for interval time
        if (interval_in_ms) await timeoutPromise(interval_in_ms);

        // Throw error if max_time elapsed
        if (Date.now() - start_time > max_time_in_ms)
            throw new Error('asyncInterval: max_time_in_ms elapsed');
    }
}
