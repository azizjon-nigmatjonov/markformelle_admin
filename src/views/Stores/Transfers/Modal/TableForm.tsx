import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import HFInputMask from "../../../../components/HFElements/HFInputMask";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { useEffect, useState } from "react";
import { InnerModalLogic } from "./Logic";
import { CloseIcon } from "../../../../components/UI/IconGenerator/Svg";
import { IFilterParams } from "../../../../interfaces";
import dayjs from "dayjs";

interface TableFormProps {
  setOpen: (val: boolean) => void;
  defaultData?: Partial<any>;
  refetch: () => void;
}
interface FormData {
  BARKODKODU: string;
  URUNID: string;
  ADI: string;
  MIKTAR: number;
  URUNBIRIMID: number;
  BIRIMFIYAT: number;
  BIRIMID: string;
}

export const TableForm = ({
  setOpen,
  defaultData = {},
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

  const { urunData, urunBirim, createStokElement } = InnerModalLogic({
    filterParams,
    refetch,
  });

  const onSubmit = (data: any) => {
    let params: any = {
      STOKDETAYID: 0,
      STOKID: 0,
      HAREKETTIPI: 0,
      URUNID: "string",
      URUNBIRIMID: 0,
      MIKTAR: 100,
      BIRIMFIYAT: 0,
      KDV: 0,
      KDVHARICFIYAT: 0,
      BIRIMISKONTOTOPLAMI: 0,
      NETBIRIMFIYAT: 0,
      TARIH: dayjs(),
      DEPOID: "string",
      TRANSFERDEPOID: "string",
      IRSALIYEID: 0,
      FIRMAID: "string",
      NOTU: "string",
      CIKISMIKTARI: 0,
      STOKVAR: false,
      LINKISLEMI: 0,
      INSERTKULLANICIID: 1,
      INSERTTARIHI: dayjs(),
      KULLANICIID: 1,
      DEGISIMTARIHI: dayjs(),
      GIRISSTOKDETAYID: 0,
      REFERANSSTOKDETAYID: 0,
    };
    for (let key in defaultData) {
      if (key in params) {
        params[key] = defaultData[key];
      }
    }
    params = { ...params, ...data };
    params.URUNBIRIMID =
      urunBirim.find((obj: any) => obj.BIRIMID === params.BIRIMID)
        ?.URUNBIRIMID ?? 0;
    params.MIKTAR = +params.MIKTAR;
    params.BIRIMFIYAT = +params.BIRIMFIYAT;
    createStokElement(params);
    console.log("11", params);
  };

  useEffect(() => {
    console.log("defaultData", defaultData);
  }, [defaultData]);

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
        focused={true}
        placeholder="Urun kodi"
        options={urunData?.data ?? []}
        required={true}
        headColumns={[
          { id: "BARKOD", width: 200, title: "BARKODI" },
          { id: "ADI", title: "ADIS", innerId: "URUNID" },
        ]}
        filterParams={filterParams}
        handleSelect={(obj: any) => {
          setValue("URUNID", obj.URUNID);
          setValue("ADI", obj.ADI);
        }}
        control={control}
        handleSearch={(val: string) => {
          setFilterParams({ ...filterParams, q: val });
        }}
        setFilterParams={setFilterParams}
      />

      <SelectOptionsTable
        name="ADI"
        label="Urun adi"
        placeholder="Urun adi"
        options={urunData?.data}
        required={true}
        headColumns={[
          { id: "BARKOD", width: 200, title: "BARKODI" },
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
            name="BIRIMID"
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
              setValue("BIRIMID", obj.BIRIMID);
            }}
            defaultValue={0}
            readOnly={true}
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
