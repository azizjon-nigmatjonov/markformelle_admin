import { useMemo, useState } from "react";
import { CellKK } from "./Cell";
import { Modal } from "@mui/joy";
import CTable from "../../../../components/CElements/CTable";

interface Props {
  list: any;
  data: any
}

export const CellsAfterKKList = ({ list = [], data = [] }: Props) => {
  
  const [open, setOpen]: any = useState(false);
  const [filterParams, setFilterParams]: any = useState({});

  const newData = useMemo(() => {
    if (!list?.length) return [];
    let all_defects = 0;
    const arr = list.map((item: any) => {
      if (item.DEFECT) {
        all_defects += item.DEFECT;
      }
      return {
        ...item,
      };
    });

    const sortedData = arr.sort((a: any, b: any) => {
      return a.OBORUD_NUMBER - b.OBORUD_NUMBER
    });
    
    if (data?.length === list?.length) {
      sortedData.push({ all_defects });
    }

    return sortedData.map((item: any) => {
      return {
        ...item,
        id: item.PODR_ID,
        time: item?.HOURS_MINUTES_SECONDS_SINCE_30ST_ROLL?.substring(0, 4),
      };
    });
  }, [list, data]);

  const headColumns: any = [
    {
      title: "Имя",
      id: "OBORUD_NUMBER",
    },
    {
      title: "Брак",
      id: "DEFECT",
      render: (val: string) => {
        return val ? val : ''
      }
    },

    {
      title: "артикул",
      id: "ART",
    },
    {
      title: "ЛОТ",
      id: "LOT",
    },
  ];

  return (
    <div
      className="p-2"
      style={{
        minWidth:
          window?.screen?.width < 940 ? "1600px" : window?.screen?.width - 200,
      }}
    >
      <div className="grid grid-cols-10 h-full gap-1.5">
        {newData
          .map((item: any, index: number) => (
            <CellKK item={item} key={item.OBORUD_NUMBER + index} setOpen={setOpen} />
          ))}
      </div>

      {open && (
        <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={(e: any) => {
          e.stopPropagation();
          setOpen(false);
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
          <div className="w-[70vw] h-[650px] overflow-hidden p-5 bg-white rounded-[12px]">
            <CTable
              headColumns={headColumns}
              bodyColumns={newData?.filter((item: any) => item.DEFECT)}
              isResizeble={true}
              isLoading={false}
              filterParams={filterParams}
              tableSetting={false}
              disablePagination={true}
              removeScroll={false}
              removeSearch={true}
              handleFilterParams={setFilterParams}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
