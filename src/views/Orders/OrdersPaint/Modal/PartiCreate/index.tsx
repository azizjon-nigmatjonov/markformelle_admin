import { useForm } from "react-hook-form";
import CNewMiniModal from "../../../../../components/CElements/CNewMiniModal";
import HFTextField from "../../../../../components/HFElements/HFTextField";
import { InputFieldUI } from "../../../../../components/UI/FieldUI";
import HFTextarea from "../../../../../components/HFElements/HFTextarea";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../../components/UI/FormButtons/SubmitCancel";

export const PartiCreate = () => {
  const { control, handleSubmit, setValue } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <CNewMiniModal title="Hizli Parti Plustur">
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
          <InputFieldUI title="Siparis kilo">
            <HFTextField control={control} name="PARTI" />
          </InputFieldUI>
          <InputFieldUI title="Rezerv Kalan Kilo">
            <HFTextField control={control} name="PARTI" />
          </InputFieldUI>
          <InputFieldUI title="Siparis Metre">
            <HFTextField control={control} name="PARTI" />
          </InputFieldUI>
          <InputFieldUI title="Rezerv Kalan Metre">
            <HFTextField control={control} name="PARTI" />
          </InputFieldUI>
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
        </div>
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
      </form>
    </CNewMiniModal>
  );
};
