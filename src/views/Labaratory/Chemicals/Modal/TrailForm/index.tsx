import { useForm } from "react-hook-form";
// import { IModalForm } from "../../interfaces";
import HFInputMask from "../../../../../components/HFElements/HFInputMask";
import { useTranslation } from "react-i18next";
import HFSelect from "../../../../../components/HFElements/HFSelect";
import CCheckbox from "../../../../../components/CElements/CCheckbox";

import CLabel from "../../../../../components/CElements/CLabel";
import CNewTable from "../../../../../components/CElements/CNewTable";
import { PlusIcon } from "../../../../../components/UI/IconGenerator/Svg";
import { TrailFormLogic } from "./Logic";
import dayjs from "dayjs";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import { useEffect } from "react";

interface Props {
  formId: number;
  labReceteId: any;
  materialId: number;
  onClose: () => void;
  filterParams: { page: number; perPage: number };
  handleActionsDetails: (val: any, val2: string) => void;
  setFilterParams: (val: any) => void;
  disabled: boolean;
  setOpen: (val: string) => void;
  refetchTable: () => void;
}

const DetailsList = [
  {
    SIRA: "SIOR",
    URUNADI: "SEZATOL GOLDEN YELLOW",
    MIKTAR: "0.044320",
    HASEPBIRIMI: "%",
    BIRIMFIYAT: "7.68",
    TURLAR: "0.002",
    ILKKAYDEDM: "Nodirbek Mamajonov",
    ILKTARIHI: "30.07.2024 16:28:49",
    DIGISIMKULLANUCI: "Nodirbek Mamajonov",
  },
];

export const TrailForm = ({
  formId,
  onClose,
  handleActionsDetails,
  filterParams,
  setFilterParams,
  disabled,
  setOpen,
  refetchTable,
  materialId,
  labReceteId,
}: Props) => {
  const { t } = useTranslation();
  const {
    createForm,
    formData: trailFormData,
    updateForm,
  } = TrailFormLogic({
    refetchTable,
    onClose,
    formId,
  });
  const { control, handleSubmit, setValue } = useForm<any>({
    mode: "onSubmit",
  });

  // {
  //   "LABRECETECALISMAID": 17498,
  //   "LABRECETEID": 14950,
  //   "ATISTARIHI": "2025-05-28T00:00:00",
  //   "RECETEASAMAID": 1,
  //   "ATISNO": 3,
  //   "ATISNOSTR": "3",
  //   "GIDISTARIHI": "2025-05-28T00:00:00",
  //   "OKEY": true,
  //   "KRITIK": false,
  //   "MIGRASYON": 1,
  //   "ONAYKULLANICIID": 1,
  //   "DURUMUSTR": "Okey",
  //   "TARIHI": "2025-05-28T15:37:18.711Z",
  //   "KARTELATARIHI": "2025-05-28T10:37:18.711Z",
  //   "INSERTKULLANICIID": 1,
  //   "INSERTTARIHI": "2025-05-28T10:37:18.711Z",
  //   "KULLANICIID": 1,
  //   "DEGISIMTARIHI": "2025-05-28T10:37:18.711Z"
  // }

  const onSubmit = (data: any) => {
    let params: any = data;
    params.LABRECETECALISMAID = materialId;
    params.LABRECETEID = labReceteId;
    params.RECETEASAMAID = params.ASAMAID;
    params.ATISNOSTR = params.ATISNO + "";
    params.ATISNO = +params.ATISNO;

    params.DEGISIMTARIHI = dayjs();

    if (params.OKEY) {
      params.TARIHI = dayjs();
      params.DURUMUSTR = "Okey";
    } else {
      params.DURUMUSTR = "";
    }

    if (trailFormData?.LABRECETEATISID) {
      params = { ...trailFormData, ...params };
      // delete params.LABRECETEATISID

      updateForm(params, materialId);
    } else {
      params.ATISTARIHI = dayjs();
      params.KULLANICIID = 1;
      params.GIDISTARIHI = dayjs();
      params.KRITIK = false;
      params.ONAYKULLANICIID = 1;
      params.KARTELATARIHI = dayjs();
      params.INSERTKULLANICIID = 1;
      params.INSERTTARIHI = dayjs();

      createForm(params);
    }
    console.log(params);
  };

  useEffect(() => {
    if (trailFormData?.LABRECETECALISMAID) {
      setValue("ASAMAID", trailFormData.RECETEASAMAID);
      setValue("ATISNO", trailFormData.ATISNO);
      setValue("MIGRASYON", trailFormData.MIGRASYON);
    }
  }, [trailFormData]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-[760px]">
      <div className="grid grid-cols-2 gap-x-3 gap-y-2">
        <LiteOptionsTable
          name="ASAMAID"
          label="ASAMAID"
          placeholder="RECETEASAMAID"
          link="asama"
          renderValue={(_: string, obj: any) => {
            return obj.ADI || obj.ASAMAID;
          }}
          defaultValue={trailFormData?.RENKDERINLIGIADI}
          headColumns={[
            { id: "ASAMAID", title: "ASAMAID", width: 80 },
            { id: "ADI", title: "ADI", width: 150 },
          ]}
          handleSelect={(obj: { ASAMAID: number; ADI: string }) => {
            setValue("ASAMAID", obj.ASAMAID);
          }}
          required={true}
          control={control}
        />

        <HFInputMask
          control={control}
          name="ATISNO"
          label={t("ATISNO")}
          type="number"
          required={true}
          placeholder={t("ATISNO")}
        />
        <HFSelect
          control={control}
          name="MIGRASYON"
          label={t("MIGRASYON")}
          placeholder={t("MIGRASYON")}
          options={[
            { label: "0", value: 0 },
            { label: "1", value: 1 },
            { label: "2", value: 2 },
          ]}
        />

        {/* <HFTextField
          control={control}
          name="GIDISTARIHI"
          required={true}
          label={t("GIDISTARIHI")}
          placeholder={t("GIDISTARIHI")}
        /> */}

        {/* <HFInputMask
          control={control}
          name="BOYAMILYETU"
          label={t("BOYAMILYETU")}
          type="number"
          required={true}
          placeholder={t("BOYAMILYETU")}
        /> */}
        {/* <HFInputMask
          control={control}
          name="BOYAYUZDESI"
          label={t("BOYAYUZDESI")}
          type="number"
          required={true}
          placeholder={t("BOYAYUZDESI")}
        /> */}
        <div>
          <CLabel title={t("OKEY")} />
          <CCheckbox
            checked={trailFormData?.OKEY}
            handleCheck={(obj: { checked: boolean }) => {
              setValue("OKEY", obj.checked);
            }}
            element={{
              label: "OKEY",
            }}
          />
        </div>
      </div>

      <CNewTable
        title="Details"
        headColumns={[
          {
            title: "Sira",
            id: "SIRA",
          },

          {
            title: "Urun Adi",
            id: "URUNADI",
          },
          {
            title: "Miktar",
            id: "MIKTAR",
          },
          {
            title: "Hasep Birimi",
            id: "HASEPBIRIMI",
          },
          {
            title: "ILKKAYDEDM",
            id: "ILKKAYDEDM",
          },
          {
            title: "TARIH",
            id: "ILKTARIHI",
          },
          {
            title: "Birimi Fiyati",
            id: "BIRIMFIYAT",
          },
          {
            title: "Turlar",
            id: "TURLAR",
          },
        ]}
        defaultFilters={["actions"]}
        idForTable="table_modal_details"
        defaultActions={["delete", "edit"]}
        bodyColumns={DetailsList}
        handleActions={handleActionsDetails}
        isLoading={false}
        filterParams={filterParams}
        handleFilterParams={setFilterParams}
        disablePagination={true}
        autoHeight="240px"
        disabled={disabled}
        extra={
          <button
            onClick={() => {
              setOpen("detail");
            }}
            className="flex items-center"
          >
            <PlusIcon fill="var(--main)" />
          </button>
        }
      />

      <div className="flex space-x-2">
        <button onClick={() => onClose()} className="cancel-btn" type="button">
          {t("cancel")}
        </button>
        <button className="custom-btn" type="submit">
          {t(trailFormData?.LABRECETEATISID ? "update" : "save")}
        </button>
      </div>
    </form>
  );
};
