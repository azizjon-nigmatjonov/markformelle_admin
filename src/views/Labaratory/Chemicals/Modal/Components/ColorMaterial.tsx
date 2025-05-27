import { PantoneColors } from "../../../../../constants/pantone";

export const ColorMaterial = ({
  PANTONEKODU = "",
}: {
  PANTONEKODU: string;
}) => {
  if (!PantoneColors?.[PANTONEKODU?.substring(4, 11)]?.name) return <div></div>;
  return (
    <div className="relative mr-2 flexs items-center">
      <div
        className="absolute top-[-15px] h-[10px] w-full z-[3] left-1/2 -translate-x-1/2"
        style={{
          boxShadow: `
    inset 0 8px 8px -8px rgba(0,0,0,0.3),
    inset 0 -20px 20px -8px rgba(1,1,1,0.001),
    inset 0 20px 20px -8px rgba(1,1,1,0.001)
  `,
          width: "99%",
        }}
      ></div>
      <div
        className="absolute bottom-[-18px] h-[10px] w-full z-[3] left-1/2 -translate-x-1/2"
        style={{
          boxShadow: `
  inset 0 -8px 8px -8px rgba(0,0,0,0.3),
  inset -40px -8px 40px -20px rgba(1,1,1,0.001),
  inset 40px -8px 40px -20px rgba(1,1,1,0.001)
`,
          width: "99%",
        }}
      ></div>

      <div className="absolute right-[0px] top-[-15px] h-[63px] w-full flex items-center justify-center overflow-hidden">
        <div
          className="absolute left0 top-0 h-full z-[2] flex items-center justify-center"
          style={{
            width: "calc(100% - 8px)",
            backgroundColor:
              "#" + PantoneColors?.[PANTONEKODU?.substring(4, 11)]?.hex,
          }}
        >
          <p className="text-2xl text-white">
            {PantoneColors?.[PANTONEKODU?.substring(4, 11)]?.name}
          </p>
        </div>

        <div className="flex justify-between w-full px-2 mt-[-5px]">
          <div>
            {Array.from(new Array(Math.floor(200 / 12))).map((ind: any) => (
              <div
                key={ind}
                className="w-[8px] h-[8px] ml-[-5px] rotate-[45deg]"
                style={{
                  backgroundColor:
                    "#" + PantoneColors?.[PANTONEKODU?.substring(4, 11)]?.hex,
                }}
              ></div>
            ))}
          </div>
          <div>
            {Array.from(new Array(Math.floor(200 / 12))).map((ind: any) => (
              <div
                key={ind}
                className="w-[8px] h-[8px] mr-[-5px] rotate-[45deg]"
                style={{
                  backgroundColor:
                    "#" + PantoneColors?.[PANTONEKODU?.substring(4, 11)]?.hex,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
