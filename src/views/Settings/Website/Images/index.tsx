import { useForm } from "react-hook-form";
import { CDriverImageUpload } from "../../../../components/CElements/CDriverImageUpload";

export const WebsiteImages = () => {
  const { control } = useForm();
  return (
    <div className="py-2">
      <CDriverImageUpload control={control} name="logo" />
    </div>
  );
};
