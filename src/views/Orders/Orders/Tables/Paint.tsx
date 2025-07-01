import { useEffect, useState } from "react";
import CNewTable from "../../../../components/CElements/CNewTable";
import { PaintTableLogic } from "./Logic";
import { PaintForm } from "../Modal/Forms/PaintForm";
import { PaintFormYarn } from "../Modal/Forms/PaintFormYarn";
export const PaintTable = ({
  handleActionsTable,
  formId,
  uniqueID,
  currentPaint,
  title,
}: {
  title?: string;
  formId: number;
  uniqueID: string;
  currentPaint: any;
  handleActionsTable: (val: any, status: string, type: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [filterParams, setFilterParams]: any = useState({
    page: 1,
    perPage: 50,
  });
  const { isLoading, headColumns, bodyColumns, refetch, deleteFn } =
    PaintTableLogic({
      filterParams,
    });

  const handleActions = (el: any, status: string) => {
    if (status === "delete") {
      deleteFn([el.BOYASIPARISDETAYID]);
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { BOYASIPARISDETAYID: number }) => {
          return item.BOYASIPARISDETAYID;
        })
      );
    }
  };

  useEffect(() => {
    if (formId) {
      setFilterParams({ ...filterParams, BOYASIPARISKAYITID: formId });
    }
  }, [formId]);

  return (
    <div className="relative">
      <CNewTable
        key={headColumns.length}
        headColumns={headColumns}
        defaultFilters={
          title
            ? [
                "add",
                "delete",
                "excel_download",
                "excel_upload",
                "filter",
                "active_menu",
                "actions",
                "sellect_more",
              ]
            : []
        }
        idForTable="paint_table_inner"
        innerTable={true}
        handleActions={(obj: any, status: string) => {
          if (status === "modal") {
            setOpen(true);
          } else {
            handleActionsTable(obj, status, "paint");
            handleActions(obj, status);
          }
        }}
        bodyColumns={title ? bodyColumns : []}
        autoHeight="180px"
        handleFilterParams={(params: any) => {
          setFilterParams(params);
        }}
        isLoading={isLoading}
        disablePagination={true}
        filterParams={filterParams}
      />
      {open && (
        <>
          <div className="absolute top-10 left-2 bg-white z-50 border border-[var(--gray30)] rounded-[12px] shadow-2xl">
            <ul className="rounded-[12px] flex flex-col items-start w-[300px] text-left">
              <li className="hover:bg-[var(--primary50)] p-2 rounded-[12px] w-full">
                <button
                  onClick={() => {
                    handleActionsTable({}, "modal", "paint");
                    setOpen(false);
                  }}
                  className="w-full"
                >
                  Boya Siparis Detay Girisi (Kumash)
                </button>
              </li>
              <li className="hover:bg-[var(--primary50)] p-2 rounded-[12px] w-full">
                <button
                  onClick={() => {
                    handleActionsTable({}, "modal_yarn", "paint");
                    setOpen(false);
                  }}
                  className="w-full"
                >
                  Boya Siparis Detay Girisi (Iplik)
                </button>
              </li>
            </ul>
          </div>
          <div
            className="fixed left-0 top-0 w-full h-full z-40"
            onClick={() => setOpen(false)}
          ></div>
        </>
      )}
      {uniqueID === "paint_form" && title && (
        <PaintForm
          parentId={formId}
          title="Boya Siparis Detay Girisi (Kumash)"
          handleActions={(val: string) => {
            handleActionsTable({}, val, "paint");
          }}
          defaultData={currentPaint}
          uniqueID={uniqueID}
          refetch={refetch}
        />
      )}
      {uniqueID === "paint_form_iplik" && title && (
        <PaintFormYarn
          title=" Boya Siparis Detay Girisi (Iplik)"
          handleActions={(val: string) => {
            handleActionsTable({}, val + "_yarn", "paint");
          }}
          defaultData={currentPaint}
          uniqueID={uniqueID}
        />
      )}
    </div>
  );
};
