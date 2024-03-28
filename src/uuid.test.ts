import { expect } from '@jest/globals';
import { uuid } from './uuid';

/**
 * Tests
 */
describe(uuid.name, () => {
    it(`generates a uuid`, () => {
        expect(uuid()).toMatch(
            /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        );
    });
});
