import { useForm } from "react-hook-form";
import CNewMiniModal from "../../../../../components/CElements/CNewMiniModal";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../../components/UI/FormButtons/SubmitCancel";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { PaintFormLogic } from "./PaintComponents/Logic";
import HFTextarea from "../../../../../components/HFElements/HFTextarea";
import HFTextField from "../../../../../components/HFElements/HFTextField";
import CLabel from "../../../../../components/CElements/CLabel";
import CCheckbox from "../../../../../components/CElements/CCheckbox";
import { websiteActions } from "../../../../../store/website";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export const PaintForm = ({
  handleActions,
  uniqueID,
  defaultData,
  title,
  parentId,
  refetch,
  isDirty,
}: {
  handleActions: (val: string) => void;
  uniqueID: string;
  defaultData: any;
  parentId: number;
  title: string;
  refetch: () => void;
  isDirty: boolean;
}) => {
  const dispatch = useDispatch();
  const [formId, setFormId] = useState(0);
  const { control, setValue, handleSubmit, watch, getValues } = useForm({});
  const DESENID = watch("DESENID");
  const { formData, updateForm, createForm } = PaintFormLogic({
    formId,
    defaultData,
    closeFn: () => {
      refetch();
      handleActions("Close");
    },
  });
  const { t } = useTranslation();
  const PANTONEKODU = watch("PANTONEKODU");

  const handleDirtyPlaces = (list: string) => {
    dispatch(websiteActions.setDirtyPlaces({ list, isDirty: false }));
  };

  const onSubmit = (data: any) => {
    let params = { ...data };
    if (formId) {
      params = { ...formData, ...params };

      updateForm(params, formId);
    } else {
      params.PUS = params.PUS ?? 0;
      params.FEINE = params.FEINE ?? 0;
      params.IPTALKILO = params.IPTALKILO ?? 0;
      params.IPTALMETRE = params.IPTALMETRE ?? 0;
      params.HATAPUANICARPANI = params.HATAPUANICARPANI ?? 0;
      params.ADET = null;
      params.BOYASIPARISKAYITID = parentId;
      params.DEGISIMLOG = "";
      params.DINLENMISGRAMAJ = "";
      params.BASKIBIRIMFIYATDOVIZID = params.DOVIZID;
      params.FASONBIRIMFIYATDOVIZID = params.DOVIZID;
      params.FATURAEDILECEKMIKTARTIPI = 0;
      params.HAMSTOKBIRIMID = 0;
      params.SIRANO = 999;
      params.FIRMASEVKADRESIID = 904;
      params.SIPARISPROSESID = Number(params.SIPARISPROSESID);
      params.RENKID = Number(params.RENKID);
      params.INSERTKULLANICIID = 1;
      params.ORMESIPARISDETAYID = 12280;
      params.BOYASIPARISDETAYID = 40546;

      createForm(params);
    }
  };
  console.log("formData", formData);

  const setFormValues = (form: any) => {
    setValue("HAMID", form.HAMID);
    setValue("PUS", form.PUS);
    setValue("FEINE", form.FEINE);
    setValue("IPTALKILO", form.IPTALKILO);
    setValue("BRUTKILO", form.BRUTKILO);
    setValue("IPTALMETRE", form.IPTALMETRE);
    setValue("KALITEID", form.KALITEID);
    setValue("DOVIZID", form.DOVIZID);
    setValue("IPTALKILO", form.IPTALKILO);
    setValue("BRUTKILO", form.BRUTKILO);
    setValue("IPTALMETRE", form.IPTALMETRE);
    setValue("KALITEID", form.KALITEID);
    setValue("LABRECETEKODU", form.LABRECETEKODU);
    setValue("SIPARISPROSESID", form.SIPARISPROSESID);
    setValue("RENKID", form.RENKID);
    setValue("RENKDERINLIGIID", form.RENKDERINLIGIID);
    setValue("NOTU", form.NOTU);
    setValue("PLANLAMANOTU", form.PLANLAMANOTU);
    setValue("TERMINNOTU", form.TERMINNOTU);
    setValue("HATAPUANICARPANI", form.HATAPUANICARPANI);
    setValue("ISLEMTIPIID", form.ISLEMTIPIID);
  };

  useEffect(() => {
    if (formData?.BOYASIPARISDETAYID) {
      setFormValues(formData);
    } else {
      setValue("TERMINTARIHI", dayjs().format("YYYY-MM-DD"));
      setValue("DOVIZID", "USD");
    }
  }, [formData]);

  useEffect(() => {
    if (defaultData?.BOYASIPARISDETAYID) {
      setFormId(defaultData.BOYASIPARISDETAYID);
    }
  }, [defaultData]);
  const LABRECETEID = watch("LABRECETEID");
  const [kaliteData, setKaliteData] = useState<any>(null);
  const [receteData, setReceteData] = useState<any>(null);

  return (
    <>
      <CNewMiniModal title={title} handleActions={handleActions}>
        <form
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          onSubmit={handleSubmit(onSubmit)}
          className="w-[1000px]"
        >
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="space-y-3">
              <LiteOptionsTable
                label="Kalite no"
                renderValue={(_: string, obj: any) => {
                  return obj.KALITEID;
                }}
                handleSelect={(obj: {
                  KALITEID: string;
                  HAMID: number;
                  HAMADI: string;
                  FEINE: number;
                  PUS: number;
                  GRAMAJISTENEN: string;
                  ENISTENEN: string;
                }) => {
                  setValue("KALITEID", obj.KALITEID);
                  setKaliteData(obj);
                  setValue("HAMADI", obj.HAMID);
                  setValue("HAMID", obj.HAMADI);
                  setValue("FEINE", obj.FEINE);
                  setValue("PUS", obj.PUS);
                  setValue("GRAMAJISTENEN", obj.GRAMAJISTENEN);
                  setValue("ENISTENEN", obj.ENISTENEN);
                  handleDirtyPlaces("KALITEID");
                }}
                staticSearchID="KALITEID"
                name="KALITEID"
                link="kalite"
                headColumns={[
                  {
                    id: "KALITEID",
                    title: "KALITEID",
                    width: 120,
                  },
                  {
                    id: "KALITEADI",
                    title: "ADI",
                    width: 240,
                  },
                ]}
                defaultValue={formData?.KALITEID}
                control={control}
              />

              <LiteOptionsTable
                label="Ham Stok"
                renderValue={(_: string, obj: any) => {
                  return obj.ADI;
                }}
                // defaultFilters={
                //   kaliteData?.HAMID ? `?HAMID=${kaliteData?.HAMID}` : ""
                // }
                handleSelect={(data: { HAMID: string }) => {
                  setValue("HAMADI", data.HAMID);
                  setValue("HAMID", data.HAMID);
                  handleDirtyPlaces("KALITEID");
                }}
                name="HAMID"
                headColumns={[
                  { id: "HAMID", title: "HAMID", width: 60 },
                  { id: "ADI", title: "ADI", width: 150 },
                ]}
                defaultValue={
                  kaliteData?.HAMADI
                    ? kaliteData?.HAMADI
                    : formData?.HAMID && formData?.HAMADI
                    ? formData?.HAMID + " - " + formData?.HAMADI
                    : formData?.HAMID
                }
                link="ham"
                control={control}
              />
              <div className="grid grid-cols-4 gap-x-3">
                <HFTextField
                  type="number"
                  label="Pus"
                  name="PUS"
                  control={control}
                  defaultValue={formData?.PUS ?? ""}
                />
                <HFTextField
                  type="number"
                  label="Feine"
                  name="FEINE"
                  control={control}
                  defaultValue={formData?.FEINE}
                />
                <HFTextField
                  type="number"
                  label="En"
                  name="ENISTENEN"
                  control={control}
                  defaultValue={formData?.ENISTENEN}
                />
                <HFTextField
                  type="number"
                  label="Gramaj"
                  name="GRAMAJISTENEN"
                  control={control}
                  defaultValue={formData?.GRAMAJISTENEN}
                />
              </div>
              <div className="grid grid-cols-2 gap-x-3">
                <HFTextField
                  type="number"
                  label="Kilo"
                  name="IPTALKILO"
                  control={control}
                  defaultValue={formData?.IPTALKILO}
                />
                <HFTextField
                  type="number"
                  label="Brut Kilo"
                  name="BRUTKILO"
                  control={control}
                  defaultValue={formData?.BRUTKILO}
                />
              </div>

              <div className="grid grid-cols-2 gap-x-3">
                <HFTextField
                  label="Birim fiyat"
                  name="BIRIMFIYAT"
                  type="number"
                  control={control}
                  defaultValue={formData?.BIRIMFIYAT}
                />
                <LiteOptionsTable
                  label="Doviz"
                  name="DOVIZID"
                  renderValue={(_: string, obj: any) => {
                    return obj.DOVIZID;
                  }}
                  link="doviz"
                  defaultValue={formData?.DOVIZID || "USD"}
                  headColumns={[{ id: "DOVIZID", title: "DOVIZID", width: 80 }]}
                  handleSelect={(obj: { DOVIZID: string }) => {
                    setValue("DOVIZID", obj.DOVIZID);
                  }}
                  control={control}
                />
              </div>

              <HFTextField
                name="PANTONEKODU"
                label="Panton kodu"
                defaultValue={""}
                control={control}
                setValue={setValue}
              />
              <LiteOptionsTable
                label="Lab Recete Kodu"
                name="LABRECETEKODU"
                renderValue={(_: string, obj: any) => {
                  return obj.LABRECETEKODU;
                }}
                link="labrecete"
                defaultFilters={`${
                  PANTONEKODU ? `?LABRECETEKODU=${PANTONEKODU}` : ""
                }`}
                headColumns={[
                  { id: "LABRECETEKODU", title: "LABRECETEKODU", width: 140 },
                  { id: "LABRECETEID", title: "LABRECETEID", width: 110 },
                  { id: "ADI", title: "ADI", width: 140 },
                ]}
                defaultValue={formData?.LABRECETEKODU}
                handleSelect={(obj: {
                  LABRECETEKODU: string;
                  LABRECETEID: number;
                }) => {
                  setValue("LABRECETEKODU", obj.LABRECETEKODU);
                  setValue("LABRECETEID", obj.LABRECETEID);
                }}
                control={control}
              />

              <div className="flex items-center gap-3">
                <LiteOptionsTable
                  label="Lab dip no"
                  name="LABRECETEATISID"
                  link="labreceteatis"
                  renderValue={(_: string, obj: any) => obj.LABRECETEATISID}
                  disabled={!LABRECETEID}
                  headColumns={[
                    {
                      id: "LABRECETEATISID",
                      title: "LABRECETEATISID",
                      width: 80,
                    },
                    { id: "LABRECETEKODU", title: "LABRECETEKODU", width: 120 },
                    {
                      id: "OKEY",
                      title: "OKEY",
                      render: (val: boolean) => {
                        return val ? "OKEY" : "Okeysiz";
                      },
                      width: 100,
                    },
                  ]}
                  defaultFilters={
                    LABRECETEID ? `LABRECETEID=${LABRECETEID}` : ""
                  }
                  defaultValue={formData?.LABRECETEATISID}
                  handleSelect={(obj: {
                    ATISNO: number;
                    RECETEASAMAADI: string;
                  }) => {
                    setValue("LABRECETEATISID", obj.ATISNO);
                    setValue("RECETEASAMAADI", obj.RECETEASAMAADI);
                    setReceteData(obj);
                  }}
                  control={control}
                />
                <CLabel title={getValues().RECETEASAMAADI} />
              </div>
              <LiteOptionsTable
                label="Renk"
                name="RENKID"
                renderValue={(_: string, obj: any) => {
                  return obj.RENKID && obj.ADI
                    ? obj.RENKID + " - " + obj.ADI
                    : obj.RENKID;
                }}
                defaultValue={
                  formData?.RENKID && formData?.RENKADI
                    ? formData?.RENKID + " - " + formData?.RENKADI
                    : formData?.RENKID
                }
                link="renk"
                headColumns={[
                  { id: "RENKID", title: "RENKID", width: 80 },
                  { id: "ADI", title: "ADI", width: 280 },
                ]}
                defaultFilters={
                  receteData?.LABRECETEID
                    ? `LABRECETEID=${receteData?.LABRECETEID}`
                    : ""
                }
                handleSelect={(obj: { RENKID: number }) => {
                  setValue("RENKID", obj.RENKID);
                }}
                control={control}
              />

              <LiteOptionsTable
                label="Renk Deringligi"
                name="RENKDERINLIGIID"
                renderValue={(_: string, obj: any) => {
                  return obj.RENKDERINLIGIID && obj.ADI
                    ? obj.RENKDERINLIGIID + " - " + obj.ADI
                    : obj.RENKDERINLIGIID;
                }}
                defaultValue={
                  formData?.RENKDERINLIGIID && formData?.RENKDERINLIGIADI
                    ? formData?.RENKDERINLIGIID +
                      " - " +
                      formData?.RENKDERINLIGIADI
                    : formData?.RENKDERINLIGIID
                }
                defaultFilters={
                  receteData?.RENKDERINLIGIID ||
                  receteData?.RENKDERINLIGIID === 0
                    ? `RENKDERINLIGIID=${receteData?.RENKDERINLIGIID + ""}`
                    : ""
                }
                link="renkderinligi"
                headColumns={[
                  {
                    id: "RENKDERINLIGIID",
                    title: "RENKDERINLIGIID",
                    width: 80,
                  },
                  { id: "ADI", title: "ADI", width: 280 },
                ]}
                handleSelect={(obj: { RENKDERINLIGIID: number }) => {
                  setValue("RENKDERINLIGIID", obj.RENKDERINLIGIID);
                }}
                control={control}
              />
            </div>
            <div className="space-y-3">
              <LiteOptionsTable
                label="Sparis Proses"
                name="SIPARISPROSESID"
                link="siparisproses"
                renderValue={(_: string, obj: any) => {
                  return obj.SIPARISPROSESID && obj.ADI
                    ? obj.SIPARISPROSESID + " - " + obj.ADI
                    : obj.SIPARISPROSESID;
                }}
                headColumns={[
                  {
                    id: "SIPARISPROSESID",
                    title: "SIPARISPROSESID",
                    width: 120,
                  },
                  { id: "ADI", title: "ADI", width: 280 },
                ]}
                defaultValue={formData?.SIPARISPROSESID}
                handleSelect={(obj: { SIPARISPROSESID: number }) => {
                  setValue("SIPARISPROSESID", obj.SIPARISPROSESID);
                }}
                control={control}
              />

              <HFTextField
                type="number"
                label="Musteri Siparis No"
                name="MUSTERISIPARISNO"
                control={control}
                defaultValue={formData?.MUSTERISIPARISNO}
              />

              <HFTextField
                type="number"
                label="Ref Siparis No"
                name="REFSIPARISNO"
                control={control}
                defaultValue={formData?.REFSIPARISNO}
              />

              <HFTextField
                label="Sekil Adresi"
                name="SEKILADRES"
                control={control}
                defaultValue={formData?.SEKILADRES}
              />

              <HFTextField
                label="Melanj kodu"
                name="MELANJKODU"
                control={control}
              />

              <HFTextField
                type="number"
                label="Fire oran"
                name="FIREORANI"
                control={control}
              />

              <HFTextField
                label="Hata Puan Carpan"
                name="HATAPUANICARPANI"
                control={control}
              />
            </div>

            <div className="space-y-3">
              <LiteOptionsTable
                label="Desen No"
                name="DESENID"
                link="desen"
                renderValue={(_: string, obj: any) => {
                  return obj.DESENID && obj.ADI
                    ? obj.DESENID + " - " + obj.ADI
                    : obj.DESENID;
                }}
                headColumns={[
                  {
                    id: "DESENID",
                    title: "DESENID",
                    width: 120,
                  },
                  { id: "ADI", title: "ADI", width: 280 },
                ]}
                defaultValue={formData?.DESENID}
                handleSelect={(obj: { DESENID: number }) => {
                  setValue("DESENID", obj.DESENID);
                }}
                control={control}
              />
              <LiteOptionsTable
                label="Varyat adi"
                name="DESENVARYANTID"
                link="desenvaryant"
                renderValue={(_: string, obj: any) => {
                  return obj.DESENVARYANTID && obj.DESENADI
                    ? obj.DESENVARYANTID + " - " + obj.DESENADI
                    : obj.DESENVARYANTID;
                }}
                headColumns={[
                  {
                    id: "DESENVARYANTID",
                    title: "ID",
                    width: 80,
                  },
                  { id: "DESENADI", title: "DESENADI", width: 180 },
                ]}
                defaultFilters={DESENID ? `DESENID=${DESENID}` : ""}
                defaultValue={formData?.DESENVARYANTID}
                handleSelect={(obj: { DESENVARYANTID: number }) => {
                  setValue("DESENVARYANTID", obj.DESENVARYANTID);
                }}
                control={control}
              />

              <LiteOptionsTable
                label="Islem Tipi"
                name="ISLEMTIPIID"
                link="islemtipi"
                renderValue={(_: string, obj: any) => {
                  return obj.ISLEMTIPIID || (obj.ISLEMTIPIID === 0 && obj.ADI)
                    ? obj.ISLEMTIPIID + " - " + obj.ADI
                    : obj.ISLEMTIPIID;
                }}
                headColumns={[
                  {
                    id: "ISLEMTIPIID",
                    title: "ISLEMTIPIID",
                    width: 90,
                  },
                  { id: "ADI", title: "ADI", width: 120 },
                ]}
                defaultValue={formData?.ISLEMTIPIID}
                defaultSearchSingle={formData?.ISLEMTIPIID + ""}
                handleSelect={(obj: { ISLEMTIPIID: number }) => {
                  setValue("ISLEMTIPIID", obj.ISLEMTIPIID);
                }}
                control={control}
              />

              <HFTextarea
                label="Planlama Notu"
                name="PLANLAMANOTU"
                defaultValue={formData?.PLANLAMANOTU}
                control={control}
                minRows={2}
              />
              <HFTextarea
                label="Siparis Notu"
                name="SIPARISNOTU"
                defaultValue={formData?.SIPARISNOTU}
                control={control}
                minRows={2}
              />
              <HFTextarea
                label="Termin Notu"
                name="TERMINNOTU"
                defaultValue={formData?.TERMINNOTU}
                control={control}
                minRows={2}
              />
              <div>
                <CLabel title="ONAYDURUMU" />
                <CCheckbox
                  element={{
                    label: "ONAYDURUMU",
                    name: "ONAYDURUMU",
                    control: control,
                  }}
                />
              </div>
            </div>
          </div>
          <SubmitCancelButtons
            uniqueID={uniqueID}
            type={
              formId ? "update boya siparis detay" : "create boya siparis detay"
            }
            handleActions={handleActions}
          />
        </form>
      </CNewMiniModal>
      {isDirty && (
        <CNewMiniModal
          title=" "
          handleActions={() => {
            dispatch(
              websiteActions.setDirtyPlaces({ list: "", isDirty: false })
            );
          }}
        >
          <div className="w-[400px]">
            <p>{t("you_have_changes")}</p>
            <div className="flex space-x-2 mt-5">
              <button
                className="cancel-btn"
                type="button"
                onClick={() => {
                  dispatch(
                    websiteActions.setDirtyPlaces({ list: "", isDirty: false })
                  );
                }}
              >
                Cancel
              </button>
              <button
                className="custom-btn"
                type="button"
                onClick={() => {
                  handleSubmit(onSubmit)();
                  dispatch(
                    websiteActions.setDirtyPlaces({ list: "", isDirty: false })
                  );
                }}
              >
                Save
              </button>
            </div>
          </div>
        </CNewMiniModal>
      )}
    </>
  );
};
