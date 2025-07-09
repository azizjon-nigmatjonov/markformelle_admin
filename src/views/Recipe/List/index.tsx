import { ModalUIRecipe } from "./Modal";
import { useEffect, useState } from "react";
import { breadCrumbs, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { IFilterParams } from "../../../interfaces";
import CNewModal from "../../../components/CElements/CNewModal";
import { playSound } from "../../../utils/playAudio";
import dayjs from "dayjs";
import { useTableHeaders } from "../../../hooks/useTableHeaders";

export const RecipeList = () => {
  const [open, setOpen] = useState<string[]>([]);
  const [changed, setChanged] = useState("");
  const [askAction, setAskAction] = useState("");
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  const [modalInitialData, setModalInitialData] = useState<any>({});
  const { bodyColumns, isLoading, bodyData, deleteFn, refetch } = TableData({
    filterParams,
  });

  const predefinedColumns = [
    {
      id: "CALISMATARIHI",
      title: "CALISMATARIHI",
      width: 100,
      renderValue: (val: string) => {
        return dayjs(val).format("DD.MM.YYYY");
      },
    },
  ];

  const { newHeadColumns } = useTableHeaders({
    bodyColumns,
    predefinedColumns,
  });

  useEffect(() => {
    refetch();
  }, [open]);

  const handleActions = (el: any, status: string) => {
    if (status === "modal") {
      setOpen(["card"]);
    }

    if (status === "view" || status === "edit") {
      setOpen(["card"]);

      setModalInitialData({
        RECETEID: el?.RECETEID,
        ...el,
      });
    }

    if (status === "delete_multiple") {
      console.log(el);
    }

    if (status === "delete") {
      deleteFn([el.RECETEID]);
      setFilterParams({ page: 0, perPage: 50 });
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { RECETEID: string }) => {
          return item.RECETEID;
        })
      );
      setFilterParams({ page: 0, perPage: 50 });
    }
  };

  const handleModalActions = (status: string, id: string) => {
    if (status === "close") {
      if (!changed && open.length === 1) {
        setModalInitialData({});
        setOpen([]);
      } else {
        playSound("/error-m.mp3");
        setAskAction(changed);
      }
    }
    if (status === "delete") {
      setOpen([]);
      deleteFn([id]);
    }
  };

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />} />
      <div className="p-2">
        <CNewTable
          title={"table_recipe"}
          headColumns={newHeadColumns}
          bodyColumns={bodyColumns}
          handleActions={handleActions}
          isLoading={isLoading}
          filterParams={filterParams}
          handleFilterParams={setFilterParams}
          defaultFilters={[
            "sidebar_filter",
            "add",
            "delete",
            "actions",
            "excel_download",
            "active_menu",
            "filter",
            "sellect_more",
          ]}
          defaultSearch={{ RECETEID: "" }}
          meta={{
            totalCount: bodyData?.count,
            pageCount: bodyData?.count
              ? Math.ceil(bodyData?.count / filterParams?.perPage)
              : 0,
          }}
        />
      </div>

      {open.length || changed ? (
        <CNewModal
          title={
            modalInitialData.RECETEID ? "updating_recipe" : "creating_recipe"
          }
          handleActions={handleModalActions}
          defaultData={{
            id: modalInitialData?.RECETEID,
          }}
          disabled="big"
        >
          <ModalUIRecipe
            defaultData={modalInitialData}
            changed={changed}
            setChanged={setChanged}
            askAction={askAction}
            open={open}
            setOpen={setOpen}
            setAskAction={setAskAction}
          />
        </CNewModal>
      ) : (
        ""
      )}
    </>
  );
};
