import { memo, useMemo } from "react";
import "./style.scss";
import { OneSkeleton } from "../../../CSkeleton/OneSkeleton";

interface Props {
  isVisible: boolean;
  rowsCount: number;
}

const TableLoader = ({ isVisible = false, rowsCount = 12 }: Props) => {
  const rows = useMemo(() => {
    return new Array(rowsCount - 1).fill(0);
  }, [rowsCount]);

  if (!isVisible) return null;

  return (
    <div className="ctableLoader">
      <div className="wrapper flex flex-col space-y-[-10px]">
        {rows?.map((i, index) => (
          <div key={i + index} className="row">
            <OneSkeleton height={20} />
            {/* <Skeleton
              style={{
                height: "100%",
                borderRadius: "8px",
                background: "var(--primary50)",
              }}
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(TableLoader);
