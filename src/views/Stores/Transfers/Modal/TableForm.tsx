import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import HFInputMask from "../../../../components/HFElements/HFInputMask";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { useState } from "react";
import { InnerModalLogic } from "./Logic";
import { CloseIcon } from "../../../../components/UI/IconGenerator/Svg";

export const TableForm = ({
  setOpen,
  defaultData,
}: {
  setOpen: (val: boolean) => void;
  defaultData: any;
}) => {
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 50 });
  const { control, handleSubmit, setValue } = useForm({
    mode: "onSubmit",
  });
  const { urunData } = InnerModalLogic({ filterParams });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleValues = (obj: any, status: string) => {
    setValue(status, obj.value);
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
        name="barkod_kodi"
        label="Barkod kodi"
        placeholder="Barkod kodu"
        setValue={setValue}
        defaultValue={defaultData?.BARKODKODU}
      />

      <SelectOptionsTable
        name="TRANSFERDEPOID"
        label="Urun kodi"
        options={urunData?.data}
        required={true}
        headColumns={[
          { id: "BARKOD", title: "BARKODI" },
          { id: "ADI", title: "ADIS", innerId: "URUNID" },
        ]}
        filterParams={filterParams}
        handleSelect={(obj: any) => {
          console.log("111", obj);

          setValue(obj.URUNID, "URUNID");
          setValue(obj.ADI, "ADI");
        }}
        control={control}
        setFilterParams={setFilterParams}
      />

      <SelectOptionsTable
        name="URUNADI"
        label="Urun adi"
        options={urunData?.data}
        required={true}
        headColumns={[
          { id: "BARKOD", title: "BARKODI" },
          { id: "ADI", title: "ADIS", innerId: "URUNID" },
        ]}
        filterParams={filterParams}
        handleSelect={(obj: any) => {
          setValue(obj.URUNID, "URUNID");
          setValue(obj.ADI, "ADI");
        }}
        control={control}
        setFilterParams={setFilterParams}
      />

      <HFTextField
        control={control}
        name="urunbirim"
        label="Ürün Birimi"
        required={true}
        placeholder="Выберите тип"
        setValue={setValue}
        defaultValue={defaultData?.urunAdi}
      />
      <HFInputMask
        control={control}
        name="miktar"
        label="Miktar"
        required={true}
        placeholder="Miktar"
        setValue={setValue}
        defaultValue={defaultData?.MIKTAR}
      />
      <HFInputMask
        control={control}
        name="birim_fiyat"
        label="Birim fiyat"
        required={true}
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
