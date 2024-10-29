import CCard from "../../../../components/CElements/CCard";
import { useEffect, useRef, useState } from "react";

interface Props {
  data: any;
  title: string;
}

export const CellCardWrapper = ({ data = [], title = "" }: Props) => {
  const wrapperRef: any = useRef(null);
  const [height, setHeight]: any = useState("auto");
  const [scrollPoint, setScrollPoint] = useState(0);

  useEffect(() => {
    if (wrapperRef.current) {
      setTimeout(() => {
        setHeight(wrapperRef.current.offsetHeight - 80);
      }, 1000);
    }

    setInterval(() => {
      if (wrapperRef?.current) {
        setScrollPoint(wrapperRef.current.scrollTop);
      }
    }, 1000);
  }, []);

  const scrollToBottom = () => {
    if (wrapperRef.current) {
      const wrapperHeight = wrapperRef.current.clientHeight;
      wrapperRef.current.scrollTop = Math.max(
        wrapperRef.current.scrollTop +
          wrapperHeight -
          wrapperRef.current.clientHeight / 11 -
          50,
        0
      );
    }
  };

  const scrollUpByHeight = () => {
    if (wrapperRef.current) {
      const wrapperHeight = wrapperRef.current.clientHeight;
      wrapperRef.current.scrollTop = Math.max(
        wrapperRef.current.scrollTop - wrapperHeight,
        0
      );
    }
  };

  return (
    <CCard
      title={title}
      classes="h-full"
      childClasses={data.length > 10 ? "pr-0" : ""}
    >
      <div
        className={`space-y-3 overflow-y-scroll pb-[50px] ${
          data.length > 10 ? "designed-scroll" : "remove-scroll"
        }`}
        style={{ height: "calc(100vh - 100px)" }}
        ref={wrapperRef}
      >
        {data?.map((item: any, index: number) => (
          <div
            className={`card grid relative  gap-x-2 card-shadow px-1 small_desktop:px-3 ${
              item.COUNT_PACK ? "grid-cols-2" : ""
            }`}
            style={{ height: height / 11 }}
            key={index}
          >
            {/* <div className="bg-[var(--black)] w-[6px] h-[6px] rounded-full absolute left-2 top-3"></div> */}
            <div
              className={`name space-x-1 small_desktop:space-x-3`}
              style={{
                flexDirection: item.COUNT_PACK ? "row" : "row",
              }}
            >
              <h3 className="text">{item.CELL?.substring(0, 3)}</h3>
              <h4>{item.CELL?.substring(3)}</h4>
            </div>
            {item.COUNT_PACK && (
              <div className="count">
                <p>{item.COUNT_PACK}</p>
              </div>
            )}
          </div>
        ))}

        {scrollPoint > 50 && (
          <button
            onClick={() => scrollUpByHeight()}
            className="text-center w-full rotate-[180deg] absolute bg-white top-0 left-0"
          >
            <div className="scrolldown-container">
              <div className="scrolldown-btn">
                <svg
                  version="1.1"
                  id="Слой_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="50px"
                  height="80px"
                  viewBox="0 0 50 80"
                  enable-background="new 0 0 50 80"
                >
                  <path
                    className="first-path"
                    fill="#000"
                    d="M24.752,79.182c-0.397,0-0.752-0.154-1.06-0.463L2.207,57.234c-0.306-0.305-0.458-0.656-0.458-1.057
            s0.152-0.752,0.458-1.059l2.305-2.305c0.309-0.309,0.663-0.461,1.06-0.461c0.398,0,0.752,0.152,1.061,0.461l18.119,18.119
            l18.122-18.119c0.306-0.309,0.657-0.461,1.057-0.461c0.402,0,0.753,0.152,1.059,0.461l2.306,2.305
            c0.308,0.307,0.461,0.658,0.461,1.059s-0.153,0.752-0.461,1.057L25.813,78.719C25.504,79.027,25.15,79.182,24.752,79.182z"
                  />
                  <path
                    className="second-path"
                    fill="#000"
                    d="M24.752,58.25c-0.397,0-0.752-0.154-1.06-0.463L2.207,36.303c-0.306-0.304-0.458-0.655-0.458-1.057
            c0-0.4,0.152-0.752,0.458-1.058l2.305-2.305c0.309-0.308,0.663-0.461,1.06-0.461c0.398,0,0.752,0.153,1.061,0.461l18.119,18.12
            l18.122-18.12c0.306-0.308,0.657-0.461,1.057-0.461c0.402,0,0.753,0.153,1.059,0.461l2.306,2.305
            c0.308,0.306,0.461,0.657,0.461,1.058c0,0.401-0.153,0.753-0.461,1.057L25.813,57.787C25.504,58.096,25.15,58.25,24.752,58.25z"
                  />
                </svg>
              </div>
            </div>
          </button>
        )}

        {data.length > 10 ? (
          <button
            onClick={() => scrollToBottom()}
            className="text-center w-full absolute bottom-0 h-[50px] left-0 bg-white"
          >
            <div className="scrolldown-container">
              <div className="scrolldown-btn">
                <svg
                  version="1.1"
                  id="Слой_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="50px"
                  height="80px"
                  viewBox="0 0 50 80"
                  enable-background="new 0 0 50 80"
                >
                  <path
                    className="first-path"
                    fill="#000"
                    d="M24.752,79.182c-0.397,0-0.752-0.154-1.06-0.463L2.207,57.234c-0.306-0.305-0.458-0.656-0.458-1.057
            s0.152-0.752,0.458-1.059l2.305-2.305c0.309-0.309,0.663-0.461,1.06-0.461c0.398,0,0.752,0.152,1.061,0.461l18.119,18.119
            l18.122-18.119c0.306-0.309,0.657-0.461,1.057-0.461c0.402,0,0.753,0.152,1.059,0.461l2.306,2.305
            c0.308,0.307,0.461,0.658,0.461,1.059s-0.153,0.752-0.461,1.057L25.813,78.719C25.504,79.027,25.15,79.182,24.752,79.182z"
                  />
                  <path
                    className="second-path"
                    fill="#000"
                    d="M24.752,58.25c-0.397,0-0.752-0.154-1.06-0.463L2.207,36.303c-0.306-0.304-0.458-0.655-0.458-1.057
            c0-0.4,0.152-0.752,0.458-1.058l2.305-2.305c0.309-0.308,0.663-0.461,1.06-0.461c0.398,0,0.752,0.153,1.061,0.461l18.119,18.12
            l18.122-18.12c0.306-0.308,0.657-0.461,1.057-0.461c0.402,0,0.753,0.153,1.059,0.461l2.306,2.305
            c0.308,0.306,0.461,0.657,0.461,1.058c0,0.401-0.153,0.753-0.461,1.057L25.813,57.787C25.504,58.096,25.15,58.25,24.752,58.25z"
                  />
                </svg>
              </div>
            </div>
          </button>
        ) : (
          ""
        )}
      </div>
    </CCard>
  );
};
