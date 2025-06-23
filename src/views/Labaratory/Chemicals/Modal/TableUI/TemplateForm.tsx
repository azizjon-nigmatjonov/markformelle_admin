import { useForm } from "react-hook-form";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../../components/UI/FormButtons/SubmitCancel";

export const TemplateForm = ({
  handleActions,
}: {
  handleActions: () => void;
}) => {
  const { control, handleSubmit, setValue } = useForm<any>({
    mode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    console.log("data", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <LiteOptionsTable
        name="RECETEID"
        placeholder="RECETEID"
        link="recete"
        required={true}
        renderValue={(_: string, obj: any) => {
          return obj.RECETEID;
        }}
        defaultSearch="SABLON=true"
        headColumns={[
          { id: "RECETEID", title: "Recete kodu", width: 110 },
          {
            title: "ADI",
            id: "ADI",
            width: 150,
          },
          {
            title: "Recete Turi adi",
            id: "RECETETURUADI",
            width: 120,
          },
        ]}
        handleSelect={(obj: { ADI: string; LABRECETEID: number }) => {
          setValue("LABRECETEKODU", obj.ADI);
        }}
        control={control}
      />

      <SubmitCancelButtons
        uniqueID={"inner"}
        type={"create"}
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
    </form>
  );
};
