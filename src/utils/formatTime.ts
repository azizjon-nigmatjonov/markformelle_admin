import { format } from "date-fns";

const convertSeconds = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours} soat${hours > 1 ? "s" : ""} ${minutes} minut`;
  } else {
    return `${minutes} minut`;
  }
};

const FormatTimeHour = (time: string) => {
  const date = new Date(time);

  // Format using Date methods
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return formattedTime;
};

export const FormatTime = (time: any, type?: string) => {
  switch (type) {
    case "hour":
      return FormatTimeHour(time);
    case "time":
      return time;
    case "secunds":
      return convertSeconds(time);
    default:
      return time;
  }
};
``
export const FormatCalendar = (time: any) => {
  const dateFormat = "dd.MM.yyyy";

  return format(time, dateFormat);
};

export const GetGoursFromMinutes = (totalMinutes = 0) => {
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  // Format based on whether there are days
  const formattedTime =
    days > 0
      ? `${days} день, ${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`
      : `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;

  return formattedTime;
};
