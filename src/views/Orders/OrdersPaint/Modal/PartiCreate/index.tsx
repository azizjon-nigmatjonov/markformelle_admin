import { useForm } from "react-hook-form";
import CNewMiniModal from "../../../../../components/CElements/CNewMiniModal";
import HFTextField from "../../../../../components/HFElements/HFTextField";
import HFTextarea from "../../../../../components/HFElements/HFTextarea";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../../components/UI/FormButtons/SubmitCancel";

export const PartiCreate = ({ onClose }: { onClose: () => void }) => {
  const { control, handleSubmit, setValue } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <CNewMiniModal title="Hizli Parti Plustur" handleActions={onClose}>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px]"
      >
        <div className="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-2 gap-3">
            <HFTextField control={control} name="PARTI" label="Siparis Kilo" />

            <HFTextField
              control={control}
              name="PARTI"
              label="Rezerv Kalan Kilo"
            />

            <HFTextField control={control} name="PARTI" label="Siparis Metre" />

            <HFTextField
              control={control}
              name="PARTI"
              label="Rezerv Kalan Metre"
            />
          </div>

          <HFTextarea control={control} name="PARTI" label="Planlama Notu" />
          <HFTextarea control={control} name="PARTI" label="Siparis Notu" />
          <HFTextField control={control} name="PARTI" label="Termin Tarihi" />
          <LiteOptionsTable
            name="PARTI"
            link="parti"
            label="Parti Grubu"
            headColumns={[
              {
                title: "Parti",
                id: "PARTI",
              },
            ]}
            control={control}
            handleSelect={(val: any) => {
              setValue("PARTI", val.PARTI);
            }}
          />
          <LiteOptionsTable
            name="PARTI"
            link="parti"
            label="Prozes No"
            headColumns={[
              {
                title: "Parti",
                id: "PARTI",
              },
            ]}
            control={control}
            handleSelect={(val: any) => {
              setValue("PARTI", val.PARTI);
            }}
          />
          <LiteOptionsTable
            name="ISLEMGRUPLARI"
            link="islem"
            label="Islem Gruplari"
            headColumns={[
              {
                title: "Islem",
                id: "PARTI",
              },
            ]}
            control={control}
            handleSelect={(val: any) => {
              setValue("ISLEMGRUPLARI", val.ISLEMGRUPLARI);
            }}
          />
          <LiteOptionsTable
            name="ISLEMGRUPLARI"
            link="islem"
            label="Acayet Derecesi"
            headColumns={[
              {
                title: "Islem",
                id: "PARTI",
              },
            ]}
            control={control}
            handleSelect={(val: any) => {
              setValue("ISLEMGRUPLARI", val.ISLEMGRUPLARI);
            }}
          />
          <HFTextField
            control={control}
            name="Kilo"
            label="Kilo"
            type="number"
          />
          <HFTextField
            control={control}
            name="kap"
            label="Kap Adedi"
            type="number"
          />
          <SubmitCancelButtons
            uniqueID={"innerbtns"}
            type={"create"}
            handleActions={(val: string, uniqueID: string) => {
              if (uniqueID === "innerbtns") {
                if (val === "Close") {
                }
                if (val === "Enter") handleSubmit(onSubmit)();
              }
            }}
          />
        </div>
      </form>
    </CNewMiniModal>
  );
};
