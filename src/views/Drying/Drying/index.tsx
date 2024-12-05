import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import { DryList } from "./List";
const breadCrumbs = [{ label: "Сушилка", link: "/paint/dashboard" }];

const DryingPage = () => {
  return (
    <>
      <Header
        extra={
          <CBreadcrumbs items={breadCrumbs} progmatic={true} type="link" />
        }
      >
        {/* <div className="mr-3">
          <GlobalSearch list={data ?? []} setList={setList} />
        </div> */}
        {/* <ToggleBtn type={type} setType={setType} /> */}
      </Header>
      <DryList />
    </>
  );
};

export default DryingPage;
