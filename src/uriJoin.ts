/**
 * @function uriJoin
 * @description path.join() that doesn't remove in-item double slashes (e.g. with URIs)
 */
export function uriJoin(...paths: Array<string>): string {
    return paths
        .map(p =>
            p
                // Leading slashes
                .replace(/^\/+/, '')
                // Trailing slashes
                .replace(/\/+$/, ''),
        )
        .join('/');
}
