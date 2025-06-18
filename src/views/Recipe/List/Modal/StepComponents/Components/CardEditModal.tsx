import { useForm } from "react-hook-form";
import { LiteOptionsTable } from "../../../../../../components/UI/Options/LiteTable";
import type { TableItem } from "../../../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../../../components/UI/FormButtons/SubmitCancel";
import HFTextField from "../../../../../../components/HFElements/HFTextField";
import { ImageViewer } from "../../../../../../components/UI/ImageViewer";
import { useEffect, useMemo, useState } from "react";
import { CImageUploader } from "../../../../../../components/CElements/CDriverImageUpload";
import { API_URL } from "../../../../../../utils/env";
import dayjs from "dayjs";
import { FormLogic } from "./FormLogic";
import HFInputMask from "../../../../../../components/HFElements/HFInputMask";
import CImageViewer from "../../../../../../components/CElements/CImageViewer";

interface Props {
  handleActions: () => void;
  open: string[];
  formData: any;
  refetchTable: () => void;
}

export const CardEditModal = ({
  handleActions,
  open,
  formData = {},
  refetchTable,
}: Props) => {
  const [group, setGroup] = useState<string>("");
  const [imageView, setImageView] = useState("");
  const { control, handleSubmit, setValue, reset } = useForm<any>({
    mode: "onSubmit",
  });
  const { updateForm } = FormLogic({ refetchTable });

  const changeGroup = (newGroup: string) => {
    if (!group) {
      console.log("aaa");

      setGroup(newGroup);
    }
  };
  console.log("formData", formData);

  const onSubmit = (data: any) => {
    let params = data;

    if (formData.SIRA) {
      params = { ...formData };
      params.DEGISIMTARIHI = dayjs();
      updateForm(params, formData.RECETEDETAYID);
    }

    // {
    //   "RECETEDETAYID": 0,
    //   "SIRA": 0,
    //   "RECETEID": "string",
    //   "RECETEASAMAID": 0,
    //   "SURE": 0,
    //   "RECETEALTASAMAID": 0,
    //   "URUNID": "string",
    //   "URUNBIRIMID": 0,
    //   "RECETEGRAFIKID": "string",
    //   "MIKTAR": 0,
    //   "BANYO": 0,
    //   "ATISRENKSIRA": 0,
    //   "ATISRENKCOLOR": 0,
    //   "ATISRENKKODU": "string",
    //   "ATISRENKADI": "string",
    //   "ACIKLAMA": "string",
    //   "INSERTKULLANICIID": 1,
    //   "INSERTTARIHI": "2025-06-18T06:04:37.484Z",
    //   "KULLANICIID": 1,
    //   "DEGISIMTARIHI": "2025-06-18T06:04:37.484Z"
    // }
    if (group === "group1") {
      console.log("group1", data);
    }
    if (group === "group2") {
      console.log("group2", data);
    }
    if (group === "group3") {
      console.log("group3", data);
    }
  };

  useEffect(() => {
    if (!formData.SIRA) {
      reset();
    }
    if (formData.RECETEASAMAID) {
      setGroup("group1");
    } else if (formData.RECETEALTASAMAID) {
      setGroup("group2");
    } else {
      setGroup("group3");
    }
  }, [formData]);

  const disabledFirstGroup = useMemo(() => {
    return group ? (group === "group1" ? false : true) : false;
  }, [group]);

  const disabledSecondGroup = useMemo(() => {
    return group ? (group === "group2" ? false : true) : false;
  }, [group]);

  const disabledThirdGroup = useMemo(() => {
    return group ? (group === "group3" ? false : true) : false;
  }, [group]);

  return (
    <>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px]"
        key={group}
      >
        <div className="space-y-3">
          <LiteOptionsTable
            label="Recete asama kodu"
            name="RECETEASAMAID"
            required
            link="receteasama"
            headColumns={[
              { id: "RECETEASAMAID", title: "ID", width: 50 },
              { id: "ADI", title: "FIRMAADI", width: 300 },
            ]}
            renderValue={(_: string, obj: any) => {
              return obj.RECETEASAMAID && obj.ADI
                ? obj.RECETEASAMAID + " - " + obj.ADI
                : obj.RECETEASAMAID;
            }}
            defaultValue={formData?.RECETEASAMAID}
            handleSelect={(obj: TableItem) => {
              setValue("RECETEASAMAID", obj.RECETEASAMAID);
              changeGroup("group1");
            }}
            disabled={disabledFirstGroup}
            control={control}
          />
          <LiteOptionsTable
            label="Grafik kodu"
            name="RECETEGRAFIKID"
            required
            link="recetegrafik"
            headColumns={[
              { id: "RECETEGRAFIKID", title: "RECETEGRAFIKID", width: 120 },
              { id: "ADI", title: "ADI", width: 160 },
            ]}
            renderValue={(_: string, obj: any) => {
              return obj.RECETEGRAFIKID;
            }}
            defaultValue={formData?.RECETEGRAFIKID}
            handleSelect={(obj: TableItem) => {
              setValue("RECETEGRAFIKID", obj.RECETEGRAFIKID);
              changeGroup("group1");
            }}
            // disabled={disabledFirstGroup}
            control={control}
          />
          <CImageViewer
            url={`${API_URL}/recetegrafik/image/${formData.RECETEGRAFIKID}`}
          />
          <div className="pt-5">
            <div className="h-[1px] bg-[var(--gray40)] w-full"></div>
          </div>
          <LiteOptionsTable
            label="Alt asama kodu"
            name="RECETEALTASAMAID"
            required
            link="recetealtasama"
            headColumns={[
              { id: "RECETEALTASAMAID", title: "ID", width: 50 },
              { id: "ADI", title: "ADI", width: 220 },
            ]}
            renderValue={(_: string, obj: any) => {
              return obj.RECETEALTASAMAID && obj.ADI
                ? obj.RECETEALTASAMAID + " - " + obj.ADI
                : obj.RECETEALTASAMAID;
            }}
            defaultValue={
              formData.RECETEALTASAMAID
                ? formData.RECETEALTASAMAID + " - " + formData.RECETEALTASAMAADI
                : ""
            }
            handleSelect={(obj: TableItem) => {
              setValue("RECETEALTASAMAID", obj.RECETEALTASAMAID);
              changeGroup("group2");
            }}
            disabled={disabledSecondGroup}
            control={control}
          />
          <div className="pt-5">
            <div className="h-[1px] bg-[var(--gray40)] w-full"></div>
          </div>

          <div className="grid grid-cols-7 gap-x-2">
            <div className="col-span-6">
              <LiteOptionsTable
                label="Urun kodu"
                name="URUNID"
                required
                link="urun"
                headColumns={[
                  { id: "URUNID", title: "URUNID", width: 70 },
                  { id: "ADI", title: "ADI", width: 180 },
                ]}
                renderValue={(_: string, obj: any) => {
                  return obj.URUNID && obj.ADI
                    ? obj.URUNID + " - " + obj.ADI
                    : obj.URUNID;
                }}
                defaultValue={
                  formData.URUNID
                    ? formData.URUNID + " - " + formData.URUNADI
                    : undefined
                }
                handleSelect={(obj: TableItem) => {
                  setValue("URUNID", obj.URUNID);
                  changeGroup("group3");
                }}
                disabled={disabledThirdGroup}
                control={control}
              />
            </div>
            <HFTextField
              label="Birim"
              name="BIRIMID"
              required
              control={control}
              defaultValue={formData.URUNBIRIMADI}
              disabled={disabledThirdGroup}
            />
          </div>
          <HFInputMask
            label="Gr/Kg"
            name="kg"
            required
            control={control}
            defaultValue={formData.MIKTAR}
            disabled={disabledThirdGroup}
          />
          <HFInputMask
            label="Gr/Lt"
            name="lt"
            required
            control={control}
            defaultValue={formData.BANYO}
            disabled={disabledThirdGroup}
          />
          <SubmitCancelButtons
            uniqueID={
              open.includes("step") && !open.includes("review") ? "step" : ""
            }
            type="update"
            handleActions={(val: string, uniqueID: string) => {
              if (uniqueID === "step") {
                if (val === "Close") {
                  handleActions();
                }
                if (val === "Enter") handleSubmit(onSubmit)();
              }
            }}
          />
        </div>
      </form>
      <ImageViewer url={imageView} closeViewer={() => setImageView("")} />
    </>
  );
};
