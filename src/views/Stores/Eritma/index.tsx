import { useState } from "react";
import { breadCrumbs, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { ModalList } from "./ModalList";

export const EritmaPage = () => {
  const [modalList, setModalList]: any = useState([]);
  const [filterParams, setFilterParams] = useState({
    page: 1,
    perPage: 10,
  });

  const handleActionsModal = (val: string, element?: any) => {
    if (val === "edit_modal") {
      setModalList(
        modalList?.map((item: any) => {
          return {
            ...item,
            type: "edit",
            id: element?.URUNID,
            initial_order: item.order,
          };
        })
      );
    }
    if (val === "edit") {
      setModalList([
        ...modalList,
        {
          order: modalList.length + 1,
          initial_order: modalList.length + 1,
          type: "edit",
          id: element?.URUNID,
        },
      ]);
    }

    if (val === "close") {
      setModalList(
        modalList.filter((item: any) => item.order !== element.order)
      );
    }

    if (val === "reorder") {
      const newModalList = reorderItems(
        modalList,
        element.order - 1,
        modalList.length
      );

      setModalList(newModalList);
    }
    if (val === "add") {
      setModalList([
        ...modalList,
        {
          order: modalList.length + 1,
          initial_order: modalList.length + 1,
          type: "add",
        },
      ]);
    }
  };

  const { headColumns, bodyColumns, handleActions, isLoading, bodyData } =
    TableData({
      handleActionsModal,
      filterParams,
    });

  const reorderItems = (array: any[], fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return array;

    const newArray = [...array];
    const [movedItem] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, movedItem);

    return newArray?.map((item, index) => {
      return {
        ...item,
        order: index + 1,
      };
    });
  };

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />} />
      <div className="p-2">
        <CNewTable
          title="Eritma tablitsasi"
          headColumns={headColumns}
          bodyColumns={bodyColumns}
          handleActions={handleActions}
          isLoading={isLoading}
          filterParams={filterParams}
          handleFilterParams={setFilterParams}
          meta={{
            totalCount: bodyColumns?.count,
            pageCount: bodyData?.length,
          }}
        />
      </div>

      {modalList.map((item: any) => (
        <div key={item.order}>
          <ModalList
            handleActionsModal={handleActionsModal}
            item={item}
            modalList={modalList}
          />
        </div>
      ))}
    </>
  );
};
