import { useForm } from "react-hook-form";
import { SubmitCancelButtons } from "../../../../../../components/UI/FormButtons/SubmitCancel";
import { ImageViewer } from "../../../../../../components/UI/ImageViewer";
import { useEffect, useState } from "react";
import { FormLogic } from "./FormLogic";
import { FormFirst } from "./Forms/First";
import { FormSecond } from "./Forms/Second";
import { FormThird } from "./Forms/Third";
import dayjs from "dayjs";
interface Props {
  handleActions: () => void;
  open: string[];
  formData: any;
  refetchTable: () => void;
  receteId: string;
  type: string;
  setOpen: (val: string[]) => void;
}

export const CardEditModal = ({
  handleActions,
  open,
  formData = {},
  refetchTable,
  receteId,
  type,
  setOpen,
}: Props) => {
  const [group, setGroup] = useState<string>("");
  const [imageView, setImageView] = useState("");

  const { control, handleSubmit, setValue, reset, watch } = useForm<any>({
    mode: "onSubmit",
  });
  const { updateForm, createForm } = FormLogic({
    refetchTable: () => {
      refetchTable();
      reset();
      setOpen(["card"]);
    },
  });
  const currentReceteGrafikID = watch("RECETEGRAFIKID");

  const onSubmit = (data: any) => {
    let params = data;

    params.DEGISIMTARIHI = dayjs();
    if (type === "update") {
      params = { ...formData, ...params };
      updateForm(params, formData.RECETEDETAYID);
    } else {
      params.INSERTKULLANICIID = 1;
      params.INSERTTARIHI = dayjs();
      params.KULLANICIID = 1;
      params.RECETEID = receteId;
      params.SIRA = formData.SIRA;
      if (group === "group1") {
        params = {
          ...params,
          SIRA: 5,
          RECETEASAMAID: params.RECETEASAMAID,
          SURE: null,
          RECETEALTASAMAID: null,
          URUNID: null,
          URUNBIRIMID: null,
          RECETEGRAFIKID: params.RECETEGRAFIKID,
          MIKTAR: 0,
          BANYO: 0,
          ATISRENKSIRA: null,
          ATISRENKCOLOR: null,
          ATISRENKKODU: null,
          ATISRENKADI: null,
          ACIKLAMA: null,
        };
      }
      if (group === "group2") {
        params = {
          ...params,
          SIRA: 6,
          RECETEASAMAID: null,
          SURE: null,
          RECETEALTASAMAID: params.RECETEALTASAMAID,
          URUNID: null,
          URUNBIRIMID: null,
          RECETEGRAFIKID: null,
          MIKTAR: params.MIKTAR || 0,
          BANYO: 0,
          ATISRENKSIRA: null,
          ATISRENKCOLOR: null,
          ATISRENKKODU: null,
          ATISRENKADI: null,
          ACIKLAMA: null,
        };
      }
      if (group === "group3") {
        params = {
          ...params,
          SIRA: 7,
          URUNID: params.URUNID,
          URUNBIRIMID: params.URUNBIRIMID,

          MIKTAR: params.MIKTAR,
          BANYO: Number(params.BANYO),
        };
      }

      createForm(params);
    }
  };

  const changeGroup = (newGroup: string) => {
    if (!group) {
      setGroup(newGroup);
    }
  };

  useEffect(() => {
    if (type === "update") {
      if (formData.RECETEASAMAID) {
        setGroup("group1");
        setValue("RECETEGRAFIKID", formData.RECETEGRAFIKID);
      }
      if (formData.RECETEALTASAMAID) {
        setGroup("group2");
      }
      if (formData.URUNID) {
        setGroup("group3");
      }
    }
  }, [formData]);

  return (
    <>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px]"
      >
        <div className="space-y-3">
          <FormFirst
            control={control}
            setValue={setValue}
            changeGroup={changeGroup}
            formData={type === "create" ? {} : formData}
            disabledFirstGroup={
              group ? (group === "group1" ? false : true) : false
            }
            currentReceteGrafikID={currentReceteGrafikID}
          />
          <div className="pt-5">
            <div className="h-[1px] bg-[var(--gray40)] w-full"></div>
          </div>
          <FormSecond
            control={control}
            setValue={setValue}
            changeGroup={changeGroup}
            formData={type === "create" ? {} : formData}
            disabledSecondGroup={
              group ? (group === "group2" ? false : true) : false
            }
          />
          <div className="pt-5">
            <div className="h-[1px] bg-[var(--gray40)] w-full"></div>
          </div>
          <FormThird
            control={control}
            setValue={setValue}
            changeGroup={changeGroup}
            formData={type === "create" ? {} : formData}
            disabledThirdGroup={
              group ? (group === "group3" ? false : true) : false
            }
          />
          <SubmitCancelButtons
            uniqueID={open.includes("insert_step") ? "step" : ""}
            type={type}
            handleActions={(val: string, uniqueID: string) => {
              if (uniqueID === "step") {
                if (val === "Close") {
                  handleActions();
                }
                if (val === "Enter") {
                  handleSubmit(onSubmit)();
                }
              }
            }}
          />
        </div>
      </form>
      <ImageViewer url={imageView} closeViewer={() => setImageView("")} />
    </>
  );
};
