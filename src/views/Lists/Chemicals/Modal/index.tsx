import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import HFInputMask from "../../../../components/HFElements/HFInputMask";
import { IModalForm, ModalTypes } from "../interfaces";
import { ModalTableLogic } from "./Logic";
import dayjs from "dayjs";
import { LiteOptionsTable } from "../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../components/UI/FormButtons/SubmitCancel";
import CCheckbox from "../../../../components/CElements/CCheckbox";

interface ModalUIProps {
  defaultData?: ModalTypes;
  URUNBIRIMID?: string;
  ADI?: string;
  setOpen: (open: boolean) => void;
  refetchTable: () => void;
}

export const ReceteAsamaModalUI = ({
  defaultData = {},
  setOpen,
  refetchTable,
}: ModalUIProps) => {
  const [typeForm, setTypeForm] = useState<string>("create");
  const [formId, setFormId] = useState<string>("");
  const { createForm, updateForm, formData } = ModalTableLogic({
    setFormId,
    receteasamaId: formId,
    defaultData,
    setOpen,
    refetchTable,
  });
  const [disabledPaintType, setDisabledPaintType] = useState(true);

  const { control, handleSubmit, setValue, getValues, reset } =
    useForm<IModalForm>({
      mode: "onSubmit",
    });

  useEffect(() => {
    if (defaultData?.RECETEASAMAID) {
      setFormId(defaultData.RECETEASAMAID);
    }
  }, [defaultData]);

  const onSubmit = (data: any) => {
    let params: any = data;
    params.DEGISIMTARIHI = dayjs();
    if (typeForm === "update") {
      params = { ...formData, ...params };

      updateForm(params, formId);
    } else {
      params.INSERTTARIHI = dayjs();
      params.INSERTKULLANICIID = 1;
      params.KULLANICIID = 1;
      params.DOZAJLAMAPROGRAMNO = +params.DOZAJLAMAPROGRAMNO || 0;
      params.SURE = +params.SURE || 0;
      params.BANYOCARPANNO = +params.BANYOCARPANNO || 0;
      createForm(params);
    }
  };

  const setFormValues = (form: any) => {
    setValue("ADI", form.ADI);
    setValue("BANYOCARPANNO", form.BANYOCARPANNO);
    setValue("BOYAASAMASIMI", form.BOYAASAMASIMI);
    if (form.BOYAASAMASIMI) setDisabledPaintType(false);
    setValue("BOYATIPIADI", form.BOYATIPIADI);
    setValue("BOYATIPIID", form.BOYATIPIID);
    setValue("DOZAJLAMAPROGRAMNO", form.DOZAJLAMAPROGRAMNO);
    setValue("ORGATEXETEKBASINAAKTARILIR", form.ORGATEXETEKBASINAAKTARILIR);
    setValue("SURE", form.SURE);
    setValue("TUZSULFATBASTAN", form.TUZSULFATBASTAN);
    setValue("RECETEASAMAID", form.RECETEASAMAID);
  };

  useEffect(() => {
    if (formData?.RECETEASAMAID) {
      setFormValues(formData);
      setTypeForm("update");
    } else {
      setTypeForm("create");
      setValue("BOYATIPIADI", "");
      setValue("BOYATIPIID", "");
      setValue("BANYOCARPANNO", "");
      setValue("DOZAJLAMAPROGRAMNO", "");
      setValue("SURE", "");
      setValue("TUZSULFATBASTAN", "");
      reset();
      setDisabledPaintType(true);
    }
  }, [formData]);

  useEffect(() => {
    if (defaultData?.RECETEASAMAID) {
      setFormId(defaultData.RECETEASAMAID);
    }
  }, [defaultData]);

  return (
    <>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
      >
        <div className="space-y-3 w-[400px]">
          <LiteOptionsTable
            name="RECETEASAMAID"
            headColumns={[
              { id: "RECETEASAMAID", title: "RECETEASAMAID", width: 120 },
              { id: "ADI", title: "ADI", width: 300 },
            ]}
            renderValue={(_: string, obj: any) => {
              return obj?.RECETEASAMAID && obj.ADI && obj.BOYAASAMASIMI
                ? obj?.RECETEASAMAID + " - " + obj?.ADI
                : obj?.RECETEASAMAID;
            }}
            handleSelect={(obj: any) => {
              reset();
              setValue("RECETEASAMAID", obj.RECETEASAMAID);
              setFormId(obj.RECETEASAMAID);
            }}
            control={control}
            link="receteasama"
            defaultValue={
              formData?.RECETEASAMAID
                ? formData?.RECETEASAMAID + " - " + formData?.ADI
                : ""
            }
            required
          />

          <HFTextField
            name="ADI"
            control={control}
            setValue={setValue}
            label="ADI"
            required={true}
          />

          <div className="flex space-x-2 items-end">
            <div className="w-[48">
              <CCheckbox
                checked={getValues()?.BOYAASAMASIMI ? true : false}
                element={{ label: " " }}
                handleCheck={(val: any) => {
                  setDisabledPaintType((prev: boolean) => !prev);
                  setValue("BOYAASAMASIMI", val.checked);
                }}
              />
            </div>
            <div className="w-full">
              <LiteOptionsTable
                disabled={disabledPaintType}
                key={formData?.BOYATIPIID}
                name="BOYATIPIID"
                required={true}
                label="Boya Tipi"
                renderValue={(_: string, obj: any) => {
                  return obj?.BOYATIPIID && obj?.ADI
                    ? obj?.BOYATIPIID + " - " + obj?.ADI
                    : obj?.BOYATIPIID;
                }}
                headColumns={[
                  { id: "BOYATIPIID", title: "BOYATIPIID", width: 80 },
                  { id: "ADI", title: "ADI", width: 120 },
                ]}
                defaultValue={
                  formData?.BOYATIPIID
                    ? formData?.BOYATIPIID + " - " + formData?.BOYATIPIADI
                    : ""
                }
                link="boyatipi"
                handleSelect={(obj: any) => {
                  setValue("BOYATIPIID", obj.BOYATIPIID);
                  setValue("BOYATIPIADI", obj.BOYATIPIADI);
                }}
                control={control}
              />
            </div>
          </div>
          <div className="flex space-x-2 items-end">
            <HFInputMask
              name="DOZAJLAMAPROGRAMNO"
              control={control}
              defaultValue={formData?.DOZAJLAMAPROGRAMNO}
              setValue={setValue as any}
              type="number"
              label="Dozajlama programf"
              required
            />
            <HFInputMask
              name="SURE"
              control={control}
              defaultValue={formData?.SURE}
              setValue={setValue as any}
              type="number"
              label="SURE (min.)"
              required
            />
            <LiteOptionsTable
              key={formData?.RECETEASAMAID}
              name="BANYOCARPANNO"
              required={true}
              label="Banyo carpani no"
              headColumns={[
                { id: "BANYOCARPANNO", title: "BANYOCARPANNO", width: 140 },
              ]}
              renderValue={(_: string, obj: any) => {
                return obj?.BANYOCARPANNO;
              }}
              defaultValue={formData?.BANYOCARPANNO}
              staticOptions={[
                { id: 1, BANYOCARPANNO: "1" },
                { id: 2, BANYOCARPANNO: "2" },
                { id: 3, BANYOCARPANNO: "3" },
                { id: 4, BANYOCARPANNO: "4" },
                { id: 5, BANYOCARPANNO: "5" },
                { id: 6, BANYOCARPANNO: "6" },
                { id: 7, BANYOCARPANNO: "7" },
                { id: 8, BANYOCARPANNO: "8" },
              ]}
              handleSelect={(obj: any) => {
                setValue("BANYOCARPANNO", obj.BANYOCARPANNO);
              }}
              control={control}
            />
          </div>
          <SubmitCancelButtons
            type={typeForm}
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
        </div>
      </form>
    </>
  );
};
