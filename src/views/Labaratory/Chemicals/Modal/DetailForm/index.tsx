import { useForm } from "react-hook-form";
import HFInputMask from "../../../../../components/HFElements/HFInputMask";
import { useTranslation } from "react-i18next";
import { SelectOptionsTable } from "../../../../../components/UI/Options/Table";
import { useGetDovizList } from "../../../../../hooks/useFetchRequests/useDovizList";
import { IMaterialForm } from "../interface";
import { useGetUrunList } from "../../../../../hooks/useFetchRequests/useUrunList";
import CLabel from "../../../../../components/CElements/CLabel";
import HFSelect from "../../../../../components/HFElements/HFSelect";
import { DetailFormLogic } from "./Logic";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import dayjs from "dayjs";
import { useEffect } from "react";

interface Props {
  onClose: () => void;
  formId: number;
  idTrail: number;
  materialID: number;
  refetchTable: () => void;
}

export const DetailForm = ({
  onClose,
  refetchTable,
  formId,
  idTrail,
  materialID,
}: Props) => {
  const { t } = useTranslation();
  const { createForm, formData, updateForm } = DetailFormLogic({
    refetchTable,
    formId,
    onClose,
  });
  const { control, handleSubmit, setValue, getValues } = useForm<any>({
    mode: "onSubmit",
  });
  console.log("formData", formData);
  const { Options: moneyOptions } = useGetDovizList({});

  // {
  //   "LABRECETEATISID": 23622,
  //   "LABRECETEID": 14950,
  //   "SIRA": 4,
  //   "URUNID": "BY283",
  //   "MIKTARYUZDE": 0.001,
  //   "BIRIMFIYAT": 7.661,
  //   "URUNBIRIMID": 2188,
  //   "FIYATURUNBIRIMID": 2187,
  //   "FIYATCARPAN": 1000,
  //   "INSERTKULLANICIID": 1,
  //   "INSERTTARIHI": "2025-05-28T17:51:11.367Z",
  //   "KULLANICIID": 1,
  //   "DEGISIMTARIHI": "2025-05-28T17:51:11.367Z"
  // }

  const onSubmit = (data: any) => {
    let params: any = data;
    params.SIRA = 4;
    params.LABRECETEATISID = idTrail;
    params.LABRECETEID = materialID;
    params.MIKTARYUZDE = Number(params.MIKTARYUZDE);
    params.INSERTKULLANICIID = 1;
    params.DEGISIMTARIHI = dayjs();
    params.URUNBIRIMID = +params.URUNBIRIMID;

    if (formId) {
      updateForm({ ...formData, ...params }, formId);
    } else {
      params.KULLANICIID = 1;
      params.INSERTTARIHI = dayjs();
      params.FIYATURUNBIRIMID = 2187; // need to ask

      createForm(params);
    }
  };

  useEffect(() => {
    if (formData?.LABRECETEID) {
      setValue("MIKTARYUZDE", formData.MIKTARYUZDE);
      setValue("URUNID", formData.URUNID);
      setValue("URUNBIRIMID", formData.URUNBIRIMID);
      setValue("BIRIMFIYAT", formData.BIRIMFIYAT);
      setValue("NOTU", formData.NOTU ?? "");
    }
  }, [formData]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-[400px]">
        <div className="grid grid-cols-1 gap-x-3 gap-y-2">
          <LiteOptionsTable
            name="URUNID"
            label={t("URUNID")}
            placeholder={t("URUNID")}
            link="urun"
            required={true}
            headColumns={[
              { id: "URUNID", width: 100, title: "URUNID" },
              { id: "ADI", title: "URUNADI", innerId: "URUNID", width: 200 },
            ]}
            handleSelect={(obj: { URUNID: string }) => {
              console.log("o", obj);
              setValue("URUNID", obj.URUNID);
            }}
            control={control}
          />
          <LiteOptionsTable
            name="URUNBIRIMID"
            label={t("URUNBIRIMID")}
            placeholder={t("URUNBIRIMID")}
            link="urunbirim"
            required={true}
            headColumns={[
              {
                id: "BIRIMADI",
                title: "BIRIMADI",
                innerId: "BIRIMADI",
                width: 80,
              },
              { id: "BIRIMID", width: 70, title: "BIRIMID" },
              { id: "URUNBIRIMID", width: 90, title: "URUNBIRIMID" },
              { id: "CARPAN", width: 80, title: "CARPAN" },
            ]}
            handleSelect={(obj: { URUNBIRIMID: number; CARPAN: number }) => {
              console.log("o", obj);
              setValue("URUNBIRIMID", obj.URUNBIRIMID);
              setValue("FIYATCARPAN", obj.CARPAN);
            }}
            control={control}
          />

          <HFInputMask
            control={control}
            name="MIKTARYUZDE"
            label="MIKTARYUZDE"
            type="number"
            required={true}
            placeholder="MIKTARYUZDE"
          />

          <HFInputMask
            control={control}
            name="BIRIMFIYAT"
            label={t("BIRIMFIYAT")}
            type="number"
            required
            placeholder={t("BIRIMFIYAT")}
          />
          <HFSelect
            name="DOVIZID"
            control={control}
            label="DOVIZID"
            required
            setValue={setValue}
            handleClick={(obj) => {
              setValue("DOVIZID", obj.value);
            }}
            placeholder="DOVIZID"
            options={moneyOptions}
          />
        </div>

        <div>
          <CLabel title={t("NOTU")} />
          <textarea
            className="p-3 h-[110px] transparent border border-[var(--border)] outline-none focus:border-[var(--primary)] resize-none rounded-[8px] w-full"
            rows={3}
            placeholder={t("NOTU")}
            defaultValue={getValues("NOTU")}
            onChange={(e: any) => setValue("NOTU", e.target.value)}
          ></textarea>
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
            {t(formId ? "update" : "save")}
          </button>
        </div>
      </form>
    </div>
  );
};
