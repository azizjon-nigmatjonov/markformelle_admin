import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslationHook } from "../../../hooks/useTranslation";
import { IModalForm, ModalTypes } from "./interfaces";
import { Validation } from "./Validation";
import { useForm } from "react-hook-form";
import { InputFieldUI } from "../../../components/UI/FieldUI";
import { useEffect, useState } from "react";
import { SelectOptionsTable } from "../../../components/UI/Options/Table";
import { useGetUrunList } from "../../../hooks/useFetchRequests/useUrunList";
import { ModalTableLogic } from "./Logic";
import HFTextField from "../../../components/HFElements/HFTextField";
import dayjs from "dayjs";
import { CollapseUI } from "../../../components/CElements/CCollapse";
import HFInputMask from "../../../components/HFElements/HFInputMask";
import { useGetDepoList } from "../../../hooks/useFetchRequests/useDepoList";
import { Alert } from "@mui/material";

interface ModalUIProps {
  defaultData?: ModalTypes;
  URUNRECETEDETAYID?: number;
  URUNRECETEURUNID?: string;
  URUNADI?: string;
}
const schema = Validation;

export const ModalUI = ({ defaultData = {} }: ModalUIProps) => {
  const { t } = useTranslationHook();
  const [formId, setFormId] = useState<string>("");

  const { createForm, formData } = ModalTableLogic({
    urunId: defaultData?.URUNRECETEURUNID || formId,
    setFormId,
  });

  const {
    setFilterParams: setDepoFilterParams,
    filterParams: depoFilterParams,
    depoData,
  } = useGetDepoList();

  const { setFilterParams, filterParams, urunData } = useGetUrunList({});

  const { control, handleSubmit, setValue } = useForm<IModalForm>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IModalForm) => {
    const params: Partial<any> = data;
    params.URUNRECETEURUNID = params.URUNID;
    params.DEGISIMTARIHI = dayjs();
    params.KULLANICIID = "1";
    delete params.BIRIMID;

    createForm(params);
  };

  useEffect(() => {
    setValue("TARIH", dayjs().format("YYYY-MM-DD HH:MM"));
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-5 w-full pb-4">
          <InputFieldUI title={t("URUNRECETEURUNID")}>
            <SelectOptionsTable
              name="URUNRECETEURUNID"
              placeholder={t("URUNRECETEURUNID")}
              options={urunData?.data}
              required={true}
              headColumns={[
                { id: "URUNID", title: "URUNID" },
                { id: "ADI", title: "ADI" },
              ]}
              filterParams={filterParams}
              handleSelect={(obj: any) => {
                setValue("URUNID", obj.URUNID);
                setValue("URUNRECETEURUNID", obj.URUNID);
              }}
              handleSearch={(val: string) => {
                setFilterParams({ ...filterParams, q: val });
              }}
              control={control}
              setFilterParams={setFilterParams}
              disabled={!!formId}
            />
          </InputFieldUI>

          <InputFieldUI title={t("BIRIMID")}>
            <HFTextField
              control={control}
              name="BIRIMID"
              placeholder={t("BIRIMID")}
              setValue={setValue}
              disabled={!!formId}
              //   defaultValue={defaultData?.BARKODKODI}
            />
          </InputFieldUI>
          <div className="flex justify-end">
            <div>
              <button
                className={`custom-btn ${formId ? "disabled" : ""}`}
                type="submit"
                style={{ minWidth: "150px" }}
                disabled={formId ? true : false}
              >
                {t("create")}
              </button>
            </div>
          </div>
        </div>
        <div className="pb-3">
          <Alert severity={"info"}>{t("includes")}: YAGUW + YOG SOGUGI</Alert>
        </div>
        <CollapseUI title={t("details")} disabled={true} defaultOpen={true}>
          <div className="grid gap-y-3 w-1/2">
            <InputFieldUI title={t("MIKTAR")}>
              <HFInputMask
                control={control}
                name="MIKTAR"
                type="number"
                required={true}
                placeholder={t("MIKTAR")}
                defaultValue={formData?.MIKTAR}
              />
            </InputFieldUI>
            <InputFieldUI title={t("DEPOID")}>
              <SelectOptionsTable
                name="DEPOID"
                placeholder={t("DEPOID")}
                options={depoData?.data ?? []}
                required={true}
                headColumns={[
                  { id: "DEPOID", title: "DEPOID" },
                  { id: "ADI", title: "ADI" },
                ]}
                filterParams={filterParams}
                handleSelect={(obj: any) => {
                  setValue("DEPOID", obj.DEPOID);
                  setDepoFilterParams({
                    ...depoFilterParams,
                    q: `DEPOID=${obj.DEPOID}`,
                  });
                }}
                control={control}
                handleSearch={(val: string) => {
                  setDepoFilterParams({ ...depoFilterParams, q: val });
                }}
                setFilterParams={setDepoFilterParams}
                defaultValue={formData?.DEPOID}
              />
            </InputFieldUI>
            <InputFieldUI title={t("TARIH")}>
              <HFTextField
                control={control}
                name="TARIH"
                placeholder={t("TARIH")}
                setValue={setValue}
                disabled={!!formId}
                //   defaultValue={defaultData?.BARKODKODI}
              />
            </InputFieldUI>
          </div>
        </CollapseUI>
      </form>
    </>
  );
};
