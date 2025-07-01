import { CircularProgress, IconButton } from "@mui/material";
import { memo, useState } from "react";
import * as XLSX from "xlsx";
import { UploadOutlinedIcon } from "../../components/UI/IconGenerator/Svg/Machines";

const ExcelReader = ({
  setExcelData = () => {},
  disabled = false,
  innerTable = false,
}: {
  disabled?: boolean;
  setExcelData: (val: any) => void;
  innerTable?: boolean;
}) => {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e: any) => {
    setLoading(true);
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData: any = XLSX.utils.sheet_to_json(worksheet);

        setExcelData(jsonData);
      };

      reader.readAsBinaryString(file);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="relative">
      <IconButton
        disabled={disabled}
        onClick={() => document?.getElementById("fileInput")?.click()}
        className="h-[30px] w-[30px] rounded-[8px] flex items-center justify-center"
      >
        {loading ? (
          <CircularProgress size={14} />
        ) : (
          <UploadOutlinedIcon
            fill={disabled ? "var(--gray)" : "var(--main)"}
            width={innerTable ? 18 : 24}
          />
        )}
      </IconButton>

      <input
        type="file"
        id="fileInput"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default memo(ExcelReader);
