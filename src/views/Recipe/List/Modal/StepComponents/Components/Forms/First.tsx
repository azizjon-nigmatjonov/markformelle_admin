import { Control } from "react-hook-form";
import {
  LiteOptionsTable,
  TableItem,
} from "../../../../../../../components/UI/Options/LiteTable";
import CImageViewer from "../../../../../../../components/CElements/CImageViewer";
import { API_URL } from "../../../../../../../utils/env";
import { useState } from "react";

interface Props {
  changeGroup: (group: string) => void;
  formData: any;
  disabledFirstGroup: boolean;
  control: Control<any>;
  setValue: (name: string, value: any) => void;
}

export const FormFirst = ({
  changeGroup,
  formData,
  disabledFirstGroup,
  control,
  setValue,
}: Props) => {
  const [CurrentReceteAsamaId, setCurrentReceteAsamaId] = useState<number>(0);

  return (
    <div className="space-y-2">
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
        // defaultValue={
        //   formData?.RECETEASAMAID + " - " + formData?.RECETEASAMAADI
        // }
        handleSelect={(obj: TableItem) => {
          setValue("RECETEASAMAID", obj.RECETEASAMAID);
          setCurrentReceteAsamaId(obj.RECETEASAMAID || 0);
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
          // changeGroup("group1");
        }}
        disabled={disabledFirstGroup}
        control={control}
      />
      {formData.RECETEGRAFIKID && (
        <CImageViewer
          url={`${API_URL}/recetegrafik/image/${formData.RECETEGRAFIKID}`}
        />
      )}
    </div>
  );
};
