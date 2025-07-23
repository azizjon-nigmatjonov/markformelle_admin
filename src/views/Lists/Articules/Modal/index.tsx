import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import HFInputMask from "../../../../components/HFElements/HFInputMask";
import { IModalForm, ModalTypes } from "../interfaces";
import { ModalTableLogic } from "./Logic";
import dayjs from "dayjs";
import { LiteOptionsTable } from "../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../components/UI/FormButtons/SubmitCancel";
import { CRadio } from "../../../../components/CElements/CRadio";
import CLabel from "../../../../components/CElements/CLabel";
import CCheckbox from "../../../../components/CElements/CCheckbox";
import { convertToISO } from "../../../../utils/getDate";

interface ModalUIProps {
  defaultData?: ModalTypes;
  URUNBIRIMID?: string;
  ADI?: string;
  setOpen: (open: boolean) => void;
  refetchTable: () => void;
}

export const ArticulModalUI = ({
  defaultData = {},
  setOpen,
  refetchTable,
}: ModalUIProps) => {
  const [formId, setFormId] = useState<string>("");
  const [radioValue, setRadioValue] = useState<number>(2);
  const { createForm, updateForm, formData } = ModalTableLogic({
    setFormId,
    KALITEID: formId || defaultData?.KALITEID,
    defaultData,
    setOpen,
    refetchTable,
  });

  const { control, handleSubmit, setValue, getValues } = useForm<IModalForm>({
    mode: "onSubmit",
  });

  //   "KALITEID": "SJ-010.01.170",
  // "KALITEADI": "single jersey-92%COTTON--8%EL-170gr",
  // "HAMID": 1110,
  // "HAMADI": "36/1 PENYE COMPACT 30 DEN 8% LYC SÜPREM",
  // "SIPARISPROSESID": 2,
  // "ENISTENEN": "180",
  // "GRAMAJISTENEN": "170",
  // "PUS": 32,
  // "FEINE": 28,
  // "IPLIKBOYU1": "15.8",
  // "IPLIKBOYU2": "6",
  // "DOVIZID": "USD",
  // "COMPOSITION": "92% хлопок 8% эластан; 92% cotton 8% elastane",
  // "ORMETOPKILOSU": 24.5,
  // "NOTU": "",
  // "INSERTKULLANICIID": 3,
  // "INSERTTARIHI": "2022-09-09T01:07:31",
  // "KULLANICIID": 137,
  // "DEGISIMTARIHI": "2024-08-01T13:00:11",

  const onSubmit = (data: any) => {
    let params: any = data;
    params.DEGISIMTARIHI = convertToISO(dayjs().format("DD.MM.YYYY"));
    if (formId) {
      params = { ...data };
      params.COMPOSITION = `${params.COMPOSITION_RU}${
        params.COMPOSITION_ENG ? ";" + params.COMPOSITION_ENG : ""
      }`;
      params.INSERTTARIHI = formData?.INSERTTARIHI;
      delete params[`ORME 0KILOSU`];
      delete params.GUNCELLEYENKULLANICIADI;
      delete params.INSERTERKULLANICIADI;
      delete params.ORME;
      delete params[`0KILOSU`];
      delete params.RECETEADI_FULL;
      delete params.DOVIZADI;
      delete params.HAMADI_FULL;
      delete params.COMPOSITION_RU;
      delete params.COMPOSITION_ENG;
      delete params.HAMADI;
      params.FEINE = +params.FEINE;
      updateForm(params, formId);
    } else {
      params.INSERTKULLANICIID = 1;
      params.INSERTTARIHI = dayjs();
      params.KALINLIKID = 1;
      params.COMPOSITION = `${params.COMPOSITION_RU}${
        params.COMPOSITION_ENG ? ";" + params.COMPOSITION_ENG : ""
      }`;
      delete params.COMPOSITION_RU;
      delete params.COMPOSITION_ENG;
      createForm(params);
    }
  };

  const setFormValues = (form: any) => {
    setValue("KALITEID", form.KALITEID);
    setValue("KALITEADI", form.KALITEADI);
    setValue("HAMID", form.HAMID);
    setValue("HAMADI", form.HAMADI);
    setValue("SIPARISPROSESI", form.SIPARISPROSESI);
    setValue("ENISTENEN", form.ENISTENEN);
    setValue("GRAMAJISTENEN", form.GRAMAJISTENEN);
    setValue("PUS", form.PUS);
    setValue("FEINE", form.FEINE);
    setValue("IPLIKBOYU1", form.IPLIKBOYU1);
    setValue("IPLIKBOYU2", form.IPLIKBOYU2);
    setValue("DOVIZID", form.DOVIZID);
    setValue("COMPOSITION", form.COMPOSITION);
    setValue("ORMETOPKILOSU", form.ORMETOPKILOSU);
    setValue("KAPALI", form.KAPALI);
    const compositionRu = formData?.COMPOSITION?.split(";")[0];
    const compositionEng = formData?.COMPOSITION?.split(";")[1];
    setValue("COMPOSITION_RU", compositionRu);
    setValue("COMPOSITION_ENG", compositionEng);
  };

  useEffect(() => {
    if (formData?.KALITEID) {
      setFormValues(formData);
    } else {
      setValue("DOVIZID", "USD");
    }
  }, [formData]);

  useEffect(() => {
    if (defaultData?.KALITEID) {
      setFormId(defaultData.KALITEID);
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
      className="w-full"
    >
      <div className="grid grid-cols-1 gap-3 mt-3 w-[400px] mb-5">
        <div className="flex space-x-2 items-end">
          <HFTextField
            name="KALITEID"
            control={control}
            setValue={setValue as any}
            label="KALITEID"
            focused
          />
          <div className="">
            <CCheckbox
              element={{ label: " " }}
              handleCheck={(val: any) => {
                setValue("KAPALI", val.checked);
              }}
              checked={getValues().KAPALI ? true : false}
            />
          </div>
        </div>
        <HFTextField
          name="KALITEADI"
          control={control}
          setValue={setValue as any}
          label="KALITEADI"
        />
        <LiteOptionsTable
          name="HAMID"
          label="Ham Stok"
          headColumns={[
            { id: "HAMID", title: "HAMID", width: 60 },
            { id: "ADI", title: "ADI", width: 150 },
          ]}
          renderValue={(_: string, obj: any) => {
            return obj?.HAMID;
          }}
          defaultValue={formData?.HAMADI}
          link="ham"
          handleSelect={(obj: any) => {
            setValue("HAMID", obj.HAMID);
            setValue("HAMADI", obj.ADI);
          }}
          control={control}
        />
        <LiteOptionsTable
          name="PROSESID"
          label="Siparis Proses"
          headColumns={[
            { id: "PROSESID", title: "PROSESID", width: 70 },
            { id: "ADI", title: "ADI", width: 500 },
          ]}
          renderValue={(_: string, obj: any) => {
            return obj?.PROSESID && obj?.ADI
              ? obj?.PROSESID + " - " + obj?.ADI
              : obj?.PROSESID;
          }}
          defaultValue={formData?.SIPARISPROSESI}
          link="proses"
          handleSelect={(obj: any) => {
            setValue("SIPARISPROSESI", obj.PROSESID);
          }}
          control={control}
        />
        <div className="flex space-x-2">
          <HFInputMask
            name="ENISTENEN"
            control={control}
            setValue={setValue as any}
            type="number"
            label="En"
          />
          <HFInputMask
            name="GRAMAJISTENEN"
            control={control}
            setValue={setValue as any}
            type="number"
            label="Gramaj"
          />
          <HFInputMask
            name="PUS"
            control={control}
            setValue={setValue as any}
            type="number"
            label="Pus"
          />
          <HFInputMask
            name="FEINE"
            control={control}
            setValue={setValue as any}
            type="number"
            label="Feine"
          />
        </div>
        <div className="flex space-x-2">
          <HFInputMask
            name="IPLIKBOYU1"
            control={control}
            setValue={setValue as any}
            type="number"
            label="İplik Boyu-1"
          />
          <HFInputMask
            name="IPLIKBOYU2"
            control={control}
            setValue={setValue as any}
            type="number"
            label="İplik Boyu-2"
          />
          <HFInputMask
            name="ORME 0KILOSU"
            control={control}
            setValue={setValue as any}
            type="number"
            label="Top kilo"
          />
          <LiteOptionsTable
            name="DOVIZID"
            label="DOVIZID"
            link="doviz"
            renderValue={(_: string, obj: any) => {
              return obj?.DOVIZID;
            }}
            headColumns={[{ id: "DOVIZID", title: "DOVIZID" }]}
            defaultValue={formData?.DOVIZID || "USD"}
            handleSelect={(obj: { DOVIZID: string }) => {
              setValue("DOVIZID", obj.DOVIZID);
            }}
            control={control}
          />
        </div>
        <div className="flex space-x-2">
          <HFTextField
            name="COMPOSITION_RU"
            control={control}
            setValue={setValue as any}
            label="Composition ru"
          />
          <HFTextField
            name="COMPOSITION_ENG"
            control={control}
            setValue={setValue as any}
            label="Composition eng"
          />
        </div>
        <div>
          <CLabel title="Tüp Tipi" />
          <div className="grid grid-cols-3 gap-2 items-center">
            <CRadio
              onChange={() => {
                setRadioValue(1);
              }}
              label="Tüp"
              checked={radioValue === 1}
              value="Tüp"
              name="tupTipi"
            />
            <CRadio
              onChange={() => {
                setRadioValue(2);
              }}
              label="Açık En"
              checked={radioValue === 2}
              value="Açık En"
              name="tupTipi"
            />
            <CRadio
              onChange={() => {
                setRadioValue(3);
              }}
              label="Maylı"
              checked={radioValue === 3}
              value="Maylı"
              name="tupTipi"
            />
          </div>
        </div>
      </div>
      <SubmitCancelButtons
        type={formId ? "update" : "create"}
        uniqueID={"inner"}
        handleActions={(val: string, uniqueID: string) => {
          if (uniqueID === "inner") {
            if (val === "close") {
              setOpen(false);
            }
            if (val === "Enter") handleSubmit(onSubmit)();
          }
        }}
      />
      {/* </CollapseUI> */}
    </form>
  );
};
