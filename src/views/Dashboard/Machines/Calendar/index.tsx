import { useMemo } from "react";
import CalendarUI from "./UI";
import { GetMonth } from "../../../../utils/getMonth";

const Calendar = () => {
  const month: any = GetMonth();

  const calendarData: any = useMemo(() => {
    return [
      {
        day: "2024-08-01",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-02",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-03",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-04",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-04",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-06",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-07",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-08",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-09",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-10",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-11",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-12",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-13",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-14",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-15",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-16",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-17",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-18",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-19",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
      {
        day: "2024-08-20",
        bookings_count: 0,
        driver_count: 1,
        passenger_count: 20,
        trip_count: 11,
      },
    ];
  }, []);

  return (
    <>
      <CalendarUI list={calendarData} month={month} loading={false} />
    </>
  );
};

export default Calendar;
