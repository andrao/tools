import type { IQueryParams } from './types';

/**
 * @function stringifyQueryParams
 * @description Dependency-free query parameter stringification
 * @note This does NOT append the `?` prefix
 */
export function stringifyQueryParams(params: IQueryParams): string {
    return (
        Object.entries(params)
            //  Sort alphabetical
            .sort((a, b) => a[0].localeCompare(b[0]))
            .reduce((acc, [k, value], index) => {
                const prefix = index === 0 ? '' : '&';

                const key = encodeURIComponent(k);

                const values = Array.isArray(value) ? value : [value];
                const value_string = values.map(v => encodeURIComponent(v)).join(',');

                return `${acc}${prefix}${key}=${value_string}`;
            }, ``)
    );
}

/**
 * @function appendStringifiedQueryParams
 * @description Appends stringified query parameters to a URL with appropriate joiner
 */
export function appendStringifiedQueryParams({
    url,
    params,
}: {
    url: string;
    params: IQueryParams | undefined;
}): string {
    if (!params) {
        return url;
    }

    const param_string = stringifyQueryParams(params);
    const prefix = url.includes(`?`) ? `&` : `?`;

    return `${url}${prefix}${param_string}`;
}
