import { useForm } from "react-hook-form";
import HFInputMask from "../../../../../components/HFElements/HFInputMask";
import { useTranslation } from "react-i18next";
import CCheckbox from "../../../../../components/CElements/CCheckbox";

import CLabel from "../../../../../components/CElements/CLabel";
import { TrailFormLogic } from "./Logic";
import dayjs from "dayjs";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import { useEffect, useState } from "react";
import { SubmitCancelButtons } from "../../../../../components/UI/FormButtons/SubmitCancel";
import { TableUI } from "../TableUI/TableUI";
import { Validation } from "./Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "@mui/material";
const schema = Validation;
interface Props {
  open: string;
  formId: number;
  labReceteId: any;
  materialId: number;
  onClose: () => void;
  filterParams: { page: number; perPage: number };
  handleActionsDetails: (val: any, val2: string, arr?: any) => void;
  setFilterParams: (val: any) => void;
  disabled: boolean;
  setOpen: (val: string) => void;
  refetchTable: (id?: number) => void;
  DetailHeader: any;
  idDetailForm: any;
  detailData: any;
  materialData: any;
}

export const TrailForm = ({
  open = "",
  formId,
  onClose,
  handleActionsDetails,
  materialData = {},
  DetailHeader = [],
  refetchTable,
  materialId,
  labReceteId,
  idDetailForm,
  detailData,
}: Props) => {
  const { t } = useTranslation();
  const [clear, setClear] = useState(true);
  const { control, handleSubmit, setValue, reset, watch } = useForm<any>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const openDisable = watch("ASAMAID") && watch("MIGRASYON") && watch("ATISNO");
  const [newFormId, setNewFormId]: any = useState(formId);
  const [openInnerModal, setOpenInnerModal] = useState(false);

  const closeFn = () => {
    reset();
    onClose();
  };

  const {
    createForm,
    formData: trailFormData,
    updateForm,
  } = TrailFormLogic({
    formId: newFormId,
    refetchTable: (id?: number) => {
      refetchTable(id);
      setNewFormId(id);
      setClear(false);
      setTimeout(() => {
        setClear(true);
      }, 100);
      if (openInnerModal) handleActionsDetails({}, "modalinner", []);
    },
    onClose: closeFn,
  });

  const onSubmit = (data: any) => {
    let params: any = data;

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
      params.LABRECETEID = labReceteId;
      params.LABRECETECALISMAID = materialId;
      params.ATISTARIHI = dayjs();
      params.KULLANICIID = 1;
      params.GIDISTARIHI = dayjs().startOf("day").format("YYYY-MM-DDTHH:mm:ss");
      params.KRITIK = false;
      params.ONAYKULLANICIID = 1;
      params.KARTELATARIHI = dayjs();
      params.INSERTKULLANICIID = 1;
      params.INSERTTARIHI = dayjs();

      createForm(params);
    }
  };

  useEffect(() => {
    if (trailFormData?.LABRECETECALISMAID) {
      setValue("ASAMAID", trailFormData.RECETEASAMAID);
      setValue("ATISNO", trailFormData.ATISNO);
      setValue("MIGRASYON", trailFormData.MIGRASYON);
      setValue("NOTU", trailFormData.NOTU || "");
    }
  }, [trailFormData]);

  return (
    clear && (
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 w-[440px]"
      >
        <Alert severity="info">{materialData?.HAMADI}</Alert>
        <div className="grid grid-cols-1 gap-y-2">
          <LiteOptionsTable
            name="RECETEASAMAID"
            label="RECETE ASAMA ID"
            link="receteasama"
            renderValue={(_: string, obj: any) => {
              return obj.RECETEASAMAID + " - " + obj.ADI;
            }}
            defaultValue={trailFormData?.RECETEASAMAADI}
            headColumns={[
              { id: "RECETEASAMAID", title: "ID", width: 40 },
              { id: "ADI", title: "ADI" },
            ]}
            handleSelect={(obj: { RECETEASAMAID: number }) => {
              setValue("ASAMAID", obj.RECETEASAMAID);
              setValue("RECETEASAMAID", obj.RECETEASAMAID);
            }}
            required={true}
            focused
            control={control}
          />
          <LiteOptionsTable
            name="MIGRASYON"
            label="MIGRASYON"
            placeholder="MIGRASYON"
            renderValue={(_: string, obj: any) => {
              return obj?.label || obj?.MIGRASYON;
            }}
            defaultValue={trailFormData?.MIGRASYON}
            headColumns={[
              { id: "MIGRASYON", title: "ID", width: 80 },
              { id: "label", title: "title", width: 150 },
            ]}
            handleSelect={(obj: { MIGRASYON: number }) => {
              setValue("MIGRASYON", obj.MIGRASYON);
            }}
            staticOptions={[
              { label: "Soguk", MIGRASYON: 1 },
              { label: "Sicak", MIGRASYON: 2 },
            ]}
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

        <div className="border rounded-[12px] border-[var(--border)] pb-11 h-[300px]">
          <TableUI
            title="labreceteurun"
            name="LABRECETEURUNID"
            idTable={trailFormData?.LABRECETEATISID ? idDetailForm : null}
            handleRowClick={(val: any, type: string, arr?: any) => {
              if (openDisable && !trailFormData?.LABRECETECALISMAID) {
                handleSubmit(onSubmit)();
                setOpenInnerModal(true);
              } else {
                handleActionsDetails(
                  val,
                  type === "delete" || type === "view_single"
                    ? type
                    : type + "inner",
                  arr
                );
              }
            }}
            headColumns={DetailHeader}
            bodyColumns={trailFormData?.LABRECETEATISID ? detailData : []}
            disabled={!openDisable}
          />
        </div>

        <SubmitCancelButtons
          uniqueID={open}
          type={trailFormData?.LABRECETEATISID ? "update" : "create"}
          handleActions={(val: string, uniqueID: string) => {
            if (uniqueID === "trail") {
              if (val === "Close") {
                onClose();
              }
              if (val === "Enter") handleSubmit(onSubmit)();
            }
          }}
        />
      </form>
    )
  );
};
