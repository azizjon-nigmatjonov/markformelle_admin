export const useCalculateTime = () => {
  const GetTime = (old_time: string) => {
    const targetTimeZone = "Asia/Tashkent";

    const options: any = {
      timeZone: targetTimeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    // Format the start time (old_time) to Uzbekistan time
    const startTime = new Date(old_time);
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedStartTime = formatter.format(startTime); // Uzbekistan time

    // Get the current time in Uzbekistan's time zone
    const currentTime = new Date();
    const formattedCurrentTime = formatter.format(currentTime); // Uzbekistan time

    // Convert the formatted time strings back to Date objects
    const uzbekistanStartTime = new Date(formattedStartTime);
    const uzbekistanCurrentTime = new Date(formattedCurrentTime);

    // Calculate the time difference
    const timeDifference =
      uzbekistanCurrentTime.getTime() - uzbekistanStartTime.getTime();
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    // Format the time difference
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    const timeAgo = `${formattedHours}:${formattedMinutes}`;

    return timeAgo;
  };

  return { GetTime };
};
