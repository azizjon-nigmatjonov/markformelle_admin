import CBreadcrumbs from "../../components/CElements/CBreadcrumbs";
import { Header } from "../../components/UI/Header";
import MachineCard from "./Card";
import { breadCrumbItems, FetchFunction } from "./Logic";

const Dashboard = () => {
  const { bodyData } = FetchFunction();

  return (
    <>
      <Header
        extra={<CBreadcrumbs items={breadCrumbItems} progmatic={true} />}
      ></Header>

      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-5">
          {bodyData.map((machine: any, index: number) => (
            <MachineCard key={index} machine={machine} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
