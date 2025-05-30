import { useForm } from "react-hook-form";
import HFInputMask from "../../../../../components/HFElements/HFInputMask";
import { useTranslation } from "react-i18next";
import { useGetDovizList } from "../../../../../hooks/useFetchRequests/useDovizList";
// import { IMaterialForm } from "../interface";
import CLabel from "../../../../../components/CElements/CLabel";
import { DetailFormLogic } from "./Logic";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { SubmitCancelButtons } from "../../../../../components/UI/FormButtons/SubmitCancel";
import { useFetchType } from "../../../../../hooks/useFetchRequests/useFetchType";
import HFTextField from "../../../../../components/HFElements/HFTextField";

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

  //   {
  //     "URUNID": "KM029",
  //     "MIKTARYUZDE": 1,
  //     "BIRIMFIYAT": 0.13347,
  //     "DOVIZID": "USD",
  //     "URUNBIRIMID": null,
  //     "": 5.3,
  //     "SIRA": 4,
  //     "LABRECETEATISID": 23635,
  //     "LABRECETEID": 14951,
  //     "INSERTKULLANICIID": 1,
  //     "DEGISIMTARIHI": "2025-05-30T15:41:24.047Z",
  //     "KULLANICIID": 1,
  //     "INSERTTARIHI": "2025-05-30T15:41:24.047Z",
  //     "FIYATURUNBIRIMID": 2187
  // }

  const onSubmit = (data: any) => {
    let params: any = data;
    // params.SIRA = 1;
    params.LABRECETEATISID = idTrail;
    params.LABRECETEID = materialID;
    params.MIKTARYUZDE = Number(params.MIKTARYUZDE);
    params.INSERTKULLANICIID = 1;
    params.DEGISIMTARIHI = dayjs();
    params.URUNBIRIMID = Number(params.URUNBIRIMID);

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

  const { setFilterParams, data: birimData, filterParams } = useFetchType();
  const {
    setFilterParams: setFilterParamsFiyat,
    data: fiyatData,
    filterParams: filterParamsFiyat,
  } = useFetchType();

  useEffect(() => {
    const obj =
      birimData?.data?.find(
        (item: { DEFAULTBIRIM: null | number }) => item.DEFAULTBIRIM === 1
      ) ?? {};
    if (obj?.BIRIMID) {
      setValue("URUNBIRIMID", obj.URUNBIRIMID);
      setValue("FIYATCARPAN", obj.CARPAN);
    }
  }, [birimData]);

  useEffect(() => {
    const obj = fiyatData?.data?.[0] ?? {};
    if (obj.ALISFIYATIDOVIZID) {
      setValue("DOVIZID", obj.ALISFIYATIDOVIZID);
      setValue("BIRIMFIYAT", obj.URETIMECIKISFIYATI);
    }
  }, [fiyatData]);

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
              setValue("URUNID", obj.URUNID);
              setFilterParams({
                ...filterParams,
                q: `URUNID=${obj.URUNID}`,
                link: "urunbirim",
              });
              setFilterParamsFiyat({
                ...filterParamsFiyat,
                q: `URUNID=${obj.URUNID}`,
                link: "urunfiyat",
              });
            }}
            control={control}
          />
          {/* <LiteOptionsTable
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
              setValue("URUNBIRIMID", obj.URUNBIRIMID);
              setValue("FIYATCARPAN", obj.CARPAN);
            }}
            control={control}
          /> */}

          <HFInputMask
            control={control}
            name="MIKTARYUZDE"
            label="MIKTARYUZDE %"
            type="number"
            required={true}
            placeholder="MIKTARYUZDE"
          />

          <HFTextField
            name="BIRIMFIYAT"
            control={control}
            disabled
            setValue={setValue}
            placeholder="BIRIMFIYAT"
            label="BIRIMFIYAT"
          />

          <HFTextField
            name="DOVIZID"
            control={control}
            disabled
            setValue={setValue}
            placeholder="DOVIZID"
            label="DOVIZID"
          />
          <HFTextField
            name="URUNBIRIMID"
            control={control}
            disabled
            setValue={setValue}
            placeholder="URUNBIRIMID"
            label="URUNBIRIMID"
          />
          {/* <HFInputMask
            control={control}
            name="BIRIMFIYAT"
            label={t("BIRIMFIYAT")}
            type="number"
            required
            placeholder={t("BIRIMFIYAT")}
          /> */}
          {/* <HFSelect
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
          /> */}
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
        <SubmitCancelButtons
          uniqueID="lab_detail_form"
          type={formId ? "update" : "create"}
          handleActions={(val: string, uniqueID: string) => {
            if (uniqueID === "modal_lab") {
              if (val === "Close") onClose();
              if (val === "Enter") onSubmit(getValues());
            }
          }}
        />
        {/* <div className="flex space-x-2">
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
        </div> */}
      </form>
    </div>
  );
};
