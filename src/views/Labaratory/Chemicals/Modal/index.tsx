import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ModalTypes } from "../interfaces";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import { ModalTableLogic } from "./Logic";
import { LabModalTables } from "./Tables";
import { InputFields } from "./Components/InputFields";
import { GetCurrentDate } from "../../../../utils/getDate";
import { ColorMaterial } from "./Components/ColorMaterial";
import dayjs from "dayjs";
import { SubmitButton } from "../../../../components/UI/FormButtons/SubmitButton";
import { Validation } from "./Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { LiteOptionsTable } from "../../../../components/UI/Options/LiteTable";
import CModal from "../../../../components/CElements/CModal";
const schema = Validation;
interface ModalUIProps {
  defaultData?: ModalTypes;
  handleModalActions: (val: string, val2: string) => void;
  askClose: string;
  setAskClose: (val: string) => void;
}

export const ModalUI = ({
  defaultData = {},
  handleModalActions,
  askClose,
  setAskClose,
}: ModalUIProps) => {
  const { t } = useTranslationHook();
  const [uniqueID, setUniqueID] = useState("main_table_lab");
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
      localStorage.removeItem("lab_form_initial_values");
    }
    if (status === "close") {
      let formInitialValues: any =
        localStorage.getItem("lab_form_initial_values") ?? "{}";
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
        localStorage.removeItem("lab_form_initial_values");
      }
    }
  };

  const { createForm, updateForm, formData } = ModalTableLogic({
    filterParams,
    setFormId,
    urunId: formId || defaultData?.LABRECETEID,
    defaultData,
    handleModalActions: handleModalActionsFn,
  });

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
    localStorage.removeItem("lab_form_initial_values");
    setTimeout(() => {
      localStorage.setItem(
        "lab_form_initial_values",
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
    <>
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
                  link="labrecete"
                  required={true}
                  renderValue={(_: string, obj: any) => {
                    return obj.LABRECETEKODU;
                  }}
                  defaultValue={formData?.LABRECETEKODU}
                  headColumns={[
                    { id: "LABRECETEID", title: "LABRECETEID", width: 110 },
                    {
                      title: "LABRECETEKODU",
                      id: "LABRECETEKODU",
                      width: 150,
                    },
                  ]}
                  handleSelect={(obj: { ADI: string; LABRECETEID: number }) => {
                    setValue("LABRECETEKODU", obj.ADI);
                    setFormId(obj.LABRECETEID);
                  }}
                  control={control}
                />
              </InputFieldUI>
            </div>
            <ColorMaterial PANTONEKODU={formData.PANTONEKODU} />
            <div className="flex justify-end">
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
        </div>

        <InputFields
          control={control}
          setValue={setValue}
          getValues={getValues}
          formData={formData}
        />
      </form>
      <LabModalTables
        disabled={disabled}
        formId={formId}
        formData={formData}
        setUniqueID={setUniqueID}
      />

      <CModal
        open={!!askClose}
        handleClose={() => {
          setAskClose("close");
        }}
        footerActive={false}
      >
        <p className="text-[var(--black)] text-2xl font-medium">
          У вас есть изменения!
        </p>

        <p className="text-[var(--error)] text-2xl font-medium">
          Вы хотите сохранить изменения?
        </p>

        <div className="grid gap-2 grid-cols-2 mt-8">
          <button
            className="cancel-btn"
            onClick={() => {
              setAskClose("close");
              reset();
              setFormId(0);
            }}
          >
            {t("no")}
          </button>
          <button
            className="custom-btn"
            onClick={() => {
              setAskClose("submit");
              handleSubmit(onSubmit)();
            }}
            type="button"
          >
            {t("yes")}
          </button>
        </div>
      </CModal>
    </>
  );
};
