import { useEffect, useMemo, useState } from "react";
import "./style.scss";
import useDeviceHeight from "../../../../hooks/useDeviceHeight";

interface Props {
  isLoading: boolean;
  data: any;
}

export const SecondColumn = ({ data = [] }: Props) => {
  const [total, setTotal]: any = useState({});
  const [bodyData, setBodyData] = useState([]);
  const { getHeight, getFontSize } = useDeviceHeight();

  useEffect(() => {
    if (!data?.length) return;
    const arr = data?.sort((a: any, b: any) => b.KOL_IN_MONTH - a.KOL_IN_MONTH);
    const newArr: any = [];
    const totalObj: any = {
      month: 0,
      day: 0,
      title: "Итого",
      order: 0,
      TABN: "123",
    };

    arr?.forEach((item: any, index: number) => {
      const naming = item?.FIO?.trim()?.split(" ")?.slice(0, 2);

      totalObj.month += item.KOL_IN_MONTH;
      totalObj.day += item.KOL_TODAY;

      const formatedMonth = parseInt(item.KOL_IN_MONTH)
        .toLocaleString("en-US")
        .replace(",", " ");
      const formatedDay = parseInt(item.KOL_TODAY)
        .toLocaleString("en-US")
        .replace(",", " ");

      newArr.push({
        ...item,
        KOL_IN_MONTH: formatedMonth,
        KOL_TODAY: formatedDay,
        order: index + 1,
        FIO: `${naming[1]}`,
      });
    }) ?? [];

    totalObj.month = parseInt(totalObj.month)
      .toLocaleString("en-US")
      .replace(",", " ");
    totalObj.day = parseInt(totalObj.day)
      .toLocaleString("en-US")
      .replace(",", " ");

    setBodyData(newArr);
    setTimeout(() => {
      setTotal(totalObj);
    }, 0);
  }, [data]);

  const headColumns = useMemo(() => {
    return [
      {
        title: "Список грузчиков",
        width: "40%",
        id: "FIO",
        render: (val: any) => (
          <div className="flex items-center space-x-2 py-1">
            {val?.[1] ? (
              <div className="w-[40px]">
                {val[1] === 1 ? (
                  <img
                    className="w-[40px]"
                    src="/images/medal_1.png"
                    alt="first"
                  />
                ) : val[1] === 2 ? (
                  <img
                    className="w-[40px]"
                    src="/images/medal_2.png"
                    alt="second"
                  />
                ) : val[1] === 3 ? (
                  <img
                    className="w-[40px]"
                    src="/images/medal_3.png"
                    alt="third"
                  />
                ) : (
                  <img
                    className="w-[35px]"
                    src="/images/danger.webp"
                    alt={`last ${val[1]}`}
                  />
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <p className="footer_text whitespace-nowrap">{val?.[0]}</p>
                <p className="footer_text whitespace-nowrap pr-5 desktop:pr-10">
                  {bodyData.length}
                </p>
              </div>
            )}
            {val?.[1] ? <p className="whitespace-nowrap">{val?.[0]}</p> : ""}
          </div>
        ),
      },
      {
        title: "C начала месяца",
        width: "30%",
        renderHead: () => (
          <h3 className="font-50-40 font-semibold text-[var(--gray)] text-center whitespace-nowrap uppercase">
            C начала месяца
          </h3>
        ),
        // width: 140,
        id: "KOL_IN_MONTH",
        render: (val: string) => <p className={`text`}>{val[0]}</p>,
      },
      {
        title: "В этой смене",
        width: "30%",
        id: "KOL_TODAY",
        renderHead: () => (
          <h3 className="font-50-40 font-semibold text-[var(--gray)] py-4 text-center">
            В этой смене
          </h3>
        ),
        // width: 140,
        render: (val: string) => <p className={`text`}>{val[0]}</p>,
      },
      {
        title: "приём",
        width: "30%",
        id: "",
        renderHead: () => (
          <h3 className="font-50-40 font-semibold text-[var(--gray)] py-4 text-center">
            приём
          </h3>
        ),
        // width: 140,
        render: () => <p className={`text`}>{}</p>,
      },
      {
        title: "prixod",
        width: "30%",
        id: "",
        renderHead: () => (
          <h3 className="font-50-40 font-semibold text-[var(--gray)] py-4 text-center">
            отборка
          </h3>
        ),
        // width: 140,
        render: () => <p className={`text`}>{}</p>,
      },
    ];
  }, [bodyData]);

  return (
    <div className="px-2 flex w-full" style={{ height: "calc(100% - 35px)" }}>
      <div className="w-full flex">
        <div className="border-r pr-2 border-[var(--border)] w-full relative">
          <div
            style={{ height: getHeight({ type: "card", count: 18 }) }}
            className="flex items-center sticky-sub-header-process border-b border-[var(--border)]"
          >
            <h2
              style={{
                fontSize: getFontSize({
                  type: "card",
                  count: 14,
                  percent: 32,
                }),
              }}
              className="font-bold text-[var(--black)] text-center whitespace-nowrap uppercase"
            >
              Список грузчиков
            </h2>
          </div>
          <div className={`overflow-y-scroll remove-scroll`}>
            {bodyData?.map((item: any, index: number) => (
              <div
                className={`row flex items-center ${
                  index !== 0 ? "border-t border-[var(--border)] " : ""
                }`}
                style={{ height: getHeight({ type: "card", count: 16 }) }}
                key={index}
              >
                {headColumns.slice(0, 1).map((headCol: any, headInd) => (
                  <div
                    key={headInd}
                    className="cell flex space-x-2 items-center"
                  >
                    <div
                      className="w-[40px]"
                      style={{ width: getHeight({ type: "card", count: 26 }) }}
                    >
                      {item.order === 1 ? (
                        <img
                          className="w-full"
                          src="/images/medal_1.png"
                          alt="first"
                        />
                      ) : item.order === 2 ? (
                        <img
                          className="w-full"
                          src="/images/medal_2.png"
                          alt="second"
                        />
                      ) : item.order === 3 ? (
                        <img
                          className="w-full"
                          src="/images/medal_3.png"
                          alt="third"
                        />
                      ) : (
                        <img
                          className="w-full"
                          src="/images/danger.webp"
                          alt={`last ${item.order}`}
                          style={{
                            width: getHeight({ type: "card", count: 28 }),
                          }}
                        />
                      )}
                    </div>

                    <p
                      className="whitespace-nowrap font-semibold pr-5"
                      style={{
                        fontSize: getFontSize({
                          type: "card",
                          count: 14,
                          percent: 38,
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
          <div
            className={`${bodyData.length < 7 ? "absolute-el" : "sticky-el"}`}
            style={{ height: getHeight({ type: "card", count: 20 }) }}
          >
            <p
              className="font-bold flex justify-between w-full"
              style={{
                fontSize: getFontSize({
                  type: "card",
                  count: 14,
                  percent: 46,
                }),
              }}
            >
              <span>{total.title}</span> <span>{bodyData.length}</span>
            </p>
          </div>
        </div>

        <div className="border-r border-[var(--border)] px-2 w-full relative">
          <div
            style={{ height: getHeight({ type: "card", count: 18 }) }}
            className="flex items-center sticky-sub-header-process border-b border-[var(--border)]"
          >
            <h2
              style={{
                fontSize: getFontSize({
                  type: "card",
                  count: 14,
                  percent: 32,
                }),
              }}
              className="font-bold text-[var(--black)] text-center whitespace-nowrap uppercase"
            >
              C начала месяца
            </h2>
          </div>
          <div className={`overflow-y-scroll remove-scroll`}>
            {bodyData?.map((item: any, index: number) => (
              <div
                className={`row flex items-center ${
                  index !== 0 ? "border-t border-[var(--border)] " : ""
                }`}
                style={{ height: getHeight({ type: "card", count: 16 }) }}
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
                          percent: 38,
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
          <div
            className={`${bodyData.length < 7 ? "absolute-el" : "sticky-el"}`}
            style={{ height: getHeight({ type: "card", count: 20 }) }}
          >
            <p
              className="font-bold"
              style={{
                fontSize: getFontSize({
                  type: "card",
                  count: 14,
                  percent: 46,
                }),
              }}
            >
              {total.month}
            </p>
          </div>
        </div>

        <div className="pl-2 w-full relative h-full">
          <div
            style={{ height: getHeight({ type: "card", count: 18 }) }}
            className="flex items-center sticky-sub-header-process border-b border-[var(--border)]"
          >
            <h2
              style={{
                fontSize: getFontSize({
                  type: "card",
                  count: 14,
                  percent: 32,
                }),
              }}
              className="font-bold text-[var(--black)] text-center whitespace-nowrap uppercase"
            >
              В этой смене
            </h2>
          </div>
          <div className={`overflow-y-scroll remove-scroll`}>
            {bodyData?.map((item: any, index: number) => (
              <div
                className={`row flex items-center ${
                  index !== 0 ? "border-t border-[var(--border)] " : ""
                }`}
                style={{ height: getHeight({ type: "card", count: 16 }) }}
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
                          percent: 38,
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
          <div
            className={`${bodyData.length < 7 ? "absolute-el" : "sticky-el"}`}
            style={{ height: getHeight({ type: "card", count: 20 }) }}
          >
            <p
              className="font-bold"
              style={{
                fontSize: getFontSize({
                  type: "card",
                  count: 14,
                  percent: 46,
                }),
              }}
            >
              {total.day}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
