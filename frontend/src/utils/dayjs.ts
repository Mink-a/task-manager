import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(customParseFormat);

export const formatDate = (date: string | Date) => dayjs(date).format('YYYY-MM-DD');

export const formatDateTime = (date: Date, format: string) => dayjs(date).format(format);

export const formatRelativeTime = (date: Date) => dayjs(date).fromNow();

export const formatTime = (time: string) => dayjs(time, 'HH:mm').format('hh:mm A');
