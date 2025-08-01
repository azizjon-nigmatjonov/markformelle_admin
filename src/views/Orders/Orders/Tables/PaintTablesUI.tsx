import { useEffect, useState } from "react";
import CNewTable from "../../../../components/CElements/CNewTable";

export const PaintTablesUI = ({
  handleActionsTable,
  formId,
  setCurrentPaint = () => {},
  currentPaint,
  title,
  isLoading,
  headColumns = [],
  bodyColumns,
  deleteFn,
  filterParams,
  setFilterParams = () => {},
  defaultFilters = [],
}: {
  title?: string;
  formId: number;
  currentPaint?: any;
  setCurrentPaint?: (obj: any) => void;
  handleActionsTable: (val: any, status: string, type: string) => void;
  isLoading?: boolean;
  headColumns?: any[];
  bodyColumns?: any[];
  deleteFn: (id: string[]) => void;
  filterParams?: any;
  setFilterParams?: (val: any) => void;
  defaultFilters: string[];
}) => {
  const [open, setOpen] = useState(false);

  const handleActions = (el: any, status: string) => {
    if (status === "view_single") {
      setCurrentPaint(el);
    } else {
      handleActionsTable(el, status, "paint");
    }
    if (status === "delete" && deleteFn) {
      deleteFn([el.BOYASIPARISDETAYID.toString()]);
    }
    if (status === "delete_multiple" && deleteFn) {
      deleteFn(
        el.map((item: { BOYASIPARISDETAYID: number }) => {
          return item.BOYASIPARISDETAYID.toString();
        })
      );
    }
  };

  useEffect(() => {
    if (formId) {
      setFilterParams({
        ...filterParams,
        BOYASIPARISKAYITID: formId,
      });
    }
  }, [formId]);

  return (
    <div className="relative">
      <CNewTable
        key={headColumns.length}
        headColumns={headColumns}
        defaultFilters={defaultFilters}
        currentIdRow={currentPaint?.index ? currentPaint.index : undefined}
        idForTable="paint_table_inner"
        innerTable={true}
        handleActions={(obj: any, status: string) => {
          if (status === "modal") {
            setOpen(true);
          } else {
            handleActions(obj, status);
          }
        }}
        title={title}
        bodyColumns={bodyColumns}
        autoHeight="180px"
        handleFilterParams={(params: any) => {
          setFilterParams?.(params);
        }}
        isLoading={isLoading}
        disablePagination={true}
        filterParams={filterParams}
      />
      {open && (
        <>
          <div className="absolute top-10 left-2 bg-white z-50 border border-[var(--gray30)] rounded-[8px] shadow-2xl">
            <div
              onClick={() => {
                handleActionsTable({}, "modal", "paint");
                setOpen(false);
              }}
              className="hover:bg-[var(--primary50)] p-2 rounded-[8px] w-full cursor-pointer"
            >
              Boya Siparis Detay Girisi (Kumash)
            </div>
            <div
              onClick={() => {
                handleActionsTable({}, "modal_yarn", "paint");
                setOpen(false);
              }}
              className="hover:bg-[var(--primary50)] p-2 rounded-[8px] w-full cursor-pointer"
            >
              Boya Siparis Detay Girisi (Iplik)
            </div>
          </div>

          <div
            className="fixed left-0 top-0 w-full h-full z-40"
            onClick={() => setOpen(false)}
          ></div>
        </>
      )}{" "}
    </div>
  );
};
