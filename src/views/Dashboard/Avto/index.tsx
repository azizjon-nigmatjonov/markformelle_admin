import { useState } from "react";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import CSearchInput from "../../../components/CElements/CSearchInput";
import { Header } from "../../../components/UI/Header";
import { breadCrumbItems, FetchFunction } from "./Logic";
import MachineCard from "./Card";
import CCheckButton from "../../../components/CElements/CCheckButton";

const searchedWords = ["stop_mins", "ip_address", "message"];

const Dashboard = () => {
  const { bodyData } = FetchFunction();
  const [searchVal, setSearchVal] = useState([]);
  const [checked, setChecked]: any = useState(["net", "planned", "stop"]);

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
            data.push(obj[word]);
          }
        }
      });
    });

    setSearchVal(data);
  };

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbItems} progmatic={true} />}>
        <div className="w-[240px] relative">
          <CSearchInput handleChange={searchWods} />
          {searchVal?.length ? (
            <div className="absolute left-0 top-full bg-white shadow-lg rounded-[12px] w-full overflow-scroll max-h-[400px]">
              <ul className="space-y-2">
                {searchVal.map((item: string) => (
                  <li
                    key={item}
                    className="hover:bg-[var(--border)] py-1 px-4 cursor-pointer"
                  >
                    <button>{item}</button>
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
            color="red"
            element={{ label: "net plan" }}
            checked={checked.includes("net")}
            handleCheck={() => filterCheckbox("net")}
          />
          <CCheckButton
            color="green"
            element={{ label: "planned" }}
            checked={checked.includes("planned")}
            handleCheck={() => filterCheckbox("planned")}
          />
          <CCheckButton
            color="yellow"
            element={{ label: "stoped" }}
            checked={checked.includes("stop")}
            handleCheck={() => filterCheckbox("stop")}
          />
        </div>
      </Header>

      <div className="container">
        <div className="grid grid-cols-11 gap-5">
          {bodyData.map((machine: any, index: number) => (
            <MachineCard key={index} machine={machine} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
