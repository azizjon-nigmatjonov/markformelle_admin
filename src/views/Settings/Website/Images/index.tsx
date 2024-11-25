import { useForm } from "react-hook-form";
// import { HFImageUpload } from "../../../../components/HFElements/HFImageUpload";
import { CDriverImageUpload } from "../../../../components/CElements/CDriverImageUpload";

export const WebsiteImages = () => {
  const { control } = useForm();
  return (
    <div>
      {window?.screen?.height}
      <CDriverImageUpload control={control} name="logo" />
    </div>
  );
};
