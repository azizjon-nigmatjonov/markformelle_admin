import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import HFInputMask from "../../../../components/HFElements/HFInputMask";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { useState } from "react";
import { InnerModalLogic } from "./Logic";
import { CloseIcon } from "../../../../components/UI/IconGenerator/Svg";
import { IFilterParams } from "../../../../interfaces";
import { ITransferElement } from "../../../../interfaces/transfers";

interface DefaultDataProps extends ITransferElement {
  BARKODKODU?: string;
  MIKTAR?: number;
  BIRIMFIYAT?: number;
}

interface TableFormProps {
  setOpen: (val: boolean) => void;
  defaultData?: DefaultDataProps;
  refetch: () => void;
}
interface FormData {
  BARKODKODU: string;
  URUNID: string;
  ADI: string;
  MIKTAR: number;
  URUNBIRIMID: number;
  BIRIMFIYAT: number;
}

export const TableForm = ({
  setOpen,
  defaultData,
  refetch = () => {},
}: TableFormProps) => {
  const [filterParams, setFilterParams] = useState<Partial<IFilterParams>>({
    page: 1,
    perPage: 100,
    q: "",
  });
  const [filterParamsWeight, setFilterParamsWeight] = useState<
    Partial<IFilterParams>
  >({
    page: 1,
    perPage: 100,
  });
  const { control, handleSubmit, setValue } = useForm<FormData>({
    mode: "onSubmit",
  });

  const { urunData, urunBirim } = InnerModalLogic({ filterParams, refetch });

  const onSubmit = (data: any) => {
    const params = {
      STOKDETAYID: 0,
      STOKID: 0,
      HAREKETTIPI: 0,
      URUNID: "string",
      URUNBIRIMID: 0,
      MIKTAR: 0,
      BIRIMFIYAT: 0,
      KDV: 0,
      KDVHARICFIYAT: 0,
      BIRIMISKONTOTOPLAMI: 0,
      NETBIRIMFIYAT: 0,
      TARIH: "2025-03-28T11:11:36.123Z",
      DEPOID: "string",
      TRANSFERDEPOID: "string",
      IRSALIYEID: 0,
      FIRMAID: "string",
      NOTU: "string",
      CIKISMIKTARI: 0,
      STOKVAR: false,
      LINKISLEMI: 0,
      INSERTKULLANICIID: 1,
      INSERTTARIHI: "2025-03-28T11:11:36.123Z",
      KULLANICIID: 1,
      DEGISIMTARIHI: "2025-03-28T11:11:36.123Z",
      GIRISSTOKDETAYID: 0,
      REFERANSSTOKDETAYID: 0,
      ...data,
    };
    console.log(params);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-y-3 bg-white shadow-2xl p-4 rounded-[8px] z-[99] border border-[var(--border)] w-[350px]"
    >
      <div className="flex justify-between mb-2">
        <div className="w-[20px]"></div>
        <h2>Примешенные</h2>
        <div className="w-[20px] cursor-pointer" onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
      </div>
      <HFTextField
        control={control}
        name="BARKODKODU"
        label="Barkod kodi"
        placeholder="Barkod kodu"
        setValue={setValue}
        defaultValue={defaultData?.BARKODKODU}
      />

      <SelectOptionsTable
        name="URUNID"
        label="Urun kodi"
        placeholder="Urun kodi"
        options={urunData?.data}
        required={true}
        headColumns={[
          { id: "BARKOD", title: "BARKODI" },
          { id: "ADI", title: "ADIS", innerId: "URUNID" },
        ]}
        filterParams={filterParams}
        handleSelect={(obj: any) => {
          setValue("URUNID", obj.URUNID);
          setValue("ADI", obj.ADI);
        }}
        control={control}
        setFilterParams={setFilterParams}
      />

      <SelectOptionsTable
        name="ADI"
        label="Urun adi"
        placeholder="Urun adi"
        options={urunData?.data}
        required={true}
        headColumns={[
          { id: "BARKOD", title: "BARKODI" },
          { id: "ADI", title: "ADIS", innerId: "URUNID" },
        ]}
        filterParams={filterParams}
        handleSelect={(obj: any) => {
          setValue("URUNID", obj.URUNID);
          setValue("ADI", obj.ADI);
        }}
        control={control}
        setFilterParams={setFilterParams}
      />

      <div className="flex space-x-2 items-end">
        <HFInputMask
          control={control}
          name="MIKTAR"
          label="Miktar"
          type="number"
          required={true}
          placeholder="Miktar"
        />
        <div className="w-[90px]">
          <SelectOptionsTable
            name="URUNBIRIMID"
            placeholder="Kg"
            options={urunBirim}
            required={true}
            headColumns={[
              { id: "BIRIMID", title: "Birim id" },
              { id: "BIRIMADI", title: "Adi" },
              { id: "CARPAN", title: "Carpani" },
            ]}
            filterParams={filterParamsWeight}
            handleSelect={(obj: any) => {
              setValue("URUNBIRIMID", obj.BIRIMID);
            }}
            control={control}
            setFilterParams={setFilterParamsWeight}
          />
        </div>
      </div>
      <HFInputMask
        control={control}
        name="BIRIMFIYAT"
        label="Birim fiyat"
        type="number"
        placeholder="Birim fiyat"
      />
      <div className="flex space-x-2 mt-3">
        <button
          className="cancel-btn"
          type="button"
          onClick={() => setOpen(false)}
        >
          cancel
        </button>
        <button className="custom-btn save" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};
