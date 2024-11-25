// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useCalculateTime } from "../../../hooks/useCalucaleTime";
import { PaintPotCard } from "./Card";
import axios from "axios";
// import useDeviceHeight from "../../../hooks/useDeviceHeight";

interface Props {
  data: any;
}

export const PaintList = ({ data = [] }: Props) => {
  const { GetTime } = useCalculateTime();
  const [currTime, setCurrentTime]: any = useState("");
  useEffect(() => {
    axios
      .get("https://timeapi.io/api/time/current/zone?timeZone=Asia%2FTashkent")
      .then((res) => {
        setCurrentTime(res?.data?.dateTime);
      });
  }, []);

  return (
    <div className="p-2">
      <div
        className="grid grid-cols-6 grid-rows-6 gap-2"
        style={{
          minWidth:
            window?.screen?.width < 940
              ? "1600px"
              : window?.screen?.width - 200,
          // height: getHeight({
          //   count: 1,
          //   type: "machine",
          //   minus:
          //     window?.screen?.width < 1000
          //       ? openHeader
          //         ? 50
          //         : 18
          //       : openHeader
          //       ? 185
          //       : 140,
          // }),
        }}
      >
        {data?.map((item: any, index: number) => (
          <PaintPotCard
            key={index}
            element={item ?? {}}
            GetTime={GetTime}
            currTime={currTime}
          />
        ))}
      </div>
    </div>
  );
};
