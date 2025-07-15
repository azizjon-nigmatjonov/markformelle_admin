import { useForm } from "react-hook-form";
import HFTextField from "../../../../../components/HFElements/HFTextField";
import { SubmitCancelButtons } from "../../../../../components/UI/FormButtons/SubmitCancel";
import CCheckbox from "../../../../../components/CElements/CCheckbox";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { RezervingLogics } from "./Logic";

export const AddRezerveModal = ({
  setOpenModal = () => {},
  defaultData = {},
  currentId,
  refetch,
  allRezerv = [],
  setAllRezerv = () => {},
}: {
  setOpenModal: (val: any) => void;
  defaultData: any;
  currentId: number;
  refetch: () => void;
  allRezerv: any[];
  setAllRezerv: (val: any) => void;
}) => {
  const [checked, setChecked] = useState(true);
  const { control, handleSubmit, setValue } = useForm();
  const { createForm } = RezervingLogics({ refetch, setOpenModal });

  const onSubmit = (data: any) => {
    const params = {
      BOYASIPARISDETAYID: defaultData?.BOYASIPARISDETAYID,
      BOYASIPARISKAYITID: currentId,
      HAMSTOKDETAYID: defaultData?.HAMSTOKDETAYID,
      HAMID: defaultData?.HAMID,
      KILO: Number(data?.KILO),
      METRE: Number(data?.METRE),
      ADET: Number(data?.ADET),
      KAPADEDI: Number(data?.KAPADET),
      MIKTAR: defaultData?.KALANMIKTAR,
      KULLANILANMIKTAR: defaultData.KULLANILANMIKTAR,
      REZERVVAR: true,
      INSERTKULLANICIID: 1,
      INSERTTARIHI: dayjs(),
      KULLANICIID: 1,
      DEGISIMTARIHI: dayjs(),
      index: defaultData?.index,
    };
    // createForm(params);
    if (allRezerv.find((el) => el.HAMSTOKDETAYID === params?.HAMSTOKDETAYID)) {
      setAllRezerv(
        allRezerv.filter((el) => el.HAMSTOKDETAYID !== params?.HAMSTOKDETAYID)
      );
    } else {
      setAllRezerv((prev: any) => [...prev, params]);
    }

    setOpenModal(false);
  };

  useEffect(() => {
    if (checked && defaultData?.BOYASIPARISDETAYID) {
      setValue("KILO", defaultData?.KALANKILO || "0");
      setValue("METRE", defaultData?.KULLANILANMETRE || "0");
      setValue("ADET", defaultData?.KULLANILANADET || "0");
      setValue("KAPADET", defaultData?.KALANKAPADEDI || "0");
    } else {
      setValue("KILO", "");
      setValue("METRE", "");
      setValue("ADET", "");
      setValue("KAPADET", "");
    }
  }, [defaultData, checked]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <CCheckbox
        checked={checked}
        handleCheck={() => setChecked(!checked)}
        element={{ label: "Barcha ma'lumotni oladi" }}
      />
      <HFTextField
        control={control}
        name="KILO"
        label="Kilo"
        type="number"
        disabled={checked}
      />

      <HFTextField
        control={control}
        name="KAPADET"
        label="Kap Adet"
        type="number"
        disabled={checked}
      />
      <HFTextField
        control={control}
        name="METRE"
        label="Metre"
        type="number"
        disabled={checked}
      />
      <HFTextField
        control={control}
        name="ADET"
        label="Adet"
        type="number"
        disabled={checked}
      />
      <SubmitCancelButtons
        uniqueID={"add-rezerve-modal"}
        type="save"
        handleActions={(val: string, _: string) => {
          if (val === "Enter") handleSubmit(onSubmit)();
          if (val === "Close") setOpenModal(false);
        }}
      />
    </form>
  );
};
