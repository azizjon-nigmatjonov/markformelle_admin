import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { CollapseUI } from "../../../../components/CElements/CCollapse";
import CNewModal from "../../../../components/CElements/CNewModal";
import { ModalLogic } from "../Logic";
import { FetchModal } from "./Logic";
import CDatepicker from "../../../../components/CElements/CDatePicker/CDatepicker";
import CNewTable from "../../../../components/CElements/CNewTable";
import CModal from "../../../../components/CElements/CModal";
import { TableForm } from "./TableForm";

const FieldUI = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between space-x-3 whitespace-nowrap">
      <p className="text-sm">{title}</p>
      <hr className="w-[90%] border-t-[3px] border-dotted border-[var(--border)]" />
      <div className="max-w-[50%] min-w-[50%]">{children}</div>
    </div>
  );
};

export const ModalUI = ({
  element,
  setModalList,
  modalList,
}: {
  element: any;
  setModalList: any;
  modalList: any;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow]: any = useState(null);
  const [filterParams, setFilterParams] = useState({
    page: 1,
    perPage: 50,
  });
  const { handleActionsModal } = ModalLogic({ setModalList, modalList });
  const { defaultData, tableData, headColumns, urunData } = FetchModal({
    id: element.id,
    urunId: selectedRow?.URUNID,
  });
  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleActions = (el: any, type: string) => {
    if (type === "edit") {
      setOpen(true);
      setSelectedRow(el);
    }

    if (type === "modal") {
      setOpen(true);
    }
  };

  return (
    <CNewModal
      title={`Документ перемещения ${
        element.IRSALIYENO ? "№" + element.IRSALIYENO : ""
      }`}
      action="add"
      handleActions={handleActionsModal}
      element={element}
      list={modalList}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="w-full">
          <div className="grid grid-cols-4 gap-x-5 gap-y-2 pb-5">
            <div className="space-y-2">
              <FieldUI title="depo no">
                <HFTextField
                  control={control}
                  name="DEPOID"
                  defaultValue={defaultData?.DEPOID}
                />
              </FieldUI>
              <FieldUI title="transfer depo no">
                <HFTextField
                  control={control}
                  name="TRANSFERDEPOID"
                  defaultValue={defaultData?.TRANSFERDEPOID}
                />
              </FieldUI>
            </div>

            <div className="space-y-2">
              <FieldUI title="irsaliye no">
                <HFTextField
                  control={control}
                  name="IRSALIYEID"
                  defaultValue={defaultData?.IRSALIYEID}
                />
              </FieldUI>
              <FieldUI title="doviz cinsi">
                <HFTextField
                  control={control}
                  name="DOVIZID"
                  defaultValue={defaultData?.DOVIZID}
                />
              </FieldUI>
            </div>

            <div>
              <FieldUI title="tarih">
                <CDatepicker
                  defaultValue={defaultData?.IRSALIYETARIHI}
                  format="DD.MM.YYYY"
                />
              </FieldUI>
            </div>
            <div>
              <FieldUI title="sevik tarihi">
                <CDatepicker defaultValue={defaultData?.INSERTTARIHI} />
              </FieldUI>
            </div>
          </div>
        </div>

        <CollapseUI title="Таблица" defaultOpen={true}>
          <CNewTable
            title="Примешенныей"
            headColumns={headColumns}
            bodyColumns={tableData?.data ?? []}
            handleActions={handleActions}
            isLoading={false}
            filterParams={filterParams}
            autoHeight={"440px"}
            disablePagination={true}
            idForTable="modal"
            handleFilterParams={setFilterParams}
          />
        </CollapseUI>
      </form>

      <CModal
        open={open}
        title="Примешенные"
        footerActive={false}
        handleClose={() => setOpen(false)}
      >
        <div className="p-3">
          <TableForm
            setOpen={setOpen}
            defaultData={{
              ...selectedRow,
              urunAdi: urunData?.ADI,
              URUNID: urunData?.URUNID,
            }}
          />
        </div>
      </CModal>
    </CNewModal>
  );
};
