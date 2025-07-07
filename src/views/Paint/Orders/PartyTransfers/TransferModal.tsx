import { useForm } from "react-hook-form";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { LiteOptionsTable } from "../../../../components/UI/Options/LiteTable";
import CCheckbox from "../../../../components/CElements/CCheckbox";
import CLabel from "../../../../components/CElements/CLabel";
import { SubmitCancelButtons } from "../../../../components/UI/FormButtons/SubmitCancel";
import { TransferFormLogic } from "./Logic";
import { useEffect, useState } from "react";
import CAlert from "../../../../components/CElements/CAlert";
import { Alert } from "@mui/material";

export const TransferModal = ({
  defaultData,
  refetchTable,
}: {
  defaultData: any;
  refetchTable: () => void;
}) => {
  const [formId, setFormId] = useState<number>(0);
  const { formData, createForm, updateForm } = TransferFormLogic({
    formId,
    refetchTable: () => {},
    defaultData,
  });
  const { control, handleSubmit, setValue, getValues } = useForm();

  useEffect(() => {
    if (defaultData?.PARTIASAMALARIID) {
      setFormId(defaultData.PARTIASAMALARIID);
    }
  }, [defaultData]);

  const onSubmit = (data: any) => {
    const params = { ...data };
    params.KUMASTAKISU = 100;
  };

  const handleModalActionsFn = (status: string, id: string) => {
    if (status === "delete") {
    }
    if (status === "close") {
    }
  };

  const setFormData = (data: any) => {
    setValue("ASAMAKODU", data.ASAMAKODU);
    setValue("BANYOCARPANI", data.BANYOCARPANI);
    setValue("BANYOCARPANI2", data.BANYOCARPANI2);
    setValue("BANYOCARPANI3", data.BANYOCARPANI3);
    setValue("BANYOCARPANI4", data.BANYOCARPANI4);
    setValue("OTOMASYONADAHILMI", data.OTOMASYONADAHILMI);
    setValue("PARTININASILRECETESIMI", data.PARTININASILRECETESIMI);
    setValue("STOKTANDUSULDU", data.STOKTANDUSULDU);
  };

  const setInitalFormData = () => {};

  useEffect(() => {
    if (formData?.PARTIASAMALARIID) {
      setFormData(formData);
    } else {
      setInitalFormData();
    }
  }, [formData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[400px]">
      <div className="space-y-3 pb-3">
        <LiteOptionsTable
          label="Asama Kodu"
          name="ASAMAID"
          link="asama"
          control={control}
          handleSelect={(obj: any) => {
            setValue("ASAMAID", obj.ASAMAID);
          }}
          headColumns={[
            {
              title: "ASAMAID",
              id: "ASAMAID",
            },
            {
              title: "ADI",
              id: "ADI",
            },
          ]}
          renderValue={(_: string, obj: any) => {
            return obj?.ASAMAID && obj?.ADI
              ? `${obj?.ASAMAID} - ${obj?.ADI}`
              : obj?.ASAMAID;
          }}
          defaultValue={
            formData?.ASAMAID && formData?.ASAMAADI
              ? `${formData?.ASAMAID} - ${formData?.ASAMAADI}`
              : formData?.ASAMAADI
          }
        />
        <LiteOptionsTable
          label="Recete Kodu"
          name="RECETEID"
          link="recete"
          control={control}
          handleSelect={(obj: any) => {
            setValue("RECETEID", obj.RECETEID);
          }}
          headColumns={[
            {
              title: "RECETEID",
              id: "RECETEID",
            },
            {
              title: "ADI",
              id: "ADI",
            },
          ]}
          renderValue={(_: string, obj: any) => {
            return obj?.RECETEID && obj?.RECETEADI
              ? `${obj?.RECETEID} - ${obj?.RECETEADI}`
              : obj?.RECETEID;
          }}
          defaultValue={
            formData?.RECETEID && formData?.RECETEADI
              ? `${formData?.RECETEID} - ${formData?.RECETEADI}`
              : formData?.RECETEADI
          }
        />

        <div className="grid grid-cols-1 gap-3">
          <InputFieldUI title="1. Banyo Carpan ">
            <HFTextField
              name="BANYOCARPANI"
              control={control}
              type="number"
              defaultValue={formData?.BANYOCARPANI2}
            />
          </InputFieldUI>

          <InputFieldUI title="2. Banyo Carpan ">
            <HFTextField
              name="BANYOCARPANI2"
              control={control}
              type="number"
              defaultValue={formData?.BANYOCARPANI2}
            />
          </InputFieldUI>

          <InputFieldUI title="3. Banyo Carpan ">
            <HFTextField
              name="BANYOCARPANI3"
              control={control}
              type="number"
              defaultValue={formData?.BANYOCARPANI3}
            />
          </InputFieldUI>
          <InputFieldUI title="4. Banyo Carpan ">
            <HFTextField
              name="BANYOCARPANI4"
              control={control}
              type="number"
              defaultValue={formData?.BANYOCARPANI4}
            />
          </InputFieldUI>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <CCheckbox
              element={{ label: "Otomasyona Dahil" }}
              checked={getValues().OTOMASYONADAHILMI}
              handleCheck={(obj: any) => {
                setValue("OTOMASYONADAHILMI", obj.checked);
              }}
            />
          </div>
          <div>
            <CCheckbox
              element={{ label: "Pati Recetesi" }}
              checked={getValues().PARTININASILRECETESIMI}
              handleCheck={(obj: any) => {
                setValue("PARTININASILRECETESIMI", obj.checked);
              }}
            />
          </div>
        </div>

        <Alert severity={getValues().STOKTANDUSULDU ? "success" : "error"}>
          <p>Stoktan Dusulmus</p>
        </Alert>
      </div>

      <SubmitCancelButtons
        uniqueID={"inner"}
        type={formId ? "update" : "create"}
        handleActions={(val: string, uniqueID: string) => {
          if (uniqueID === "main_order_form") {
            if (val === "Close") handleModalActionsFn("close", "");

            if (val === "Enter") handleSubmit(onSubmit)();
          }
        }}
      />
    </form>
  );
};
