import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

/**
 * @function timeAgo
 * @description Return the relative time difference between now and the given date
 */
export function timeAgo({ date, locale = 'en' }: { date: Date; locale?: 'en' }) {
    const ago = new TimeAgo(locale);

    return ago.format(date);
}
