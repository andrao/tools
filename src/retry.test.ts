import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { retry, TIMEOUT_ERROR_MESSAGE } from './retry';
import { timeoutPromise } from './timeoutPromise';

/**
 * Mocks, globals
 */
const MOCK_FN = vi.fn(() => Promise.resolve('resolved'));

/**
 * Setup
 */
beforeAll(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
});

/**
 * Tests
 */
describe(retry.name, () => {
    describe(`when max_attempts is 3`, () => {
        const max_attempts = 3;
        const src = 'test';

        describe(`and the callback resolves the first time`, () => {
            beforeEach(() => {
                MOCK_FN.mockResolvedValueOnce('resolved');
            });

            it(`resolves after 1 try`, async () => {
                await expect(retry(() => MOCK_FN(), { max_attempts, src })).resolves.toEqual(
                    'resolved',
                );

                expect(MOCK_FN).toHaveBeenCalledTimes(1);
            });
        });

        describe(`and the callback resolves the second time`, () => {
            beforeEach(() => {
                MOCK_FN.mockRejectedValueOnce('rejected').mockResolvedValueOnce('resolved');
            });

            it(`resolves after 2 tries`, async () => {
                await expect(retry(() => MOCK_FN(), { max_attempts, src })).resolves.toEqual(
                    'resolved',
                );

                expect(MOCK_FN).toHaveBeenCalledTimes(2);
            });
        });

        describe(`and the callback resolves the third time`, () => {
            beforeEach(() => {
                MOCK_FN.mockRejectedValueOnce('rejected')
                    .mockRejectedValueOnce('rejected')
                    .mockResolvedValueOnce('resolved');
            });

            it(`resolves after 3 tries`, async () => {
                await expect(retry(() => MOCK_FN(), { max_attempts, src })).resolves.toEqual(
                    'resolved',
                );

                expect(MOCK_FN).toHaveBeenCalledTimes(3);
            });
        });

        describe(`and the callback resolves the fourth time`, () => {
            beforeEach(() => {
                MOCK_FN.mockRejectedValueOnce('rejected')
                    .mockRejectedValueOnce('rejected')
                    .mockRejectedValueOnce('rejected');
            });

            it(`rejects after 3 tries`, async () => {
                await expect(retry(() => MOCK_FN(), { max_attempts, src })).rejects.toEqual(
                    'rejected',
                );

                expect(MOCK_FN).toHaveBeenCalledTimes(3);
            });

            describe(`and isRetryable is set`, () => {
                describe(`and it returns true`, () => {
                    function isRetryable() {
                        return true;
                    }

                    it(`rejects after 3 tries`, async () => {
                        await expect(
                            retry(() => MOCK_FN(), { isRetryable, max_attempts, src }),
                        ).rejects.toEqual('rejected');

                        expect(MOCK_FN).toHaveBeenCalledTimes(3);
                    });
                });

                describe(`and it returns false`, () => {
                    function isRetryable() {
                        return false;
                    }

                    it(`rejects after 1 try`, async () => {
                        await expect(
                            retry(() => MOCK_FN(), { isRetryable, max_attempts, src }),
                        ).rejects.toEqual('rejected');

                        expect(MOCK_FN).toHaveBeenCalledTimes(1);
                    });
                });
            });
        });
    });

    describe(`when timeout is set`, () => {
        const max_attempts = 1;
        const src = 'test';
        const timeout = 100;

        beforeAll(() => {
            MOCK_FN.mockReset();
        });

        describe(`and the callback resolves within the timeout`, () => {
            beforeEach(() => {
                MOCK_FN.mockImplementationOnce(async () => {
                    await timeoutPromise(timeout / 2);
                    return 'resolved';
                });
            });

            it(`resolves after 1 try`, async () => {
                await expect(
                    retry(() => MOCK_FN(), { max_attempts, src, timeout }),
                ).resolves.toEqual('resolved');

                expect(MOCK_FN).toHaveBeenCalledTimes(1);
            });
        });

        describe(`and the callback resolves after the timeout`, () => {
            beforeEach(() => {
                MOCK_FN.mockImplementationOnce(async () => {
                    await timeoutPromise(timeout * 2);
                    return 'resolved';
                });
            });

            it(`throws a timeout error`, async () => {
                await expect(
                    retry(() => MOCK_FN(), { max_attempts, src, timeout }),
                ).rejects.toThrow(TIMEOUT_ERROR_MESSAGE);

                expect(MOCK_FN).toHaveBeenCalledTimes(1);
            });
        });
    });
});
