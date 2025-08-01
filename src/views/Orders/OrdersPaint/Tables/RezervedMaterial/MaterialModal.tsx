import { useForm } from "react-hook-form";
import HFTextField from "../../../../../components/HFElements/HFTextField";
import CNewTable from "../../../../../components/CElements/CNewTable";
import { MaterialStokLogic } from "../Logic";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { Cards } from "./Cards";
import CNewMiniModal from "../../../../../components/CElements/CNewMiniModal";
import { AddRezerveModal } from "./AddRezerv";

export const MaterialModal = ({
  currentId,
  BOYASIPARISKAYITID,
  currentPaint,
}: {
  currentId: number;
  BOYASIPARISKAYITID: number;
  setOpenAddRezerv: (val: boolean) => void;
  currentPaint: any;
}) => {
  const [formId, setFormId] = useState(0);
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 50 });
  const { headColumns, bodyColumns, refetch, isLoading } = MaterialStokLogic({
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

  const [allRezerv, setAllRezerv] = useState<any[]>([]);

  const handleActions = (obj: any, status: string) => {
    if (status === "view_single") {
      setOpenModal(obj);
      // if (sellectedList.includes(obj.index)) {
      //   setSellectedList(sellectedList.filter((item) => item !== obj.index));
      // } else {
      //   setSellectedList([...sellectedList, obj.index]);
      // }
    }
    console.log("status", status);

    if (status === "view_single_right_click") {
      console.log("obj", obj);
    }
  };

  const CardData = useMemo(() => {
    return {
      SIPARISBRUTKILO: currentPaint.SIPARISBRUTKILO,
      SIPARISBRUTMETRE: currentPaint.SIPARISBRUTMETRE,
      SECILENTOPLAM: allRezerv.reduce((acc, el) => acc + el.KILO, 0),
    };
  }, [currentPaint, allRezerv]);

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
        <div className="grid grid-cols-4">
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
        currentIdRow={allRezerv.map((el) => el.index)}
        handleActions={handleActions}
        defaultFilters={["excel_download", "sellect_more"]}
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
            allRezerv={allRezerv}
            setAllRezerv={setAllRezerv}
          />
        </CNewMiniModal>
      )}
      <Cards CardData={CardData} />
    </div>
  );
};
