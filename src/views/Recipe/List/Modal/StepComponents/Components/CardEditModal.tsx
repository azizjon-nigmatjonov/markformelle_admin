import { useForm } from "react-hook-form";
import { LiteOptionsTable } from "../../../../../../components/UI/Options/LiteTable";
import type { TableItem } from "../../../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../../../components/UI/FormButtons/SubmitCancel";
import HFTextField from "../../../../../../components/HFElements/HFTextField";
import { Divider } from "@mui/material";
import { API_URL } from "../../../../../../utils/env";
import { ImageViewer } from "../../../../../../components/UI/ImageViewer";
import { useState } from "react";

interface Props {
  handleActions: () => void;
  open: string[];
  setOpen: (val: string[]) => void;
}

export const CardEditModal = ({ handleActions, open, setOpen }: Props) => {
  const [imageView, setImageView] = useState("");
  const { control, handleSubmit, setValue } = useForm<any>({
    mode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px]"
      >
        <div className="space-y-3">
          <LiteOptionsTable
            label="Recete asama kodu"
            name="RECETEASAMAID"
            placeholder="RECETEASAMAID"
            focused
            required
            link="receteasama"
            headColumns={[
              { id: "RECETEASAMAID", title: "ID", width: 50 },
              { id: "ADI", title: "FIRMAADI", width: 300 },
            ]}
            renderValue={(_: string, obj: any) => {
              return obj.RECETEASAMAID
                ? obj.RECETEASAMAID + " - " + obj.ADI
                : obj.ADI;
            }}
            handleSelect={(obj: TableItem) => {
              if (obj.RECETEASAMAID) {
                setValue("RECETEASAMAID", obj.RECETEASAMAID);
                setOpen(["card", "step", "review"]);
              }
            }}
            control={control}
          />
          <LiteOptionsTable
            label="Grafik kodu"
            name="RECETEGRAFIKID"
            placeholder="Grafik kodu"
            required
            link="recetegrafik"
            headColumns={[
              {
                id: "RECETEGRAFIKID",
                title: "image",
                render: (val: string) => {
                  return (
                    <img
                      onClick={() =>
                        setImageView(`${API_URL}/recetegrafik/image/${val}`)
                      }
                      loading="lazy"
                      width={80}
                      src={`${API_URL}/recetegrafik/image/${val}`}
                    />
                  );
                },
              },
              { id: "RECETEGRAFIKID", title: "RECETEGRAFIKID" },
              { id: "ADI", title: "FIRMAADI" },
            ]}
            renderValue={(_: string, obj: any) => {
              return obj.RECETEGRAFIKID;
            }}
            handleSelect={(obj: TableItem) => {
              if (obj.RECETEGRAFIKID) {
                setValue("RECETEGRAFIKID", obj.RECETEGRAFIKID);
              }
            }}
            control={control}
          />
          <Divider />
          <LiteOptionsTable
            label="Recete asama sablon kodu"
            name="RECETEASAMAID"
            placeholder="Recete asama sablon kodu"
            required
            link="recetegrafik"
            headColumns={[
              { id: "RECETEASAMAID", title: "ID", width: 50 },
              { id: "ADI", title: "FIRMAADI", width: 300 },
            ]}
            renderValue={(_: string, obj: any) => {
              return obj.RECETEASAMAID
                ? obj.RECETEASAMAID + " - " + obj.ADI
                : obj.ADI;
            }}
            handleSelect={(obj: TableItem) => {
              if (obj.RECETEASAMAID) {
                setValue("RECETEASAMAID", obj.RECETEASAMAID);
              }
            }}
            control={control}
          />
          <Divider />
          <LiteOptionsTable
            label="Alt asama kodu"
            name="RECETEASAMAID"
            placeholder="Alt asama kodu"
            required
            link="asama"
            headColumns={[
              { id: "RECETEASAMAID", title: "ID", width: 50 },
              { id: "ADI", title: "FIRMAADI", width: 300 },
            ]}
            renderValue={(_: string, obj: any) => {
              return obj.RECETEASAMAID
                ? obj.RECETEASAMAID + " - " + obj.ADI
                : obj.ADI;
            }}
            handleSelect={(obj: TableItem) => {
              if (obj.RECETEASAMAID) {
                setValue("RECETEASAMAID", obj.RECETEASAMAID);
              }
            }}
            control={control}
          />
          <LiteOptionsTable
            label="Urun kodu"
            name="URUNID"
            placeholder="Urun kodu"
            required
            link="urun"
            headColumns={[
              { id: "RECETEASAMAID", title: "ID", width: 50 },
              { id: "ADI", title: "FIRMAADI", width: 300 },
            ]}
            renderValue={(_: string, obj: any) => {
              return obj.RECETEASAMAID
                ? obj.RECETEASAMAID + " - " + obj.ADI
                : obj.ADI;
            }}
            handleSelect={(obj: TableItem) => {
              if (obj.RECETEASAMAID) {
                setValue("RECETEASAMAID", obj.RECETEASAMAID);
              }
            }}
            control={control}
          />
          <HFTextField
            label="Urun birimi"
            name="BIRIMID"
            control={control}
            placeholder="Urun Birimi"
          />
          <HFTextField
            label="Gr/Kg"
            name="kg"
            control={control}
            placeholder="Gr/Kg"
          />
          <HFTextField
            label="Gr/Lt"
            name="lt"
            control={control}
            placeholder="Gr/Lt"
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
      {/* {open.includes("review") && (
        <CNewMiniModal
          title="Recete asama tanitimi"
          type="inner"
          handleActions={() => setOpen(["card", "step"])}
        >
          <ReviewForm />
        </CNewMiniModal>
      )} */}
    </>
  );
};
