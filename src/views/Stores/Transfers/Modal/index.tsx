import { ReactNode, useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { SelectOptions } from "../../../../components/UI/Options";
import { convertToISO } from "../../../../utils/getDate";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ITransferCreate,
  ITransferElement,
  ITransferFormData,
} from "../../../../interfaces/transfers";
import { CollapseUI } from "../../../../components/CElements/CCollapse";
import { ModalLogic } from "../Logic";
import { FetchModal } from "./Logic";
import { TableForm } from "./TableForm";
import HFSelect from "../../../../components/HFElements/HFSelect";
import HFTextField from "../../../../components/HFElements/HFTextField";
import dayjs from "dayjs";
import CNewModal from "../../../../components/CElements/CNewModal";
import CNewTable from "../../../../components/CElements/CNewTable";
import { IFilterParams } from "../../../../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { Validation } from "./Validate";
const schema = Validation;

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
  element = {} as Partial<ITransferElement>,
  modalList = [],
  setModalList = () => {},
  createElement = () => {},
}: {
  element: Partial<ITransferElement>;
  setModalList: (list: ITransferElement[]) => void;
  modalList: ITransferElement[];
  createElement: (val: ITransferElement) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [tableOpen, setTableOpen] = useState(!!element.id);
  const [selectedRow, setSelectedRow] = useState<ITransferElement | null>(null);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  const { handleActionsModal, depoOptions, dovizOptions } = ModalLogic({
    setModalList,
    modalList,
  });
  const { defaultData, tableData, headColumns, refetch } = FetchModal({
    id: element.id,
    urunId: selectedRow?.URUNID,
  });
  const [formData, setFormData]: any = useState({});

  const { control, handleSubmit, setValue } = useForm<ITransferFormData>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ITransferFormData> = (data) => {
    const params: Partial<ITransferCreate> = {
      HAREKETTIPI: 5,
      FIRMAID: null,
      NOTU: "",
      SINIF: "B",
      INSERTKULLANICIID: 1,
      KULLANICIID: 1,
      DEGISIMTARIHI: "2025-03-26T11:06:37.447Z",
      IRSALIYENO: data.IRSALIYENO ? String(data.IRSALIYENO) : "",
      IRSALIYETARIHI: data.IRSALIYETARIHI,
      INSERTTARIHI: String(data.INSERTTARIHI),
      DEPOID: data.DEPOID ? String(data.DEPOID) : undefined, //
      TRANSFERDEPOID: data.TRANSFERDEPOID
        ? String(data.TRANSFERDEPOID)
        : undefined,
      DOVIZID: data.DOVIZID ? String(data.DOVIZID) : undefined,
    };

    if (params.INSERTTARIHI) {
      params.INSERTTARIHI = convertToISO(params.INSERTTARIHI);
    }
    if (params.IRSALIYETARIHI) {
      params.IRSALIYETARIHI = convertToISO(params.IRSALIYETARIHI);
    }

    const response: any = createElement(params);
    if (response?.id) setTableOpen(true);
  };

  const handleActions = (el: ITransferElement, type: string) => {
    if (type === "edit") {
      setOpen(true);
      setSelectedRow(el);
    }

    if (type === "modal") setOpen(true);
  };

  useEffect(() => {
    if (defaultData?.IRSALIYETARIHI) {
      setValue(
        "IRSALIYETARIHI",
        dayjs(defaultData?.IRSALIYETARIHI).format("DD.MM.YYYY")
      );
    } else {
      setValue("IRSALIYETARIHI", dayjs().format("DD.MM.YYYY"));
    }

    if (defaultData?.INSERTTARIHI) {
      setValue(
        "INSERTTARIHI",
        dayjs(defaultData?.INSERTTARIHI).format("DD.MM.YYYY HH:MM")
      );
    } else {
      setValue("INSERTTARIHI", dayjs().format("DD.MM.YYYY HH:MM"));
    }
  }, [defaultData]);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex space-x-4">
          <div className="grid grid-cols-3 gap-x-5 gap-y-2 pb-5 w-full">
            <div className="space-y-2">
              <FieldUI title="irsaliye no">
                <div className="flex items-center space-x-2">
                  <HFTextField
                    control={control}
                    name="IRSALIYENO"
                    defaultValue={defaultData?.IRSALIYENO}
                  />
                </div>
              </FieldUI>
              <FieldUI title="tarih">
                <HFTextField
                  control={control}
                  name="IRSALIYETARIHI"
                  readOnly={true}
                />
              </FieldUI>
            </div>

            <div className="space-y-2">
              <FieldUI title="Depo no">
                <div className="flex items-center space-x-2">
                  <SelectOptions
                    name="DEPOID"
                    options={depoOptions}
                    handleSelect={(val: any) => {
                      setValue("DEPOID", val);
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

            <div className="space-y-2">
              <FieldUI title="Transfer depo no">
                <div className="flex items-center space-x-2">
                  <SelectOptions
                    name="TRANSFERDEPOID"
                    options={depoOptions}
                    handleSelect={(val: any) => {
                      setValue("TRANSFERDEPOID", val);
                      setFormData({ ...formData, TRANSFERDEPOID: val.title });
                    }}
                    defaultValue={formData.TRANSFERDEPOID}
                  />
                  <Tooltip title={formData.TRANSFERDEPOID}>
                    <HFTextField control={control} name="TRANSFERDEPOID" />
                  </Tooltip>
                </div>
              </FieldUI>
              <FieldUI title="sevik tarihi">
                <div className="flex space-x-2">
                  <div className="w-[20px]"></div>

                  <HFTextField
                    control={control}
                    name="INSERTTARIHI"
                    readOnly={true}
                  />
                </div>
              </FieldUI>
            </div>
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

        <CollapseUI title="Таблица" defaultOpen={tableOpen}>
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

      {open && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[99]">
          <TableForm
            setOpen={setOpen}
            defaultData={{
              ...selectedRow,
              ...defaultData,
            }}
            refetch={refetch}
          />

          <div className="w-[100vw] h-[100vh] bg-[#00000044] fixed z-[91]"></div>
        </div>
      )}
    </CNewModal>
  );
};
