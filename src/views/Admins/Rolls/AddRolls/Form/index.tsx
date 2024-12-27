import { CircularProgress } from "@mui/material";
import HFTextField from "../../../../../components/HFElements/HFTextField";
// import HFTextField from "../../../../../components/FormElements/HFTextField";

export const RollForm = ({
  id,
  control,
  rollData,
  handleSubmit,
  onSubmit,
  setValue,
  isLoading = false,
}: {
  id?: any;
  rollData: any;
  isLoading: boolean;
  control: any;
  handleSubmit: any;
  setValue: any;
  onSubmit: (val: any) => void;
}) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center space-x-5"
    >
      <HFTextField
        name="name"
        control={control}
        placeholder="e.g.Admin 1"
        setValue={setValue}
        defaultValue={rollData?.name}
      />
      <div className="">
        {isLoading ? (
          <div className="custom-btn">
            <CircularProgress size={24} />
          </div>
        ) : (
          <button type="submit" className="custom-btn">
            {id !== ":create" ? "Редактировать" : "Сохранить"}
          </button>
        )}
      </div>
    </form>
  );
};
