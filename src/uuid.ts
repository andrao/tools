/**
 * @function uuid
 * @description Generate a v4 UUID
 */
export function uuid(): string {
    return crypto.randomUUID();
}
