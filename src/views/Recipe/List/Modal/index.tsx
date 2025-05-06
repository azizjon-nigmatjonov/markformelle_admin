import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { IModalForm, ModalTypes } from "../interfaces";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { useGetUrunTypeList } from "../../../../hooks/useFetchRequests/useUrunType";
import { ModalTableLogic } from "./Logic";
import dayjs from "dayjs";
import { useGetFirmList } from "../../../../hooks/useFetchRequests/useFirmaList";
import HFSelect from "../../../../components/HFElements/HFSelect";
import { LabModalTables } from "./Tables";
import { Alert } from "@mui/material";
import CCheckbox from "../../../../components/CElements/CCheckbox";

interface ModalUIProps {
  defaultData?: ModalTypes;
  URUNBIRIMID?: string;
  ADI?: string;
  changed: string;
  setChanged: (val: string) => void;
  askAction: string;
  setAskAction: (val: string) => void;
  setOpen: (val: boolean) => void;
}

export const ModalUI = ({
  askAction,
  setAskAction = () => {},
  defaultData = {},
  setChanged = () => {},
  changed = "",
  setOpen,
}: ModalUIProps) => {
  const { t } = useTranslationHook();
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 100 });
  const [formId, setFormId] = useState<string>("");
  const [disabled, setDisabled] = useState(true);

  const { createForm, updateForm, formData } = ModalTableLogic({
    filterParams,
    setFormId,
    urunId: defaultData?.URUNID || formId,
  });

  useEffect(() => {
    if (formId) setDisabled(false);
  }, [formId]);

  const {
    firmaData,
    setFilterParams: setFilterParamsFirm,
    filterParams: filterParamsFirm,
  } = useGetFirmList({});

  const {
    setFilterParams: setUrunTypeFilterParams,
    filterParams: urunTypeFilterParams,
    urunTypeData,
  } = useGetUrunTypeList({});

  const { control, handleSubmit, setValue } = useForm<IModalForm>({
    mode: "onSubmit",
  });

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
    setValue("URUNID", form.URUNID);
    setValue("UNITEID", form.UNITEID);
    setValue("UNITEADI", form.UNITEADI);
    setValue("ADI", form.ADI);
    setValue("BARKOD", form.BARKOD);

    setValue("MUTFAKDEPONO", form.MUTFAKDEPONO);

    setValue("BOYATIPIID", form.BOYATIPIID);
    setValue("BOYATIPIADI", form.BOYATIPIADI);

    setValue("URUNTIPIID", form.URUNTIPIID);
    setValue("URUNTIPIADI", form.URUNTIPIADI);
    setValue("KULLANICIADI", form.KULLANICIADI);

    setValue("NOTU", form.NOTU);
    setValue("KAPALI", form.KAPALI);
    setValue("ENVANTEREDAHIL", form.ENVANTEREDAHIL);
  };

  useEffect(() => {
    if (formData?.URUNID) setFormValues(formData);
  }, [formData]);

  useEffect(() => {
    if (defaultData?.URUNID) {
      setFormId(defaultData.URUNID);
    }
  }, [defaultData, disabled]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5 h-[700px] overflow-y-scroll designed-scroll pr-2">
          <div className="grid grid-cols-3 gap-x-5 border-b border-[var(--border)] pb-5">
            <InputFieldUI title={t("LABRECETEKOD")} disabled={disabled}>
              <SelectOptionsTable
                name="LABRECETEKOD"
                placeholder={t("LABRECETEKOD")}
                options={urunTypeData?.data}
                required={true}
                headColumns={[{ id: "ADI", title: "ADI", width: 200 }]}
                filterParams={urunTypeFilterParams}
                handleSelect={(_: {}) => {}}
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

            <div className="w-full pr-2">
              <Alert severity={"info"} style={{ height: "35px" }}>
                {t("add_unique_id")}
              </Alert>
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
          <div className="flex justify-between space-x-4">
            <div className="w-full grid grid-cols-3 gap-y-3 gap-x-5">
              <div className="space-y-2">
                <InputFieldUI title={t("URUNRECETEADI")}>
                  <HFTextField
                    name="URUNRECETEADI"
                    control={control}
                    setValue={setValue}
                    placeholder={t("URUNRECETEADI")}
                    disabled={disabled}
                  />
                </InputFieldUI>

                <InputFieldUI title={t("USTASAMA")}>
                  <SelectOptionsTable
                    name="USTASAMA"
                    placeholder={t("USTASAMA")}
                    options={firmaData}
                    required={true}
                    headColumns={[
                      { id: "FIRMAID", width: 200, title: "FIRMAID" },
                      { id: "FIRMAADI", title: "FIRMAADI" },
                      { id: "KISAADI", title: "KISAADI" },
                    ]}
                    filterParams={filterParams}
                    handleSelect={(_: {}) => {}}
                    handleSearch={(val: string) => {
                      setFilterParamsFirm({ ...filterParamsFirm, q: val });
                    }}
                    control={control}
                    setFilterParams={setFilterParams}
                    disabled={disabled}
                  />
                </InputFieldUI>

                <InputFieldUI title={t("RECETETURU")}>
                  <HFSelect
                    name="RECETETURU"
                    control={control}
                    setValue={setValue}
                    placeholder={t("RECETETURU")}
                    disabled={disabled}
                  />
                </InputFieldUI>
                <InputFieldUI title={t("ASHKLAMA")}>
                  <HFTextField
                    name="ASHKLAMA"
                    control={control}
                    setValue={setValue}
                    placeholder={t("ASHKLAMA")}
                    disabled={disabled}
                  />
                </InputFieldUI>
              </div>
              <div className="space-y-2">
                <InputFieldUI title={t("RENKDIENLIGI")}>
                  <HFSelect
                    name="RENKDIENLIGI"
                    control={control}
                    setValue={setValue}
                    placeholder={t("RENKDIENLIGI")}
                    disabled={disabled}
                  />
                </InputFieldUI>
                <InputFieldUI title={t("RECETEGRUP")}>
                  <HFSelect
                    name="RECETEGRUP"
                    control={control}
                    setValue={setValue}
                    placeholder={t("RECETEGRUP")}
                    disabled={disabled}
                  />
                </InputFieldUI>
                <InputFieldUI title={t("RENKGRUP")}>
                  <HFSelect
                    name="RENKGRUP"
                    control={control}
                    setValue={setValue}
                    placeholder={t("RENKGRUP")}
                    disabled={disabled}
                  />
                </InputFieldUI>
                <InputFieldUI title={t("HAMSTOCK")}>
                  <SelectOptionsTable
                    name="HAMSTOCK"
                    placeholder={t("HAMSTOCK")}
                    options={firmaData}
                    required={true}
                    headColumns={[
                      { id: "FIRMAID", title: "FIRMAID" },
                      { id: "FIRMAADI", title: "FIRMAADI" },
                      { id: "KISAADI", title: "KISAADI" },
                    ]}
                    filterParams={filterParams}
                    handleSelect={(_: {}) => {}}
                    handleSearch={(val: string) => {
                      setFilterParamsFirm({ ...filterParamsFirm, q: val });
                    }}
                    control={control}
                    setFilterParams={setFilterParams}
                    disabled={disabled}
                  />
                </InputFieldUI>
              </div>
              <div className="space-y-2">
                <InputFieldUI title={t("RECETETIPI")}>
                  <div className="flex space-x-2">
                    <CCheckbox element={{ label: "Normal" }} />
                    <CCheckbox element={{ label: "Numure" }} />
                  </div>
                </InputFieldUI>
                <InputFieldUI title={t("PANTONEKODU")}>
                  <HFSelect
                    name="PANTONEKODU"
                    control={control}
                    setValue={setValue}
                    placeholder={t("PANTONEKODU")}
                    disabled={disabled}
                  />
                </InputFieldUI>
                <InputFieldUI title={t("FIRMAID")}>
                  <SelectOptionsTable
                    name="FIRMAID"
                    placeholder={t("FIRMAID")}
                    options={firmaData}
                    required={true}
                    headColumns={[
                      { id: "FIRMAID", width: 200, title: "FIRMAID" },
                      { id: "FIRMAADI", title: "FIRMAADI" },
                      { id: "KISAADI", title: "KISAADI" },
                    ]}
                    filterParams={filterParams}
                    handleSelect={(_: {}) => {}}
                    handleSearch={(val: string) => {
                      setFilterParamsFirm({ ...filterParamsFirm, q: val });
                    }}
                    control={control}
                    setFilterParams={setFilterParams}
                    disabled={disabled}
                  />
                </InputFieldUI>
                <InputFieldUI title={t("URUNTIPIADI")}>
                  <SelectOptionsTable
                    name="URUNTIPIADI"
                    placeholder={t("URUNTIPIID")}
                    options={urunTypeData?.data}
                    required={true}
                    headColumns={[{ id: "ADI", title: "ADI", width: 200 }]}
                    filterParams={urunTypeFilterParams}
                    handleSelect={(obj: any) => {
                      setValue("URUNTIPIID", obj.URUNTIPIID);
                      setValue("URUNTIPIADI", obj.ADI);
                    }}
                    handleSearch={(val: string) => {
                      setUrunTypeFilterParams({
                        ...urunTypeFilterParams,
                        q: val,
                      });
                    }}
                    control={control}
                    setFilterParams={setUrunTypeFilterParams}
                    disabled={disabled}
                  />
                </InputFieldUI>
              </div>
            </div>
          </div>
          <LabModalTables
            disabled={disabled}
            changed={changed}
            setChanged={setChanged}
            askAction={askAction}
            setOpenMainModal={setOpen}
            setAskAction={setAskAction}
          />
        </div>
      </form>
    </>
  );
};
