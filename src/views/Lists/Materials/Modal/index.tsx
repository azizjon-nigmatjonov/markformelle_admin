import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import HFInputMask from "../../../../components/HFElements/HFInputMask";
import HFTextarea from "../../../../components/HFElements/HFTextarea";
import { IModalForm, ModalTypes } from "../interfaces";
import { ModalTableLogic } from "./Logic";
import dayjs from "dayjs";
import { LiteOptionsTable } from "../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../components/UI/FormButtons/SubmitCancel";

interface ModalUIProps {
  defaultData?: ModalTypes;
  URUNBIRIMID?: string;
  ADI?: string;
  setOpen: (open: boolean) => void;
  refetchTable: () => void;
}

export const HamModalUI = ({
  defaultData = {},
  setOpen,
  refetchTable,
}: ModalUIProps) => {
  const [formId, setFormId] = useState<string>("");

  const { createForm, updateForm, formData } = ModalTableLogic({
    setFormId,
    hamId: defaultData?.HAMID || formId,
    defaultData,
    setOpen,
    refetchTable,
  });

  const { control, handleSubmit, setValue } = useForm<IModalForm>({
    mode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    let params: any = data;
    params.DEGISIMTARIHI = dayjs();
    if (formId) {
      params = { ...formData, ...params };

      updateForm(params, formId);
    } else {
      // params.DEFAULTHAMSTOKBIRIMID = null
      params.TELEF = false;
      params.ALISFIYATIGUNCELLEMETARIHI = dayjs();
      params.INSERTTARIHI = dayjs();
      params.MINIMUMFIREORANI = params.MINIMUMFIREORANI
        ? params.MINIMUMFIREORANI
        : 0;
      params.KALINLIKID = 1;
      params.ALISFIYATIDOVIZID = "USD";
      params.HASILBIRIMMALIYETDOVIZID = "USD";
      params.COZGUBIRIMMALIYETDOVIZID = "USD";
      params.DOKUMABIRIMMALIYETDOVIZID = "USD";
      params.KUMASCINSIID = 3;
      createForm(params);
    }
  };

  const setFormValues = (form: any) => {
    setValue("HAMID", form.HAMID);
    setValue("ADI", form.ADI);
    setValue("ADI2", form.ADI2);
    setValue("ADI3", form.ADI3);
    setValue("ADI4", form.ADI4);
    setValue("HAMTIPIID", form.HAMTIPIID);
    setValue("HAMTIPIADI", form.HAMTIPIADI);
    setValue("KALINLIKID", form.KALINLIK);
    setValue("IPLIKCINSIID", form.IPLIKCINSIID);
    setValue("MAXFIREORANI", form.MAXFIREORANI);
    setValue("MINFIREORANI", form.MINFIREORANI);
    setValue("BIRIMID", form.VARSAYILANBIRIM);
    setValue("NOTU", form.NOTU);
    setValue("MAXIMUMFIREORANI", form.MAXIMUMFIREORANI);
    setValue("MINIMUMFIREORANI", form.MINIMUMFIREORANI);
  };

  useEffect(() => {
    if (formData?.HAMID) setFormValues(formData);
  }, [formData]);

  useEffect(() => {
    if (defaultData?.HAMID) {
      setFormId(defaultData.HAMID);
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
      <div className="space-y-3 w-[400px] mt-3">
        <HFTextField
          name="ADI"
          control={control}
          setValue={setValue}
          label="ADI"
        />
        <HFTextField
          name="ADI2"
          control={control}
          setValue={setValue}
          label="Diger Adi-1"
        />
        <HFTextField
          name="ADI3"
          control={control}
          setValue={setValue}
          label="Diger Adi-2"
        />
        <HFTextField
          name="ADI4"
          control={control}
          setValue={setValue}
          label="Diger Adi-3"
        />

        <LiteOptionsTable
          name="HAMTIPIID"
          required={true}
          label="Ham Tipi"
          renderValue={(_: string, obj: any) => {
            return obj?.HAMTIPIID && obj?.ADI
              ? obj?.HAMTIPIID + " - " + obj?.ADI
              : obj?.HAMTIPIID;
          }}
          headColumns={[
            { id: "HAMTIPIID", title: "HAMTIPIID", width: 80 },
            { id: "ADI", title: "ADI", width: 120 },
          ]}
          defaultValue={defaultData?.HAMTIPIADI}
          link="hamtipi"
          handleSelect={(obj: any) => {
            setValue("HAMTIPIID", obj.HAMTIPIID);
            setValue("HAMTIPIADI", obj.HAMTIPIADI);
          }}
          control={control}
        />

        <LiteOptionsTable
          name="KALINLIKID"
          label="KALINLIK"
          headColumns={[
            { id: "KALINLIKID", title: "KALINLIKID", width: 80 },
            { id: "ADI", title: "ADI", width: 120 },
          ]}
          renderValue={(_: string, obj: any) => {
            return obj?.KALINLIKID && obj?.ADI
              ? obj?.KALINLIKID + " - " + obj?.ADI
              : obj?.KALINLIKID;
          }}
          defaultValue={defaultData?.KALINLIKADI}
          link="kalinlik"
          handleSelect={(obj: any) => {
            setValue("KALINLIKID", obj.KALINLIK);
          }}
          control={control}
        />

        <LiteOptionsTable
          name="IPLIKCINSIID"
          label="IPLIK CINSI"
          headColumns={[
            { id: "IPLIKCINSIID", title: "IPLIKCINSIID", width: 90 },
            { id: "ADI", title: "ADI", width: 220 },
          ]}
          renderValue={(_: string, obj: any) => {
            return obj?.IPLIKCINSIID && obj?.ADI
              ? obj?.IPLIKCINSIID + " - " + obj?.ADI
              : obj?.IPLIKCINSIID;
          }}
          defaultValue={defaultData?.IPLIKCINSIID}
          link="iplikcinsi"
          handleSelect={(obj: any) => {
            setValue("IPLIKCINSIID", obj.IPLIKCINSIID);
          }}
          control={control}
        />

        <div className="flex space-x-2">
          <HFInputMask
            name="MAXIMUMFIREORANI"
            control={control}
            defaultValue={defaultData?.MAXIMUMFIREORANI}
            setValue={setValue as any}
            type="number"
            label="Max fire orani"
          />

          <HFInputMask
            name="MINIMUMFIREORANI"
            control={control}
            defaultValue={defaultData?.MINIMUMFIREORANI}
            setValue={setValue as any}
            type="number"
            label="Min fire orani"
          />
        </div>
        <LiteOptionsTable
          name="BIRIMID"
          label="Varsayilan birim"
          headColumns={[
            { id: "BIRIMID", title: "BIRIMID", width: 70 },
            { id: "BIRIMADI", title: "BIRIMADI", width: 220 },
          ]}
          renderValue={(_: string, obj: any) => {
            return obj?.BIRIMID && obj?.BIRIMADI
              ? obj?.BIRIMID + " - " + obj?.BIRIMADI
              : obj?.BIRIMID;
          }}
          link="hamstokbirim"
          handleSelect={(obj: any) => {
            setValue("BIRIMID", obj.BIRIMID);
          }}
          control={control}
        />

        <HFTextarea
          name="NOTU"
          control={control}
          label="Notu"
          defaultValue={defaultData?.NOTU}
        />

        <SubmitCancelButtons
          type={formId ? "update" : "create"}
          uniqueID={"inner"}
          handleActions={(val: string, uniqueID: string) => {
            if (uniqueID === "inner") {
              if (val === "Close") {
                setOpen(false);
              }
              if (val === "Enter") handleSubmit(onSubmit)();
            }
          }}
        />
      </div>

      {/* </CollapseUI> */}
    </form>
  );
};
