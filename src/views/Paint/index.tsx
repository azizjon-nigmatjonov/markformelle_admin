import { useState } from "react";
import { Header } from "../../components/UI/Header";
import { ToggleBtn } from "../../components/UI/ToggleBtn";
import { PaintList } from "./Components/List";
import { MockData } from "./Components/Logic";
import { PaintTable } from "./Components/Table";
// import useCQuery from "../../hooks/useCQuery";
// import { PaintListSkeleton, PaintSkeletons } from "./Components/Skeleton";
// import { useSelector } from "react-redux";

const PaintSection = () => {
  const [type, setType] = useState("grid");
  // const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  // const { data, isLoading, refetch } = useCQuery({
  //   key: `GET_PAINT_LIST`,
  //   endpoint: `http://srv-nav.praktik.loc:1991/WEB_ALL`,
  //   params: {
  //     // page: 1,
  //   },
  // });

  // useEffect(() => {
  //   const refetching = setInterval(() => {
  //     refetch();
  //   }, 30000);

  //   return () => {
  //     clearInterval(refetching);
  //   };
  // }, []);

  // if (isLoading) {
  //   switch (type) {
  //     case "grid":
  //       return <PaintSkeletons openHeader={openHeader} />;
  //     default:
  //       return <PaintListSkeleton openHeader={openHeader} />;
  //   }
  // }

  return (
    <>
      <Header extra={<h1 className="title-header">Дашборд покраска</h1>}>
        <ToggleBtn type={type} setType={setType} />
      </Header>
      {type === "grid" ? (
        <PaintList data={MockData} />
      ) : (
        <PaintTable list={MockData} />
      )}
    </>
  );
};

export default PaintSection;
