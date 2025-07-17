// dayjsSetup.js
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/uz'; // Import the locale you want to use

// Extend dayjs with timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Set the locale globally
dayjs.locale('uz');

// Set default timezone to Uzbekistan (Asia/Tashkent)
dayjs.tz.setDefault('Asia/Tashkent');

export default dayjs;
