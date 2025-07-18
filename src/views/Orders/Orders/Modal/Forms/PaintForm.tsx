import { useForm } from "react-hook-form";
import CNewMiniModal from "../../../../../components/CElements/CNewMiniModal";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../../components/UI/FormButtons/SubmitCancel";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { PaintFormLogic } from "./PaintComponents/Logic";
import HFTextarea from "../../../../../components/HFElements/HFTextarea";
import HFTextField from "../../../../../components/HFElements/HFTextField";
import CCheckbox from "../../../../../components/CElements/CCheckbox";
import CLabel from "../../../../../components/CElements/CLabel";

export const PaintForm = ({
  handleActions,
  uniqueID,
  defaultData,
  title,
  parentId,
  ORMESIPARISDETAYID,
  refetch,
}: {
  handleActions: (val: string) => void;
  uniqueID: string;
  defaultData: any;
  parentId: number;
  ORMESIPARISDETAYID: number;
  title: string;
  refetch: () => void;
}) => {
  const [formId, setFormId] = useState(0);
  const { control, setValue, handleSubmit, watch, getValues } = useForm();
  const DESENID = watch("DESENID");
  const LABRECETEID = watch("LABRECETEID");
  const { formData, updateForm, createForm } = PaintFormLogic({
    formId,
    defaultData,
    closeFn: () => {
      refetch();
      handleActions("Close");
    },
  });
  // backend needs this data to create
  // {
  //   "BOYASIPARISKAYITID": 2770,
  //   "ORMESIPARISDETAYID": 12280,
  //   "FIRMASEVKADRESIID": 904,
  //   "SIRANO": 38,
  //   "MUSTERISIPARISNO": "99999",
  //   "REFERANSSIPARISNO": "123456",
  //   "LABRECETEID": 13280,
  //   "LABRECETEKODU": "M0868-PC30001",
  //   "LABRECETEATISID": 18393,
  //   "ISLEMGRUBUID": 1,
  //   "RENKID": 10590,
  //   "RENKADI": "QORA-3",
  //   "DESENID": "2667",
  //   "PROSESID": 58,
  //   "ISLEMTIPIID": 0,
  //   "SIPARISPROSESID": 58,
  //   "SIPARISKILO": 100,
  //   "BOYANACAK": true,
  //   "PAKETLEMESEKLIID": 2,
  //   "RENKDERINLIGIID": 2,
  //   "BIRIMFIYAT": 8.16,
  //   "HAMSTOKBIRIMID":0,
  //   "DOVIZID": "USD",
  //   "FASONBIRIMFIYATDOVIZID": "USD",
  //   "BASKIBIRIMFIYATDOVIZID": "USD",
  //   "FATURAKESILECEK": true,
  //   "HAMID": 1897,
  //   "PUS": 32,
  //   "FEINE": 28,
  //   "MUSTERIKALITENO": "4",
  //   "KALITEID": "SJ-001.03.140",
  //   "ENISTENEN": "180",
  //   "GRAMAJISTENEN": "140",
  //   "TERMINTARIHI": "2024-10-15T00:00:00",
  //   "SONTERMINTARIHI": "2024-10-15T00:00:00",
  //   "ONAYDURUMU": true,
  //   "ONAYLAYANKULLANICIID": 6,
  //   "MAXIMUMFIREORANI": 10,
  //   "ILAVEISLEMLER": "ON ISLEM",
  //   "SIPARISTIPIID": 1,
  // "RECETEGIRISTARIHI": "2024-09-27T14:43:05",
  // "RECETEGIRISKULLANICIID": 6,
  // "DESENGIRISTARIHI": "2024-09-27T14:43:05",
  // "DESENGIRISKULLANICIID": 6,
  // "BASKITIPIID": 5,
  // "SIPARISBRUTKILO": 228,
  // "TUPACIKENMAYLI": 1,
  // "INSERTKULLANICIID": 6,
  // "INSERTTARIHI": "2024-09-27T14:43:05",
  // "KULLANICIID": 6,
  // "DEGISIMTARIHI": "2024-09-27T14:48:21",
  // "HATAPUANICARPANI": 0.2
  // }
  // my object giving to backend
  //   {
  //     "HAMID": 2,
  //     "PUS": 11,
  //     "FEINE": 2,
  //     "SIPARISKILO": 1,
  //     "BIRIMFIYAT": 1,
  //     "KALITEID": "10EPXCY-1PC",
  //     "DOVIZID": "USD",
  //     "LABRECETEKODU": "M0868-C13028",
  //     "LABRECETEATISID": 23673,
  //     "SIPARISPROSESID": 100,
  //     "RENKID": 11956,
  //     "RENKDERINLIGIID": 1,
  //     "SIPARISTIPIID": 2,
  //     "MUSTERISIPARISNO": "1",
  //     "MUSTERIKALITENO ": "1",
  //     "REFSIPARISNO": "1",
  //     "ENISTENEN": "1",
  //     "GRAMAJISTENEN": "1",
  //     "MAXIMUMFIREORANI": 11,
  //     "HATAPUANICARPANI": 1,
  //     "DESENID": "1000",
  //     "ISLEMTIPIID": 1,
  //     "TERMINTARIHI": "2025-07-03",
  //     "LABRECETEID": 14955,
  //     "RENKADI": "MOVIY-67 (polester iplik)-M0868-P23011",
  //     "ORMESIPARISDETAYID": 12279,
  //     "BOYASIPARISKAYITID": 2737,
  //     "FIRMASEVKADRESIID": 904,
  //     "PAKETLEMESEKLIID": 2,
  //     "HAMSTOKBIRIMID": 0,
  //     "FASONBIRIMFIYATDOVIZID": "USD",
  //     "BASKIBIRIMFIYATDOVIZID": "USD",
  //     "FATURAKESILECEK": true,
  //     "SONTERMINTARIHI": "2025-07-03T15:23:24.516Z",
  //     "ONAYDURUMU": true,
  //     "ONAYLAYANKULLANICIID": 6,
  //     "ILAVEISLEMLER": "ON ISLEM",
  //     "RECETEGIRISTARIHI": "2025-07-03T15:23:24.516Z",
  //     "RECETEGIRISKULLANICIID": 6,
  //     "DESENGIRISTARIHI": "2025-07-03T15:23:24.516Z",
  //     "DESENGIRISKULLANICIID": 6,
  //     "BASKITIPIID": 5,
  //     "SIPARISBRUTKILO": 228,
  //     "TUPACIKENMAYLI": 1,
  //     "INSERTKULLANICIID": 6,
  //     "INSERTTARIHI": "2025-07-03T15:23:24.516Z",
  //     "KULLANICIID": 6,
  //     "DEGISIMTARIHI": "2025-07-03T15:23:24.516Z",
  //     "SIRANO": 999,
  //     "ISLEMGRUBUID": 1,
  //     "PROSESID": 58,
  //     "REFERANSSIPARISNO": "1"
  // }
  const onSubmit = (data: any) => {
    let params = { ...data };

    if (formId) {
      params = { ...formData, ...params };
      // params.BOYASIPARISKAYITID = formId
      // params.SIPARISSIRANO = 1

      updateForm(params, formId);
    } else {
      // Required fields from backend
      params.BOYASIPARISKAYITID = parentId;
      params.ORMESIPARISDETAYID = ORMESIPARISDETAYID;
      params.FIRMASEVKADRESIID = 904;
      params.SIRANO = 10001;
      params.MUSTERISIPARISNO = params.MUSTERISIPARISNO;
      params.REFERANSSIPARISNO = params.REFSIPARISNO; // Fix field name
      params.LABRECETEID = Number(params.LABRECETEID);
      params.LABRECETEKODU = params.LABRECETEKODU;
      params.LABRECETEATISID = Number(params.LABRECETEATISID);
      params.ISLEMGRUBUID = 1;
      params.RENKID = Number(params.RENKID);
      params.RENKADI = params.RENKADI;
      params.DESENID = params.DESENID;
      params.PROSESID = 58;
      params.ISLEMTIPIID = Number(params.ISLEMTIPIID);
      params.SIPARISPROSESID = Number(params.SIPARISPROSESID);
      params.SIPARISKILO = Number(params.SIPARISKILO);
      params.BOYANACAK = params.BOYANACAK;
      params.PAKETLEMESEKLIID = 2;
      params.RENKDERINLIGIID = Number(params.RENKDERINLIGIID);
      params.BIRIMFIYAT = Number(params.BIRIMFIYAT);
      params.HAMSTOKBIRIMID = 0;
      params.DOVIZID = params.DOVIZID;
      params.FASONBIRIMFIYATDOVIZID = params.DOVIZID;
      params.BASKIBIRIMFIYATDOVIZID = params.DOVIZID;
      params.FATURAKESILECEK = true;
      params.HAMID = Number(params.HAMID);
      params.PUS = Number(params.PUS);
      params.FEINE = Number(params.FEINE);
      params.MUSTERIKALITENO = params.MUSTERIKALITENO;
      params.KALITEID = params.KALITEID;
      params.ENISTENEN = params.ENISTENEN;
      params.GRAMAJISTENEN = params.GRAMAJISTENEN;
      params.TERMINTARIHI = params.TERMINTARIHI;
      params.SONTERMINTARIHI = dayjs();
      params.ONAYDURUMU = true;
      params.ONAYLAYANKULLANICIID = 6;
      params.MAXIMUMFIREORANI = Number(params.MAXIMUMFIREORANI);
      params.ILAVEISLEMLER = "ON ISLEM";
      params.SIPARISTIPIID = Number(params.SIPARISTIPIID);
      params.RECETEGIRISTARIHI = dayjs();
      params.RECETEGIRISKULLANICIID = 6;
      params.DESENGIRISTARIHI = dayjs();
      params.DESENGIRISKULLANICIID = 6;
      params.BASKITIPIID = 5;
      params.SIPARISBRUTKILO = 228;
      params.TUPACIKENMAYLI = 1;
      params.INSERTKULLANICIID = 6;
      params.INSERTTARIHI = dayjs();
      params.KULLANICIID = 6;
      params.DEGISIMTARIHI = dayjs();
      params.HATAPUANICARPANI = Number(params.HATAPUANICARPANI);

      // Remove extra fields that are not expected by backend
      delete params.ADET;
      delete params.DEGISIMLOG;
      delete params.DINLENMISGRAMAJ;
      delete params.FATURAEDILECEKMIKTARTIPI;
      delete params.BOYASIPARISDETAYID;
      delete params.BRUTKILO;
      delete params.IPTALMETRE;
      delete params.HAMMIKTAR;
      delete params.SEKILADRES;
      delete params.MELANJKODU;
      delete params.FIREORANI;
      delete params.DESENVARYANTID;
      delete params.PLANLAMANOTU;
      delete params.SIPARISNOTU;
      delete params.TERMINNOTU;
      delete params.IPTALKILO;

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
              defaultValue={formData?.PUS}
            />
            <HFTextField
              type="number"
              label="Feine"
              name="FEINE"
              control={control}
              defaultValue={formData?.FEINE}
            />
            <div className="grid grid-cols-4 gap-x-2">
              <HFTextField
                type="number"
                label="Kilo"
                name="SIPARISKILO"
                control={control}
                defaultValue={formData?.SIPARISKILO}
              />
              <HFTextField
                type="number"
                label="Brut Kilo"
                name="BRUTKILO"
                control={control}
                defaultValue={formData?.BRUTKILO}
              />{" "}
              <HFTextField
                type="number"
                label="Metre"
                name="IPTALMETRE"
                control={control}
                defaultValue={formData?.IPTALMETRE}
              />{" "}
              <HFTextField
                type="number"
                label="Birim Fiyat"
                name="BIRIMFIYAT"
                control={control}
                defaultValue={formData?.BIRIMFIYAT}
              />
            </div>
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
              label="Lab Recete Kod"
              name="LABRECETEKODU"
              renderValue={(_: string, obj: any) => {
                return obj.LABRECETEKODU;
              }}
              link="labrecete"
              headColumns={[
                { id: "LABRECETEKODU", title: "LABRECETEKODU", width: 140 },
                { id: "LABRECETEID", title: "LABRECETEID", width: 100 },
                { id: "ADI", title: "ADI", width: 140 },
              ]}
              defaultValue={formData?.LABRECETEKODU}
              handleSelect={(obj: {
                LABRECETEKODU: string;
                LABRECETEID: number;
                LABRECETEATISID: number;
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
              renderValue={(_: string, obj: any) => {
                return obj.LABRECETEATISID && obj.ADI
                  ? obj.LABRECETEATISID + " - " + obj.ADI
                  : obj.LABRECETEATISID;
              }}
              headColumns={[
                {
                  id: "LABRECETEATISID",
                  title: "LABRECETEATISID",
                },
              ]}
              disabled={LABRECETEID ? false : true}
              defaultFilters={LABRECETEID ? `LABRECETEID=${LABRECETEID}` : ""}
              defaultValue={formData?.LABRECETEATISID}
              handleSelect={(obj: { LABRECETEATISID: number }) => {
                setValue("LABRECETEATISID", obj.LABRECETEATISID);
              }}
              control={control}
            />
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
          </div>
          <div className="space-y-3">
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
              handleSelect={(obj: { RENKID: number; ADI: string }) => {
                setValue("RENKID", obj.RENKID);
                setValue("RENKADI", obj.ADI);
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
            <LiteOptionsTable
              label="Siparis Tipi"
              name="SIPARISTIPIID"
              renderValue={(_: string, obj: any) => {
                return obj.SIPARISTIPIID && obj.ADI
                  ? obj.SIPARISTIPIID + " - " + obj.ADI
                  : obj.SIPARISTIPIID;
              }}
              defaultValue={
                formData?.SIPARISTIPIID && formData?.SIPARISTIPIADI
                  ? formData?.SIPARISTIPIID + " - " + formData?.SIPARISTIPIADI
                  : formData?.SIPARISTIPIID
              }
              link="boyasiparistipi"
              headColumns={[
                { id: "SIPARISTIPIID", title: "SIPARISTIPIID", width: 80 },
                { id: "ADI", title: "ADI", width: 280 },
              ]}
              handleSelect={(obj: { SIPARISTIPIID: number }) => {
                setValue("SIPARISTIPIID", obj.SIPARISTIPIID);
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
              label="Musteri Kalite No"
              name="MUSTERIKALITENO "
              control={control}
              defaultValue={formData?.MUSTERIKALITENO}
            />
            <HFTextField
              type="number"
              label="Ref Siparis No"
              name="REFSIPARISNO"
              control={control}
              defaultValue={formData?.REFSIPARISNO}
            />
            <div className="grid grid-cols-3 gap-x-2">
              <HFTextField
                type="number"
                label="Enistenen"
                name="ENISTENEN"
                control={control}
                defaultValue={formData?.ENISTENEN}
              />

              <HFTextField
                type="number"
                label="Gramajistenen"
                name="GRAMAJISTENEN"
                control={control}
                defaultValue={formData?.GRAMAJISTENEN}
              />
              <HFTextField
                type="number"
                label="Maximum Fire Or"
                name="MAXIMUMFIREORANI"
                control={control}
                defaultValue={formData?.MAXIMUMFIREORANI}
              />
            </div>
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
            <div className="grid grid-cols-3 gap-x-2">
              <HFTextField
                label="Melanj kodu"
                name="MELANJKODU"
                control={control}
              />

              <HFTextField
                label="Hata Puan Carpan"
                name="HATAPUANICARPANI"
                control={control}
              />
              <div>
                <CLabel title="Kilo" />
                <CCheckbox
                  element={{
                    label: "Siparis Kilo",
                    name: "BOYANACAK",
                    control: control,
                    defaultValue: formData?.BOYANACAK,
                  }}
                  handleCheck={(val: any) => {
                    setValue("BOYANACAK", val.BOYANACAK);
                  }}
                  checked={formData?.BOYANACAK || getValues()?.BOYANACAK}
                />
              </div>
            </div>
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
                return obj.ISLEMTIPIID && obj.ADI
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
              defaultFilters={
                formData?.ISLEMTIPIID || formData?.ISLEMTIPIID === 0
                  ? `ISLEMTIPIID=${formData?.ISLEMTIPIID}`
                  : ""
              }
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
