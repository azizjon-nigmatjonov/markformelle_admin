import { useForm } from "react-hook-form";
import HFTextField from "../../../../../components/HFElements/HFTextField";
import CNewTable from "../../../../../components/CElements/CNewTable";
import { MaterialTableLogic } from "../Logic";
import { useState } from "react";

export const MaterialModal = () => {
  const [filterParams, setFilterParams] = useState({});
  const { headColumns, bodyColumns } = MaterialTableLogic({ filterParams });
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-[700px]">
          <HFTextField
            control={control}
            name="material_name"
            label="Irsaliye tarihi"
          />
        </div>
      </form>

      <CNewTable
        headColumns={headColumns}
        bodyColumns={bodyColumns}
        handleFilterParams={() => {}}
        filterParams={{}}
        autoHeight="300px"
        innerTable={true}
      />
    </div>
  );
};
