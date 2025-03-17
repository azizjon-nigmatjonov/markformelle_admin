import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import HFInputMask from "../../../../components/HFElements/HFInputMask";

export const TableForm = ({
  setOpen,
  defaultData,
}: {
  setOpen: (val: boolean) => void;
  defaultData: any;
}) => {
  const { control, handleSubmit, setValue } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-y-3"
    >
      <HFTextField
        control={control}
        name="barkod_kodu"
        label="Barkod kodu"
        required={true}
        placeholder="Barkod kodu"
        setValue={setValue}
        defaultValue={defaultData?.BARKODKODU}
      />

      <HFTextField
        control={control}
        name="urun_kodu"
        label="Urun kodu"
        required={true}
        placeholder="Urun kodu"
        setValue={setValue}
        defaultValue={defaultData?.URUNID}
      />
      <HFTextField
        control={control}
        name="urun_adi"
        label="Ürün Adı"
        required={true}
        placeholder="Ürün Adı"
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
