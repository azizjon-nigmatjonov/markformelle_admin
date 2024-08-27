import { useState } from "react";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import CSearchInput from "../../../components/CElements/CSearchInput";
import { Header } from "../../../components/UI/Header";
import { breadCrumbItems, FetchFunction } from "./Logic";
import CCheckbox from "../../../components/CElements/CCheckbox";
import MachineCard from "./Card";

const Dashboard = () => {
  const { bodyData } = FetchFunction();
  const [searchVal, setSearchVal] = useState("");
  const [checked, setChecked]: any = useState(["net", "planned", "stop"]);

  const filterCheckbox = (val: string) => {
    if (checked.includes(val)) {
      setChecked(checked.filter((i: string) => i !== val));
    } else {
      setChecked((prev: string) => [...prev, val]);
    }
  };

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbItems} progmatic={true} />}>
        <div className="mr-5 flex space-x-5">
          <CCheckbox
            element={{ label: "net plan" }}
            checked={checked.includes("net")}
            handleCheck={() => filterCheckbox("net")}
          />
          <CCheckbox
            element={{ label: "planned" }}
            checked={checked.includes("planned")}
            handleCheck={() => filterCheckbox("planned")}
          />
          <CCheckbox
            element={{ label: "stoped" }}
            checked={checked.includes("stop")}
            handleCheck={() => filterCheckbox("stop")}
          />
        </div>
        <div className="w-[240px] relative">
          <CSearchInput handleChange={setSearchVal} />
          {searchVal ? (
            <div className="absolute left-0 top-full bg-white shadow-lg p-5 rounded-[12px] w-full">
              <ul>
                <li>tavsiya</li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </Header>

      <div className="container overflow-scroll">
        <div className="grid grid-cols-11 gap-5 min-w-[1900px]">
          {bodyData.map((machine: any, index: number) => (
            <MachineCard key={index} machine={machine} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
