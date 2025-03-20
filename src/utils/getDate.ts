import dayjs from "dayjs";

const addZero = (num: number) => {
  return num < 10 ? num.toString().padStart(2, "0") : num;
};

const GetTime = (timestamp: string) => {
  const date = new Date(timestamp);

  // Extract hours and minutes
  const hours = String(date.getHours()).padStart(2, "0"); // Ensure two digits
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Format as hh:mm
  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
};

const Usually = (
  currentYear: number,
  currentMonth: number,
  currentDay: number,
  currentTime: string,
  symbol = "."
) => {
  return `${addZero(currentDay)}${symbol}${addZero(
    currentMonth
  )}${symbol}${addZero(currentYear)} ${currentTime === '00:00' ? '' : currentTime}`;
};

const GetDates = (
  currentYear: number,
  currentMonth: number,
  currentDay: number,
  symbol = "."
) => {
  return `${addZero(currentDay)}${symbol}${addZero(
    currentMonth
  )}${symbol}${addZero(currentYear)}`;
};

const Hourly = (currentTime: string) => {
  return `${currentTime}`;
};

const GetTimeString = (dateStart: string) => {
  // Convert to Date object
  const [day, month, year, time] = dateStart.split(/[\s.]/);
  const date = new Date(`${day}-${month}-${year}T${time}`);

  // Extract hh:mm
  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return formattedTime;
};

export const GetCurrentDate = ({
  date,
  type,
  symbol,
}: {
  date?: any;
  type?: string;
  symbol?: any;
}) => {
  if (!date) return "";

  if (typeof date === 'string') {
    if (!date.includes('T') || !date.includes('-') || !date?.includes(':')) {
      return date
    }
  } else {
    return date
  }

  

  const currentDate = date ? dayjs(date) : dayjs();
  const currentYear = currentDate.year();
  const currentMonth = currentDate.month() + 1;
  const currentDay = currentDate.date();
  const currentTime = currentDate.format("HH:mm");

  switch (type) {
    case "string":
      return GetTimeString(date);
    case "usually":
      return Usually(
        currentYear,
        currentMonth,
        currentDay,
        currentTime,
        symbol
      );
    case "time":
      return GetTime(date);
    case "date":
      return GetDates(currentYear, currentMonth, currentDay, symbol);
    default:
      return Hourly(currentTime);
  }
};


export const  convertToISO = (dateString: string) => {
  const [day, month, year] = dateString.split(".");

  const isoDate = new Date(`${year}-${month}-${day}T00:00:00Z`);

  return isoDate.toISOString();
}