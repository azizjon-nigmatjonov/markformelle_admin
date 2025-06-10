import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
// import { IModalForm } from "../interfaces";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import { ModalTableLogic } from "./Logic";
import dayjs from "dayjs";
import { LabModalTables } from "./Tables";
import { Alert } from "@mui/material";
import CCheckbox from "../../../../components/CElements/CCheckbox";
import { LiteOptionsTable } from "../../../../components/UI/Options/LiteTable";
import { PantoneColors } from "../../../../constants/pantone";

interface ModalUIProps {
  defaultData?: any;
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
  const [formId, setFormId] = useState<string>(defaultData?.RECETEID || "");
  const [disabled, setDisabled] = useState(true);

  const { createForm, updateForm, formData } = ModalTableLogic({
    filterParams,
    setFormId,
    urunId: formId,
  });

  useEffect(() => {
    if (formId) setDisabled(false);
  }, [formId]);

  const { control, handleSubmit, setValue } = useForm<any>({
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
    if (formData?.RECETEID) setFormValues(formData);
  }, [formData]);

  useEffect(() => {
    if (defaultData?.RECETEID) {
      setFormId(defaultData.RECETEID);
    }
  }, [defaultData, disabled]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-x-3 border-b border-[var(--border)] pb-2">
            <InputFieldUI title={t("LABRECETEKOD")} disabled={disabled}>
              <LiteOptionsTable
                name="URUNTIPIID"
                placeholder="URUNTIPIID"
                link="uruntipi"
                required={true}
                headColumns={[
                  { id: "ADI", title: "ADI", width: 120 },
                  { id: "URUNTIPIID", title: "URUNTIPIID", width: 100 },
                ]}
                handleSelect={(obj: { URUNTIPIID: number }) => {
                  setValue("URUNTIPIID", obj.URUNTIPIID);
                }}
                control={control}
              />
            </InputFieldUI>

            <div className="w-full pr-2">
              <Alert severity={"info"} style={{ height: "30px" }}>
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
          <div className="flex justify-between space-x-3">
            <div className="w-full grid grid-cols-3 gap-x-3">
              <div className="space-y-1">
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
                  <LiteOptionsTable
                    name="ASAMAID"
                    placeholder="USTASAMA"
                    link="asama"
                    required={true}
                    headColumns={[
                      { id: "ASAMAID", title: "ASAMAID", width: 100 },
                      { id: "ADI", title: "ADI", width: 120 },
                    ]}
                    renderValue={(_: string, obj: any) => {
                      return obj.ASAMAID
                        ? obj.ASAMAID
                          ? " - " + obj.ADI
                          : ""
                        : "";
                    }}
                    handleSelect={(obj: { ASAMAID: number }) => {
                      setValue("ASAMAID", obj.ASAMAID);
                    }}
                    control={control}
                    disabled={disabled}
                  />
                </InputFieldUI>

                <InputFieldUI title={t("RECETETURU")}>
                  <LiteOptionsTable
                    name="RECETETURUID"
                    placeholder="RECETETURU"
                    link="receteturu"
                    required={true}
                    headColumns={[
                      { id: "RECETETURUID", title: "RECETETURUID", width: 100 },
                      { id: "ADI", title: "ADI", width: 120 },
                    ]}
                    renderValue={(_: string, obj: any) => {
                      return (
                        obj.RECETETURUID +
                        (obj.RECETETURUID ? " - " + obj.ADI : "")
                      );
                    }}
                    handleSelect={(obj: { RECETETURUID: number }) => {
                      setValue("RECETETURUID", obj.RECETETURUID);
                    }}
                    control={control}
                    disabled={disabled}
                  />
                </InputFieldUI>
                <InputFieldUI title={t("ASHKLAMA")}>
                  <HFTextField
                    name="ASHKLAMA"
                    control={control}
                    setValue={setValue}
                    placeholder="ASHKLAMA"
                    disabled={disabled}
                  />
                </InputFieldUI>
              </div>
              <div className="space-y-1">
                <InputFieldUI title={t("RENKDIENLIGI")}>
                  <LiteOptionsTable
                    name="RENKDERINLIGIID"
                    placeholder="RENKDIENLIGI"
                    link="renkderinligi"
                    required={true}
                    headColumns={[
                      {
                        id: "RENKDERINLIGIID",
                        title: "RENKDERINLIGIID",
                        width: 120,
                      },
                      { id: "ADI", title: "ADI", width: 120 },
                    ]}
                    renderValue={(_: string, obj: any) => {
                      return obj.ADI;
                    }}
                    handleSelect={(obj: { RENKDERINLIGIID: number }) => {
                      setValue("RENKDERINLIGIID", obj.RENKDERINLIGIID);
                    }}
                    control={control}
                    disabled={disabled}
                  />
                </InputFieldUI>
                <InputFieldUI title={t("RECETEGRUP")}>
                  <LiteOptionsTable
                    name="LABRECETEGRUPID"
                    placeholder="LABRECETEGRUPID"
                    link="labrecetegrup"
                    required={true}
                    headColumns={[
                      {
                        id: "LABRECETEGRUPID",
                        title: "LABRECETEGRUPID",
                        width: 120,
                      },
                      { id: "ADI", title: "ADI", width: 120 },
                    ]}
                    renderValue={(_: string, obj: any) => {
                      return obj.ADI;
                    }}
                    handleSelect={(obj: { LABRECETEGRUPID: number }) => {
                      setValue("LABRECETEGRUPID", obj.LABRECETEGRUPID);
                    }}
                    control={control}
                    disabled={disabled}
                  />
                </InputFieldUI>
                <InputFieldUI title={t("RENKGRUP")}>
                  <LiteOptionsTable
                    name="LABRENKGRUPID"
                    placeholder="RENKGRUP"
                    link="labrenkgrup"
                    required={true}
                    headColumns={[
                      {
                        id: "LABRENKGRUPID",
                        title: "LABRENKGRUPID",
                        width: 120,
                      },
                      { id: "ADI", title: "ADI", width: 100 },
                    ]}
                    renderValue={(_: string, obj: any) => {
                      return obj.ADI;
                    }}
                    handleSelect={(obj: { LABRENKGRUPID: number }) => {
                      setValue("LABRENKGRUPID", obj.LABRENKGRUPID);
                    }}
                    control={control}
                    disabled={disabled}
                  />
                </InputFieldUI>
                <InputFieldUI title={t("HAMSTOCK")}>
                  <LiteOptionsTable
                    name="HAMID"
                    placeholder="HAMID"
                    link="ham"
                    required={true}
                    headColumns={[
                      {
                        id: "HAMID",
                        title: "HAMID",
                        width: 80,
                      },
                      { id: "ADI", title: "ADI", width: 150 },
                    ]}
                    renderValue={(_: string, obj: any) => {
                      return obj.ADI;
                    }}
                    handleSelect={(obj: { HAMID: number }) => {
                      setValue("HAMID", obj.HAMID);
                    }}
                    control={control}
                    disabled={disabled}
                  />
                </InputFieldUI>
              </div>
              <div className="space-y-1">
                <InputFieldUI title="RECETETIPI">
                  <div className="flex space-x-2">
                    <CCheckbox element={{ label: "Normal" }} />
                    <CCheckbox element={{ label: "Numure" }} />
                  </div>
                </InputFieldUI>
                <InputFieldUI title="PANTONEKODU">
                  <LiteOptionsTable
                    name="code"
                    placeholder="HAMID"
                    staticOptions={Object.entries(PantoneColors).map(
                      ([key, obj]: any) => {
                        return {
                          code: key,
                          ...obj,
                        };
                      }
                    )}
                    required={true}
                    headColumns={[
                      {
                        id: "code",
                        title: "code",
                        width: 120,
                      },
                      {
                        id: "name",
                        title: "name",
                        width: 120,
                      },
                      { id: "hex", title: "hex", width: 80 },
                    ]}
                    renderValue={(_: string, obj: any) => {
                      return obj.code;
                    }}
                    handleSelect={(obj: { hex: string }) => {
                      setValue("hex", obj.hex);
                    }}
                    control={control}
                    disabled={disabled}
                  />
                </InputFieldUI>
                <InputFieldUI title="FIRMAID">
                  <LiteOptionsTable
                    name="FIRMAID"
                    placeholder="FIRMAID"
                    link="firma"
                    required={true}
                    headColumns={[
                      {
                        id: "FIRMAID",
                        title: "FIRMAID",
                        width: 80,
                      },
                      { id: "ADI", title: "ADI", width: 160 },
                    ]}
                    renderValue={(_: string, obj: any) => {
                      return obj.FIRMAID + " - " + obj.ADI;
                    }}
                    handleSelect={(obj: { FIRMAID: string }) => {
                      setValue("FIRMAID", obj.FIRMAID);
                    }}
                    control={control}
                    disabled={disabled}
                  />
                </InputFieldUI>
                <InputFieldUI title="URUNTIPIADI">
                  <LiteOptionsTable
                    name="URUNTIPIID"
                    placeholder="URUNTIPIID"
                    link="uruntipi"
                    required={true}
                    headColumns={[
                      {
                        id: "URUNTIPIID",
                        title: "URUNTIPIID",
                        width: 80,
                      },
                      { id: "ADI", title: "ADI", width: 120 },
                    ]}
                    renderValue={(_: string, obj: any) => {
                      return obj.URUNTIPIID + "" + " - " + obj.ADI;
                    }}
                    handleSelect={(obj: { URUNTIPIID: string }) => {
                      setValue("URUNTIPIID", obj.URUNTIPIID);
                    }}
                    control={control}
                    disabled={disabled}
                  />
                </InputFieldUI>
              </div>
            </div>
          </div>
          <div className="h-[500px] overflow-y-scroll designed-scroll">
            <LabModalTables
              formId={formId}
              disabled={disabled}
              changed={changed}
              setChanged={setChanged}
              askAction={askAction}
              setOpenMainModal={setOpen}
              setAskAction={setAskAction}
            />
          </div>
        </div>
      </form>
    </>
  );
};
