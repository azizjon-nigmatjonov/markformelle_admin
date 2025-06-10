import { useForm } from "react-hook-form";
import { LiteOptionsTable } from "../../../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../../../components/UI/FormButtons/SubmitCancel";

export const ReviewForm = ({ handleActions = () => {}, currentModal = "" }) => {
  const { control, setValue, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[400px] space-y-2">
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
  );
};
