import { useForm } from "react-hook-form";
import { LiteOptionsTable } from "../../../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../../../components/UI/FormButtons/SubmitCancel";
import HFTextField from "../../../../../../components/HFElements/HFTextField";
import { useState } from "react";
import CNewMiniModal from "../../../../../../components/CElements/CNewMiniModal";
import { ReviewForm } from "./ReviewForm";

interface Props {
  currentModal: string;
  handleActions: () => void;
}

export const CardEditModal = ({ currentModal, handleActions }: Props) => {
  const [innerModal, setInnerModal] = useState("");
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
        className="w-[400px] space-y-2"
      >
        <div>
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
            handleSelect={(obj: { RECETEASAMAID: number }) => {
              setValue("RECETEASAMAID", obj.RECETEASAMAID);
              setInnerModal("review");
            }}
            control={control}
          />
        </div>
        <LiteOptionsTable
          label="Recete asama sablon kodu"
          name="RECETEASAMAID"
          placeholder="Recete asama sablon kodu"
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
          handleSelect={(obj: { RECETEASAMAID: number }) => {
            setValue("RECETEASAMAID", obj.RECETEASAMAID);
          }}
          control={control}
        />
        <LiteOptionsTable
          label="Grafik kodu"
          name="RECETEASAMAID"
          placeholder="Grafik kodu"
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
          handleSelect={(obj: { RECETEASAMAID: number }) =>
            setValue("RECETEASAMAID", obj.RECETEASAMAID)
          }
          control={control}
        />
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
          handleSelect={(obj: { RECETEASAMAID: number }) =>
            setValue("RECETEASAMAID", obj.RECETEASAMAID)
          }
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
          handleSelect={(obj: { RECETEASAMAID: number }) =>
            setValue("RECETEASAMAID", obj.RECETEASAMAID)
          }
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
          uniqueID={currentModal}
          type="update"
          handleActions={(val: string, uniqueID: string) => {
            if (uniqueID === "trail") {
              if (val === "Close") {
                handleActions();
              }
              if (val === "Enter") handleSubmit(onSubmit)();
            }
          }}
        />
      </form>
      {innerModal === "review" && (
        <CNewMiniModal
          title="Recete asama taniti"
          type="inner"
          handleActions={() => setInnerModal("")}
        >
          <ReviewForm />
        </CNewMiniModal>
      )}
    </>
  );
};
