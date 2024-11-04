import { useEffect, useRef, useState } from "react";
import CSearchInput from "../../../components/CElements/CSearchInput";
import { Header } from "../../../components/UI/Header";
import { CountBtns, FetchFunction } from "./Logic";
import CDriver from "../../../components/CElements/CDivider";
import { useSelector } from "react-redux";
import { MyCard } from "./MyCard";
import { LoadingComponent } from "../../../components/UI/Loading";
import useDeviceHeight from "../../../hooks/useDeviceHeight";

const searchedWords = [
  "podr_id_knitt",
  "ip_address",
  "message",
  "name",
  "art",
  "zakaz",
];

const KnittingMachines = () => {
  const { bodyData, refetch, isLoading } = FetchFunction();
  const [searchVal, setSearchVal]: any = useState([]);
  const [checked, setChecked]: any = useState(["all"]);
  const [list, setList]: any = useState([]);
  const [search, setSearch] = useState("");
  const gridRef: any = useRef(null);
  const [active, setActive] = useState(false);
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  const { getHeight } = useDeviceHeight();
  useEffect(() => {
    const refetching = setInterval(() => {
      refetch();
    }, 20000);

    return () => {
      clearInterval(refetching);
    };
  }, []);

  const searchWods = (val: string) => {
    setSearch(val);
    const data: any = [];
    const list: any = [];
    if (!val) {
      setSearchVal([]);
      setList(bodyData);
      return;
    }
    bodyData?.forEach((obj: any) => {
      searchedWords.forEach((word: string) => {
        if (word in obj) {
          if (
            obj[word]
              .toString()
              .toLocaleLowerCase()
              .includes(val.toLocaleLowerCase()) &&
            !list.includes(obj[word])
          ) {
            data.push({ name: word, value: obj[word] });
            list.push(obj[word]);
          }
        }
      });
    });

    setSearchVal(data);
  };

  useEffect(() => {
    if (search?.length) return;
    let listData: any = [];
    if (checked.length && !checked.includes("all")) {
      bodyData.forEach((machine: any) => {
        if (checked.includes(machine.new_status.status)) {
          listData.push(machine);
        }
      });
    } else {
      listData = [...bodyData];
    }

    setList(listData);
  }, [bodyData, checked, search]);

  const handleCheck = (obj: any) => {
    const data: any = [];

    bodyData.forEach((element: any) => {
      if (element[obj.name] === obj.value) {
        data.push(element);
      }
    });
    setSearch(obj.value);
    setSearchVal([]);
    setList(data);
  };

  const handleSearch = (value: string) => {
    const data: any = [];
    const sameData: any = [];
    bodyData.forEach((element: any) => {
      searchVal.forEach((obj: any) => {
        let currnetEl =
          typeof element[obj.name] === "number"
            ? element[obj.name].toString()
            : element[obj.name];
        currnetEl = currnetEl.toLocaleLowerCase();
        if (
          currnetEl.includes(value.toLocaleLowerCase()) &&
          !sameData.includes(element[obj.name])
        ) {
          data.push(element);
          sameData.push(element[obj.name]);
        }
      });
    });

    setSearchVal([]);
    setList(data);
  };

  const [zoomPoint, setZoomPoint] = useState(1);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (gridRef.current) {
      const { clientWidth, clientHeight } = gridRef.current;

      setDimensions({
        width: clientWidth,
        height: clientHeight,
      });
    }

    const handleResize = () => {
      if (gridRef.current) {
        setDimensions({
          width: gridRef.current.clientWidth,
          height: gridRef.current.clientHeight,
        });
      }
    };

    if (active) {
      handleResize();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [active]);

  const calculateZoom = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    const widthScale = screenWidth / dimensions.width;
    const heightScale = screenHeight / dimensions.height;

    const scaleFactor = Math.min(widthScale, heightScale);

    if (screenWidth > 940) {
      setZoomPoint(scaleFactor);
    } else {
      setZoomPoint(1);
    }
  };

  useEffect(() => {
    calculateZoom();
  }, [dimensions.width, dimensions.height]);

  useEffect(() => {
    if (list?.length) {
      setTimeout(() => {
        setActive(true);
      }, 100);
    }
  }, [list, dimensions]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <Header>
        <CountBtns
          checked={checked}
          setChecked={setChecked}
          bodyData={bodyData}
          setSearch={setSearch}
        />
        <CDriver direction="vertical" />
        <div className="w-[120px] desktop:w-[220px] relative">
          <CSearchInput
            defaultValue={search}
            handleChange={searchWods}
            handleSubmit={handleSearch}
          />
          {searchVal?.length ? (
            <div className="absolute left-0 top-full bg-white shadow-lg rounded-[12px] w-full overflow-scroll max-h-[400px] remove-scroll">
              <ul className="space-y-2 py-2">
                {searchVal?.map((item: any, index: number) => (
                  <li
                    key={index}
                    onClick={() => handleCheck(item)}
                    className="hover:bg-[var(--border)] py-1 px-4 cursor-pointer"
                  >
                    <button>{item.value}</button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </Header>

      <div
        className="px-2 py-2 lg:p-3 h-[95vh] overflow-scroll remove-scroll ipod:h-auto ipod:overflow-unset"
        ref={gridRef}
      >
        {list?.length ? (
          <div
            className={`grid-machines-dashboard grid w-[1600px] ipod:overflow-unset ipod:w-full grid-cols-11 gap-[3px] small_desktop:gap-2`}
            style={{
              minWidth:
                window?.screen?.width < 940
                  ? "1600px"
                  : window?.screen?.width - 200,
              minHeight:
                checked.length && !checked.includes("all")
                  ? "auto"
                  : window.screen.height - (openHeader ? 250 : 150),
            }}
          >
            {list.map((machine: any, index: number) =>
              machine?.idlocation ? (
                <div
                  key={index}
                  style={{
                    width: "100%",
                    height: getHeight({
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
                    }),
                  }}
                >
                  <MyCard
                    machine={machine}
                    zoomPoint={zoomPoint}
                    refetch={refetch}
                  />
                </div>
              ) : (
                <div key={index}></div>
              )
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default KnittingMachines;
