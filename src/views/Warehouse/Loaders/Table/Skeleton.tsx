import { OneSkeleton } from "../../../../components/CElements/CSkeleton/OneSkeleton";
import useDeviceHeight from "../../../../hooks/useDeviceHeight";

interface Props {
  openHeader: boolean;
}

export const WarehouseSkeleton = ({ openHeader }: Props) => {
  const { getHeight } = useDeviceHeight();
  return (
    <div className="grid grid-cols-2 gap-x-2 p-3">
      <div className="grid grid-cols-3 gap-x-2">
        <OneSkeleton
          height={getHeight({
            count: 1,
            type: "machine",
            minus:
              window.screen.width < 1000
                ? openHeader
                  ? 55
                  : 15
                : openHeader
                ? 190
                : 145,
          })}
        />
        <OneSkeleton
          height={getHeight({
            count: 1,
            type: "machine",
            minus:
              window.screen.width < 980
                ? openHeader
                  ? 75
                  : 25
                : openHeader
                ? 200
                : 145,
          })}
        />
        <OneSkeleton
          height={getHeight({
            count: 1,
            type: "machine",
            minus:
              window.screen.width < 980
                ? openHeader
                  ? 75
                  : 25
                : openHeader
                ? 200
                : 145,
          })}
        />
      </div>
      <div className="grid grid-cols-1 gap-y-2">
        <OneSkeleton
          height={getHeight({
            count: 2,
            type: "machine",
            minus:
              window.screen.width < 1000
                ? openHeader
                  ? 30
                  : 14
                : openHeader
                ? 101
                : 80,
          })}
        />
        <OneSkeleton
          height={getHeight({
            count: 2,
            type: "machine",
            minus:
              window.screen.width < 1000
                ? openHeader
                  ? 30
                  : 14
                : openHeader
                ? 101
                : 80,
          })}
        />
      </div>
    </div>
  );
};
