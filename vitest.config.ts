// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config';

/**
 * @const IS_INTEGRATION
 * @description Whether to run integration tests
 */
const IS_INTEGRATION = Boolean(process.env.RUN_JEST_INTEGRATION_TESTS);

/**
 * @const IGNORE_PATTERNS
 * @description Patterns to ignore in tests
 * - If _not_ integration, ignore integration test folder
 */
const IGNORE_PATTERNS = ['node_modules', ...(IS_INTEGRATION ? [] : ['__integration_tests__'])];

/**
 * Jest config
 * @type {import("jest").Config}
 */
export default defineConfig({
    test: {
        clearMocks: true,
        exclude: IGNORE_PATTERNS,
        passWithNoTests: true,
    },
});
