import { useEffect, useMemo, useState } from "react";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import CSearchInput from "../../../components/CElements/CSearchInput";
import { Header } from "../../../components/UI/Header";
import { breadCrumbItems, FetchFunction } from "./Logic";
import MachineCard from "./Card";
import CCheckButton from "../../../components/CElements/CCheckButton";

const searchedWords = ["stop_mins", "ip_address", "message"];

const Dashboard = () => {
  const { bodyData } = FetchFunction();
  const [searchVal, setSearchVal]: any = useState([]);
  const [checked, setChecked]: any = useState(["grey", "green", "red"]);
  const [list, setList]: any = useState([]);

  const filterCheckbox = (val: string) => {
    if (checked.includes(val)) {
      setChecked(checked.filter((i: string) => i !== val));
    } else {
      setChecked((prev: string) => [...prev, val]);
    }
  };

  const searchWods = (val: string) => {
    const data: any = [];
    if (!val) {
      setSearchVal([]);
      return;
    }
    bodyData?.forEach((obj: any) => {
      searchedWords.forEach((word: string) => {
        if (word in obj) {
          if (obj[word].includes(val)) {
            data.push({ name: word, value: obj[word] });
          }
        }
      });
    });

    setSearchVal(data);
  };

  useEffect(() => {
    let listData: any = [];
    if (checked.length) {
      bodyData.forEach((element: any) => {
        if (element.no_connnection == "true" && checked.includes("grey")) {
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
          element.not_broken == "false" &&
          element.machine_is_on == "false" &&
          checked.includes("grey")
        ) {
          listData.push(element);
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

    setList(data);
  };

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbItems} progmatic={true} />}>
        <div className="w-[240px] relative">
          <CSearchInput handleChange={searchWods} />
          {searchVal?.length ? (
            <div className="absolute left-0 top-full bg-white shadow-lg rounded-[12px] w-full overflow-scroll max-h-[400px]">
              <ul className="space-y-2 py-2">
                {searchVal.map((item: any) => (
                  <li
                    key={item.value}
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
        <div className="ml-5 flex space-x-5">
          <CCheckButton
            color="#6cce65"
            element={{ label: "Планируется" }}
            checked={checked.includes("green")}
            handleCheck={() => filterCheckbox("green")}
          />
          <CCheckButton
            color="#8099f1"
            element={{ label: "НЕ ПОДКЛЮЧЕНА" }}
            checked={checked.includes("grey")}
            handleCheck={() => filterCheckbox("grey")}
          />
          <CCheckButton
            color="#fb6060"
            element={{ label: "Останов" }}
            checked={checked.includes("red")}
            handleCheck={() => filterCheckbox("red")}
          />
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
