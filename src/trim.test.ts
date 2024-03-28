import { describe, expect, it } from '@jest/globals';
import { trim } from './trim';

/**
 * Tests
 */
describe(trim.name, () => {
    it(`trims an input string`, () => {
        expect(
            trim(`
        This string is
        a bit long and unwieldy.
        
        I think it could use some trimming.`),
        ).toBe(`This string is a bit long and unwieldy.\n\nI think it could use some trimming.`);
    });

    it(`maintains list format`, () => {
        expect(
            trim(`
        This string is
        a bit long and - unwieldy.
        - This is a bullet point
        - This is another
        1. Me too`),
        ).toBe(
            `This string is a bit long and - unwieldy.\n- This is a bullet point\n- This is another\n1. Me too`,
        );
    });
});
