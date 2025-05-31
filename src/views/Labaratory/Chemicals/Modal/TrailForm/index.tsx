import { useForm } from "react-hook-form";
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
import { Validation } from "./Validation";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = Validation;
interface Props {
  open: string;
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
  open = "",
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
  const { control, handleSubmit, setValue } = useForm<any>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    let params: any = data;
    params.LABRECETECALISMAID = materialId;
    params.LABRECETEID = labReceteId;
    params.RECETEASAMAID = params.ASAMAID;

    params.DEGISIMTARIHI = dayjs();
    params.ATISNO = Number(params.ATISNO);
    params.ATISNOSTR = params.ATISNO + "";
    if (params.OKEY) {
      params.TARIHI = dayjs();
      params.DURUMUSTR = "Okey";
    } else {
      params.DURUMUSTR = "";
    }

    if (trailFormData?.LABRECETEATISID) {
      params = { ...trailFormData, ...params };

      updateForm(params, trailFormData?.LABRECETEATISID);
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
          required
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

      <SubmitCancelButtons
        uniqueID={open}
        type={trailFormData?.LABRECETEATISID ? "update" : "create"}
        handleActions={(val: string, uniqueID: string) => {
          if (uniqueID === open) {
            if (val === "Close") onClose();
            if (val === "Enter") handleSubmit(onSubmit)();
          }
        }}
      />
    </form>
  );
};
