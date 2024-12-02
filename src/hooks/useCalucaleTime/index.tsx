import { useSelector } from "react-redux";

export const useCalculateTime = () => {
  const currTime = useSelector((state: any) => state.globalTool.currTime);
  const GetTime = (old_time: any) => {
    if (!old_time) return "";
    const start_time: any = new Date(old_time);
    const currentTime: any = currTime ? new Date(currTime) : old_time;

    const differenceInMillis = currentTime - start_time;

    const totalMinutes = Math.floor(differenceInMillis / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const timeElapsed = `${String(hours < 0 ? -hours : hours).padStart(
      2,
      "0"
    )}:${String(minutes < 0 ? -minutes : minutes).padStart(2, "0")}`;

    return timeElapsed;
  };

  return { GetTime };
};

export const useCalculateTimePainting = () => {
  const convertTimeToMinutes = (dateString: string) => {
    const date = new Date(dateString); // Parse the date string

    const hours = date.getHours(); // Extract hours
    const minutes = date.getMinutes(); // Extract minutes
    const seconds = date.getSeconds(); // Extract seconds (if needed)

    // Convert time to total minutes (round down if seconds are included)
    const totalMinutes = Math.floor(hours * 60 + minutes + seconds / 60);

    return totalMinutes;
  };

  // Example usage

  const currTime = useSelector((state: any) => state.globalTool.currTime);
  const GetTimeMinutes = (old_time: any) => {
    if (!old_time) return "";
    let start_time: any = new Date(old_time);
    let currentTime: any = currTime ? new Date(currTime) : old_time;

    start_time = convertTimeToMinutes(start_time);
    currentTime = convertTimeToMinutes(currentTime);
    let differenceMinutes = currentTime - start_time;
    differenceMinutes =
      differenceMinutes < 0 ? -differenceMinutes : differenceMinutes;
    const hours = Math.floor(differenceMinutes / 60);
    const minutes = differenceMinutes % 60;

    const timeElapsed = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;

    return timeElapsed;
  };

  return { GetTimeMinutes };
};

export const useCalculateTimeAndDate = () => {
  const current_time = useSelector((state: any) => state.globalTool.currTime);
  const GetHourAndMinute = (started_time: any) => {
    const startDate = new Date(started_time);
    const currentDate = new Date(current_time);

    // Manually calculate differences
    const dayDifference = currentDate.getDate() - startDate.getDate();
    const hourDifference = currentDate.getHours() - startDate.getHours();
    const minuteDifference = currentDate.getMinutes() - startDate.getMinutes();

    // Add 24 hours for each day of difference
    let totalHours = dayDifference * 24 + hourDifference;

    // Handle negative minutes
    let totalMinutes = minuteDifference;
    if (totalMinutes < 0) {
      totalMinutes += 60; // Borrow an hour
      totalHours -= 1;
    }

    // Format the result as hh:mm
    const formattedDifference = `${totalHours
      .toString()
      .padStart(2, "0")}:${totalMinutes.toString().padStart(2, "0")}`;

    return formattedDifference;
  };

  return { GetHourAndMinute };
};
