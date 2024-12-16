import { useSelector } from "react-redux";

export const useTimeDifference = () => {
  const GetTimeDifference = (old_time: any, currTime: any) => {
    if (!old_time) return "";
    const start_time: any = new Date(old_time);
    const currentTime: any = currTime ? new Date(currTime) : old_time;

    const differenceInMillis = currentTime - start_time;

    const totalMinutes: number = Math.floor(differenceInMillis / (1000 * 60));

    return totalMinutes;
  };

  return { GetTimeDifference };
};

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
    const date = new Date(dateString);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const totalMinutes = Math.floor(hours * 60 + minutes + seconds / 60);

    return totalMinutes;
  };

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
  const GetHourAndMinute = (started_time: string, type?: string) => {
    // Parse the start and current times as Date objects
    const startDate = new Date(started_time);
    const currentDate = new Date(current_time);

    // Calculate the total difference in milliseconds
    const diffInMilliseconds = currentDate.getTime() - startDate.getTime();

    // Convert the difference to days, hours, and minutes
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let diffInMinutes = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );
    if (diffInMinutes < 0) diffInMinutes = -diffInMinutes;

    // Adjust for the "type" argument if needed
    if (type === "day") {
      return `${diffInDays > 0 ? `${diffInDays} ` : ""}${diffInHours
        .toString()
        .padStart(2, "0")}:${diffInMinutes.toString().padStart(2, "0")}`;
    }

    // Format the difference as hh:mm
    let totalHours = diffInDays * 24 + diffInHours;
    if (totalHours < 0) totalHours = -totalHours;
    return `${totalHours.toString().padStart(2, "0")}:${diffInMinutes
      .toString()
      .padStart(2, "0")}`;
  };

  return { GetHourAndMinute };
};
