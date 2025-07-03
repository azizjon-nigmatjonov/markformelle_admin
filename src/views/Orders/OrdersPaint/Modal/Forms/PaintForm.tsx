import { useForm } from "react-hook-form";
import CNewMiniModal from "../../../../../components/CElements/CNewMiniModal";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../../components/UI/FormButtons/SubmitCancel";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { PaintFormLogic } from "./PaintComponents/Logic";
import HFTextarea from "../../../../../components/HFElements/HFTextarea";
import HFTextField from "../../../../../components/HFElements/HFTextField";

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
  const { control, setValue, handleSubmit, watch } = useForm();
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
    console.log(data);
    let params = { ...data };
    if (formId) {
      params = { ...formData, ...params };
      // params.BOYASIPARISKAYITID = formId
      // params.SIPARISSIRANO = 1

      updateForm(params, formId);
    } else {
      params.ADET = null;
      params.BOYASIPARISKAYITID = parentId;
      // params.SIPARISDETAYID = parentId;
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
      console.log(params);

      createForm(params);
    }
  };

  //   {
  //     "HAMID": 2,
  //     "PUS": "1",
  //     "FEINE": "1",
  //     "IPTALKILO": "1",
  //     "BRUTKILO": "1",
  //     "IPTALMETRE": "1",
  //     "HAMMIKTAR": "1",
  //     "KALITEID": "10CX-2",
  //     "DOVIZID": "USD",
  //     "LABRECETEKODU": "M0868-C13027",
  //     "LABDIPID": "1",
  //     "SIPARISPROSESID": 100,
  //     "RENKID": 11956,
  //     "RENKDERINLIGIID": 1,
  //     "MUSTERISIPARISNO": "1",
  //     "REFSIPARISNO": "1",
  //     "SEKILADRES": "1",
  //     "MELANJKODU": "1",
  //     "FIREORANI": "1",
  //     "HATAPUANICARPANI": "1",
  //     "DESENID": "6113",
  //     "DESENVARYANTID": 2,
  //     "ISLEMTIPIID": 1,
  //     "PLANLAMANOTU": "1",
  //     "SIPARISNOTU": "TEST",
  //     "TERMINNOTU": "TEST",
  //     "TERMINTARIHI": "2025-07-02",
  //     "ADET": null,
  //     "BOYASIPARISKAYITID": 2737,
  //     "DEGISIMLOG": "",
  //     "DINLENMISGRAMAJ": "",
  //     "BASKIBIRIMFIYATDOVIZID": "USD",
  //     "FASONBIRIMFIYATDOVIZID": "USD",
  //     "FATURAEDILECEKMIKTARTIPI": 0,
  //     "HAMSTOKBIRIMID": 0,
  //     "SIRANO": 999,
  //     "FIRMASEVKADRESIID": 904
  // }

  //   COLUMN_NAMEs
  // ADET
  // BOYASIPARISKAYITID
  // DEGISIMLOG
  // DINLENMISGRAMAJ
  // FEINE
  // HAMID
  // HAMMIKTAR
  // HAMSTOKBIRIMID
  // IGNESAYISI
  // INSERTKULLANICIID
  // KAPALI
  // KOPYAID
  // KULLANICIID
  // MAKINAUSTUGRAMAJ
  // MALIONAYDURUMU
  // MALIONAYLAYANKULLANICIID
  // MUSTERITALIMATI
  // NOTU
  // ONAYDURUMU
  // ONAYLAYANKULLANICIID
  // ORMEBIRIMMALIYET
  // ORMESIPARISDETAYID
  // PLANLANANMIKTAR
  // PUS
  // SATINALINACAKMIKTAR
  // SATISFIYATI
  // SIPARISSIRANO
  // TAHMINIFIREORANI
  // TOPLAMBOYALISATIS
  // TOPLAMBOYAYACIKIS
  // TOPLAMORULEN
  // TOPLAMSAKATORULEN
  // TOPLAMSATIS
  // TUPACIKENMAYLI
  // URETIMNOTU

  // my object
  //   {
  //     "HAMID": 4,
  //     "PUS": "1",
  //     "FEINE": "1",
  //     "IPTALKILO": "1",
  //     "BRUTKILO": "1",
  //     "IPTALMETRE": "11",
  //     "HAMMIKTAR": "11",
  //     "KALITEID": "10CX-2",
  //     "LABRECETEKODU": "M0868-C33120",
  //     "SIPARISPROSESID": 100,
  //     "RENKID": 11956,
  //     "MUSTERISIPARISNO": "1",
  //     "REFSIPARISNO": "1",
  //     "SEKILADRES": "1",
  //     "MELANJKODU": "1",
  //     "FIREORANI": "1",
  //     "HATAPUANICARPANI": "1",
  //     "DESENID": "6113",
  //     "DESENVARYANTID": 1938,
  //     "ISLEMTIPIID": 1,
  //     "TERMINNOTU": "111",
  //     "TERMINTARIHI": "2025-07-02",
  //     "ADET": "",
  //     "BOYASIPARISKAYITID": 2737,
  //     "DEGISIMLOG": "",
  //     "DINLENMISGRAMAJ": ""
  // }

  // old object
  //   {
  //     "BOYASIPARISDETAYID": 40544,
  //     "BOYASIPARISKAYITID": 2737,
  //     "ORMESIPARISDETAYID": 12215,
  //     "FIRMASEVKADRESIID": 904,
  //     "SIRANO": 4,
  //     "MUSTERISIPARISNO": "6857",
  //     "REFERANSSIPARISNO": "180719",
  //     "LABRECETEID": 13280,
  //     "LABRECETEKODU": "M0868-PC30001",
  //     "LABRECETEATISID": 18393,
  //     "ISLEMGRUBUID": 1,
  //     "RENKID": 10590,
  //     "RENKADI": "QORA-3-M0868-PC30001",
  //     "DESENID": null,
  //     "DESENKENARYAZISI": null,
  //     "DESENILKBASKI": false,
  //     "MELANJKODU": "",
  //     "FLAMKODU": "",
  //     "PROSESID": 2,
  //     "BASKIPROSESID": null,
  //     "SIPARISPROSESID": 2,
  //     "PAKETLEMESEKLIID": 2,
  //     "RENKDERINLIGIID": 2,
  //     "BIRIMFIYAT": 7.67,
  //     "IKINCIKALITEBIRIMFIYAT": 0,
  //     "FASONBIRIMFIYATI": 0,
  //     "BASKIBIRIMFIYATI": 0,
  //     "HAMSTOKBIRIMID": 0,
  //     "FATURAEDILECEKMIKTARTIPI": 0,
  //     "DOVIZID": "EURO",
  //     "FASONBIRIMFIYATDOVIZID": "USD",
  //     "BASKIBIRIMFIYATDOVIZID": "USD",
  //     "UCRETLITAMIR": false,
  //     "FATURAKESILECEK": false,
  //     "VADEGUN": 0,
  //     "ODEMESEKLIID": null,
  //     "HAMID": 1110,
  //     "BELGEHAMADI": null,
  //     "PUS": 32,
  //     "FEINE": 28,
  //     "LOT": null,
  //     "MUSTERIRENKKODUVEADI": null,
  //     "MUSTERIKALITENO": null,
  //     "KALITEONAYTARIHI": null,
  //     "MUSTERIKALITEADI": null,
  //     "KALITEID": "SJ-010.01.170",
  //     "DENYE": null,
  //     "ENISTENEN": "180",
  //     "GRAMAJISTENEN": "170",
  //     "DONMEISTENEN": null,
  //     "CEKMEZLIKENISTENEN": null,
  //     "CEKMEZLIKBOYISTENEN": null,
  //     "SANSISTENEN": null,
  //     "TOLERANSEN": "",
  //     "TOLERANSGRAMAJ": "",
  //     "TOLERANSENDENCEKMEZLIK": "",
  //     "TOLERANSBOYDANCEKMEZLIK": "",
  //     "TOLERANSDONME": "",
  //     "TERMINTARIHI": "2025-01-15T00:00:00",
  //     "REVIZETERMINTARIHI": null,
  //     "SONTERMINTARIHI": "2025-01-15T00:00:00",
  //     "TERMINNOTU": "19-3911\r\n",
  //     "NOTU": null,
  //     "PLANLAMANOTU": null,
  //     "ONAYDURUMU": false,
  //     "ONAYTARIHI": null,
  //     "ONAYLAYANKULLANICIID": null,
  //     "PARTILENENKILO": 0,
  //     "PARTILENENMETRE": 0,
  //     "IPTALKILO": 0,
  //     "IPTALMETRE": 0,
  //     "PARTILENENKILOBASKI": 0,
  //     "PARTILENENMETREBASKI": 0,
  //     "IPTALKILOBASKI": 0,
  //     "IPTALMETREBASKI": 0,
  //     "ONGORUYAPILACAK": false,
  //     "ORNEKONAY": false,
  //     "MAXIMUMFIREORANI": 12,
  //     "MINIMUMFIREORANI": 0,
  //     "SATISFIREONGORUORANI": null,
  //     "TARTIICINFIREORANI": 0,
  //     "FIRMAADIMIZETIKETTECIKSINMI": false,
  //     "KAPALI": false,
  //     "KAPATMATARIHI": null,
  //     "OZELTESTLER": null,
  //     "ILAVEISLEMLER": "ENZİM, ON ISLEM",
  //     "SIPARISTIPIID": 1,
  //     "ISLEMTIPIID": 3,
  //     "TOPLAMBOYAYACIKIS": 0,
  //     "TOPLAMBOYAIADE": 0,
  //     "TOPLAMBOYADANGELENBRUTKILO": 0,
  //     "TOPLAMBOYAHANEBRUTSEVKKILO": 0,
  //     "BASKASIPARISEKAYDIRILAN": 0,
  //     "BASKASIPARISTENKAYDIRILAN": 0,
  //     "TAMIRBOYASIPARISDETAYID": null,
  //     "RECETEGIRISTARIHI": "2024-09-16T15:41:20",
  //     "RECETEGIRISKULLANICIID": 43,
  //     "RECETEDEGISIMTARIHI": null,
  //     "RECETEDEGISIMKULLANICIID": null,
  //     "DESENGIRISTARIHI": null,
  //     "DESENGIRISKULLANICIID": null,
  //     "DESENDEGISIMTARIHI": null,
  //     "DESENDEGISIMKULLANICIID": null,
  //     "KKLABEL1": null,
  //     "KKLABEL2": null,
  //     "KKLABEL3": null,
  //     "KKLABEL4": null,
  //     "KKLABEL5": null,
  //     "KKLABEL6": null,
  //     "KKLABEL7": null,
  //     "KKDEGER1": null,
  //     "RENKDERINLIGIBIRIMMALIYET": 0,
  //     "SIPARISTEISBRUTNETDARADAN": false,
  //     "BASKITIPIID": null,
  //     "REFERANSISEMRINO": null,
  //     "SIPARISBRUTKILO": 133,
  //     "SIPARISBRUTMETRE": 0,
  //     "BOBINSAYISI": 0,
  //     "TEKRARURETIM": false,
  //     "TUPACIKENMAYLI": 1,
  //     "FIYATKOMISYON": false,
  //     "FIYATKOMISYONORANI": 0,
  //     "KOPYASONUUPDATEYOK": false,
  //     "CEKILISTESICIKACAK": false,
  //     "HEDEFSATISKARORANI": 0,
  //     "ADET": null,
  //     "KAPADEDI": 0,
  //     "ICETIKETYAZDIR": false,
  //     "DISETIKETYAZDIR": false,
  //     "YANETIKETYAZDIR": false,
  //     "MAXTOPMETRESI": 0,
  //     "DEGISIMLOG": "Yaxyohon Muzrobxonov 14.09.2024 11:12:07 İlave İşlemler Değiştirdi, Eskisi =  Yenisi = ENZİM\r\nYaxyohon Muzrobxonov 14.09.2024 11:12:07 İlave İşlemler Değiştirdi, Eskisi = ENZİM Yenisi = ENZİM, ON ISLEM\r\nYaxyohon Muzrobxonov 14.09.2024 11:12:31 Sipariş Kilosunu Değiştirdi, Eski Sipariş Kilo = 224 Yeni Sipariş Kilo = 117\r\nYaxyohon Muzrobxonov 14.09.2024 11:12:31 Renk Adını Değiştirdi, Eski Renk Adı = 12-1106 Yeni Renk Adı = 19-3911\r\nYaxyohon Muzrobxonov 14.09.2024 11:12:31 Termin Notunu Değiştirdi, Eski Termin Notu = 12-1106\r Yeni Termin Notu = 19-3911\r\r\nYaxyohon Muzrobxonov 16.09.2024 15:41:20 Lab.Reçete Kodunu Değiştirdi, Eski Lab Reçete Kodu =  Yeni Lab Reçete Kodu = M0868-PC30001\r\nYaxyohon Muzrobxonov 16.09.2024 15:41:20 Renk Adını Değiştirdi, Eski Renk Adı = 19-3911 Yeni Renk Adı = QORA-3\r\nYaxyohon Muzrobxonov 01.07.2025 15:25:04 Renk Adını Değiştirdi, Eski Renk Adı = QORA-3 Yeni Renk Adı = QORA-3-M0868-PC30001\r\n",
  //     "LINKISLEMI": 0,
  //     "INSERTKULLANICIID": 43,
  //     "INSERTTARIHI": "2024-09-14T11:12:07",
  //     "KULLANICIID": 43,
  //     "DEGISIMTARIHI": "2025-07-01T15:39:58",
  //     "HATAPUANICARPANI": 0.2,
  //     "SIPARISDETAYGRUPID": null,
  //     "PONO": null,
  //     "SASNO": null,
  //     "BOYANACAK": true,
  //     "SIPARISKILO": 117,
  //     "SIPARISMETRE": 0,
  //     "STOKTANKULLANILACAKKILO": 0,
  //     "STOKTANKULLANILACAKMETRE": 0,
  //     "BOYASIPARISYIL": 2024,
  //     "BOYASIPARISID": 471,
  //     "FIRMAADI": "MARK FORMELLE",
  //     "DESENADI": null,
  //     "HAMADI": "36/1 PENYE COMPACT 30 DEN 8% LYC SÜPREM",
  //     "KALITEADI": "single jersey-92%COTTON--8%EL-170gr",
  //     "PROSESADI": null,
  //     "BASKIPROSESADI": null,
  //     "SIPARISPROSESADI": null,
  //     "PAKETLEMESEKLIADI": null,
  //     "RENKDERINLIGIADI": null,
  //     "HAMSTOKBIRIMADI": null,
  //     "DOVIZADI": null,
  //     "FASONBIRIMFIYATDOVIZADI": null,
  //     "BASKIBIRIMFIYATDOVIZADI": null,
  //     "BASKITIPIADI": null,
  //     "SIPARISGRUPADI": null,
  //     "INSERTKULLANICIADI": "Yaxyohon Muzrobxonov",
  //     "KULLANICIADI": "Yaxyohon Muzrobxonov",
  //     "RECETEGIRISKULLANICIADI": null,
  //     "RECETEDEGISIMKULLANICIADI": null,
  //     "DESENGIRISKULLANICIADI": null,
  //     "DESENDEGISIMKULLANICIADI": null,
  //     "ONAYLAYANKULLANICIADI": null,
  //     "FIRMASEVKADRESIADI": "Firma Tanıtım Adresi"
  // }

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
  console.log("DESENID", DESENID);

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
              label="Lab Recete Kod"
              name="LABRECETEKODU"
              renderValue={(_: string, obj: any) => {
                return obj.LABRECETEKODU;
              }}
              link="labrecete"
              headColumns={[
                { id: "LABRECETEKODU", title: "LABRECETEKODU", width: 140 },
                { id: "ADI", title: "ADI", width: 140 },
              ]}
              defaultValue={formData?.LABRECETEKODU}
              handleSelect={(obj: { LABRECETEKODU: string }) => {
                setValue("LABRECETEKODU", obj.LABRECETEKODU);
              }}
              control={control}
            />

            <LiteOptionsTable
              label="Lab dip no"
              name="LABDIPID"
              link="labdipno"
              renderValue={(_: string, obj: any) => {
                return obj.LABDIPID && obj.ADI
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
