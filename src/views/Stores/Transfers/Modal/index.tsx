import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { CollapseUI } from "../../../../components/CElements/CCollapse";
import CNewModal from "../../../../components/CElements/CNewModal";
import { ModalLogic } from "../Logic";
import { FetchModal } from "./Logic";
import CNewTable from "../../../../components/CElements/CNewTable";
import CModal from "../../../../components/CElements/CModal";
import { TableForm } from "./TableForm";
import HFSelect from "../../../../components/HFElements/HFSelect";
import { Tooltip } from "@mui/material";
import { SelectOptions } from "../../../../components/UI/Options";
import { useIrsaliyeFetch } from "../../../../hooks/useIrsaliyeFetch";
import { HFDatePicker } from "../../../../components/HFElements/HFDatePicker";
import { convertToISO } from "../../../../utils/getDate";
import dayjs from "dayjs";

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
  createElement,
}: {
  element: any;
  setModalList: any;
  modalList: any;
  createElement: (val: any) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow]: any = useState(null);
  const [filterParams, setFilterParams] = useState({
    page: 1,
    perPage: 50,
  });
  const { handleActionsModal, depoOptions, dovizOptions } = ModalLogic({
    setModalList,
    modalList,
  });
  const { defaultData, tableData, headColumns, urunData } = FetchModal({
    id: element.id,
    urunId: selectedRow?.URUNID,
  });
  const [formData, setFormData]: any = useState({});
  const { irsaliyeData } = useIrsaliyeFetch({
    filterParams: { page: 1, perPage: 100 },
  });
  const { control, handleSubmit, setValue } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    const params = {
      HAREKETTIPI: 5,
      FIRMAID: null,
      DEPOID: "D003",
      TRANSFERDEPOID: "D008",
      SERINO: "1",
      IRSALIYENO: 26032125,
      IRSALIYETARIHI: "2025-03-26T11:06:37.447Z",
      EVRAKKAYITID: 2028,
      FIILISEVKTARIHI: "2025-03-26T11:06:37.447Z",
      DOVIZID: "USD",
      NOTU: "",
      SINIF: "B",
      INSERTKULLANICIID: 1,
      INSERTTARIHI: "2025-03-26T11:06:37.447Z",
      KULLANICIID: 1,
      DEGISIMTARIHI: "2025-03-26T11:06:37.447Z",
      ...data,
    };
    params.INSERTTARIHI = convertToISO(params.INSERTTARIHI);
    params.IRSALIYETARIHI = convertToISO(params.IRSALIYETARIHI);

    createElement(params);
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

  const handleValues = (obj: any, status: string) => {
    setValue(status, obj.value);
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
              <FieldUI title="Depo no">
                <div className="flex items-center space-x-2">
                  <SelectOptions
                    name="DEPOID"
                    options={depoOptions}
                    handleSelect={(val: any) => {
                      handleValues(val, "DEPOID");
                      setFormData({ ...formData, DEPOID: val.title });
                    }}
                    defaultValue={formData.DEPOID}
                  />
                  <Tooltip title={formData?.DEPOID}>
                    <HFTextField
                      control={control}
                      name="DEPOID"
                      defaultValue={defaultData?.DEPOID}
                    />
                  </Tooltip>
                </div>
              </FieldUI>
              <FieldUI title="Transfer depo no">
                <div className="flex items-center space-x-2">
                  <SelectOptions
                    name="TRANSFERDEPOID"
                    options={depoOptions}
                    handleSelect={(val: any) => {
                      handleValues(val, "TRANSFERDEPOID");
                      setFormData({ ...formData, TRANSFERDEPOID: val.title });
                    }}
                    defaultValue={formData.TRANSFERDEPOID}
                  />
                  <Tooltip title={formData.TRANSFERDEPOID}>
                    <HFTextField control={control} name="TRANSFERDEPOID" />
                  </Tooltip>
                </div>
              </FieldUI>
            </div>

            <div className="space-y-2">
              <FieldUI title="irsaliye no">
                <div className="flex items-center space-x-2">
                  <SelectOptions
                    name="IRSALIYENO"
                    options={irsaliyeData?.data?.map((item: any) => {
                      return {
                        label: item.IRSALIYENO,
                        title: item.IRSALIYENO,
                        value: item.IRSALIYENO,
                      };
                    })}
                    handleSelect={(val: any) => {
                      handleValues(val, "IRSALIYENO");
                      setFormData({ ...formData, IRSALIYENO: val.title });
                    }}
                    defaultValue={formData.IRSALIYENO}
                  />
                  <Tooltip title={formData.IRSALIYENO}>
                    <HFTextField
                      control={control}
                      name="IRSALIYENO"
                      defaultValue={defaultData?.IRSALIYENO}
                    />
                  </Tooltip>
                </div>
              </FieldUI>
              <FieldUI title="doviz cinsi">
                <div className="flex space-x-2">
                  <div className="w-[20px]"></div>
                  <HFSelect
                    name="DOVIZID"
                    control={control}
                    options={dovizOptions}
                    defaultValue="USD"
                  />
                </div>
              </FieldUI>
            </div>

            <div>
              <FieldUI title="tarih">
                <HFDatePicker
                  control={control}
                  name="IRSALIYETARIHI"
                  defaultValue={defaultData?.IRSALIYETARIHI || dayjs()}
                  format="DD.MM.YYYY"
                  disabled={true}
                />
              </FieldUI>
              <FieldUI title="sevik tarihi">
                <HFDatePicker
                  control={control}
                  name="INSERTTARIHI"
                  defaultValue={defaultData?.INSERTTARIHI || dayjs()}
                  disabled={true}
                />
              </FieldUI>
            </div>
            <div className="space-y-2 flex justify-end">
              <button
                className="custom-btn"
                type="submit"
                style={{ maxWidth: "100px" }}
              >
                Сохранить
              </button>
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
