import { useState } from "react";
import CNewModal from "../../../../components/CElements/CNewModal";
import CNewTable from "../../../../components/CElements/CNewTable";
import { TableData } from "../Logic";
import { ListIcon } from "../../../../components/UI/IconGenerator/Svg";
import { IFilterParams } from "../../../../interfaces";

export const SearchModal = ({
  setData,
  defaultData,
}: {
  setData: (val: any) => void;
  defaultData: any;
}) => {
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 100,
    search: "",
  });
  const [open, setOpen] = useState(false);
  const { bodyColumns, isLoading } = TableData({
    filterParams,
  });

  const handleActions = (el: any, status: string) => {
    if (status === "view") {
      setData(el);
      setOpen(false);
    }
  };

  const headColumns = [
    { id: "URUNID", title: "Urun kodu" },
    { id: "ADI", title: "ad?" },
    { id: "ADI2", title: "ad? 2" },
    { id: "INSERTKULLANICIID", title: "urun grup 1" },
    { id: "RAF", title: "ref" },
    { id: "MUTFAKDEPONO", title: "Muftak depo no" },
    { id: "KIMYASALTIPIID", title: "Kimyasal tipi" },
  ];

  return (
    <>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          onChange={(e) =>
            setFilterParams({ ...filterParams, search: e.target.value })
          }
          value={defaultData?.URUNID}
          style={{ textTransform: "uppercase" }}
          className="border border-[var(--border)] h-[30px] rounded-[4px] px-2 focus:border-[var(--main)] text-sm"
        />
        <button
          onClick={() => setOpen(true)}
          className="w-[30px] h-[30px] items-center justify-center flex"
        >
          <ListIcon />
        </button>
      </div>

      {open && (
        <CNewModal handleActions={() => setOpen(false)}>
          <CNewTable
            headColumns={headColumns}
            bodyColumns={bodyColumns}
            handleActions={handleActions}
            isLoading={isLoading}
            filterParams={filterParams}
            handleFilterParams={setFilterParams}
            disablePagination={true}
          />
        </CNewModal>
      )}
    </>
  );
};
