import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import { ModalTableLogic } from "./Logic";
import dayjs from "dayjs";
import { Alert } from "@mui/material";
import CCheckbox from "../../../../components/CElements/CCheckbox";
import { LiteOptionsTable } from "../../../../components/UI/Options/LiteTable";
import { LabModalTables } from "./Tables";
import { CardEditModal } from "./StepComponents/Components/CardEditModal";
import CNewMiniModal from "../../../../components/CElements/CNewMiniModal";
import { DragAndDropDataLogic } from "./StepComponents/Logic";
import { convertToISO } from "../../../../utils/getDate";

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

export const ModalUIRecipe = ({
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
  const [disabled, setDisabled] = useState(false);
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

  const { control, handleSubmit, setValue, getValues } = useForm<any>({
    mode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    let params: any = data;

    if (formId) {
      params = { ...formData, ...params };

      updateForm(params, formId);
    } else {
      params.DEGISIMTARIHI = dayjs();
      params.CALISMATARIHI = convertToISO(dayjs().format("DD.MM.YYYY"));
      params.RECETETIPI = 0;
      params.RECETEKAPATMA = false;
      params.MIGRASYON = 0;
      params.SABLON = false;
      params.ORTAKRECETE = false;
      params.ILAVE = true;
      params.SOKUMUZERIBOYA = true;
      params.RECETEDETAYVAR = false;
      params.OZELDURUMLINKISLEMI = false;
      params.INSERTKULLANICIID = 1;
      params.INSERTTARIHI = dayjs();
      params.KULLANICIID = 1;
      params.DEGISIMTARIHI = dayjs();
      params.USTASAMAID = 8;
      params.RECETEID = "Test Azizjon";

      delete params.UNITEADI;

      createForm(params);
    }
  };

  const setFormValues = (form: any) => {
    setValue("RENKOKEY", form.RENKOKEY);
    setValue("CALISMATARIHI", dayjs(form.CALISMATARIHI).format("YYYY-MM-DD"));
    setValue("RECETEID", form.RECETEID);
    setValue("ADI", form.ADI);
    setValue("FIRMAID", form.FIRMAID);

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
                    placeholder="ADI"
                    disabled={disabled}
                  />
                </InputFieldUI>
                <InputFieldUI title={t("Firma Kodu")}>
                  <LiteOptionsTable
                    name="FIRMAID"
                    placeholder="Firma kodu"
                    link="firma"
                    required={true}
                    headColumns={[
                      { id: "FIRMAID", title: "FIRMAID", width: 80 },
                      { id: "ADI", title: "ADI", width: 180 },
                    ]}
                    renderValue={(_: string, obj: any) => {
                      return obj.FIRMAID && obj.ADI
                        ? obj.FIRMAID + " - " + obj.ADI
                        : obj.FIRMAID;
                    }}
                    handleSelect={(obj: { FIRMAID: string }) => {
                      setValue("FIRMAID", obj.FIRMAID);
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
                      setValue("ASAMAADI", obj.ASAMAID);
                    }}
                    required={true}
                    control={control}
                    disabled={disabled}
                    defaultValue={formData?.ASAMAADI}
                  />
                </InputFieldUI>
                <InputFieldUI title="Grafik Kodu">
                  <LiteOptionsTable
                    name="RECETEGRAFIKID"
                    placeholder="Grafik Kodu"
                    link="recetegrafik"
                    required={true}
                    headColumns={[
                      {
                        id: "RECETEGRAFIKID",
                        title: "RECETEGRAFIKID",
                        width: 120,
                      },
                      { id: "ADI", title: "ADI", width: 120 },
                    ]}
                    renderValue={(_: string, obj: any) => {
                      return obj.RECETEGRAFIKID && obj.ADI
                        ? obj.RECETEGRAFIKID + " - " + obj.ADI
                        : obj.RECETEGRAFIKID;
                    }}
                    handleSelect={(obj: { RECETEGRAFIKID: number }) => {
                      setValue("RECETEGRAFIKID", obj.RECETEGRAFIKID);
                    }}
                    control={control}
                    disabled={disabled}
                  />
                </InputFieldUI>
              </div>
              <div className="space-y-2">
                <InputFieldUI title={t("LABRECETEGRUPID")}>
                  <LiteOptionsTable
                    name="LABRECETEGRUPID"
                    placeholder="LABRECETEGRUPID"
                    link="labrecetegrup"
                    required={true}
                    headColumns={[
                      {
                        id: "LABRECETEGRUPID",
                        title: "ID",
                        width: 40,
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
                        title: "ID",
                        width: 40,
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
                <InputFieldUI title={t("RENKDERINLIGIID")}>
                  <LiteOptionsTable
                    name="RENKDERINLIGIID"
                    placeholder="RENKGRUP"
                    link="renkderinligi"
                    required={true}
                    headColumns={[
                      {
                        id: "RENKDERINLIGIID",
                        title: "ID",
                        width: 40,
                      },
                      { id: "ADI", title: "ADI", width: 100 },
                    ]}
                    renderValue={(_: string, obj: any) => {
                      return obj.RENKDERINLIGIID && obj.ADI
                        ? obj.RENKDERINLIGIID + " - " + obj.ADI
                        : obj.RENKDERINLIGIID;
                    }}
                    handleSelect={(obj: { RENKDERINLIGIID: number }) => {
                      setValue("RENKDERINLIGIID", obj.RENKDERINLIGIID);
                    }}
                    defaultValue={formData?.RENKDERINLIGIADI}
                    control={control}
                    disabled={disabled}
                  />
                </InputFieldUI>
                <InputFieldUI title={t("Recete Turu")}>
                  <LiteOptionsTable
                    name="RECETETURUID"
                    placeholder="Recete Turu"
                    link="receteturu"
                    required={true}
                    headColumns={[
                      {
                        id: "RECETETURUID",
                        title: "ID",
                        width: 40,
                      },
                      { id: "ADI", title: "ADI", width: 150 },
                    ]}
                    renderValue={(_: string, obj: any) => {
                      return obj.RECETETURUID && obj.ADI
                        ? obj.RECETETURUID + " - " + obj.ADI
                        : obj.RECETETURUID;
                    }}
                    handleSelect={(obj: {
                      RECETETURUID: number;
                      ADI: string;
                    }) => {
                      setValue("RECETETURUID", obj.RECETETURUID);
                      setValue("RECETETURUADI", obj.ADI);
                    }}
                    defaultValue={formData?.RECETETURUADI}
                    control={control}
                    disabled={disabled}
                  />
                </InputFieldUI>
              </div>
              <div className="space-y-2">
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

                <InputFieldUI title="Renk okeyi">
                  <CCheckbox
                    checked={getValues().RENKOKEY}
                    element={{ label: "Okey" }}
                    handleCheck={(obj: { checked: boolean }) => {
                      setValue("RENKOKEY", obj.checked);
                    }}
                  />
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
          <div className="h-[500px] overflow-y-scroll designed-scroll w-full">
            <LabModalTables
              changed={changed}
              setChanged={setChanged}
              askAction={askAction}
              setOpen={setOpen}
              setAskAction={setAskAction}
              open={open}
              setCurrentSellect={setCurrentSellect}
              tableData={tableData}
              refetchTable={refetchTable}
            />
          </div>
        </div>
      </form>

      {open.includes("step") || open.includes("insert_step") ? (
        <CNewMiniModal
          title="Recete Girisi"
          handleActions={() => setOpen(["card"])}
        >
          <CardEditModal
            type={open.includes("insert_step") ? "create" : "update"}
            open={open}
            handleActions={() => setOpen(["card"])}
            formData={open.includes("insert_step") ? {} : currentSellect}
            refetchTable={refetchTable}
            receteId={formId}
            setOpen={setOpen}
          />
        </CNewMiniModal>
      ) : (
        ""
      )}
    </>
  );
};
