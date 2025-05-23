import { useEffect, useState } from "react";
import CCard from "../../../components/CElements/CCard";
import { Modal } from "@mui/joy";
import { PaintCardModal } from "./Modal";
import { GetCurrentDate } from "../../../utils/getDate";
import { IFilterParams } from "../../../interfaces";
import CNewTable from "../../../components/CElements/CNewTable";
import { useTranslation } from "react-i18next";
interface Props {
  list: any;
  type: string | undefined;
}

export const PaintTable = ({ list = [], type = "table" }: Props) => {
  const { t } = useTranslation();
  const [open, setOpen]: any = useState({});
  const [headColumns, setHeadColumns]: any = useState([]);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 10,
    title: "Дашборд покраски",
  });
  const [bodyColumns, setBodyColumns] = useState([]);

  useEffect(() => {
    const arr = [
      {
        title: "index",
        id: "index",
        width: 40,
      },
      {
        title: "status",
        id: "status",
        render: (status: any) => {
          return (
            <div
              className={`h-full w-full green rounded-[8px] whitespace-nowrap px-2 ${status.color}`}
            >
              <p>{status.text}</p>
            </div>
          );
        },
      },
      {
        title: "Время",
        id: "timestamp",
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "АПИ",
        id: "ip",
        render: (val: string) => {
          if (val.includes("EMPTY")) {
            return "0";
          } else {
            return val;
          }
        },
      },
    ];
    setHeadColumns(arr);
  }, [bodyColumns]);

  useEffect(() => {
    if (!list?.length) return;

    setBodyColumns(list);
  }, [list?.length]);

  useEffect(() => {
    if (!bodyColumns?.length) return;
    const obj: any =
      bodyColumns?.find((item: any) => item?.machine) ?? bodyColumns?.[0];

    delete obj.nres;
    delete obj.machine;
    const keys = Object.keys(obj);
    const newColumns: any = [];
    keys?.forEach((key: string) => {
      const found = headColumns.find((item: any) => item.id === key);
      if (found?.id) {
        newColumns.push(found);
      } else {
        newColumns.push({ title: key, id: key });
      }
    });
    setHeadColumns(newColumns);
  }, [bodyColumns]);

  const handleActions = (element: any, _: any) => {
    const obj = bodyColumns.find(
      (item: any) => item.code_device === element.code_device
    );

    setOpen(obj);
  };
  return (
    <>
      <div className="p-2">
        <CCard classes="border-0" childClasses="p-0">
          <CNewTable
            title={t(type)}
            headColumns={headColumns}
            bodyColumns={bodyColumns}
            meta={{ totalCount: 60, pageCount: 5 }}
            isResizeble={true}
            isLoading={false}
            disablePagination={true}
            filterParams={filterParams}
            handleFilterParams={setFilterParams}
            handleActions={handleActions}
            clickable={true}
          />
        </CCard>
      </div>

      {open && (
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={!!open?.name_device}
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
          <PaintCardModal
            open={!!open?.name_device}
            setOpen={setOpen}
            element={open}
          />
        </Modal>
      )}
    </>
  );
};
