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
  console.log("currentPaint", currentPaint);

  console.log("formData", formData);

  const { control, handleSubmit, setValue } = useForm();
  const { createForm } = PartiCreateLogics({ refetch: () => {} });
  const onSubmit = (data: any) => {
    console.log(data);
    const params = {
      ...data,
      PARTIYIL: 2025,
      PARTIID: 16,
      ACILISTARIHI: dayjs(),
      FIRMAID: formData.FIRMAID,
      IMALATTIPIID: false,
      MODELNO: "",
      FASON: false,
      RECETEID: currentPaint.LABRECETEKODU + "." + 1,
      RECETETARIHI: currentPaint.RECETEGIRISTARIHI,
      ISLEMTIPIID: 1,
      ISLEMGRUBUID: 0,
      ACILIYETDERECESIID: 0,
      ISLETMEONCELIKNO: 1000,
      ACILIYETNOTU: "",
      PLANLANANIMALATTARIHI: dayjs(),
      TERMINTARIHI: dayjs(),
      RECETEOKEY: false,
      TALIMAT: false,
      TALIMATOKEY: false,
      NOTU: "",
      RECETEYAZILDI: false,
      RECETEYAZILISTARIHI: dayjs(),
      REFAKATKARTIYAZILDI: false,
      PARCALISEVK: false,
      FATURAKESILECEK: true,
      BOYASIPARISKAYITID: formData.BOYASIPARISKAYITID,
      // DESENVARYANTID: null,
      FATURAKESILDI: false,
      SINIF: "B",
      VADEGUN: 0,
      // RAFID: "",
      // EMULSIYONURUNID: "",
      PATMIKTARI: 0,
      ONAYDURUMU: true,
      ONAYTARIHI: dayjs(),
      ONAYLAYANKULLANICIID: 0,
      SABLONRECETESTOKTANDUSULDU: false,
      PARTITIPIID: 0,
      SEVKIYATNOTU: "",
      REFAKATKARTIYAZMASAYISI: 0,
      SABLONSAYISI: 0,
      ARGENO: "",
      NUMUNEONAYTARIHI: dayjs().format("YYYY-MM-DD"),
      NUMUNENOTU: "",
      DEGISIMLOG: "",
      LAMINASYON: false,
      LINKISLEMI: 0,
      INSERTKULLANICIID: 1,
      INSERTTARIHI: dayjs(),
      KULLANICIID: 1,
      DEGISIMTARIHI: currentPaint.DEGISIMTARIHI,
      NUMUNEGONDERITARIHI: dayjs(),
      REVIZETERMINTARIHI: dayjs(),
      RECETEYAZMASAYISI: 0,
      PARTIKAYITID: 0,
    };
    // console.log("params", params);

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
    if (currentPaint) {
      setValue("TERMINTARIHI", dayjs().format("YYYY-MM-DD"));
    }
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
                name="PARTI"
                link="parti"
                label="Parti Grubu"
                headColumns={[
                  {
                    title: "Parti",
                    id: "PARTI",
                  },
                ]}
                control={control}
                handleSelect={(val: any) => {
                  setValue("PARTI", val.PARTI);
                }}
              />
              <LiteOptionsTable
                name="BOYASIPARISDETAYMUSTERISIPARISNO"
                link="parti"
                label="Prozes No"
                headColumns={[
                  {
                    title: "Parti",
                    id: "PARTI",
                  },
                ]}
                renderValue={(val: any) => {
                  return val.BOYASIPARISDETAYMUSTERISIPARISNO;
                }}
                defaultValue={currentRezerv.BOYASIPARISDETAYMUSTERISIPARISNO}
                control={control}
                handleSelect={(val: any) => {
                  setValue("PARTI", val.PARTI);
                }}
              />
              <LiteOptionsTable
                name="ISLEMGRUPLARI"
                link="islem"
                label="Islem Gruplari"
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
              if (val === "Close") {
              }
              if (val === "Enter") handleSubmit(onSubmit)();
            }
          }}
        />
      </form>
    </CNewMiniModal>
  );
};
