import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import CSelect from "../../../components/CElements/CSelect";
import { Header } from "../../../components/UI/Header";
import MachineCard from "./Card";
import { breadCrumbItems, FetchFunction } from "./Logic";

const Options = [
  {
    label: "Option 1",
    value: 1,
  },
  {
    label: "Option 2",
    value: 2,
  },
  {
    label: "Option 3",
    value: 3,
  },
];

const Dashboard = () => {
  const { bodyData } = FetchFunction();

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbItems} progmatic={true} />}>
        <div className="w-[150px]">
          <CSelect options={Options} placeholder="choose" />
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
