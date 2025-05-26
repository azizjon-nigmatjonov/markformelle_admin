import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CollapseUI } from "../../../../components/CElements/CCollapse";
import { ModalTypes } from "../interfaces";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { useGetUrunTypeList } from "../../../../hooks/useFetchRequests/useUrunType";
import { ModalTableLogic, TablesLogic } from "./Logic";
import dayjs from "dayjs";
import { LabModalTables } from "./Tables";
import { InputFields } from "./Components/InputFields";
import { GetCurrentDate } from "../../../../utils/getDate";
import { ColorMaterial } from "./Components/ColorMaterial";
import CNewModal from "../../../../components/CElements/CNewModal";

interface ModalUIProps {
  defaultData?: ModalTypes;
  URUNBIRIMID?: string;
  ADI?: string;
  handleModalActions: (val: string, val2: string) => void;
  modalInitialData: any;
  open: boolean;
  showUI: boolean;
  firmaData: any;
  setShowUI: (val: boolean) => void;
  filterParamsFirm: any;
  setFilterParamsFirm: (val: any) => void;
}

export const ModalUI = ({
  open = false,
  defaultData = {},
  handleModalActions,
  showUI = false,
  setShowUI = () => {},
  firmaData,
  modalInitialData = [],
  filterParamsFirm,
  setFilterParamsFirm,
}: ModalUIProps) => {
  const { t } = useTranslationHook();
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 100 });
  const [formId, setFormId] = useState<number>(0);
  const [disabled, setDisabled] = useState(true);
  const { control, handleSubmit, setValue } = useForm<any>({
    mode: "onSubmit",
  });
  const { tableData } = TablesLogic({ formId });
  console.log("tableData", tableData);

  const { createForm, updateForm, formData } = ModalTableLogic({
    filterParams,
    setFormId,
    urunId: defaultData?.LABRECETEID || formId,
  });

  useEffect(() => {
    if (formId) setDisabled(false);
  }, [formId]);

  useEffect(() => {
    if (!open) setShowUI(false);
  }, [open]);

  const {
    setFilterParams: setUrunTypeFilterParams,
    filterParams: urunTypeFilterParams,
    urunTypeData,
  } = useGetUrunTypeList({});

  const onSubmit = (data: any) => {
    let params: any = data;
    console.log("params", params);

    if (formId) {
      params = { ...formData, ...params };
      delete params.BOYATIPIADI;

      updateForm(params, formId);
    } else {
      params.DEGISIMTARIHI = dayjs();
      delete params.UNITEADI;

      createForm(params);
    }
  };

  const setFormValues = (form: any) => {
    setValue("LABRECETEKODU", form.LABRECETEKODU);
    setValue("LABRECETEID", form.LABRECETEID);
    setValue("LABRECETEADI", form.ADI);
    setValue("FIRMAID", form.FIRMAID);
    setValue("PANTONEKODU", form.PANTONEKODU);
    setValue("KULLANICIADI", form.KULLANICIADI);
    setValue("DOVIZID", form.DOVIZID);
    setValue("ACIKLAMA", form.ACIKLAMA);
    setValue("ESKILABRECETEKODU", form.ESKILABRECETEKODU);
    setValue("RENKDERINLIGIADI", form.RENKDERINLIGIADI);
    setValue("RECETETURAADI", form.RECETETURAADI);
    setValue(
      "TALEPTARIHI",
      GetCurrentDate({ date: form.TALEPTARIHI, type: "usually" })
    );
  };

  useEffect(() => {
    if (formData?.LABRECETEKODU) {
      setFormValues(formData);
    }
  }, [formData]);

  useEffect(() => {
    if (formData?.LABRECETEKODU && open && defaultData?.LABRECETEID) {
      setTimeout(() => {
        setShowUI(true);
      }, 0);
    }
    if (!defaultData?.LABRECETEID && open) {
      setShowUI(true);
    }
  }, [formData, defaultData, open]);

  useEffect(() => {
    if (defaultData?.LABRECETEID) {
      setFormId(defaultData.LABRECETEID);
    }
  }, [defaultData, disabled]);
  const handleModal = (status: string, id: string) => {
    handleModalActions(status, id);
    if (status === "close") {
      setFormId(0);
    }
    if (status === "delete") {
      setFormId(0);
    }
  };
  return open ? (
    <CNewModal
      title={t(
        modalInitialData.LABRECETEID ? "updating_chemical" : "creating_chemical"
      )}
      handleActions={handleModal}
      defaultData={{
        id: modalInitialData?.LABRECETEID,
      }}
      showUI={showUI}
      disabled="big"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`grid grid-cols-3 gap-x-5`}>
          <div className="pr-1 mt-1">
            <InputFieldUI title={t("LABRECETEKODU")} disabled={disabled}>
              <SelectOptionsTable
                name="LABRECETEKODU"
                placeholder={t("LABRECETEKODU")}
                options={urunTypeData?.data}
                required={true}
                headColumns={[{ id: "ADI", title: "ADI", width: 200 }]}
                filterParams={urunTypeFilterParams}
                handleSelect={(obj: { ADI: string }) => {
                  setValue("LABRECETEKODU", obj.ADI);
                }}
                handleSearch={(val: string) => {
                  setUrunTypeFilterParams({
                    ...urunTypeFilterParams,
                    q: val,
                  });
                }}
                control={control}
                setFilterParams={setUrunTypeFilterParams}
              />
            </InputFieldUI>
          </div>
          <ColorMaterial PANTONEKODU={formData.PANTONEKODU} />
          <div className="flex justify-end">
            <div className="w-[200px]">
              <button
                className="custom-btn"
                style={{ backgroundColor: disabled ? "var(--gray)" : "" }}
                type={disabled ? "button" : "submit"}
              >
                {t(formId ? "update" : "create")}
              </button>
            </div>
          </div>
        </div>
        <CollapseUI title="" disabled={true}>
          <div className={`space-y-5`}>
            <InputFields
              control={control}
              setValue={setValue}
              disabled={disabled}
              filterParams={filterParams}
              setFilterParams={setFilterParams}
              urunTypeData={urunTypeData}
              firmaData={firmaData}
              filterParamsFirm={filterParamsFirm}
              setFilterParamsFirm={setFilterParamsFirm}
              urunTypeFilterParams={urunTypeFilterParams}
              setUrunTypeFilterParams={setUrunTypeFilterParams}
            />

            <LabModalTables disabled={disabled} />
          </div>
        </CollapseUI>
      </form>
    </CNewModal>
  ) : (
    <></>
  );
};
