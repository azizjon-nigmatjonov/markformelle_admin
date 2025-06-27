import { Control } from "react-hook-form";
import {
  LiteOptionsTable,
  TableItem,
} from "../../../../../../../components/UI/Options/LiteTable";
import { API_URL } from "../../../../../../../utils/env";
import { useState } from "react";

interface Props {
  changeGroup: (group: string) => void;
  formData: any;
  disabledFirstGroup: boolean;
  control: Control<any>;
  setValue: (name: string, value: any) => void;
  currentReceteGrafikID: string;
}

export const FormFirst = ({
  changeGroup,
  formData,
  disabledFirstGroup,
  control,
  setValue,
  currentReceteGrafikID,
}: Props) => {
  const [hoveredGrafikId, setHoveredGrafikId] = useState<string | null>(null);
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
        staticSearchID="RECETEASAMAID"
        renderValue={(_: string, obj: any) => {
          return obj.RECETEASAMAID && obj.ADI
            ? obj.RECETEASAMAID + " - " + obj.ADI
            : obj.RECETEASAMAID;
        }}
        focused={true}
        defaultValue={
          formData?.RECETEASAMAID
            ? formData?.RECETEASAMAID + " - " + formData?.RECETEASAMAADI
            : ""
        }
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
          {
            id: "RECETEGRAFIKID",
            title: "RECETEGRAFIKID",
            width: 120,
            render: (val: string) => (
              <div
                className=" group relative"
                onMouseEnter={() => setHoveredGrafikId(val)}
                onMouseLeave={() => setHoveredGrafikId(null)}
              >
                {val}
              </div>
            ),
          },
          {
            id: "ADI",
            title: "ADI",
            width: 200,
            render: (val: string, obj: any) => {
              return (
                <div
                  onMouseEnter={() => setHoveredGrafikId(obj.RECETEGRAFIKID)}
                  onMouseLeave={() => setHoveredGrafikId(null)}
                >
                  {val}
                </div>
              );
            },
          },
        ]}
        renderValue={(_: string, obj: any) => {
          return obj.RECETEGRAFIKID && obj.ADI
            ? obj.RECETEGRAFIKID + " - " + obj.ADI
            : obj.RECETEGRAFIKID;
        }}
        defaultValue={currentReceteGrafikID || formData?.RECETEGRAFIKID}
        handleSelect={(obj: TableItem) => {
          setValue("RECETEGRAFIKID", obj.RECETEGRAFIKID);
          setHoveredGrafikId(null);
          changeGroup("group1");
        }}
        disabled={disabledFirstGroup}
        control={control}
      />

      <div className="rounded-[8px] border border-[var(--border)] p-2 h-[140px] flex items-center justify-center overflow-hidden">
        {currentReceteGrafikID ? (
          <img
            src={`${API_URL}/recetegrafik/image/${currentReceteGrafikID}`}
            alt="recete image"
            className="w-full"
          />
        ) : (
          <img src="/images/image.png" alt="no image" className="w-[40px]" />
        )}
      </div>

      {hoveredGrafikId && (
        <div className="fixed top-1/2 -translate-y-1/2 right-[-520px] z-[99]">
          <img
            width={500}
            src={`${API_URL}/recetegrafik/image/${hoveredGrafikId}`}
            alt="recete image"
          />
        </div>
      )}
    </div>
  );
};
