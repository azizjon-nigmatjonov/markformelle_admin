import { OneSkeleton } from "../../../../components/CElements/CSkeleton/OneSkeleton";
import useDeviceHeight from "../../../../hooks/useDeviceHeight";

interface Props {
  openHeader: boolean;
}

export const ProcessSkeleton = ({ openHeader }: Props) => {
  const { getHeight } = useDeviceHeight();
  return (
    <div className="flex gap-x-3 py-3">
      <div className="w-[48%]">
        <OneSkeleton
          height={getHeight({
            count: 1,
            type: "machine",
            minus:
              window.screen.width < 980
                ? openHeader
                  ? 80
                  : 30
                : openHeader
                ? 210
                : 160,
          })}
        />
      </div>
      <div className="w-[52%]">
        <OneSkeleton
          height={getHeight({
            count: 1,
            type: "machine",
            minus:
              window.screen.width < 980
                ? openHeader
                  ? 80
                  : 30
                : openHeader
                ? 210
                : 160,
          })}
        />
      </div>
    </div>
  );
};
