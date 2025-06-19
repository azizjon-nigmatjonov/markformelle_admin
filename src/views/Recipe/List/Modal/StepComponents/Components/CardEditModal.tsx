import { useForm } from "react-hook-form";
import { SubmitCancelButtons } from "../../../../../../components/UI/FormButtons/SubmitCancel";
import { ImageViewer } from "../../../../../../components/UI/ImageViewer";
import { useState } from "react";
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
}

export const CardEditModal = ({
  handleActions,
  open,
  formData = {},
  refetchTable,
  receteId,
  type,
}: Props) => {
  const [group, setGroup] = useState<string>("");
  const [imageView, setImageView] = useState("");

  const { control, handleSubmit, setValue, reset } = useForm<any>({
    mode: "onSubmit",
  });
  const { updateForm, createForm } = FormLogic({
    refetchTable: () => {
      refetchTable();
      reset();
    },
  });

  const onSubmit = (data: any) => {
    let params = data;
    console.log("111");
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

          RECETEASAMAID: null,
          SURE: null,
          RECETEALTASAMAID: params.RECETEALTASAMAID,
          URUNID: null,
          URUNBIRIMID: null,
          RECETEGRAFIKID: null,
          MIKTAR: params.MIKTAR,
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
  console.log("formData", formData);

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
            uniqueID={
              open.includes("step") && !open.includes("review") ? "step" : ""
            }
            type={type}
            handleActions={(val: string, uniqueID: string) => {
              if (uniqueID === "step") {
                if (val === "Close") {
                  handleActions();
                }
                if (val === "Enter") {
                  if (group === "group1") {
                    handleSubmit(onSubmit)();
                  }
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
