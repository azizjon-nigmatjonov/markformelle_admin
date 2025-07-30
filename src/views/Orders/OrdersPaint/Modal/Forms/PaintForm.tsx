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

export const PaintForm = ({
  handleActions,
  uniqueID,
  defaultData,
  title,
  parentId,
  refetch,
}: {
  handleActions: (val: string) => void;
  uniqueID: string;
  defaultData: any;
  parentId: number;
  title: string;
  refetch: () => void;
}) => {
  const [formId, setFormId] = useState(0);
  const { control, setValue, handleSubmit, watch } = useForm({});
  const DESENID = watch("DESENID");
  const { formData, updateForm, createForm } = PaintFormLogic({
    formId,
    defaultData,
    closeFn: () => {
      refetch();
      handleActions("Close");
    },
  });

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

  return (
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
              label="Ham Stok"
              renderValue={(_: string, obj: any) => {
                return obj.HAMID && obj.ADI
                  ? obj.HAMID + " - " + obj.ADI
                  : obj.HAMID;
              }}
              handleSelect={(data: { HAMID: string }) => {
                setValue("HAMID", data.HAMID);
              }}
              name="HAMID"
              headColumns={[
                { id: "HAMID", title: "HAMID", width: 60 },
                { id: "ADI", title: "ADI", width: 150 },
              ]}
              defaultValue={
                formData?.HAMID && formData?.HAMADI
                  ? formData?.HAMID + " - " + formData?.HAMADI
                  : formData?.HAMID
              }
              link="ham"
              control={control}
            />
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
            <HFTextField
              type="number"
              label="Metre"
              name="IPTALMETRE"
              control={control}
              defaultValue={formData?.IPTALMETRE}
            />
            <HFTextField
              label="Miktar"
              name="HAMMIKTAR"
              type="number"
              control={control}
              defaultValue={formData?.HAMMIKTAR}
            />
            <LiteOptionsTable
              label="Birim fiyat 1. Kalite"
              handleSelect={(obj: { KALITEID: string }) => {
                setValue("KALITEID", obj.KALITEID);
              }}
              renderValue={(_: string, obj: any) => {
                return obj.KALITEID && obj.KALITEADI
                  ? obj.KALITEID + " - " + obj.KALITEADI
                  : obj.KALITEID;
              }}
              name="KALITEID"
              headColumns={[
                { id: "KALITEID", title: "KALITEID", width: 200 },
                { id: "KALITEADI", title: "KALITEADI" },
              ]}
              link="kalite"
              control={control}
            />
            <LiteOptionsTable
              label="Fason Birim Fiyat"
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

            <LiteOptionsTable
              label="Lab Recete Kodu"
              name="LABRECETEKODU"
              renderValue={(_: string, obj: any) => {
                return obj.LABRECETEKODU;
              }}
              link="labrecete"
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
                { id: "LABRECETEKODU", title: "LABRECETEKODU", width: 80 },
              ]}
              defaultFilters={LABRECETEID ? `?LABRECETEID=${LABRECETEID}` : ""}
              defaultValue={formData?.LABRECETEATISID}
              handleSelect={(obj: { ATISNO: number }) => {
                setValue("LABRECETEATISID", obj.ATISNO);
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
              link="renkderinligi"
              headColumns={[
                { id: "RENKDERINLIGIID", title: "RENKDERINLIGIID", width: 80 },
                { id: "ADI", title: "ADI", width: 280 },
              ]}
              handleSelect={(obj: { RENKDERINLIGIID: number }) => {
                setValue("RENKDERINLIGIID", obj.RENKDERINLIGIID);
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

            <LiteOptionsTable
              label="Kalite no"
              renderValue={(_: string, obj: any) => {
                return obj.KALITEADI;
              }}
              handleSelect={(obj: { KALITEID: string }) => {
                setValue("KALITEID", obj.KALITEID);
              }}
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
  );
};
