import type { IQueryParams } from './types';

/**
 * @function parseQueryString
 * @description Dependency-free query parameter parsing
 */
export function parseQueryString(query_string: string): IQueryParams {
    //  Remove leading `?` & split on `?`
    const entries = query_string.replace(/^\?/, ``).split(`&`);

    /**
     * Parse entries
     */
    return entries.reduce<IQueryParams>((acc, entry) => {
        //  If no value, we set to true
        const [key, value = true] = entry.split(`=`);
        if (!key) {
            return acc;
        }

        /**
         * Decode URI components
         */
        const decoded_key = decodeURIComponent(key);
        const decoded_value = typeof value === 'string' ? decodeURIComponent(value) : value;

        /**
         * If an existing value already exists, we convert to array
         */
        const existing_value = acc[decoded_key];
        if (existing_value) {
            return {
                ...acc,
                [decoded_key]: Array.isArray(existing_value)
                    ? [...existing_value, decoded_value]
                    : [existing_value, decoded_value],
            };
        } else {
            return {
                ...acc,
                [decoded_key]: decoded_value,
            };
        }
    }, {});
}
