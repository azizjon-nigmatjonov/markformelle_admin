import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import { DryList } from "../Drying/List";
const breadCrumbs = [{ label: "Пост обработка", link: "/paint/dashboard" }];

const PosPage = () => {
  const list = [
    {
      pkol_knit: "123",
      color: "green",
      npan: "1111",
      ReceteId: "24-3434.32323",
      date_start: "13:00",
      date_end: "15:00",
      pantone_data: {
        name: "Spun Sugar",
        hex: "d9dbde",
      },
      nplan: "532",
      worked_date: "02:00",
    },
  ];
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
      <DryList data={list} />
    </>
  );
};

export default PosPage;
