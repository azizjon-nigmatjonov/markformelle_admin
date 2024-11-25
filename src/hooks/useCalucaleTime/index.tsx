export const useCalculateTime = () => {
  const GetTime = (old_time: any, currTime: string) => {
    if (!old_time) return "";
    const start_time: any = new Date(old_time);
    const currentTime: any = currTime ? new Date(currTime) : new Date();

    const differenceInMillis = currentTime - start_time;

    const totalMinutes = Math.floor(differenceInMillis / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const timeElapsed = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;

    return timeElapsed;
  };

  return { GetTime };
};
