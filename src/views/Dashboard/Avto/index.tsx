import { useEffect, useState } from "react";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import CSearchInput from "../../../components/CElements/CSearchInput";
import { Header } from "../../../components/UI/Header";
import { breadCrumbItems, CountBtns, FetchFunction } from "./Logic";
import MachineCard from "./Card";
import CCheckButton from "../../../components/CElements/CCheckButton";

const searchedWords = ["podr_id_knitt", "ip_address", "message", "name"];

const Dashboard = () => {
  const { bodyData } = FetchFunction();
  const [searchVal, setSearchVal]: any = useState([]);
  const [checked, setChecked]: any = useState(["all"]);
  const [list, setList]: any = useState([]);

  const searchWods = (val: string) => {
    const data: any = [];
    if (!val) {
      setSearchVal([]);
      setList(bodyData);
      return;
    }
    bodyData?.forEach((obj: any) => {
      searchedWords.forEach((word: string) => {
        if (word in obj) {
          if (obj[word].toString().includes(val)) {
            data.push({ name: word, value: obj[word] });
          }
        }
      });
    });

    setSearchVal(data);
  };

  useEffect(() => {
    let listData: any = [];
    if (checked.length && !checked.includes("all")) {
      bodyData.forEach((element: any) => {
        if (element.no_connnection == "true" && checked.includes("grey")) {
          listData.push(element);
        } else if (
          element.yarn_replacement == "true" &&
          element.pkol_knit === 0 &&
          element.machine_is_on === "true" &&
          element.no_connnection === "false" &&
          checked.includes("blue")
        ) {
          listData.push(element);
        } else if (element.pkol_knit == 0) {
        } else if (
          element.rotation > 0 &&
          element.not_broken == "true" &&
          element.machine_is_on == "true"
        ) {
          if (
            element.yarn_replacement == "true" &&
            element.pkol_knit - element.fkol_knit < 30 &&
            element.pkol_knit - element.fkol_knit > 0
          ) {
          } else {
            if (checked.includes("green")) {
              listData.push(element);
            }
          }
        } else if (
          element.not_broken == "true" &&
          element.machine_is_on == "false"
        ) {
        } else if (
          element.not_broken == "true" &&
          element.machine_is_on == "true" &&
          element.rotation == 0 &&
          checked.includes("red")
        ) {
          listData.push(element);
        }
      });
    } else {
      listData = [...bodyData];
    }

    setList(listData);
  }, [bodyData, checked]);

  const handleCheck = (obj: any) => {
    const data: any = [];

    bodyData.forEach((element: any) => {
      if (element[obj.name] === obj.value) {
        data.push(element);
      }
    });
    setSearchVal([]);
    setList(data);
  };

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbItems} progmatic={true} />}>
        <CountBtns
          checked={checked}
          setChecked={setChecked}
          bodyData={bodyData}
        />
        <div className="w-[240px] relative">
          <CSearchInput handleChange={searchWods} />
          {searchVal?.length ? (
            <div className="absolute left-0 top-full bg-white shadow-lg rounded-[12px] w-full overflow-scroll max-h-[400px]">
              <ul className="space-y-2 py-2">
                {searchVal.map((item: any, index: number) => (
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

      <div className="container">
        <div className="grid grid-cols-11 gap-5">
          {list.map((machine: any, index: number) => (
            <MachineCard key={index} machine={machine} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
