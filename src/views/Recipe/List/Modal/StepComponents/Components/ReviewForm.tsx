import { useForm } from "react-hook-form";
import { LiteOptionsTable } from "../../../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../../../components/UI/FormButtons/SubmitCancel";
import HFTextField from "../../../../../../components/HFElements/HFTextField";
import CCheckbox from "../../../../../../components/CElements/CCheckbox";
import HFInputMask from "../../../../../../components/HFElements/HFInputMask";

interface ReviewFormProps {
  handleActions?: () => void;
  open?: string[];
}

export const ReviewForm = ({
  handleActions = () => {},
  open = [],
}: ReviewFormProps) => {
  const { control, setValue, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[400px] space-y-3">
      <HFTextField
        label="Recete asama kodu"
        name="BIRIMID"
        control={control}
        placeholder="Urun Birimi"
      />
      <LiteOptionsTable
        label="Boya Tipi"
        name="boyatipi"
        placeholder="Boya Tipi"
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
      <HFInputMask
        control={control}
        name="PROGRAM"
        label="Dozalama Program No"
        type="number"
        required
        placeholder="Dozalama Program No"
      />{" "}
      <HFInputMask
        control={control}
        name="SURE"
        label="Sure"
        type="number"
        required
        placeholder="Sure"
      />
      <LiteOptionsTable
        label="Banyo carpan no"
        name="id"
        placeholder="Banyo carpan no"
        headColumns={[{ id: "id", title: "ID" }]}
        renderValue={(_: string, obj: any) => {
          return obj.id;
        }}
        staticOptions={[
          {
            id: 1,
            ADI: "1",
          },
          {
            id: 2,
            ADI: "2",
          },
          {
            id: 3,
            ADI: "3",
          },
          {
            id: 4,
            ADI: "4",
          },
        ]}
        handleSelect={(obj: { RECETEASAMAID: number }) =>
          setValue("RECETEASAMAID", obj.RECETEASAMAID)
        }
        control={control}
      />
      <div className="grid grid-cols-2 gap-2">
        <CCheckbox element={{ label: "Boya Asamasmi" }} />{" "}
        <CCheckbox element={{ label: "Orgaex'e Tek Basina Aktarlabir" }} />{" "}
        <CCheckbox element={{ label: "Tuz Sulfat Bastan" }} />
      </div>
      <SubmitCancelButtons
        uniqueID={open.includes("review") ? "review" : ""}
        type={open.includes("review") ? "update" : "create"}
        handleActions={(val: string, uniqueID: string) => {
          if (uniqueID === "review") {
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
