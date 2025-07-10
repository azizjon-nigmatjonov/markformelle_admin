import { useForm } from "react-hook-form";
import HFTextField from "../../../../../components/HFElements/HFTextField";
import CNewTable from "../../../../../components/CElements/CNewTable";
import { MaterialStokLogic } from "../Logic";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Cards } from "./Cards";
import CNewMiniModal from "../../../../../components/CElements/CNewMiniModal";
import { AddRezerveModal } from "./AddRezerv";

export const MaterialModal = ({
  currentId,
  BOYASIPARISKAYITID,
  setOpenAddRezerv,
}: {
  currentId: number;
  BOYASIPARISKAYITID: number;
  setOpenAddRezerv: (val: boolean) => void;
}) => {
  const [formId, setFormId] = useState(0);
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 50 });
  const { headColumns, bodyColumns, refetch, isLoading } = MaterialStokLogic({
    filterParams,
    currentId,
  });

  const [openModal, setOpenModal]: any = useState({});
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

  const handleActions = (obj: any, status: string) => {
    if (status === "view_single") {
      setOpenModal(obj);
    }
  };

  return (
    <div className="w-[80vw]">
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
        idForTable="material-stok-table"
        handleFilterParams={setFilterParams}
        filterParams={filterParams}
        isLoading={isLoading}
        handleActions={handleActions}
        defaultFilters={["excel_download", "active_menu", "sellect_more"]}
        autoHeight="500px"
        innerTable={true}
        disablePagination
      />

      {openModal?.BOYASIPARISDETAYID && (
        <CNewMiniModal
          title="Rezerv Kilo Girisi"
          handleActions={() => setOpenModal({})}
        >
          <AddRezerveModal
            setOpenModal={setOpenModal}
            defaultData={openModal}
            currentId={BOYASIPARISKAYITID}
            refetch={refetch}
          />
        </CNewMiniModal>
      )}

      <Cards />
    </div>
  );
};
