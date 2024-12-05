import { useEffect, useState } from "react";
import "./style.scss";
import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useCalculateTimePainting } from "../../../../hooks/useCalucaleTime";
interface Props {
  data: any;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));

// const obj = {
//   doc_name: "123",
//   who_is_doing: "sardor",
//   howmuch_kg: "110kg",
//   end_percent: "50%",
//   start_end: "1234",
// };

export const DocTable = ({ data = [] }: Props) => {
  const [bodyData, setBodyData] = useState([]);
  const { getHeight, getFontSize } = useDeviceHeight();
  const { GetTimeMinutes } = useCalculateTimePainting();
  useEffect(() => {
    setBodyData(data);
  }, [data]);

  const headColumns = [
    {
      id: "NOMER",
    },
    {
      id: "FIO",
      render: (val: string) => {
        return val?.substring(val.indexOf(" "));
      },
    },
    {
      id: "KOL",
      render: (val: number) => {
        return val + " кг";
      },
    },
    {
      id: "FACT_KOL",
      render: (val: any) => {
        return Math.round((val * 100) / 430);
      },
    },
    {
      id: "FIRST_ROLL_DATE",
      render: (val: string) => {
        return val && GetTimeMinutes(val);
      },
    },
  ];

  return (
    <div className="px-2 flex w-full">
      <div className="w-full flex">
        <div className="border-r pr-2 border-[var(--border)] relative">
          <div
            style={{ height: getHeight({ type: "card", count: 26 }) }}
            className="flex items-center sticky-sub-header border-b border-[var(--border)]"
          >
            <h2
              style={{
                fontSize: getFontSize({
                  type: "card",
                  count: 14,
                  percent: 34,
                }),
              }}
              className="font-semibold text-[var(--gray)] text-center whitespace-nowrap w-full"
            >
              №
            </h2>
          </div>
          <div className={`overflow-y-scroll remove-scroll pt-[2px]`}>
            {bodyData?.map((item: any, index: number) => (
              <div
                className={`row flex items-center border-b border-[var(--border)]`}
                style={{ height: getHeight({ type: "card", count: 23.5 }) }}
                key={index}
              >
                {headColumns.slice(0, 1).map((headCol: any, headInd) => (
                  <div
                    key={headInd}
                    className="cell flex space-x-3 items-center"
                  >
                    <p
                      className="whitespace-nowrap font-semibold pr-5"
                      style={{
                        fontSize: getFontSize({
                          type: "card",
                          count: 14,
                          percent: 37,
                        }),
                      }}
                    >
                      {item?.[headCol.id]}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="border-r border-[var(--border)] px-2 w-[80%] relative">
          <div
            style={{ height: getHeight({ type: "card", count: 26 }) }}
            className="flex items-center sticky-sub-header border-b border-[var(--border)]"
          >
            <h2
              style={{
                fontSize: getFontSize({
                  type: "card",
                  count: 14,
                  percent: 34,
                }),
              }}
              className="font-semibold text-[var(--gray)] text-center whitespace-nowrap w-full"
            >
              Сотрудник
            </h2>
          </div>
          <div className={`overflow-y-scroll remove-scroll pt-[2px]`}>
            {bodyData?.map((item: any, index: number) => (
              <div
                className={`row flex items-center border-b border-[var(--border)]`}
                style={{ height: getHeight({ type: "card", count: 23.5 }) }}
                key={index}
              >
                {headColumns.slice(1, 2).map((headCol: any, headInd) => (
                  <div key={headInd} className="cell">
                    <p
                      className="whitespace-nowrap font-semibold"
                      style={{
                        fontSize: getFontSize({
                          type: "card",
                          count: 14,
                          percent: 37,
                        }),
                      }}
                    >
                      {headCol?.render
                        ? headCol.render(item[headCol?.id], item)
                        : item[headCol.id]}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="border-r border-[var(--border)] px-2 w-[80%] relative">
          <div
            style={{ height: getHeight({ type: "card", count: 26 }) }}
            className="flex items-center sticky-sub-header border-b border-[var(--border)]"
          >
            <h2
              style={{
                fontSize: getFontSize({
                  type: "card",
                  count: 14,
                  percent: 34,
                }),
              }}
              className="font-semibold text-[var(--gray)] text-center whitespace-nowrap w-full"
            >
              План
            </h2>
          </div>
          <div className={`overflow-y-scroll remove-scroll pt-[2px]`}>
            {bodyData?.map((item: any, index: number) => (
              <div
                className={`row flex items-center border-b border-[var(--border)]`}
                style={{ height: getHeight({ type: "card", count: 23.5 }) }}
                key={index}
              >
                {headColumns.slice(2, 3).map((headCol: any, headInd) => (
                  <div key={headInd} className="cell">
                    <p
                      className="whitespace-nowrap font-semibold"
                      style={{
                        fontSize: getFontSize({
                          type: "card",
                          count: 14,
                          percent: 37,
                        }),
                      }}
                    >
                      {headCol?.render
                        ? headCol.render(item[headCol?.id], item)
                        : item[headCol.id]}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="border-r border-[var(--border)] px-2 w-[80%] relative">
          <div
            style={{ height: getHeight({ type: "card", count: 26 }) }}
            className="flex items-center sticky-sub-header border-b border-[var(--border)]"
          >
            <h2
              style={{
                fontSize: getFontSize({
                  type: "card",
                  count: 14,
                  percent: 34,
                }),
              }}
              className="font-semibold text-[var(--gray)] text-center whitespace-nowrap w-full"
            >
              Остатка
            </h2>
          </div>
          <div className={`overflow-y-scroll remove-scroll pt-[2px]`}>
            {bodyData?.map((item: any, index: number) => (
              <div
                className={`row flex items-center border-b border-[var(--border)]`}
                style={{ height: getHeight({ type: "card", count: 23.5 }) }}
                key={index}
              >
                <div className="cell">
                  <p
                    className="whitespace-nowrap font-semibold"
                    style={{
                      fontSize: getFontSize({
                        type: "card",
                        count: 14,
                        percent: 37,
                      }),
                    }}
                  >
                    {Math.round(item.KOL - item.FACT_KOL)} кг
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-r border-[var(--border)] px-2 w-full relative">
          <div
            style={{ height: getHeight({ type: "card", count: 26 }) }}
            className="flex items-center sticky-sub-header border-b border-[var(--border)]"
          >
            <h2
              style={{
                fontSize: getFontSize({
                  type: "card",
                  count: 14,
                  percent: 34,
                }),
              }}
              className="font-semibold text-[var(--gray)] text-center whitespace-nowrap w-full"
            >
              Собрано
            </h2>
          </div>
          <div className={`overflow-y-scroll remove-scroll pt-[2px]`}>
            {bodyData?.map((item: any, index: number) => (
              <div
                className={`row flex items-center border-b border-[var(--border)]`}
                style={{ height: getHeight({ type: "card", count: 23.5 }) }}
                key={index}
              >
                {headColumns.slice(3, 4).map((headCol: any, headInd) => (
                  <div key={headInd} className="cell w-full flex items-center">
                    <div className="mr-2 w-full">
                      <BorderLinearProgress
                        variant="determinate"
                        value={
                          headCol?.render
                            ? headCol.render(item[headCol?.id], item)
                            : item[headCol.id]
                        }
                        style={{
                          height: getFontSize({
                            type: "card",
                            count: 14,
                            percent: 25,
                          }),
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                    <p
                      className="whitespace-nowrap font-semibold text-center tracking-tighter"
                      style={{
                        fontSize: getFontSize({
                          type: "card",
                          count: 14,
                          percent: 37,
                        }),
                      }}
                    >
                      {headCol?.render
                        ? headCol.render(item[headCol?.id], item)
                        : item[headCol.id]}{" "}
                      %
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="pl-2 relative h-full">
          <div
            style={{ height: getHeight({ type: "card", count: 26 }) }}
            className="flex items-center sticky-sub-header border-b border-[var(--border)]"
          >
            <h2
              style={{
                fontSize: getFontSize({
                  type: "card",
                  count: 14,
                  percent: 34,
                }),
              }}
              className="font-semibold text-[var(--gray)] text-center whitespace-nowrap w-full"
            >
              Время
            </h2>
          </div>
          <div className={`overflow-y-scroll remove-scroll pt-[2px]`}>
            {bodyData?.map((item: any, index: number) => (
              <div
                className={`row flex items-center border-b border-[var(--border)]`}
                style={{ height: getHeight({ type: "card", count: 23.5 }) }}
                key={index}
              >
                {headColumns.slice(4).map((headCol: any, headInd) => (
                  <div key={headInd} className="cell">
                    <p
                      className="whitespace-nowrap font-semibold"
                      style={{
                        fontSize: getFontSize({
                          type: "card",
                          count: 14,
                          percent: 37,
                        }),
                      }}
                    >
                      {headCol?.render
                        ? headCol.render(item[headCol?.id], item)
                        : item[headCol.id]}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
