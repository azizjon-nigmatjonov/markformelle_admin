import { Control } from "react-hook-form";
import {
  LiteOptionsTable,
  TableItem,
} from "../../../../../../../components/UI/Options/LiteTable";
interface Props {
  changeGroup: (group: string) => void;
  formData: any;
  disabledSecondGroup: boolean;
  control: Control<any>;
  setValue: (name: string, value: any) => void;
}

export const FormSecond = ({
  changeGroup,
  formData,
  disabledSecondGroup,
  control,
  setValue,
}: Props) => {
  return (
    <form
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
    >
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
          console.log("2222");

          setValue("RECETEALTASAMAID", obj.RECETEALTASAMAID);
          changeGroup("group2");
        }}
        disabled={disabledSecondGroup}
        control={control}
      />
    </form>
  );
};
