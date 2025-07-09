import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { IconButton, Tooltip } from "@mui/material";
import { ExcelIconOutlined } from "../../components/UI/IconGenerator/Svg/Machines";
import { useState } from "react";
import { Closer } from "../../components/UI/Closer";
import { useTranslationHook } from "../useTranslation";

interface Props {
  data: any;
  title?: string;
  allColumns: any;
  disabled?: boolean;
  defaultExcelFields?: string[];
  type?: string;
  label?: any;
  innerTable?: boolean;
}

const ExcelDownload = ({
  data = [],
  title = "example",
  allColumns = [],
  disabled = false,
  type = "",
  label = "",
  defaultExcelFields = [],
  innerTable = false,
}: Props) => {
  const { t } = useTranslationHook();
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
    const newData: any = [];
    if (type === "directly") {
      newData.push(...arr);
    } else {
      arr.forEach((obj: any) => {
        const keys = Object.keys(obj);
        const newObj: any = {};
        for (let key of keys) {
          if (
            key !== "is_freez" &&
            key !== "is_view" &&
            key !== "is_edit" &&
            key !== "is_delete" &&
            key !== "is_sellect" &&
            key !== "is_sellect_more" &&
            key !== "index"
          ) {
            newObj[t(key)] = obj[key] || "";
          }
        }
        newData.push(newObj);
      });
    }

    const worksheet = XLSX.utils.json_to_sheet(newData);

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
      <Tooltip title="Загрузить данные в Excel" placement="bottom">
        <span>
          <IconButton
            onClick={() => {
              if (type === "directly") {
                downloadExcel("selected");
              } else setOpen(true);
            }}
            disabled={disabled}
          >
            <div className="h-[30px] w-[30px] rounded-[8px] flex items-center justify-center">
              <ExcelIconOutlined
                fill={disabled ? "var(--gray)" : "var(--main)"}
                width={innerTable ? 18 : 24}
              />
            </div>
            <div className="whitespace-nowrap ml-1 text-[var(--black)]">
              <span>{label}</span>
            </div>
          </IconButton>
        </span>
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

export default ExcelDownload;
