import { useForm } from "react-hook-form";
import HFInput from "../../../components/HFElements/HFInput";

export const UrunTab = () => {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  return (
    <div className="">
      <HFInput
        name="email"
        register={register}
        placeholder="Электронная почта"
        classesInput="bg-[#FAFAFB] border border-[#F1F1F5]"
        errors={errors}
      />
    </div>
  );
};
