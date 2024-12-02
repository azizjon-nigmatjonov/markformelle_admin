import { useSelector } from "react-redux";
import { OneSkeleton } from "../../../../components/CElements/CSkeleton/OneSkeleton";
import useDeviceHeight from "../../../../hooks/useDeviceHeight";

export const SkeletonUI = () => {
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  const { getHeight } = useDeviceHeight();
  return (
    <div className="flex gap-x-3 py-3">
      <OneSkeleton
        height={getHeight({
          count: 1,
          type: "machine",
          minus:
            window?.screen?.width < 980
              ? openHeader
                ? 80
                : 30
              : openHeader
              ? 210
              : 160,
        })}
      />
    </div>
  );
};
