import { useForm } from "react-hook-form";
import HFTextField from "../../../../../components/HFElements/HFTextField";
import CNewTable from "../../../../../components/CElements/CNewTable";
import { MaterialTableLogic } from "../Logic";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export const MaterialModal = () => {
  const [formId, setFormId] = useState(0);
  const [filterParams, setFilterParams] = useState({});
  const { headColumns, bodyColumns } = MaterialTableLogic({ filterParams });
  const { control, handleSubmit, setValue } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const setInitialForm = () => {
    setValue("IRSALIYETARIHI", dayjs().format("YYYY-MM-DD"));
    setValue("ADI", "M0868 MARK FORMELLE");
  };

  useEffect(() => {
    if (formId) {
    } else {
      setInitialForm();
      setFormId(1);
    }
  }, [formId]);

  return (
    <div>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="mb-5 space-y-5"
      >
        <div className="grid grid-cols-2 gap-x-3">
          <HFTextField name="ADI" control={control} label="Ad Soyad" />
        </div>
        <div className="w-[1100px] grid grid-cols-4 gap-3">
          <HFTextField
            control={control}
            name="IRSALIYETARIHI"
            label="Irsaliye tarihi"
          />
          <HFTextField
            control={control}
            name="material_name"
            label="Irsaliye tarihi"
          />
          <HFTextField
            control={control}
            name="material_name"
            label="Irsaliye tarihi"
          />
          <HFTextField
            control={control}
            name="material_name"
            label="Irsaliye tarihi"
          />
        </div>
      </form>

      <CNewTable
        title="Rezerv list"
        headColumns={headColumns}
        bodyColumns={bodyColumns}
        handleFilterParams={setFilterParams}
        filterParams={{}}
        defaultFilters={["actions", "excel_download", "active_menu"]}
        autoHeight="500px"
        innerTable={true}
      />
    </div>
  );
};
