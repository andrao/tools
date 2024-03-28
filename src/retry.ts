/**
 * @const TIMEOUT_ERROR_MESSAGE
 * @description Error message to throw on timeout
 */
export const TIMEOUT_ERROR_MESSAGE = `retry() callback did not resolve within timeout`;

/**
 * @function retry
 * @description Run a callback with retry params
 */
export async function retry<T>(
    cb: () => Promise<T>,
    options: {
        max_attempts: number;
        src: string;
        isRetryable?: (args: { error: unknown; attempt: number }) => boolean;
        timeout?: number;
    },
    attempt = 1,
): Promise<T> {
    const { max_attempts, src, isRetryable } = options;

    try {
        return await new Promise((resolve, reject) => {
            let is_done = false;

            const timeout = options.timeout
                ? setTimeout(() => {
                      is_done = true;
                      reject(new Error(TIMEOUT_ERROR_MESSAGE));
                  }, options.timeout)
                : null;

            cb()
                .then(res => {
                    if (is_done) return;
                    if (timeout) clearTimeout(timeout);
                    is_done = true;
                    resolve(res);
                })
                .catch(error => {
                    if (is_done) return;
                    if (timeout) clearTimeout(timeout);
                    is_done = true;
                    reject(error as Error);
                });
        });
    } catch (err) {
        const error = err as Error;

        const do_retry =
            error.message === TIMEOUT_ERROR_MESSAGE ||
            (isRetryable ? isRetryable({ error, attempt }) : true);

        if (do_retry && attempt < max_attempts) {
            console.warn(`[ retrying ${src} ${attempt + 1} / ${max_attempts} ]`, err);

            return await retry(cb, options, attempt + 1);
        }

        throw err;
    }
}
