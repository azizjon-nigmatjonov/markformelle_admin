import { Control } from "react-hook-form";
import {
  LiteOptionsTable,
  TableItem,
} from "../../../../../../../components/UI/Options/LiteTable";
import HFTextField from "../../../../../../../components/HFElements/HFTextField";
import HFInputMask from "../../../../../../../components/HFElements/HFInputMask";
import { useGetBirimList } from "../../../../../../../hooks/useFetchRequests/useBirimList";
import { useEffect } from "react";

interface Props {
  changeGroup: (group: string) => void;
  formData: any;
  disabledThirdGroup: boolean;
  control: Control<any>;
  setValue: (name: string, value: any) => void;
}

export const FormThird = ({
  changeGroup,
  formData,
  disabledThirdGroup,
  control,
  setValue,
}: Props) => {
  const { birimData, setFilterParams, filterParams } = useGetBirimList({
    enabled: "q",
  });

  useEffect(() => {
    if (birimData?.data?.length > 0) {
      const found: any = birimData?.data?.find(
        (item: { DEFAULTBIRIM: number }) => item.DEFAULTBIRIM === 1
      );
      setValue("URUNBIRIMID", found?.URUNBIRIMID);
      setValue("BIRIMID", found?.BIRIMID);
      setValue("MIKTAR", found?.CARPAN);
      // setValue("URUNBIRIMID", found?.BIRIMID);
    }
  }, [birimData]);

  useEffect(() => {
    if (formData.RECETEID) {
      setValue("URUNID", formData.URUNID);
      setValue("URUNADI", formData.URUNADI);
      setValue("URUNBIRIMID", formData.URUNBIRIMID);
      setValue("MIKTAR", formData.MIKTAR);
      setValue("BANYO", formData.BANYO);
    }
  }, [formData]);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-x-2">
        <div className="col-span-6">
          <LiteOptionsTable
            label="Ürün kodu"
            name="URUNID"
            required
            link="urun"
            headColumns={[
              { id: "URUNID", title: "URUNID", width: 70 },
              { id: "ADI", title: "ADI", width: 180 },
            ]}
            renderValue={(_: string, obj: any) => {
              return obj.URUNID && obj.ADI
                ? obj.URUNID + " - " + obj.ADI
                : obj.URUNID;
            }}
            defaultValue={
              formData.URUNID
                ? formData.URUNID + " - " + formData.URUNADI
                : undefined
            }
            handleSelect={(obj: TableItem) => {
              setValue("URUNID", obj.URUNID);
              changeGroup("group3");

              setFilterParams({ ...filterParams, q: `URUNID=${obj.URUNID}` });
            }}
            disabled={disabledThirdGroup}
            control={control}
          />
        </div>
        <HFTextField
          label="Birim"
          name="BIRIMID"
          control={control}
          defaultValue={formData.URUNBIRIMADI}
          disabled={disabledThirdGroup}
        />
      </div>

      <HFInputMask
        label="Gr/Kg"
        name="MIKTAR"
        control={control}
        defaultValue={formData.MIKTAR}
        disabled={disabledThirdGroup}
      />
      <HFInputMask
        label="Gr/Lt"
        name="BANYO"
        control={control}
        defaultValue={formData.BANYO}
        disabled={disabledThirdGroup}
      />
    </div>
  );
};
