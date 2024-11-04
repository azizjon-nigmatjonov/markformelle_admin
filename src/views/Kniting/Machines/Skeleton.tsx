import { OneSkeleton } from "../../../components/CElements/CSkeleton/OneSkeleton";
import useDeviceHeight from "../../../hooks/useDeviceHeight";

interface Props {
  openHeader: boolean;
}

export const MachinSkeletons = ({ openHeader }: Props) => {
  const { getHeight } = useDeviceHeight();
  const elements = Array.from({ length: 77 });
  return (
    <div
      className="p-3 grid grid-cols-11 gap-[3px] small_desktop:gap-2"
      style={{
        minWidth:
          window?.screen?.width < 940 ? "1600px" : window?.screen?.width - 200,
      }}
    >
      {elements.map((_, index) => (
        <OneSkeleton
          key={index}
          height={getHeight({
            count: 7,
            type: "machine",
            minus:
              window.screen.width < 980
                ? openHeader
                  ? 16
                  : 8.5
                : openHeader
                ? 34
                : 27,
          })}
        />
      ))}
    </div>
  );
};
