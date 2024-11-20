import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button, IconButton } from "@mui/material";
import { ExcelIconOutlined } from "../../components/UI/IconGenerator/Svg/Machines";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Closer } from "../../components/UI/Closer";

interface Props {
  data: any;
  title?: string;
  allColumns: any;
}

const ExcelDownload = ({
  data = [],
  title = "example",
  allColumns = [],
}: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const downloadExcel = (type: string) => {
    let arr = data;
    if (type === "all") {
      arr = allColumns;
    }
    const newData: any = [];
    arr.forEach((obj: any) => {
      const keys = Object.keys(obj);
      const newObj: any = {};
      for (let key of keys) {
        newObj[t(key)] = obj[key];
      }
      newData.push(newObj);
    });

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
      <IconButton onClick={() => setOpen(true)}>
        <div className="border border-[var(--border)] h-[30px] w-[30px] rounded-[8px] flex items-center justify-center">
          <ExcelIconOutlined />
        </div>
      </IconButton>
      {open && (
        <div className="absolute right-4 top-[33px] bg-white border border-[var(--gray20)] card-shadow rounded-[12px] z-[92] min-w-[150px] whitespace-nowrap px-2 py-2">
          <ul>
            <li>
              <Button onClick={() => downloadExcel("selected")}>
                <p className="text-[var(--black)]">Скачать выбранное</p>
              </Button>
            </li>
            <li>
              <Button onClick={() => downloadExcel("all")}>
                <p className="text-[var(--black)]">Скачать все</p>
              </Button>
            </li>
          </ul>
        </div>
      )}
      {open && <Closer handleClose={() => setOpen(false)} />}
    </div>
  );
};

export default ExcelDownload;
