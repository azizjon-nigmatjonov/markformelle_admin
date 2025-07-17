import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { InputFieldUI } from "../../../components/UI/FieldUI";
import { LiteOptionsTable } from "../../../components/UI/Options/LiteTable";
import HFTextField from "../../../components/HFElements/HFTextField";
import { SubmitButton } from "../../../components/UI/FormButtons/SubmitButton";
import { FormLogic } from "./Logic";
import HFTextarea from "../../../components/HFElements/HFTextarea";
import CCheckbox from "../../../components/CElements/CCheckbox";

// const schema = Validation;

interface FormProps {
  handleModalActions: (val: string, val2: string) => void;
  defaultData: any;
  uniqueID: string;
}

export const Form = ({
  handleModalActions,
  uniqueID,
  defaultData,
}: FormProps) => {
  const [formId, setFormId] = useState<number>(0);
  const { control, handleSubmit, setValue, getValues, reset } = useForm<any>({
    mode: "onSubmit",
  });
  const { createForm, updateForm, formData } = FormLogic({
    refetchTable: () => {},
    formId,
    defaultData,
  });

  const handleModalActionsFn = (status: string, id: string) => {
    if (status === "delete") {
      handleModalActions(status, id);
      reset();
      setFormId(0);
    }
    if (status === "close") {
    }
  };

  const onSubmit = (data: any) => {
    let params: any = data;

    if (formId) {
      params = {
        ...formData,
        ...params,
      };

      updateForm(params, formId);
    } else {
      params.PARTIYIL = dayjs().format("YYYY");
      params.PARTIID = 999;
      params.ACILISTARIHI = dayjs();
      params.PLANLANANIMALATTARIHI = dayjs();
      params.ACILISTARIHI = dayjs();
      params.DEGISIMTARIHI = dayjs();
      params.TERMINTARIHI = dayjs();
      params.TALIMAT = false;
      params.TALIMATOKEY = false;
      params.RECETEYAZILDI = false;
      params.RECETEYAZILISTARIHI = dayjs();
      params.PARCALISEVK = false;
      params.FATURAKESILECEK = false;
      params.BOYASIPARISKAYITID = 0;
      params.DESENVARYANTID = 0;
      params.FATURAKESILDI = false;
      params.SINIF = "B";
      params.VADEGUN = 0;
      params.RAFID = "";
      params.EMULSIYONURUNID = "";
      params.ONAYDURUMU = false;
      params.ONAYTARIHI = dayjs();
      params.ONAYLAYANKULLANICIID = 0;
      params.SABLONRECETESTOKTANDUSULDU = false;
      params.PARTITIPIID = 0;
      params.SEVKIYATNOTU = "";
      params.REFAKATKARTIYAZMASAYISI = 0;
      params.SABLONSAYISI = 0;
      params.ARGENO = "";
      params.NUMUNEONAYTARIHI = dayjs().format("YYYY-MM-DD");
      params.NUMUNENOTU = "";
      params.DEGISIMLOG = "";
      params.LAMINASYON = false;
      params.LINKISLEMI = 0;
      params.INSERTKULLANICIID = 1;
      params.DEGISIMTARIHI = dayjs();
      params.INSERTTARIHI = dayjs();
      params.KULLANICIID = 1;
      params.NUMUNEGONDERITARIHI = dayjs();
      params.REVIZETERMINTARIHI = dayjs();
      params.RECETEYAZMASAYISI = 0;
      params.ISLEMGRUBUID = 0;
      params.ACILIYETDERECESIID = 0;
      params.PATMIKTARI = 0;
      console.log("params", params);

      createForm(params);
    }
  };

  //   {
  //     "PARTIKAYITID": 0,
  //     "PARTIYIL": "2025",
  //     "PARTIID": 999,
  //     "FIRMAID": "M0002",
  //     "ISLEMTIPIID": 1,
  //     "PATMIKTARI": 0,
  //     "INSERTTARIHI": "2025-07-07T10:15:45.732Z",
  //     "NOTU": "1",
  //     "SIPARISTARIHI": "2025-07-07",
  //     "FASON": true,
  //     "RECETEYAZILDI": false,
  //     "REFAKATKARTIYAZILDI": true,
  //     "ACILISTARIHI": "2025-07-07T10:15:45.732Z",
  //     "PLANLANANIMALATTARIHI": "2025-07-07T10:15:45.732Z",
  //     "DEGISIMTARIHI": "2025-07-07T10:15:45.732Z",
  //     "TERMINTARIHI": "2025-07-07T10:15:45.732Z",
  //     "TALIMAT": false,
  //     "TALIMATOKEY": false,
  //     "RECETEYAZILISTARIHI": "2025-07-07T10:15:45.732Z",
  //     "PARCALISEVK": false,
  //     "FATURAKESILECEK": false,
  //     "BOYASIPARISKAYITID": 0,
  //     "DESENVARYANTID": 0,
  //     "FATURAKESILDI": false,
  //     "SINIF": "B",
  //     "VADEGUN": 0,
  //     "RAFID": "",
  //     "EMULSIYONURUNID": "",
  //     "ONAYDURUMU": false,
  //     "ONAYTARIHI": "2025-07-07T10:15:45.732Z",
  //     "ONAYLAYANKULLANICIID": 0,
  //     "SABLONRECETESTOKTANDUSULDU": false,
  //     "PARTITIPIID": 0,
  //     "SEVKIYATNOTU": "",
  //     "REFAKATKARTIYAZMASAYISI": 0,
  //     "SABLONSAYISI": 0,
  //     "ARGENO": "",
  //     "NUMUNEONAYTARIHI": "2025-07-07",
  //     "NUMUNENOTU": "",
  //     "DEGISIMLOG": "",
  //     "LAMINASYON": false,
  //     "LINKISLEMI": 0,
  //     "INSERTKULLANICIID": 1,
  //     "KULLANICIID": 1,
  //     "NUMUNEGONDERITARIHI": "2025-07-07T10:15:45.732Z",
  //     "REVIZETERMINTARIHI": "2025-07-07T10:15:45.732Z",
  //     "RECETEYAZMASAYISI": 0,
  //     "ISLEMGRUBUID": 0,
  //     "ACILIYETDERECESIID": 0
  // }

  // {
  //   "PARTIYIL": 0,
  //   "PARTIID": 0,
  //   "ACILISTARIHI": "2025-07-07T05:36:32.964Z",
  //   "FIRMAID": "string",
  //   "IMALATTIPIID": false,
  //   "PARTIGRUPID": "string",
  //   "MODELNO": "string",
  //   "FASON": false,
  //   "RECETEID": "string",
  //   "RECETETARIHI": "2025-07-07T05:36:32.964Z",
  //   "ISLEMGRUBUID": 0,
  //   "ISLEMTIPIID": 0,
  //   "ACILIYETDERECESIID": 0,
  //   "ISLETMEONCELIKNO": 1000,
  //   "ACILIYETNOTU": "string",
  //   "PLANLANANIMALATTARIHI": "2025-07-07T05:36:32.964Z",
  //   "TERMINTARIHI": "2025-07-07T05:36:32.964Z",
  //   "RECETEOKEY": false,
  //   "TALIMAT": false,
  //   "TALIMATOKEY": false,
  //   "NOTU": "string",
  //   "RECETEYAZILDI": false,
  //   "RECETEYAZILISTARIHI": "2025-07-07T05:36:32.964Z",
  //   "REFAKATKARTIYAZILDI": false,
  //   "PARCALISEVK": false,
  //   "FATURAKESILECEK": true,
  //   "BOYASIPARISKAYITID": 0,
  //   "DESENVARYANTID": 0,
  //   "FATURAKESILDI": false,
  //   "SINIF": "B",
  //   "VADEGUN": 0,
  //   "RAFID": "string",
  //   "EMULSIYONURUNID": "string",
  //   "PATMIKTARI": 0,
  //   "ONAYDURUMU": true,
  //   "ONAYTARIHI": "2025-07-07T05:36:32.964Z",
  //   "ONAYLAYANKULLANICIID": 0,
  //   "SABLONRECETESTOKTANDUSULDU": false,
  //   "PARTITIPIID": 0,
  //   "SEVKIYATNOTU": "string",
  //   "REFAKATKARTIYAZMASAYISI": 0,
  //   "SABLONSAYISI": 0,
  //   "ARGENO": "string",
  //   "NUMUNEONAYTARIHI": "2025-07-07",
  //   "NUMUNENOTU": "string",
  //   "DEGISIMLOG": "string",
  //   "LAMINASYON": false,
  //   "LINKISLEMI": 0,
  //   "INSERTKULLANICIID": 1,
  //   "INSERTTARIHI": "2025-07-04T18:43:04.084397",
  //   "KULLANICIID": 1,
  //   "DEGISIMTARIHI": "2025-07-07T05:36:32.964Z",
  //   "NUMUNEGONDERITARIHI": "2025-07-07T05:36:32.964Z",
  //   "REVIZETERMINTARIHI": "2025-07-07T05:36:32.964Z",
  //   "RECETEYAZMASAYISI": 0,
  //   "PARTIKAYITID": 0
  // }

  const setFormData = (data: any, setValue: any) => {
    setValue("PARTIYIL", data.PARTIYIL);
    setValue("PARTIID", data.PARTIID);
    setValue("PARTIADI", data.PARTIADI);
    setValue("FIRMAID", data.FIRMAID);
    setValue("ISLEMTIPIID", data.ISLEMTIPIID);
    setValue("ISLEMGRUBUID", data.ISLEMGRUBUID);
    setValue("ISLEMTIPI", data.ISLEMTIPI);
    setValue("FASON", data.FASON);
    setValue("RECETEYAZILDI", data.RECETEYAZILDI);
    setValue("TERMINTARIHI", data.TERMINTARIHI);
    setValue("NOTU", data.NOTU);
    setValue("NUMUNENOTU", data.NUMUNENOTU);
    setValue("PATMIKTARI", data.PATMIKTARI);
    setValue("REFAKATKARTIYAZILDI", data.REFAKATKARTIYAZILDI);
    setValue("INSERTTARIHI", data.INSERTTARIHI);
  };
  const setFormInitials = (setValue: any) => {
    setValue("PARTIYIL", dayjs().format("YYYY"));
  };

  useEffect(() => {
    if (formData?.PARTIID) {
      setFormData(formData, setValue);
    } else {
      setFormInitials(setValue);
    }
  }, [formData, setValue]);

  useEffect(() => {
    if (defaultData?.PARTIKAYITID) {
      setFormId(defaultData.PARTIKAYITID);
    } else {
      setValue("SIPARISTARIHI", dayjs().format("YYYY-MM-DD"));
    }
  }, [defaultData]);

  return (
    <form
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
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
        <div className="col-span-2 flex justify-end">
          <div className="w-[200px]">
            <SubmitButton
              uniqueID={uniqueID}
              type={formId ? "update" : "create"}
              handleActions={(val: string, uniqueID: string) => {
                if (uniqueID === "main_order_form") {
                  if (val === "Close") handleModalActionsFn("close", "");

                  if (val === "Enter") handleSubmit(onSubmit)();
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-3">
        <div className="space-y-2">
          <InputFieldUI title="Firma kodu">
            <LiteOptionsTable
              handleSelect={(obj: { FIRMAID: string; ADI: string }) => {
                setValue("FIRMAID", obj.FIRMAID);
              }}
              link="firma"
              name="FIRMAID"
              headColumns={[
                {
                  title: "Firma id",
                  id: "FIRMAID",
                  width: 80,
                },
                {
                  title: "Firma adı",
                  id: "ADI",
                  width: 160,
                },
              ]}
              defaultValue={formData?.FIRMAID}
              renderValue={(_: string, obj: any) => {
                return obj.ADI && obj.FIRMAID
                  ? `${obj.FIRMAID} - ${obj.ADI}`
                  : obj.FIRMAID;
              }}
              control={control}
            />
          </InputFieldUI>

          <InputFieldUI title="Islem tipi">
            <LiteOptionsTable
              handleSelect={(obj: { ISLEMTIPIID: string }) => {
                setValue("ISLEMTIPIID", obj.ISLEMTIPIID);
              }}
              link="islemtipi"
              name="ISLEMTIPIID"
              headColumns={[
                {
                  title: "Islem tipi id",
                  id: "ISLEMTIPIID",
                  width: 100,
                },
                {
                  title: "Adi",
                  id: "ADI",
                  width: 120,
                },
              ]}
              defaultValue={formData?.ISLEMTIPIID}
              renderValue={(_: string, obj: any) => {
                return obj.ISLEMTIPI && obj.ISLEMTIPIID
                  ? `${obj.ISLEMTIPI} - ${obj.ISLEMTIPIID}`
                  : obj.ISLEMTIPIID;
              }}
              defaultFilters={
                formData?.ISLEMTIPIID || formData?.ISLEMTIPIID == 0 ? `` : ""
              }
              control={control}
            />
          </InputFieldUI>

          <InputFieldUI title="Islem Grubi">
            <LiteOptionsTable
              handleSelect={(obj: { ISLEMGID: string; ISLEMG: string }) => {
                setValue("ISLEMGID", obj.ISLEMGID);
                setValue("ISLEMG", obj.ISLEMG);
              }}
              link="islemgrubi"
              name="ISLEMGRUBUID"
              headColumns={[
                {
                  title: "Islem grubu id",
                  id: "ISLEMGID",
                  width: 120,
                },
                {
                  title: "Islem grubu",
                  id: "ISLEMG",
                  width: 120,
                },
              ]}
              renderValue={(_: string, obj: any) => {
                return obj.ISLEMGRUBUID && obj.ISLEMGID
                  ? `${obj.ISLEMG} - ${obj.ISLEMGID}`
                  : obj.ISLEMGRUBUID;
              }}
              control={control}
            />
          </InputFieldUI>

          <InputFieldUI title="Parti Kilosu">
            <HFTextField
              name="PATMIKTARI"
              control={control}
              type="number"
              defaultValue={formData?.PATMIKTARI}
            />
          </InputFieldUI>
        </div>

        <div className="space-y-2">
          <InputFieldUI title="Fason">
            <CCheckbox
              element={{
                name: "FASON",
                label: "Fason",
              }}
              checked={getValues("FASON")}
              handleCheck={(obj: any) => {
                setValue("FASON", obj.checked);
              }}
            />
          </InputFieldUI>

          <InputFieldUI title="Recete yazıldı">
            <CCheckbox
              element={{
                name: "RECETEYAZILDI",
                label: "Recete yazıldı",
              }}
              checked={getValues("RECETEYAZILDI")}
              handleCheck={(obj: any) => {
                setValue("RECETEYAZILDI", obj.checked);
              }}
            />
          </InputFieldUI>

          <InputFieldUI title="Refakat Ka Yaz">
            <CCheckbox
              element={{
                name: "REFAKATKARTIYAZILDI",
                label: "Recete yazıldı",
              }}
              checked={getValues("REFAKATKARTIYAZILDI")}
              handleCheck={(obj: any) => {
                setValue("REFAKATKARTIYAZILDI", obj.checked);
              }}
            />
          </InputFieldUI>

          <InputFieldUI title="Termin tarihi">
            <HFTextField name="INSERTTARIHI" control={control} type="date" />
          </InputFieldUI>
        </div>

        <div className="grid grid-cols-2 gap-x-2">
          <HFTextarea
            label="notu 1"
            name="NOTU"
            defaultValue={formData?.NOTU}
            control={control}
            minRows={4}
          />

          <HFTextarea
            label="notu 2"
            name="PLANLAMANOTU"
            defaultValue={formData?.PLANLAMANOTU}
            control={control}
            minRows={4}
          />
        </div>
      </div>
    </form>
  );
};
