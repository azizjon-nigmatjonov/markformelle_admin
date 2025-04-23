import { useEffect, useRef, useState } from "react";
import { Header } from "../../../components/UI/Header";
import { CountBtns, FetchFunction } from "./Logic";
import { useDispatch, useSelector } from "react-redux";
import { MyCard } from "./MyCard";
import useDeviceHeight from "../../../hooks/useDeviceHeight";
import { MachineListSkeleton, MachinSkeletons } from "./Skeleton";
import { ToggleBtn } from "../../../components/UI/ToggleBtn";
import { sidebarActions } from "../../../store/sidebar";
import GlobalSearch from "../../../components/UI/GlobalSearch";
import { MachinesList } from "./Components/List";
import { IFilterParams } from "../../../interfaces";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";

const KnittingMachines = () => {
  const dispatch = useDispatch();
  const { bodyData, refetch, isLoading } = FetchFunction();
  const [checked, setChecked]: any = useState(["all"]);
  const [list, setList]: any = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const gridRef: any = useRef(null);
  const [active, setActive] = useState(false);
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  const listType = useSelector((state: any) => state.sidebar.listType);
  const { getHeight } = useDeviceHeight();
  const [widthWindow, setWidthWindow] = useState(0);
  const [heightWindow, setHeightWindow] = useState(0);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 10,
    title: "Вязальные машины",
  });

  useEffect(() => {
    setHeightWindow(window?.screen?.height);
    setWidthWindow(window?.screen?.width);
  }, [list]);

  useEffect(() => {
    const refetching = setInterval(() => {
      refetch();
    }, 30000);

    if (search?.length || checked?.length !== 1 || !checked.includes("all")) {
      clearInterval(refetching);
    }
    return () => {
      clearInterval(refetching);
    };
  }, [checked.length, search]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(isLoading);
    }, 1500);
  }, [isLoading]);

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
    const screenWidth = widthWindow;
    const screenHeight = heightWindow;

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

  const HeaderElements = () => (
    <div className="w-[400px] ipod:w-auto overflow-x-scroll ipod:overflow-x-visible hide-scrollbar flex pr-3">
      <CountBtns
        checked={checked}
        setChecked={setChecked}
        bodyData={bodyData}
        setSearch={setSearch}
      />
      <div className="mx-3">
        <GlobalSearch list={bodyData ?? []} setList={setList} />
      </div>

      <div>
        <ToggleBtn
          type={listType}
          setType={(type) => {
            dispatch(sidebarActions.setListType(type));
          }}
        />
      </div>
    </div>
  );

  const MobileHeaderElements = () => (
    <div className="flex flex-col space-y-5">
      <div className="flex items-center justify-between space-x-3">
        <div className="w-full">
          <GlobalSearch list={bodyData ?? []} setList={setList} />
        </div>
        <div>
          <ToggleBtn
            type={listType}
            setType={(type) => {
              dispatch(sidebarActions.setListType(type));
            }}
          />
        </div>
      </div>
      <CountBtns
        checked={checked}
        setChecked={setChecked}
        bodyData={bodyData}
        setSearch={setSearch}
      />
    </div>
  );

  return (
    <>
      <Header
        extra={
          <CBreadcrumbs items={[{ label: "Вязальные машины", link: "main" }]} />
        }
        filters={MobileHeaderElements()}
      >
        {HeaderElements()}
      </Header>

      {loading && listType === "grid" ? (
        <MachinSkeletons openHeader={openHeader} />
      ) : (
        ""
      )}

      {loading && listType === "list" ? (
        <MachineListSkeleton openHeader={openHeader} />
      ) : (
        ""
      )}

      {listType === "grid" ? (
        <div
          className="px-2 py-2 h-[95vh] overflow-scroll remove-scroll ipod:h-auto ipod:overflow-unset"
          ref={gridRef}
        >
          {list?.length && !loading ? (
            <div
              className={`grid-machines-dashboard grid w-[1600px] ipod:overflow-unset ipod:w-full grid-cols-11 gap-[3px] small_desktop:gap-1.5`}
              style={{
                minWidth: widthWindow < 940 ? "1600px" : widthWindow - 200,
                minHeight:
                  checked.length && !checked.includes("all")
                    ? "auto"
                    : heightWindow - (openHeader ? 250 : 150),
              }}
            >
              {list?.map((machine: any, index: number) =>
                machine?.idlocation ? (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                      height: getHeight({
                        count: 7,
                        type: "machine",
                        minus:
                          heightWindow < 600
                            ? openHeader
                              ? 11.5
                              : 6
                            : heightWindow < 740
                            ? openHeader
                              ? 30.5
                              : 25.5
                            : openHeader
                            ? 33
                            : 26,
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
      ) : (
        !loading && (
          <MachinesList
            list={list}
            filterParams={filterParams}
            setFilterParams={setFilterParams}
          />
        )
      )}
    </>
  );
};

export default KnittingMachines;
