import { useForm } from "react-hook-form";
import { useEffect } from "react";
import dayjs from "dayjs";
import { PartiCreateLogics } from "./Logics";
import { CollapseUI } from "../../../../../components/CElements/CCollapse";
import CNewMiniModal from "../../../../../components/CElements/CNewMiniModal";
import HFTextField from "../../../../../components/HFElements/HFTextField";
import HFTextarea from "../../../../../components/HFElements/HFTextarea";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../../components/UI/FormButtons/SubmitCancel";
import { convertToISO } from "../../../../../utils/getDate";

export const PartiCreate = ({
  onClose,
  currentPaint,
  currentRezerv,
  formData,
}: {
  onClose: () => void;
  currentPaint: any;
  currentRezerv: any;
  formData: any;
}) => {
  const { control, handleSubmit, setValue } = useForm();
  const { createForm } = PartiCreateLogics({ refetch: () => {} });

  const onSubmit = (data: any) => {
    const params = {
      ...data,
      ACILISTARIHI: convertToISO(dayjs().format("DD.MM.YYYY")),
      MODELNO: null,
      FIRMAID: formData.FIRMAID,
      IMALATTIPIID: false,
      FASON: false,
      RECETEID: null,
      RECETETARIHI: null,
      ISLEMGRUBUID: 0,
      ISLEMTIPIID: 0,
      ACILIYETDERECESIID: 0,
      ISLETMEONCELIKNO: 1000,
      PLANLANANIMALATTARIHI: convertToISO(dayjs().format("DD.MM.YYYY")),
      TERMINTARIHI: convertToISO(dayjs().format("DD.MM.YYYY")),
      RECETEOKEY: true,
      TALIMAT: true,
      TALIMATOKEY: true,
      NOTU: "",
      RECETEYAZILDI: false,
      RECETEYAZILISTARIHI: null,
      REFAKATKARTIYAZILDI: false,
      PARCALISEVK: true,
      FATURAKESILECEK: true,
      BOYASIPARISKAYITID: formData.BOYASIPARISKAYITID,
      FATURAKESILDI: false,
      SINIF: "B",
      VADEGUN: 0,
      PATMIKTARI: 0,
      ONAYDURUMU: true,
      ONAYTARIHI: convertToISO(dayjs().format("DD.MM.YYYY")),
      ONAYLAYANKULLANICIID: 1,
      SABLONRECETESTOKTANDUSULDU: false,
      PARTITIPIID: 1,
      REFAKATKARTIYAZMASAYISI: 0,
      SABLONSAYISI: 0,
      LAMINASYON: false,
      LINKISLEMI: 0,
      INSERTKULLANICIID: 1,
      INSERTTARIHI: dayjs(),
      KULLANICIID: 1,
      DEGISIMLOG: "",
      DEGISIMTARIHI: dayjs(),
      RECETEYAZMASAYISI: 0,
    };

    createForm(params);
  };

  useEffect(() => {
    if (currentPaint) {
      setValue("SIPARISKILO", currentPaint.SIPARISBRUTKILO);
      setValue("KILO", currentRezerv.KILO);
      setValue("SIPARISMETRE", currentPaint.SIPARISMETRE);
      setValue("PLANLAMANOTU", currentPaint.PLANLAMANOTU);
      setValue(
        "STOKTANKULLANILACAKMETRE",
        currentPaint.STOKTANKULLANILACAKMETRE
      );
      setValue(
        "BOYASIPARISDETAYMUSTERISIPARISNO",
        currentRezerv.BOYASIPARISDETAYMUSTERISIPARISNO
      );
      setValue("METRE", currentRezerv.METRE);
      setValue("KULLANILANMETRE", currentRezerv.KULLANILANMETRE);
    }
  }, [currentPaint, currentRezerv]);

  useEffect(() => {
    setValue("TERMINTARIHI", dayjs().format("YYYY-MM-DD"));
  }, []);

  return (
    <CNewMiniModal title="Hizli Parti Plustur" handleActions={onClose}>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-[440px]"
      >
        <div className="grid grid-cols-1 gap-y-3">
          <div className="grid grid-cols-2 gap-3">
            <HFTextField
              control={control}
              name="SIPARISKILO"
              label="Siparis Kilo"
            />

            <HFTextField
              control={control}
              name="KILO"
              label="Rezerv Kalan Kilo"
            />

            <HFTextField control={control} name="METRE" label="Siparis Metre" />

            <HFTextField
              control={control}
              name="KULLANILANMETRE"
              label="Rezerv Kalan Metre"
            />
          </div>

          <HFTextarea
            control={control}
            name="PLANLAMANOTU"
            label="Planlama Notu"
            minRows={2}
          />
          <HFTextarea
            control={control}
            name="SIPARISNOTU"
            label="Siparis Notu"
            minRows={2}
          />
          <CollapseUI title="Forma" disabled>
            <div className="space-y-3">
              <HFTextField
                control={control}
                name="TERMINTARIHI"
                label="Termin Tarihi"
              />
              <LiteOptionsTable
                name="PARTIID"
                link="parti"
                label="Parti Grubu"
                headColumns={[
                  {
                    title: "PARTIID",
                    id: "PARTIID",
                  },
                ]}
                renderValue={(_: string, val: any) => {
                  return val.PARTIID && val.PARTIADI
                    ? val.PARTIID + " - " + val.PARTIADI
                    : val.PARTIID;
                }}
                control={control}
                handleSelect={(val: any) => {
                  setValue("PARTIID", val.PARTIID);
                }}
              />
              <LiteOptionsTable
                name="PROSESASAMALARIID"
                link="prosesasamalari"
                label="Prozes No"
                headColumns={[
                  {
                    title: "PROSESASAMALARIID",
                    id: "PROSESASAMALARIID",
                    width: 150,
                  },
                  {
                    title: "ASAMAADI",
                    id: "ASAMAADI",
                    width: 150,
                  },
                ]}
                renderValue={(_: string, obj: any) => {
                  return obj.PROSESASAMALARIID && obj.PROSESASAMALARIID
                    ? obj.PROSESASAMALARIID + " - " + obj.ASAMAADI
                    : obj.PROSESASAMALARIID;
                }}
                defaultValue={currentRezerv.PROSESASAMALARIID}
                control={control}
                handleSelect={(val: any) => {
                  setValue("PROSESASAMALARIID", val.PROSESASAMALARIID);
                }}
              />
              <LiteOptionsTable
                name="ISLEMTIPIID"
                link="islemtipi"
                label="Islem Tipi"
                renderValue={(_: string, val: any) => {
                  return val.ISLEMTIPIID && val.ADI
                    ? val.ISLEMTIPIID + " - " + val.ADI
                    : val.ISLEMTIPIID ?? "";
                }}
                headColumns={[
                  {
                    title: "ISLEMTIPIID",
                    id: "ISLEMTIPIID",
                    width: 120,
                  },
                  {
                    title: "ADI",
                    id: "ADI",
                    width: 100,
                  },
                ]}
                control={control}
                handleSelect={(val: any) => {
                  setValue("ISLEMTIPIID", val.ISLEMTIPIID);
                }}
              />
              <LiteOptionsTable
                name="ISLEMGRUBUID"
                link="islemgrubu"
                label="Islem Gruplari"
                renderValue={(_: string, val: any) => {
                  return val.ISLEMGRUBUID && val.ADI
                    ? val.ISLEMGRUBUID + " - " + val.ADI
                    : val.ISLEMGRUBUID;
                }}
                headColumns={[
                  {
                    title: "ISLEMGRUBUID",
                    id: "ISLEMGRUBUID",
                    width: 120,
                  },
                  {
                    title: "ADI",
                    id: "ADI",
                    width: 100,
                  },
                ]}
                control={control}
                handleSelect={(val: any) => {
                  setValue("ISLEMGRUBUID", val.ISLEMGRUBUID);
                }}
              />
              <LiteOptionsTable
                name="ISLEMGRUPLARI"
                link="islem"
                label="Acayet Derecesi"
                headColumns={[
                  {
                    title: "Islem",
                    id: "PARTI",
                  },
                ]}
                control={control}
                handleSelect={(val: any) => {
                  setValue("ISLEMGRUPLARI", val.ISLEMGRUPLARI);
                }}
              />
              <div className="grid grid-cols-3 gap-x-2">
                <HFTextField
                  control={control}
                  name="KILO"
                  label="Kilo"
                  type="number"
                />
                <HFTextField
                  control={control}
                  name="Metre"
                  label="Metre"
                  type="number"
                />
                <HFTextField
                  control={control}
                  name="kap"
                  label="Kap Adedi"
                  type="number"
                />
              </div>
            </div>
          </CollapseUI>
        </div>
        <SubmitCancelButtons
          uniqueID={"innerbtns"}
          type={"create parfti"}
          handleActions={(val: string, uniqueID: string) => {
            if (uniqueID === "innerbtns") {
              if (val === "Close") onClose();

              if (val === "Enter") handleSubmit(onSubmit)();
            }
          }}
        />
      </form>
    </CNewMiniModal>
  );
};
