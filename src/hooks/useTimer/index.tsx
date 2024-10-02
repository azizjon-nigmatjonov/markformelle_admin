import { useState, useEffect } from "react";

const useTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log("seconds", seconds);

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => {
            if (prevMinutes === 59) {
              setHours((prevHours) => prevHours + 1);
              return 0; // reset minutes to 0 when it reaches 60
            }
            return prevMinutes + 1;
          });
          return 0; // reset seconds to 0 when it reaches 60
        }
        return prevSeconds + 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  // Format the time display
  const formatTime = (unit: any) => (unit < 10 ? `0${unit}` : unit);
  const timerFN = () => {
    return (
      <div>
        <h1>
          {formatTime(hours)}:{formatTime(minutes)}
        </h1>
      </div>
    );
  };

  return { timerFN };
};

export default useTimer;
