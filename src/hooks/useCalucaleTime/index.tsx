export const useCalucaleTime = () => {
  const GetTime: any = (old_time: string) => {
    const startTime: any = new Date(old_time);

    // Get the current time
    const currentTime: any = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentTime - startTime;

    // Convert the difference to hours, minutes, and seconds
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    // const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Format the result as h:m:s
    const timeAgo = `${hours}:${minutes}`;

    return timeAgo;
  };

  return { GetTime };
};
