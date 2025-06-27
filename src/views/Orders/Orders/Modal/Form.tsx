import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { Validation } from "./Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import { LiteOptionsTable } from "../../../../components/UI/Options/LiteTable";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { SubmitButton } from "../../../../components/UI/FormButtons/SubmitButton";
import { FormLogic } from "./Logic";
import HFTextarea from "../../../../components/HFElements/HFTextarea";

const schema = Validation;

interface OrderFormProps {
  defaultData?: any;
  handleModalActions: (val: string, val2: string) => void;
  createForm: (val: any) => void;
  updateForm: (val: any, id: number) => void;
  formData: any;
}

export const OrderForm = ({
  defaultData = {},
  handleModalActions,
  createForm,
  updateForm,
  formData,
}: OrderFormProps) => {
  const [uniqueID, setUniqueID] = useState("main_order_form");
  const [formId, setFormId] = useState<number>(0);
  const { control, handleSubmit, setValue, getValues, reset } = useForm<any>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  // Use the FormLogic wrapper to get form functions that can use hooks
  const { setFormValues, setInitialFormValues } = FormLogic();

  const handleModalActionsFn = (status: string, id: string) => {
    if (status === "delete") {
      handleModalActions(status, id);
      reset();
      setFormId(0);
    }
    if (status === "close") {
      const formValues = getValues();
      const formInitialValues = getValues();
      let changes = false;

      for (let key in formInitialValues) {
        if (formInitialValues[key] !== formValues[key]) {
          changes = true;
          break;
        }
      }

      if (changes) {
      } else {
        reset();
        setFormId(0);
      }
    }
  };

  const onSubmit = (data: any) => {
    let params: any = data;
    params.IPTAL = params?.IPTAL ? true : false;

    if (formId) {
      params.TALEPTARIHI = formData.TALEPTARIHI;
      params.DEGISIMTARIHI = dayjs();
      params = { ...formData, ...params };

      updateForm(params, formId);
    } else {
      params.INSERTKULLANICIID = 1;
      params.INSERTTARIHI = dayjs();
      params.KULLANICIID = 1;
      params.DEGISIMTARIHI = dayjs();

      createForm(params);
    }
  };

  useEffect(() => {
    if (formData?.BOYASIPARISID) {
      setFormValues(formData, setValue);
    } else {
      setInitialFormValues(setValue);
    }
  }, [formData, setValue, setFormValues, setInitialFormValues]);

  useEffect(() => {
    if (defaultData?.LABRECETEID) setFormId(defaultData.LABRECETEID);
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
      <div className="border-b border-[var(--border)] pb-3 mb-3 grid grid-cols-3 gap-3">
        <div className="col-span-1 flex space-x-2">
          <InputFieldUI title="SIPARISYILI">
            <HFTextField
              name="SIPARISYILI"
              control={control}
              disabled={true}
              defaultValue={formData?.SIPARISYILI}
              focused
            />
          </InputFieldUI>
          <InputFieldUI title="BOYASIPARISKAYITID">
            <HFTextField
              name="BOYASIPARISKAYITID"
              control={control}
              disabled={true}
              defaultValue={formData?.BOYASIPARISKAYITID}
            />
          </InputFieldUI>
        </div>
        <div className="col-span-2 flex justify-end">
          <div className="w-[200px]">
            <SubmitButton
              uniqueID={uniqueID}
              type={formId ? "update" : "create"}
              handleActions={(val: string, uniqueID: string) => {
                if (uniqueID === "main_table_lab") {
                  if (val === "Close") handleModalActionsFn("close", "");
                  if (val === "Enter") handleSubmit(onSubmit)();
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className={`grid grid-cols-3 gap-x-3`}>
        <div className="space-y-2">
          <InputFieldUI title="FIRMA">
            <LiteOptionsTable
              name="FIRMAID"
              link="firma"
              required={true}
              renderValue={(_: string, obj: any) => {
                return obj?.FIRMAID;
              }}
              control={control}
              handleSelect={(obj: any) => {
                setValue("FIRMAID", obj.FIRMAID);
              }}
              defaultValue={
                formData?.FIRMAID &&
                formData?.FIRMAID + " - " + formData?.FIRMAADI
              }
              headColumns={[
                { id: "FIRMAID", title: "FIRMAID" },
                { id: "ADI", title: "ADI" },
              ]}
            />
          </InputFieldUI>
          <InputFieldUI title="SIPARISTARIHI">
            <HFTextField
              name="SIPARISTARIHI"
              control={control}
              defaultValue={formData?.SIPARISTARIHI}
            />
          </InputFieldUI>
          <InputFieldUI title="SIPARISGRUPADI">
            <HFTextField
              name="SIPARISGRUPADI"
              control={control}
              defaultValue={formData?.SIPARISGRUPADI}
            />
          </InputFieldUI>
          <InputFieldUI title="sparis grubi">
            <LiteOptionsTable
              name="SIPARISGRUPID"
              link="siparisgrup"
              control={control}
              defaultValue={
                formData?.SIPARISGRUPID && formData?.SIPARISGRUPADI
                  ? formData?.SIPARISGRUPID + " - " + formData?.SIPARISGRUPADI
                  : formData?.SIPARISGRUPID
              }
              headColumns={[
                { id: "SIPARISGRUPID", title: "SIPARISGRUPID" },
                { id: "ADI", title: "ADI" },
              ]}
              renderValue={(_: string, obj: any) => {
                return obj?.SIPARISGRUPID && obj?.ADI
                  ? obj?.SIPARISGRUPID + " - " + obj?.ADI
                  : obj?.SIPARISGRUPID;
              }}
              handleSelect={(obj: any) => {
                setValue("SIPARISGRUPID", obj.SIPARISGRUPID);
              }}
            />
          </InputFieldUI>
        </div>
        <div className="space-y-2">
          <InputFieldUI title="Sparis Veren">
            <HFTextField
              name="KULLANICIADI"
              control={control}
              defaultValue={formData?.KULLANICIADI}
            />
          </InputFieldUI>
          <InputFieldUI title="islem tipi">
            <LiteOptionsTable
              name="ISLEM_TIPI"
              link="islemtipi"
              control={control}
              defaultValue={formData?.ISLEM_TIPI}
              headColumns={[
                { id: "ISLEM_TIPI", title: "ISLEM_TIPI" },
                { id: "ADI", title: "ADI" },
              ]}
              handleSelect={(obj: any) => {
                setValue("ISLEM_TIPI", obj.ISLEM_TIPI);
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
          <InputFieldUI title="sparis sekli">
            <LiteOptionsTable
              name="ISLEM_TIPI"
              link="sparissekli"
              control={control}
              defaultValue={formData?.ISLEM_TIPI}
              headColumns={[
                { id: "ISLEM_TIPI", title: "ISLEM_TIPI" },
                { id: "ADI", title: "ADI" },
              ]}
              handleSelect={(obj: any) => {
                setValue("ISLEM_TIPI", obj.ISLEM_TIPI);
              }}
            />
          </InputFieldUI>
        </div>
        <div className="space-y-2">
          <InputFieldUI title="Sparis tipi">
            <LiteOptionsTable
              name="SIPARISTIPIID"
              link="boyasiparistipi"
              control={control}
              headColumns={[
                { id: "SIPARISTIPIID", title: "SIPARISTIPIID" },
                { id: "ADI", title: "ADI" },
              ]}
              renderValue={(_: string, obj: any) => {
                return obj?.SIPARISTIPIID;
              }}
              defaultSearch={`SIPARISTIPIID=${formData?.SIPARISTIPIID}`}
              handleSelect={(obj: any) => {
                setValue("SIPARISTIPIID", obj.SIPARISTIPIID);
              }}
            />
          </InputFieldUI>

          <InputFieldUI title="Notu">
            <HFTextarea
              name="NOTU"
              control={control}
              minRows={4}
              defaultValue={formData?.NOTU}
            />
          </InputFieldUI>
        </div>
      </div>
    </form>
  );
};
