import { useEffect, useState } from "react";
import { FormLogic } from "../Logic";
import { useForm } from "react-hook-form";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import { LiteOptionsTable } from "../../../../components/UI/Options/LiteTable";
import { SubmitButton } from "../../../../components/UI/FormButtons/SubmitButton";
import HFTextField from "../../../../components/HFElements/HFTextField";
import HFTextarea from "../../../../components/HFElements/HFTextarea";
import dayjs from "dayjs";
import { CreateAsama } from "./Logic";
import CNewModal from "../../../../components/CElements/CNewModal";
import { ModalUIPariTransfers } from "../../Orders/Modal";

export const Form = ({
  formId,
  setFormId,
  defaultData,
  refetchTable,
}: {
  formId: number;
  defaultData: any;
  setFormId: (id: number) => void;
  refetchTable: () => void;
}) => {
  const [openParti, setOpenParti] = useState(false);
  const { createAsama } = CreateAsama({ setOpenParti });
  const { createForm, formData } = FormLogic({
    formId,
    setFormId,
    refetchTable,
    defaultData,
  });
  const { control, setValue, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const params = {
      ...data,
      ACILISTARIHI: dayjs(),
      IMALATTIPIID: false,
      MODELNO: "string",
      FASON: false,
      RECETEID: "string",
      RECETETARIHI: "2025-07-15T10:57:56.340Z",
      ISLEMGRUBUID: 0,
      ISLEMTIPIID: 0,
      ACILIYETDERECESIID: 0,
      ISLETMEONCELIKNO: 1000,
      ACILIYETNOTU: "string",
      PLANLANANIMALATTARIHI: dayjs(),
      TERMINTARIHI: dayjs,
      RECETEOKEY: false,
      TALIMAT: false,
      TALIMATOKEY: false,
      RECETEYAZILDI: false,
      RECETEYAZILISTARIHI: dayjs(),
      REFAKATKARTIYAZILDI: false,
      PARCALISEVK: false,
      FATURAKESILECEK: true,
      BOYASIPARISKAYITID: 0,
      DESENVARYANTID: 0,
      FATURAKESILDI: false,
      SINIF: "B",
      VADEGUN: 0,
      RAFID: "string",
      EMULSIYONURUNID: "string",
      PATMIKTARI: 0,
      ONAYDURUMU: true,
      ONAYTARIHI: dayjs(),
      ONAYLAYANKULLANICIID: 0,
      SABLONRECETESTOKTANDUSULDU: false,
      PARTITIPIID: 0,
      SEVKIYATNOTU: "string",
      REFAKATKARTIYAZMASAYISI: 0,
      SABLONSAYISI: 0,
      ARGENO: "string",
      NUMUNEONAYTARIHI: dayjs().format("YYYY-MM-DD"),
      NUMUNENOTU: "string",
      DEGISIMLOG: "string",
      LAMINASYON: false,
      LINKISLEMI: 0,
      INSERTKULLANICIID: 1,
      INSERTTARIHI: dayjs(),
      KULLANICIID: 1,
      DEGISIMTARIHI: dayjs(),
      NUMUNEGONDERITARIHI: dayjs(),
      REVIZETERMINTARIHI: dayjs(),
      RECETEYAZMASAYISI: 0,
      PARTIKAYITID: 0,
    };
    createForm(params);
  };

  useEffect(() => {
    if (formData) {
      setValue("PARTIID", formData.PARTIID);
      setValue("PARTIYIL", formData.PARTIYIL);
      setValue("FIRMAID", formData.FIRMAID);
      setValue(
        "SIPARISTARIHI",
        dayjs(formData.SIPARISTARIHI).format("YYYY-MM-DD")
      );
      setValue("SIPARISGRUPID", formData.SIPARISGRUPID);
      setValue("ISLEMTIPIID", formData.ISLEMTIPIID);
      setValue("ORMESIPARISTIPIID", formData.ORMESIPARISTIPIID);
      setValue("KULLANICIADI", formData.KULLANICIADI);
      setValue("NOTU", formData.NOTU);
      setValue("ACILIYETNOTU", formData.ACILIYETNOTU);
      setValue(
        "PLANLANANIMALATTARIHI",
        dayjs(formData.PLANLANANIMALATTARIHI).format("YYYY-MM-DD")
      );
      setValue("PARTINO", formData.PARTINO);
      setValue(
        "TERMINTARIHI",
        dayjs(formData.TERMINTARIHI).format("YYYY-MM-DD")
      );
      setValue("SIPARISNO", formData.SIPARISNO);
      setValue("IMALATTIPIID", formData.IMALATTIPIID);
      setValue("FIRMAID", formData.FIRMAID);
      setValue("PARTIGRUPID", formData.PARTIGRUPID);
    } else {
      setValue("ACILISTARIHI", dayjs().format("YYYY-MM-DD"));
    }
  }, [formData]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-b border-[var(--border)] pb-3 mb-3 grid grid-cols-4 gap-x-3 gap-y-2">
          <div className="col-span-2 flex space-x-3">
            <InputFieldUI title="Parti yili">
              <HFTextField control={control} name="PARTIYIL" />
            </InputFieldUI>
            <InputFieldUI title="Parti No">
              <HFTextField control={control} name="PARTIID" />
            </InputFieldUI>
            <InputFieldUI title={formId ? "ID: " + formId : ""}>
              <span></span>
            </InputFieldUI>
          </div>
          <div className="col-span-2 flex justify-end space-x-3">
            <div>
              <SubmitButton
                type="F4"
                uniqueID="F4"
                handleActions={() => {
                  createAsama(formData?.PARTIKAYITID);
                }}
              />
            </div>
            <div>
              <SubmitButton
                type="save"
                uniqueID="submit"
                handleActions={() => {}}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-3 gap-y-3 pb-5">
          <div className="space-y-3">
            <InputFieldUI title="Imalat Tipi">
              <LiteOptionsTable
                name="IMALATTIPIID"
                staticSearchID="IMALATTIPIID"
                link="imalattipi"
                focused
                required={true}
                renderValue={(_: string, obj: any) => {
                  return obj?.IMALATTIPIID;
                }}
                control={control}
                handleSelect={(obj: any) => {
                  setValue("IMALATTIPIID", obj.IMALATTIPIID);
                }}
                defaultValue={formData?.IMALATTIPIID}
                headColumns={[
                  {
                    id: "IMALATTIPIID",
                    title: "IMALATTIPIID",
                  },
                  {
                    id: "ADI",
                    title: "ADI",
                  },
                ]}
              />
            </InputFieldUI>
            <InputFieldUI title="Siparis No">
              <LiteOptionsTable
                name="SIPARISNO"
                staticSearchID="SIPARISNO"
                link="siparis"
                required={true}
                renderValue={(_: string, obj: any) => {
                  return obj?.SIPARISNO;
                }}
                control={control}
                handleSelect={(obj: any) => {
                  setValue("SIPARISNO", obj.SIPARISNO);
                }}
                defaultValue={formData?.BOYASIPARISKAYITID}
                headColumns={[
                  {
                    id: "SIPARISNO",
                    title: "SIPARISNO",
                  },
                  {
                    id: "ADI",
                    title: "ADI",
                  },
                ]}
              />
            </InputFieldUI>
            <InputFieldUI title="Firma Adi">
              <LiteOptionsTable
                name="FIRMAID"
                staticSearchID="FIRMAID"
                link="firma"
                required={true}
                renderValue={(_: string, obj: any) => {
                  return obj?.FIRMAID;
                }}
                control={control}
                handleSelect={(obj: any) => {
                  setValue("FIRMAID", obj.FIRMAID);
                }}
                defaultValue={formData?.FIRMAID}
                headColumns={[
                  {
                    id: "FIRMAID",
                    title: "FIRMAID",
                  },
                  {
                    id: "ADI",
                    title: "ADI",
                  },
                ]}
              />
            </InputFieldUI>
            <InputFieldUI title="Acilis Tarihi">
              <HFTextField name="ACILISTARIHI" control={control} disabled />
            </InputFieldUI>
            <InputFieldUI title="Termin Tarihi">
              <HFTextField
                name="TERMINTARIHI"
                control={control}
                defaultValue={formData?.TERMINTARIHI}
              />
            </InputFieldUI>
          </div>
          <div className="space-y-3">
            <InputFieldUI title="Parti Tipi">
              <LiteOptionsTable
                name="PARTITIPIID"
                link="partitipi"
                control={control}
                renderValue={(_: string, obj: any) => {
                  return obj?.PARTITIPIID && obj?.ADI
                    ? obj?.PARTITIPIID + " - " + obj?.ADI
                    : obj?.PARTITIPIID;
                }}
                defaultValue={formData?.PARTITIPIID}
                headColumns={[
                  {
                    id: "ISLEMTIPIID",
                    title: "ISLEMTIPIID",
                  },
                  {
                    id: "ADI",
                    title: "ADI",
                  },
                ]}
                handleSelect={(obj: any) => {
                  setValue("PARTITIPIID", obj.PARTITIPIID);
                }}
              />
            </InputFieldUI>
            <InputFieldUI title="Sparis alan">
              <HFTextField
                name="SIPARISIALANKULLANICIADI"
                control={control}
                defaultValue={formData?.SIPARISIALANKULLANICIADI}
              />
            </InputFieldUI>

            <InputFieldUI title="Sparis tipi">
              <LiteOptionsTable
                name="ORMESIPARISTIPIID"
                link="ormesiparistipi"
                control={control}
                headColumns={[
                  {
                    id: "ORMESIPARISTIPIID",
                    title: "ORMESIPARISTIPIID",
                  },
                  {
                    id: "ADI",
                    title: "ADI",
                  },
                ]}
                renderValue={(_: string, obj: any) => {
                  return obj?.ORMESIPARISTIPIID && obj?.ADI
                    ? obj?.ORMESIPARISTIPIID + " - " + obj?.ADI
                    : obj?.ORMESIPARISTIPIID;
                }}
                defaultValue={formData?.ORMESIPARISTIPIID}
                handleSelect={(obj: any) => {
                  setValue("ORMESIPARISTIPIID", obj.ORMESIPARISTIPIID);
                }}
              />
            </InputFieldUI>
            <InputFieldUI title="Planlama Baslama Tarihi">
              <HFTextField name="PLANLANANIMALATTARIHI" control={control} />
            </InputFieldUI>
          </div>
          <div className="space-y-3">
            <HFTextarea
              name="NOTU"
              control={control}
              minRows={3}
              defaultValue={formData?.NOTU}
            />
            <HFTextarea
              name="ACILIYETNOTU"
              control={control}
              minRows={3}
              defaultValue={formData?.ACILIYETNOTU}
            />
          </div>
        </div>
      </form>
      {openParti && (
        <CNewModal
          title="Parti asama"
          disabled="big"
          handleActions={() => setOpenParti(false)}
          defaultData={{ id: 0 }}
        >
          <ModalUIPariTransfers
            handleModalActions={() => setOpenParti(false)}
            defaultData={formData}
          />
        </CNewModal>
      )}
    </>
  );
};
