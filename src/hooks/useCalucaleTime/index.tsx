export const useCalucaleTime = () => {
  const GetTime: any = (old_time: string) => {
    const startTime: any = new Date(old_time);
    const currentTime: any = new Date();
    const timeDifference = currentTime - startTime;
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    const timeAgo = `${formattedHours}:${formattedMinutes}`;

    return timeAgo;
  };
  return { GetTime };
};
