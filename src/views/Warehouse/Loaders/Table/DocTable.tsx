import { useEffect, useState } from "react";
import "./style.scss";
import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
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

  useEffect(() => {
    setBodyData(data);
  }, [data]);

  const headColumns = [
    {
      id: "doc_id",
    },
    {
      id: "worker",
    },
    {
      id: "weight",
    },
    {
      id: "percent",
    },
    {
      id: "start_time",
    },
  ];

  return (
    <div className="px-2 flex w-full">
      <div className="w-full flex">
        <div className="border-r pr-2 border-[var(--border)] w-[70%] relative">
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
              className="font-semibold text-[var(--gray)] text-center whitespace-nowrap"
            >
              Документ
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
              className="font-semibold text-[var(--gray)] text-center whitespace-nowrap"
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
                      {item[headCol.id]}
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
              className="font-semibold text-[var(--gray)] text-center whitespace-nowrap"
            >
              Вес партии
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
                      {item[headCol.id]}
                    </p>
                  </div>
                ))}
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
              className="font-semibold text-[var(--gray)] text-center whitespace-nowrap"
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
                        value={50}
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
                      className="whitespace-nowrap font-semibold text-center space-x-1"
                      style={{
                        fontSize: getFontSize({
                          type: "card",
                          count: 14,
                          percent: 37,
                        }),
                      }}
                    >
                      {item[headCol.id]}
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
              className="font-semibold text-[var(--gray)] text-center whitespace-nowrap"
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
                      {item[headCol.id]}
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
