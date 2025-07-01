import { useEffect, useState } from "react";
import CNewTable from "../../../../components/CElements/CNewTable";
import { PaintTableLogic } from "./Logic";
import { PaintForm } from "../Modal/Forms/PaintForm";

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
  const { isLoading, headColumns, bodyColumns } = PaintTableLogic({
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
          <div className="absolute top-10 left-20 bg-white z-50 border border-[var(--gray30)] rounded-[12px] p-2 shadow-2xl">
            <ul>
              <li className="py-1">
                <button
                  onClick={() => {
                    handleActionsTable({}, "modal", "paint");
                    setOpen(false);
                  }}
                >
                  Boya Siparis Detay Girisi (Kumash)
                </button>
              </li>
              <li className="py-1">
                <button
                  onClick={() => {
                    handleActionsTable({}, "modal_iplik", "paint");
                    setOpen(false);
                  }}
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
          handleActions={(val: string) => {
            handleActionsTable({}, val, "paint");
          }}
          defaultData={currentPaint}
          uniqueID={uniqueID}
        />
      )}
      {uniqueID === "paint_form_iplik" && (
        <PaintForm
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