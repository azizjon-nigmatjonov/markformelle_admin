import { useForm } from "react-hook-form";
// import { IModalForm } from "../../interfaces";
import HFInputMask from "../../../../../components/HFElements/HFInputMask";
import { useTranslation } from "react-i18next";
import HFSelect from "../../../../../components/HFElements/HFSelect";
import CCheckbox from "../../../../../components/CElements/CCheckbox";

import CLabel from "../../../../../components/CElements/CLabel";
import { TrailFormLogic } from "./Logic";
import dayjs from "dayjs";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import { useEffect } from "react";
import { SubmitCancelButtons } from "../../../../../components/UI/FormButtons/SubmitCancel";
import { TableUI } from "../TableUI/TableUI";

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
  DetailHeader: any;
  detailData: any;
}

export const TrailForm = ({
  formId,
  onClose,
  handleActionsDetails,
  DetailHeader = [],
  refetchTable,
  materialId,
  labReceteId,
  detailData = [],
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
  const { control, handleSubmit, setValue, getValues } = useForm<any>({
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

      // const newParams = {
      //   LABRECETECALISMAID: materialId,
      //   LABRECETEID: labReceteId,
      //   ATISTARIHI: trailFormData.ATISTARIHI,
      //   ATISNO: trailFormData.ATISNO,
      //   ATISNOSTR: trailFormData.ATISNOSTR,
      //   TARIHI: trailFormData.TARIHI,
      //   BOYAMALIYETI: trailFormData,
      //   KULLANICIID: 1,
      //   DEGISIMTARIHI: "2025-05-29T16:13:49",
      // };

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
      // params.MIGRASYON = params.MIGRASYON || 0;

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-[400px]">
      <div className="grid grid-cols-1 gap-y-2">
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
            { label: "Soguk", value: 1 },
            { label: "Sicak", value: 2 },
          ]}
        />
        <LiteOptionsTable
          name="ASAMAID"
          label="ASAMAID"
          placeholder="RECETEASAMAID"
          link="asama"
          renderValue={(_: string, obj: any) => {
            return obj.ADI || obj.ASAMAID;
          }}
          defaultValue={trailFormData?.RECETEASAMAID}
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

      <div className="border rounded-[12px] border-[var(--border)] pb-11">
        <TableUI
          title="detail"
          idTable={null}
          handleRowClick={handleActionsDetails}
          headColumns={DetailHeader}
          bodyColumns={detailData}
          disabled={!trailFormData?.LABRECETECALISMAID}
        />
      </div>
      {/* <CNewTable
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
      /> */}

      <SubmitCancelButtons
        uniqueID="lab_trail_form"
        type={trailFormData?.LABRECETEATISID ? "update" : "create"}
        handleActions={(val: string, uniqueID: string) => {
          if (uniqueID === "modal_lab") {
            if (val === "Close") onClose();
            if (val === "Enter") onSubmit(getValues());
          }
        }}
      />

      {/* <div className="flex space-x-2">
        <button onClick={() => onClose()} className="cancel-btn" type="button">
          {t("cancel")}
        </button>
        <button className="custom-btn" type="submit">
          {t(trailFormData?.LABRECETEATISID ? "update" : "save")}
        </button>
      </div> */}
    </form>
  );
};
