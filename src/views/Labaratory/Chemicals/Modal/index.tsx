import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CollapseUI } from "../../../../components/CElements/CCollapse";
import { IModalForm, ModalTypes } from "../interfaces";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { useGetUrunTypeList } from "../../../../hooks/useFetchRequests/useUrunType";
import { ModalTableLogic } from "./Logic";
import dayjs from "dayjs";
import { LabModalTables } from "./Tables";
import { Alert } from "@mui/material";
import { InputFields } from "./Components/InputFields";
import { PantoneColors } from "../../../../constants/pantone";
import { GetCurrentDate } from "../../../../utils/getDate";

interface ModalUIProps {
  defaultData?: ModalTypes;
  URUNBIRIMID?: string;
  ADI?: string;
}

export const ModalUI = ({ defaultData = {} }: ModalUIProps) => {
  const { t } = useTranslationHook();
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 100 });
  const [formId, setFormId] = useState<number>(0);
  const [disabled, setDisabled] = useState(true);

  const { control, handleSubmit, setValue, getValues } = useForm<IModalForm>({
    mode: "onSubmit",
  });

  const { createForm, updateForm, formData } = ModalTableLogic({
    filterParams,
    setFormId,
    urunId: defaultData?.LABRECETEID || formId,
  });

  useEffect(() => {
    if (formId) setDisabled(false);
  }, [formId]);

  const {
    setFilterParams: setUrunTypeFilterParams,
    filterParams: urunTypeFilterParams,
    urunTypeData,
  } = useGetUrunTypeList({});

  const onSubmit = (data: any) => {
    let params: any = data;

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
    setValue("URUNRECETEADI", form.ADI);
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
    if (formData?.LABRECETEKODU) setFormValues(formData);
  }, [formData]);

  useEffect(() => {
    if (defaultData?.LABRECETEID) {
      setFormId(defaultData.LABRECETEID);
    }
  }, [defaultData, disabled]);
  console.log("formData", formData);
  console.log("form", getValues());

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-x-5">
          <InputFieldUI title={t("LABRECETEKODU")} disabled={disabled}>
            <SelectOptionsTable
              name="LABRECETEKODU"
              placeholder={t("LABRECETEKODU")}
              options={urunTypeData?.data}
              required={true}
              headColumns={[{ id: "ADI", title: "ADI", width: 200 }]}
              filterParams={urunTypeFilterParams}
              handleSelect={(obj: { ADI: string }) => {
                console.log("ob", obj);
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

          <div className="w-full pr-2 space-x-2 flex items-center">
            <div className="w-full">
              <Alert severity={"info"} style={{ height: "30px" }}>
                {t("add_unique_id")}
              </Alert>
            </div>

            {formData?.PANTONEKODU && (
              <div
                className={`w-[120px] h-[30px] rounded-[8px]`}
                style={{
                  backgroundColor:
                    "#" +
                    PantoneColors[formData.PANTONEKODU.substring(4, 11)]?.hex,
                }}
              ></div>
            )}
          </div>
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
          <div className="space-y-5 h-[800px] overflow-y-scroll designed-scroll">
            <InputFields
              control={control}
              setValue={setValue}
              disabled={disabled}
              filterParams={filterParams}
              setFilterParams={setFilterParams}
              urunTypeData={urunTypeData}
              urunTypeFilterParams={urunTypeFilterParams}
              setUrunTypeFilterParams={setUrunTypeFilterParams}
            />

            <LabModalTables disabled={disabled} />
          </div>
        </CollapseUI>
      </form>
    </>
  );
};
