import { memo } from "react";
import StatisticsCard from "../Statistics";
import { Skeleton } from "@mui/material";

const StaticsHeader = memo(({ loading }: { loading: boolean }) => {
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-between">
          <div>
            <Skeleton variant="rectangular" width={210} height={50} />
            <Skeleton
              variant="rounded"
              width={150}
              height={20}
              sx={{ marginTop: 1 }}
            />
          </div>
          <Skeleton variant="circular" width={70} height={70} />
        </div>
      ) : (
        <div className="flex items-center justify-between border-b pb-6 border-[var(--lineGray)]">
          <div>
            {/* <p className='text-[var(--darkerGray)] text-3xl font-semibold'>всего {data.all}</p> */}
            <div className="flex items-center gap-6 mt-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-[4px] bg-[var(--success)]" />
                <p>Работает</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-[4px] bg-[var(--primary70)]" />
                <p>Нет плана</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[var(--gray)]" />
                <p>Сломан</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[var(--error)]" />
                <p>Остановлено</p>
              </div>
            </div>
          </div>
          <StatisticsCard
            data={{ working: 100, no_plan: 10, broken: 5, stopped: 3 }}
          />
        </div>
      )}
    </>
  );
});

export default StaticsHeader;
