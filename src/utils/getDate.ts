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
  return `${currentYear}${symbol}${addZero(currentMonth)}${symbol}${addZero(
    currentDay
  )} ${currentTime}`;
};

const GetDates = (
  currentYear: number,
  currentMonth: number,
  currentDay: number,
  symbol = "."
) => {
  return `${currentDay}${symbol}${addZero(currentMonth)}${symbol}${addZero(
    currentYear
  )}`;
};

const Hourly = (currentTime: string) => {
  return `${currentTime}`;
};

const GetTimeString = (dateStart: string) => {
  // Convert to Date object
  const [day, month, year, time] = dateStart.split(/[\s.]/);
  const date = new Date(`${year}-${month}-${day}T${time}`);

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
