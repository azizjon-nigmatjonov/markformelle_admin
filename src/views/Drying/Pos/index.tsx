import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import { DryList } from "../Drying/List";
const breadCrumbs = [{ label: "Пост обработка", link: "/paint/dashboard" }];

const PosPage = () => {
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

export default PosPage;
