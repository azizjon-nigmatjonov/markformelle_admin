import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HFDatePicker } from "../../../../../components/HFElements/HFDatePicker";
import { useGetDovizList } from "../../../../../hooks/useFetchRequests/useDovizList";
// import { IMaterialForm } from "../interface";
import { useEffect } from "react";
import dayjs from "dayjs";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import HFSelect from "../../../../../components/HFElements/HFSelect";
import { MaterialFormLogic } from "./Logic";

interface Props {
  formId: number;
  onClose: () => void;
  formData: any;
  refetchMaterial: () => void;
}

export const MaterialForm = ({
  formId,
  onClose,
  formData = {},
  refetchMaterial,
}: Props) => {
  const { t } = useTranslation();
  const {
    createForm,
    formData: materialFormData,
    updateForm,
  } = MaterialFormLogic({
    refetchMaterial,
    onClose,
    formId,
  });

  const { control, handleSubmit, setValue } = useForm<any>({
    mode: "onSubmit",
  });
  const { Options: moneyOptions } = useGetDovizList({});

  const onSubmit = (data: any) => {
    let params: any = data;

    params.LABRECETEID = formData.LABRECETEID;
    params.FIRMAID = formData.FIRMAID;

    params.TERMINTARIHI = dayjs();
    params.INSERTKULLANICIID = 1;
    const parsedDate = dayjs(params.CALISMATARIHI, "DD.MM.YYYY");

    const isoWithMicroseconds =
      parsedDate.format("YYYY-MM-DDTHH:mm:ss") + ".000000";

    console.log(isoWithMicroseconds);
    params.CALISMATARIHI = isoWithMicroseconds;
    params.DEGISIMTARIHI = dayjs();

    if (materialFormData?.LABRECETECALISMAID) {
      params = { ...materialFormData, ...params };
      console.log(params.CALISMATARIHI);

      updateForm(params, formId);
    } else {
      params.KULLANICIID = 1;
      params.INSERTTARIHI = dayjs();
      createForm(params);
    }
  };

  useEffect(() => {
    if (materialFormData?.LABRECETECALISMAID) {
      setValue("HAMID", materialFormData.HAMID);
      setValue("HAMADI", materialFormData.HAMADI);
      setValue("USTASAMAADI", materialFormData.USTASAMAADI);
      setValue("USTASAMAID", materialFormData.USTASAMAID);
      setValue("DOVIZID", materialFormData.DOVIZID);
      setValue(
        "CALISMATARIHI",
        dayjs(materialFormData.CALISMATARIHI).format("DD.MM.YYYY")
      );
    }
  }, [materialFormData]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-[400px]">
        <div className="grid grid-cols-1 gap-y-2">
          <LiteOptionsTable
            name="HAMID"
            label="HAMSTOK"
            required={true}
            placeholder="HAMSTOK"
            link="ham"
            renderValue={(_: string, obj: any) => {
              return obj.ADI || obj.HAMID;
            }}
            defaultValue={materialFormData?.HAMADI}
            headColumns={[
              { id: "HAMID", title: "HAMID", width: 70 },
              { id: "ADI", title: "ADI", width: 160 },
              { id: "HAMTIPIADI", title: "HAMTIPIADI", width: 90 },
            ]}
            handleSelect={(obj: { ADI: string; HAMID: number }) => {
              setValue("HAMID", obj.HAMID);
              setValue("HAMADI", obj.ADI);
            }}
            control={control}
          />
          <LiteOptionsTable
            name="ASAMAID"
            label="USTASAMA"
            placeholder="USTASAMA"
            link="asama"
            renderValue={(_: string, obj: any) => {
              return obj.ADI || obj.ASAMAID;
            }}
            defaultValue={materialFormData?.USTASAMAADI}
            headColumns={[
              { id: "ASAMAID", title: "ASAMAID", width: 80 },
              { id: "ADI", title: "ADI", width: 150 },
            ]}
            handleSelect={(obj: { ASAMAID: number; ADI: string }) => {
              setValue("USTASAMAID", obj.ASAMAID);
              setValue("USTASAMAADI", obj.ADI);
            }}
            required={true}
            control={control}
          />
          <HFSelect
            label="DOVIZID"
            required={true}
            name="DOVIZID"
            control={control}
            setValue={setValue}
            handleClick={(obj) => {
              setValue("DOVIZID", obj.value);
            }}
            placeholder="DOVIZID"
            options={moneyOptions}
          />{" "}
          <HFDatePicker
            control={control}
            name="CALISMATARIHI"
            label="CALISMATARIHI"
            placeholder="CALISMATARIHI"
            format="DD.MM.YYYY"
            defaultValue={materialFormData?.CALISMATARIHI}
          />
          {/* <HFInputMask
            control={control}
            name="BIRIMFIYAT"
            label={t("BIRIMFIYAT")}
            type="number"
            placeholder={t("BIRIMFIYAT")}
          /> */}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onClose()}
            className="cancel-btn"
            type="button"
          >
            {t("cancel")}
          </button>
          <button className="custom-btn" type="submit">
            {t(materialFormData?.LABRECETECALISMAID ? "update" : "save")}
          </button>
        </div>
      </form>
    </div>
  );
};
