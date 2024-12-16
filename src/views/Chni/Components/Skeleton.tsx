import { OneSkeleton } from "../../../components/CElements/CSkeleton/OneSkeleton";
import useDeviceHeight from "../../../hooks/useDeviceHeight";

interface Props {
  openHeader: boolean;
}

export const Skeletons = ({ openHeader }: Props) => {
  const { getHeight } = useDeviceHeight();
  const elements = Array.from({ length: 30 });
  return (
    <div
      className="p-3 grid grid-cols-6 gap-[3px] small_desktop:gap-2"
      style={{
        minWidth:
          window?.screen?.width < 940 ? "1600px" : window?.screen?.width - 200,
      }}
    >
      {elements.map((_, index) => (
        <OneSkeleton
          key={index}
          height={getHeight({
            count: 6,
            type: "machine",
            minus:
              window?.screen?.width < 1000
                ? openHeader
                  ? 13.5
                  : 8.5
                : openHeader
                ? 33
                : 27,
          })}
        />
      ))}
    </div>
  );
};

export const SkeletonTable = ({ openHeader }: Props) => {
  const { getHeight } = useDeviceHeight();
  return (
    <div className="p-2">
      <OneSkeleton
        height={getHeight({
          count: 1,
          type: "machine",
          minus:
            window?.screen?.width < 980
              ? openHeader
                ? 70
                : 20
              : openHeader
              ? 200
              : 150,
        })}
      />
    </div>
  );
};
