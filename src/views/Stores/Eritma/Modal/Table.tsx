import { useEffect, useState } from "react";
import CNewTable from "../../../../components/CElements/CNewTable";
import { FetchTable } from "./Logic";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { useForm } from "react-hook-form";
import CSelect from "../../../../components/CElements/CSelect";
import { CheckBox } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

export const TableUI = ({ defaultData = {} }: { defaultData: any }) => {
  const { control, setValue } = useForm({
    mode: "onSubmit",
  });
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 10 });
  const { birimler, isLoading } = FetchTable({
    filterParams,
    id: defaultData?.URUNID,
  });
  const [open, setOpen] = useState(false);
  const handleActions = (element: any, status: any) => {
    console.log("element", element, status);
    setOpen(true);
  };

  const headColumns = [
    { id: "URUNID", title: "URUNID" },
    { id: "BIRIMID", title: "BIRIMI" },
    { id: "CARPAN", title: "CARPAN" },
    { id: "", title: "Takip birim" },
    {
      title: "Receti birimi",
      id: "RECETEDEFAULTBIRIM",
      render: (val: any) => {
        return val ? "Evet" : "";
      },
    },
  ];

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
      if (event.key === "F8") {
        setOpen(!open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative pb-10">
      <CNewTable
        headColumns={headColumns}
        bodyColumns={birimler?.data ?? []}
        handleActions={handleActions}
        isLoading={isLoading}
        filterParams={filterParams}
        handleFilterParams={setFilterParams}
        disablePagination={true}
      />
      {open && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[99] bg-white rounded-[4px] shadow-2xl border border-[var(--border)] p-3">
          <div>
            <div className="flex justify-between border-b border-[var(--border)]">
              <h3 className="text-lg font-semibold">Urun fiyat girisi</h3>
              <button onClick={() => setOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="whitespace-nowrap flex space-x-3 pt-3">
              <div className="flex items-center space-x-2">
                <p>Alis fiyati</p>
                <HFTextField
                  name="name"
                  control={control}
                  setValue={setValue}
                  required={true}
                />
              </div>
              <div className="w-[140px]">
                <CSelect
                  options={[
                    { value: "usd", label: "USD" },
                    { value: "uzs", label: "UZS" },
                  ]}
                  value={"usd"}
                />
              </div>
              <div className="w-[140px]">
                <CSelect
                  options={[
                    { value: "usd", label: "USD" },
                    { value: "uzs", label: "UZS" },
                  ]}
                  value={"usd"}
                />
              </div>
            </div>
            <div className="whitespace-nowrap flex space-x-3 pt-3">
              <div className="flex items-center space-x-2">
                <p>Alis fiyati</p>
                <HFTextField
                  name="name"
                  control={control}
                  setValue={setValue}
                  required={true}
                />
              </div>
              <div className="w-[140px]">
                <CSelect
                  options={[
                    { value: "usd", label: "USD" },
                    { value: "uzs", label: "UZS" },
                  ]}
                  value={"usd"}
                />
              </div>
              <div className="w-[140px]">
                <CSelect
                  options={[
                    { value: "usd", label: "USD" },
                    { value: "uzs", label: "UZS" },
                  ]}
                  value={"usd"}
                />
              </div>
            </div>
            <div className="whitespace-nowrap flex space-x-3 pt-3">
              <div className="flex items-center space-x-2">
                <p>Alis fiyati</p>
                <HFTextField
                  name="name"
                  control={control}
                  setValue={setValue}
                  required={true}
                />
              </div>
              <div className="w-[140px]">
                <CSelect
                  options={[
                    { value: "usd", label: "USD" },
                    { value: "uzs", label: "UZS" },
                  ]}
                  value={"usd"}
                />
              </div>
              <div className="w-[140px]">
                <CSelect
                  options={[
                    { value: "usd", label: "USD" },
                    { value: "uzs", label: "UZS" },
                  ]}
                  value={"usd"}
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-5">
              <div className="flex space-x-8">
                <div className="flex space-x-2">
                  <CheckBox style={{ color: "green" }} />
                  <p>F8</p>
                </div>
                <div className="flex space-x-2">
                  <CloseIcon style={{ color: "var(--error)" }} />
                  <p>ESC</p>
                </div>
              </div>
              <div className="flex space-x-3">
                {" "}
                <div>
                  <button className="custom-btn">Сохранить</button>
                </div>
                <div>
                  <button className="cancel-btn" onClick={() => setOpen(false)}>
                    Отменить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
