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
}: {
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
  const { isLoading, headColumns, bodyColumns, refetch } = PaintTableLogic({
    filterParams,
  });

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
        defaultFilters={["add", "excel_download"]}
        idForTable="paint_table_inner"
        handleActions={(obj: any, status: string) => {
          if (status === "modal") {
            setOpen(true);
          } else {
            handleActionsTable(obj, status, "paint");
          }
        }}
        bodyColumns={bodyColumns}
        autoHeight="250px"
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
                    handleActionsTable({}, "modal_iplik", "paint");
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
      {uniqueID === "paint_form" && (
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
      {uniqueID === "paint_form_iplik" && (
        <PaintFormYarn
          title=" Boya Siparis Detay Girisi (Iplik)"
          handleActions={(val: string) => {
            handleActionsTable({}, val, "paint");
          }}
          defaultData={currentPaint}
          uniqueID={uniqueID}
        />
      )}
    </div>
  );
};
