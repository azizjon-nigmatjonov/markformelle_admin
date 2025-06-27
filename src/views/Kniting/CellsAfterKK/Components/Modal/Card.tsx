import { useEffect, useRef, useState } from "react";

interface Props {
  bgColor?: string;
}

export const ZigzagCard = ({ bgColor }: Props) => {
  const wrapperRef: any = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (wrapperRef.current) {
      // Use requestAnimationFrame to defer the measurement and avoid forced reflow
      requestAnimationFrame(() => {
        if (wrapperRef.current) {
          setHeight(wrapperRef.current.clientHeight);
        }
      });
    }
  }, []);
  return (
    <div
      ref={wrapperRef}
      className="w-full h-full relative shadow-lg"
      style={{
        height: "calc(100% - 113px)",
        width: "calc(100% - 50px)",
      }}
    >
      <div
        className="absolute left-0 top-0 w-full h-full z-[2]"
        style={{ backgroundColor: bgColor }}
      ></div>
      <div className="flex justify-between">
        <div>
          {height &&
            Array.from(new Array(Math.floor(height / 20))).map((ind: any) => (
              <div
                key={ind}
                className="w-[20px] h-[20px] ml-[-5px] rotate-[45deg] shadow-md"
                style={{ backgroundColor: bgColor }}
              ></div>
            ))}
        </div>
        <div>
          {height &&
            Array.from(new Array(Math.floor(height / 20))).map((ind: any) => (
              <div
                key={ind}
                className="w-[20px] h-[20px] mr-[-5px] rotate-[45deg] shadow-2xl"
                style={{ backgroundColor: bgColor }}
              ></div>
            ))}
        </div>
      </div>
      {/* <div
        className="top absolute top-[-5px] left-[-20px] w-full h-[10px] bg-white"
        style={{
          width: "calc(100% + 40px)",
        }}
      ></div> */}
      {/* <div
        className="bottom absolute bottom-[-5px] left-[-20px] w-full h-[13px] bg-white z-[3]"
        style={{
          width: "calc(100% + 40px)",
        }}
      ></div> */}
    </div>
  );
};
