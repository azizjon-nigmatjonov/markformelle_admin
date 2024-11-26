import { useEffect, useState } from "react";
import CTable from "../../../components/CElements/CTable";
import CCard from "../../../components/CElements/CCard";
import { Modal } from "@mui/joy";
import { PaintCardModal } from "./Modal";
interface Props {
  list: any;
}

export const PaintTable = ({ list = [] }: Props) => {
  const [open, setOpen]: any = useState({});
  const [headColumns, setHeadColumns]: any = useState([]);
  const [filterParams, setFilterParams] = useState({
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
        render: (status: string) => {
          return (
            <div
              className={`h-full w-full green rounded-[8px] whitespace-nowrap px-2 ${
                status !== "stopped" ? "green" : "red"
              }`}
            >
              <p>{status === "stopped" ? "Не работает" : "Работает"}</p>
            </div>
          );
        },
      },
    ];
    setHeadColumns(arr);
  }, []);

  useEffect(() => {
    if (!list?.length) return;

    setBodyColumns(list);
  }, [list]);

  useEffect(() => {
    if (!bodyColumns?.length) return;

    const obj: any = bodyColumns?.find((item: any) => item?.nres?.length) ?? {};
    delete obj.nres;
    delete obj.machine;
    const keys = Object.keys(obj);
    const newColumns: any = [...headColumns];
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
          <CTable
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
