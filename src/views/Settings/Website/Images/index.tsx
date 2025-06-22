import { useForm } from "react-hook-form";
import { CImageUploader } from "../../../../components/CElements/CDriverImageUpload";

export const WebsiteImages = () => {
  const { control } = useForm();
  return (
    <div className="py-2">
      <CImageUploader control={control} name="logo" />
    </div>
  );
};
