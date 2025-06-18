import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import { ModalTableLogic } from "./Logic";
import dayjs from "dayjs";
import { Alert, Card } from "@mui/material";
import CCheckbox from "../../../../components/CElements/CCheckbox";
import { LiteOptionsTable } from "../../../../components/UI/Options/LiteTable";
import { LabModalTables } from "./Tables";
import { CardEditModal } from "./StepComponents/Components/CardEditModal";
import CNewMiniModal from "../../../../components/CElements/CNewMiniModal";
import { DragAndDropDataLogic } from "./StepComponents/Logic";

interface ModalUIProps {
  defaultData?: any;
  open: string[];
  URUNBIRIMID?: string;
  ADI?: string;
  changed: string;
  setChanged: (val: string) => void;
  askAction: string;
  setAskAction: (val: string) => void;
  setOpen: (val: string[]) => void;
}

export const ModalUI = ({
  open,
  askAction,
  setAskAction = () => {},
  defaultData = {},
  setChanged = () => {},
  changed = "",
  setOpen = () => {},
}: ModalUIProps) => {
  const { t } = useTranslationHook();
  const [formId, setFormId] = useState<string>(defaultData?.RECETEID || "");
  const [disabled, setDisabled] = useState(true);
  const [currentSellect, setCurrentSellect] = useState<any>({});
  const { tableData, refetch: refetchTable } = DragAndDropDataLogic({
    id: formId,
  });
  const { createForm, updateForm, formData } = ModalTableLogic({
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

      updateForm(params, formId);
    } else {
      params.DEGISIMTARIHI = dayjs();
      delete params.UNITEADI;

      createForm(params);
    }
  };

  const setFormValues = (form: any) => {
    setValue("RECETEID", form.RECETEID);
    setValue("ADI", form.ADI);
    setValue("FIRMAID", form.FIRMAID);
    setValue("CALISMATARIHI", dayjs(form.CALISMATARIHI).format("YYYY-MM-DD"));
    setValue("FIRMAADI", form.FIRMAADI);
    setValue("RECETETURUADI", form.RECETETURUADI);

    setValue("RECETEKODE", form.RECETEKODE);
    setValue("ASAMAID", form.ASAMAID);
    setValue("RECETETURUID", form.RECETETURUID);
    setValue("ASHKLAMA", form.ASHKLAMA);
    setValue("RENKDERINLIGIID", form.RENKDERINLIGIID);
    setValue("LABRECETEGRUPID", form.LABRECETEGRUPID);
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
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-x-3">
            <InputFieldUI title={t("Recete Kodu")} disabled={disabled}>
              <LiteOptionsTable
                name="RECETEID"
                placeholder="URUNTIPIID"
                link="recete"
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
              <div className="space-y-2">
                <InputFieldUI title="Recete Adi">
                  <HFTextField
                    name="ADI"
                    control={control}
                    setValue={setValue}
                    placeholder={t("URUNRECETEADI")}
                    disabled={disabled}
                  />
                </InputFieldUI>
                <InputFieldUI title={t("Firma Kodu")}>
                  <LiteOptionsTable
                    name="FIRMAID"
                    placeholder="Firma kodu"
                    link="firm"
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
                <InputFieldUI title="Ust Asama">
                  <LiteOptionsTable
                    name="ASAMAID"
                    placeholder="Ust Asama"
                    link="asama"
                    headColumns={[
                      { id: "ASAMAID", title: "ID", width: 50 },
                      { id: "ADI", title: "ADI", width: 120 },
                    ]}
                    renderValue={(_: string, obj: any) => {
                      return obj.ASAMAID + (obj.ADI ? " - " + obj.ADI : "");
                    }}
                    handleSelect={(obj: {
                      RECETETURUID: number;
                      ASAMAID: number;
                    }) => {
                      setValue("ASAMAID", obj.ASAMAID);
                    }}
                    required={true}
                    control={control}
                    disabled={disabled}
                    defaultValue={formData?.ASAMAADI}
                  />
                </InputFieldUI>
                <InputFieldUI title="Grafik Kodu">
                  <LiteOptionsTable
                    name="RENKDERINLIGIID"
                    placeholder="Grafik Kodu"
                    link="recetegrafik"
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
              </div>
              <div className="space-y-2">
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
                <InputFieldUI title={t("Recete Turu")}>
                  <LiteOptionsTable
                    name="RECETETURUADI"
                    placeholder="Recete Turu"
                    link="receteturu"
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
              <div className="space-y-2">
                <InputFieldUI title="Firma">
                  <LiteOptionsTable
                    name="FIRMAADI"
                    placeholder="FIRMAADI"
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
                    handleSelect={(obj: { ADI: string }) => {
                      setValue("FIRMAADI", obj.ADI);
                    }}
                    defaultValue={formData?.FIRMAADI}
                    control={control}
                    disabled={disabled}
                  />
                </InputFieldUI>
                <InputFieldUI title="Recete tipi">
                  <div className="flex space-x-2">
                    <CCheckbox element={{ label: "Normal" }} />
                    <CCheckbox element={{ label: "Numure" }} />
                  </div>
                </InputFieldUI>
                <InputFieldUI title="Renk okeyi">
                  <CCheckbox element={{ label: "Numure" }} />
                </InputFieldUI>
                <InputFieldUI title="Calisma Tarihi">
                  <HFTextField
                    name="CALISMATARIHI"
                    control={control}
                    setValue={setValue}
                    placeholder="CALISMATARIHI"
                    disabled={true}
                  />
                </InputFieldUI>
              </div>
            </div>
          </div>
          <div className="h-[500px] overflow-y-scroll designed-scroll">
            <LabModalTables
              formId={formId}
              changed={changed}
              setChanged={setChanged}
              askAction={askAction}
              setOpen={setOpen}
              setAskAction={setAskAction}
              open={open}
              setCurrentSellect={setCurrentSellect}
              tableData={tableData}
            />
          </div>
        </div>
      </form>

      {open.includes("step") && (
        <CNewMiniModal
          title="Recete Girisi"
          handleActions={() => setOpen(["card"])}
        >
          <CardEditModal
            open={open}
            handleActions={() => setOpen(["card"])}
            formData={currentSellect}
            refetchTable={refetchTable}
          />
        </CNewMiniModal>
      )}
    </>
  );
};
