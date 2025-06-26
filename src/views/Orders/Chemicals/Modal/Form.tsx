import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { ModalTableLogic } from "./Logic";
import { GetCurrentDate } from "../../../../utils/getDate";
import dayjs from "dayjs";
import { Validation } from "./Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import { LiteOptionsTable } from "../../../../components/UI/Options/LiteTable";
import HFTextField from "../../../../components/HFElements/HFTextField";

const schema = Validation;

interface OrderFormProps {
  defaultData?: any;
  handleModalActions: (val: string, val2: string) => void;
  askClose: string;
  setAskClose: (val: string) => void;
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
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 100 });
  const [formId, setFormId] = useState<number>(0);
  const [disabled, setDisabled] = useState(true);
  const { control, handleSubmit, setValue, getValues, reset } = useForm<any>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const handleModalActionsFn = (status: string, id: string) => {
    if (status === "delete") {
      handleModalActions(status, id);
      reset();
      setFormId(0);
      setAskClose("close");
      localStorage.removeItem("orders_form_initial_values");
    }
    if (status === "close") {
      let formInitialValues: any =
        localStorage.getItem("orders_form_initial_values") ?? "{}";
      formInitialValues = JSON.parse(formInitialValues);

      const formValues = getValues();
      let changes = false;

      for (let key in formInitialValues) {
        if (formInitialValues[key] !== formValues[key]) {
          changes = true;
          break;
        }
      }

      if (changes) {
        setAskClose("changes");
      } else {
        reset();
        setFormId(0);
        setAskClose("close");
        localStorage.removeItem("orders_form_initial_values");
      }
    }
  };

  useEffect(() => {
    if (formId) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formId]);

  useEffect(() => {
    setFilterParams({ page: 1, perPage: 100 });
  }, []);

  const onSubmit = (data: any) => {
    let params: any = data;
    params.IPTAL = params?.IPTAL ? true : false;

    if (formId) {
      params.TALEPTARIHI = formData.TALEPTARIHI;
      params.DEGISIMTARIHI = dayjs();
      params = { ...formData, ...params };

      updateForm(params, formId);
    } else {
      params.TALEPTARIHI = dayjs().startOf("day").format("YYYY-MM-DDTHH:mm:ss");

      params.LABRECETEGRUPID = 2;
      params.NOTU = null;
      params.ESKITIPRECETE = false;
      params.ESKITIPRECETE = false;
      params.INSERTKULLANICIID = 1;
      params.INSERTTARIHI = dayjs();
      params.KULLANICIID = 1;
      params.DEGISIMTARIHI = dayjs();

      createForm(params);
    }
    localStorage.removeItem("orders_form_initial_values");
    setTimeout(() => {
      localStorage.setItem(
        "orders_form_initial_values",
        JSON.stringify(getValues())
      );
    }, 700);
  };

  const setFormValues = (form: any) => {
    setValue("RECETETURUID", form.RECETETURUID);
    setValue("USTASAMAID", form.USTASAMAID);
    setValue("USTASAMAADI", form.USTASAMAADI);
    setValue("HAMID", form.HAMID);
    setValue("HAMADI", form.HAMADI);
    setValue("DOVIZID", form.DOVIZID);
    setValue("ESKILAfBRECETEKODU", form.ESKILABRECETEKODU);
    setValue("RENKDERINLIGIID", form.RENKDERINLIGIID);
    setValue("RENKDERINLIGIADI", form.RENKDERINLIGIADI);
    setValue("IPTAL", form.IPTAL);
    setValue("FASON", form.FASON);
    setValue("LABRENKGRUPID", form.LABRENKGRUPID);
    setValue("LABRENKGRUPAD", form.LABRENKGRUPAD);

    setValue("LABRECETEKODU", form.LABRECETEKODU);
    setValue("LABRECETEID", form.LABRECETEID);
    setValue("ACIKLAMA", form.ACIKLAMA);
    setValue("ADI", form.ADI);
    setValue("FIRMAID", form.FIRMAID);
    setValue("FIRMAADI", form.FIRMAADI);
    setValue("PANTONEKODU", form.PANTONEKODU);
    setValue("KULLANICIADI", form.KULLANICIADI);

    setValue("USTASAMAADI", form.USTASAMAADI);
    setValue("ESKILABRECETEKODU", form.ESKILABRECETEKODU);
    setValue("RECETETURAADI", form.RECETETURAADI);
    setValue(
      "TALEPTARIHI",
      GetCurrentDate({ date: form.TALEPTARIHI, type: "usually" })
    );
  };

  const setInitialFormValues = () => {
    setValue("FIRMAID", "M0868");
    setValue("TALEPTARIHI", dayjs().format("DD.MM.YYYY HH:MM"));
    setValue("DOVIZID", "USD");
  };

  useEffect(() => {
    if (formData?.LABRECETEKODU) {
      setFormValues(formData);
    } else {
      setInitialFormValues();
    }
  }, [formData]);

  useEffect(() => {
    if (defaultData?.LABRECETEID) setFormId(defaultData.LABRECETEID);
  }, [defaultData, disabled]);

  return (
    <form
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      onSubmit={handleSubmit(onSubmit)}
      className="mb-5"
    >
      <div className="pb-5">
        <div
          className={`grid grid-cols-3 gap-x-5 border-b border-[var(--border)] pb-5`}
        >
          <div>
            <InputFieldUI title="LABRECETEKODU" disabled={disabled}>
              <LiteOptionsTable
                name="LABRECETEKODU"
                link="boyasiparis"
                required={true}
                renderValue={(_: string, obj: any) => {
                  return obj?.LABRECETEKODU;
                }}
                control={control}
                handleSelect={(obj: any) => {
                  setValue("LABRECETEKODU", obj.LABRECETEKODU);
                }}
                headColumns={[
                  { id: "LABRECETEKODU", title: "LABRECETEKODU" },
                  { id: "ADI", title: "ADI" },
                ]}
                disabled={disabled}
              />
            </InputFieldUI>
          </div>
          <div>
            <InputFieldUI title="ESKILABRECETEKODU" disabled={disabled}>
              <LiteOptionsTable
                name="ESKILABRECETEKODU"
                link="boyasiparis"
                required={false}
                renderValue={(_: string, obj: any) => {
                  return obj?.ESKILABRECETEKODU;
                }}
                control={control}
                handleSelect={(obj: any) => {
                  setValue("ESKILABRECETEKODU", obj.ESKILABRECETEKODU);
                }}
                headColumns={[
                  { id: "ESKILABRECETEKODU", title: "ESKILABRECETEKODU" },
                  { id: "ADI", title: "ADI" },
                ]}
                disabled={disabled}
              />
            </InputFieldUI>
          </div>
          <div>
            <InputFieldUI title="PANTONEKODU" disabled={disabled}>
              <LiteOptionsTable
                name="PANTONEKODU"
                link="boyasiparis"
                required={true}
                renderValue={(_: string, obj: any) => {
                  return obj?.PANTONEKODU;
                }}
                control={control}
                handleSelect={(obj: any) => {
                  setValue("PANTONEKODU", obj.PANTONEKODU);
                }}
                headColumns={[
                  { id: "PANTONEKODU", title: "PANTONEKODU" },
                  { id: "ADI", title: "ADI" },
                ]}
                disabled={disabled}
              />
            </InputFieldUI>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-5 border-b border-[var(--border)] pb-5 pt-5">
          <div>
            <InputFieldUI title="ADI" disabled={disabled}>
              <HFTextField
                name="ADI"
                control={control}
                setValue={setValue}
                disabled={disabled}
              />
            </InputFieldUI>
          </div>
          <div>
            <InputFieldUI title="ACIKLAMA" disabled={disabled}>
              <HFTextField
                name="ACIKLAMA"
                control={control}
                setValue={setValue}
                disabled={disabled}
              />
            </InputFieldUI>
          </div>
          <div>
            <InputFieldUI title="KULLANICIADI" disabled={disabled}>
              <HFTextField
                name="KULLANICIADI"
                control={control}
                setValue={setValue}
                disabled={disabled}
              />
            </InputFieldUI>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-5 border-b border-[var(--border)] pb-5 pt-5">
          <div>
            <InputFieldUI title="USTASAMAADI" disabled={disabled}>
              <LiteOptionsTable
                name="USTASAMAADI"
                link="boyasiparis"
                required={true}
                renderValue={(_: string, obj: any) => {
                  return obj?.USTASAMAADI;
                }}
                control={control}
                handleSelect={(obj: any) => {
                  setValue("USTASAMAADI", obj.USTASAMAADI);
                }}
                headColumns={[
                  { id: "USTASAMAADI", title: "USTASAMAADI" },
                  { id: "ADI", title: "ADI" },
                ]}
                disabled={disabled}
              />
            </InputFieldUI>
          </div>
          <div>
            <InputFieldUI title="RECETETURAADI" disabled={disabled}>
              <LiteOptionsTable
                name="RECETETURAADI"
                link="boyasiparis"
                required={true}
                renderValue={(_: string, obj: any) => {
                  return obj?.RECETETURAADI;
                }}
                control={control}
                handleSelect={(obj: any) => {
                  setValue("RECETETURAADI", obj.RECETETURAADI);
                }}
                headColumns={[
                  { id: "RECETETURAADI", title: "RECETETURAADI" },
                  { id: "ADI", title: "ADI" },
                ]}
                disabled={disabled}
              />
            </InputFieldUI>
          </div>
          <div>
            <InputFieldUI title="RENKDERINLIGIADI" disabled={disabled}>
              <LiteOptionsTable
                name="RENKDERINLIGIADI"
                link="boyasiparis"
                required={true}
                renderValue={(_: string, obj: any) => {
                  return obj?.RENKDERINLIGIADI;
                }}
                control={control}
                handleSelect={(obj: any) => {
                  setValue("RENKDERINLIGIADI", obj.RENKDERINLIGIADI);
                }}
                headColumns={[
                  { id: "RENKDERINLIGIADI", title: "RENKDERINLIGIADI" },
                  { id: "ADI", title: "ADI" },
                ]}
                disabled={disabled}
              />
            </InputFieldUI>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-5 border-b border-[var(--border)] pb-5 pt-5">
          <div>
            <InputFieldUI title="LABRENKGRUPAD" disabled={disabled}>
              <LiteOptionsTable
                name="LABRENKGRUPAD"
                link="boyasiparis"
                required={true}
                renderValue={(_: string, obj: any) => {
                  return obj?.LABRENKGRUPAD;
                }}
                control={control}
                handleSelect={(obj: any) => {
                  setValue("LABRENKGRUPAD", obj.LABRENKGRUPAD);
                }}
                headColumns={[
                  { id: "LABRENKGRUPAD", title: "LABRENKGRUPAD" },
                  { id: "ADI", title: "ADI" },
                ]}
                disabled={disabled}
              />
            </InputFieldUI>
          </div>
          <div>
            <InputFieldUI title="TALEPTARIHI" disabled={true}>
              <HFTextField
                name="TALEPTARIHI"
                control={control}
                setValue={setValue}
                disabled={true}
              />
            </InputFieldUI>
          </div>
          <div>
            <InputFieldUI title="DOVIZID" disabled={disabled}>
              <HFTextField
                name="DOVIZID"
                control={control}
                setValue={setValue}
                disabled={disabled}
              />
            </InputFieldUI>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        {/* <SubmitButton disabled={disabled} /> */}
      </div>
    </form>
  );
};
