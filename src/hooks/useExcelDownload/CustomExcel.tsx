import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ExcelIconOutlined } from "../../components/UI/IconGenerator/Svg/Machines";
import { useState } from "react";
import { Closer } from "../../components/UI/Closer";
import { Tooltip } from "@mui/material";

interface Props {
  data: any;
  title?: string;
  allColumns: any;
  disabled?: boolean;
  defaultExcelFields?: string[];
}

const useCustomExcelDownload = ({
  data = [],
  title = "example",
  allColumns = [],
  disabled = false,
  defaultExcelFields = [],
}: Props) => {
  const [open, setOpen] = useState(false);

  const downloadExcel = (status: string) => {
    let arr = [...data];
    if (defaultExcelFields.length) {
      arr = allColumns.map((item: any) => {
        const newObj: any = {};
        defaultExcelFields.forEach((def: string) => {
          newObj[def] = item[def] || "";
        });
        return newObj;
      });
    } else if (status === "all") {
      arr = allColumns;
    }

    const worksheet = XLSX.utils.json_to_sheet(arr);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, `${title}.xlsx`);
    setOpen(false);
  };
  return (
    <div className="relative">
      <Tooltip
        title="Скачать Excel"
        arrow
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 15],
                },
              },
            ],
          },
        }}
      >
        <button className="custom-btn">
          <div className="h-[30px] w-[30px] rounded-[8px] flex items-center justify-center">
            <ExcelIconOutlined
              fill={disabled ? "var(--gray)" : "var(--main)"}
            />
          </div>
        </button>
      </Tooltip>

      {open && (
        <div className="absolute right-0 top-[33px] bg-white shadow-2xl border border-[var(--gray30)] rounded-[8px] z-[92] min-w-[150px] whitespace-nowrap text-left">
          <ul>
            <li className="p-2 hover:bg-[var(--border)]">
              <button
                onClick={() => downloadExcel("selected")}
                className="w-full"
              >
                <p className="text-[var(--black)] text-left">Скачать таблицу</p>
              </button>
            </li>
            <li className="p-2 hover:bg-[var(--border)]">
              <button onClick={() => downloadExcel("all")} className="w-full">
                <p className="text-[var(--black)] text-left">
                  Скачать все данные
                </p>
              </button>
            </li>
          </ul>
        </div>
      )}
      {open && <Closer handleClose={() => setOpen(false)} />}
    </div>
  );
};

export default useCustomExcelDownload;
