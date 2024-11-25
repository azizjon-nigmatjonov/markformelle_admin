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

const Hourly = (currentTime: string) => {
  return `${currentTime}`;
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
    default:
      return Hourly(currentTime);
  }
};
