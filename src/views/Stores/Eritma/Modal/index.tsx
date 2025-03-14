import { ReactNode, useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { FetchFunction } from "./Logic";
import { SearchModal } from "./SearchModal";
import CCheckbox from "../../../../components/CElements/CCheckbox";
import { TableUI } from "./Table";
import CSelect from "../../../../components/CElements/CSelect";

const CollapseUI = ({
  children,
  title,
  border = true,
  defaultOpen = true,
}: {
  children: ReactNode;
  title: string;
  defaultOpen?: boolean;
  border?: boolean;
}) => {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);
  return (
    <div className="pb-5">
      <div
        className="flex items-center space-x-2 mt-2 pb-1 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <h3 className="text-[14px] font-medium">{title}</h3>
        <button>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </button>
      </div>
      {border ? (
        <div className="bg-[var(--border)] h-[1px] w-full mb-3"></div>
      ) : (
        ""
      )}
      {open && children}
    </div>
  );
};

const FieldUI = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between space-x-3 whitespace-nowrap">
      <p className="text-sm">{title}</p>
      <hr className="w-full border-t-[3px] border-dotted border-[var(--border)]" />
      <div className="max-w-[30%] min-w-[30%]">{children}</div>
    </div>
  );
};
export const ModalUI = ({
  defaultData,
  setData,
  action,
}: {
  defaultData: any;
  action: string;
  setData: (val: any) => void;
}) => {
  const { urunType, depo } = FetchFunction();

  const { control, handleSubmit, setValue } = useForm({
    mode: "onSubmit",
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="pb-3  flex items-center space-x-2 border-b border-[var(--border)]">
        <p className="text-sm">Urun kodi</p>
        <SearchModal setData={setData} defaultData={defaultData} />
      </div>

      <CollapseUI title="Urun bilgileri">
        <div className="flex gap-x-10">
          <div className="space-y-3 w-full">
            <FieldUI title="Urun adi">
              <HFTextField
                name="ADI"
                control={control}
                setValue={setValue}
                required={true}
                defaultValue={defaultData?.ADI}
                disabled={action === "view"}
              />
            </FieldUI>
            <FieldUI title="Urun tipi">
              <CSelect
                options={urunType?.data?.map((item: any) => {
                  return {
                    label: item?.ADI,
                    value: item?.URUNTIPIID,
                  };
                })}
                disabled={action === "view"}
                value={defaultData?.URUNTIPIID}
              />
            </FieldUI>
            <FieldUI title="Boya tipi">
              <CSelect
                options={[]}
                value={defaultData?.URUNTIPIID}
                disabled={action === "view"}
              />
            </FieldUI>
            <FieldUI title="Mutfak depo">
              <CSelect
                options={depo?.data?.map((item: any) => {
                  return {
                    label: item?.ADI,
                    value: item?.DEPOID,
                  };
                })}
                value={defaultData?.MUTFAKDEPONO}
                disabled={action === "view"}
              />
            </FieldUI>
            <FieldUI title="Unite">
              <CSelect options={[]} disabled={action === "view"} />
            </FieldUI>
          </div>
          <div className="space-y-3 w-full">
            <FieldUI title="Barkod kodu">
              <HFTextField
                name="BARKOD"
                control={control}
                setValue={setValue}
                required={true}
                defaultValue={defaultData?.BARKOD}
                disabled={action === "view"}
              />
            </FieldUI>
            <FieldUI title="Pesin iskontosu">
              <HFTextField
                name="name"
                control={control}
                setValue={setValue}
                required={true}
                defaultValue={defaultData?.URUNID}
                disabled={action === "view"}
              />
            </FieldUI>
            <FieldUI title="Vadeli iskontosu">
              <HFTextField
                name="name"
                control={control}
                setValue={setValue}
                required={true}
                defaultValue={defaultData?.URUNID}
                disabled={action === "view"}
              />
            </FieldUI>
            <div className="grid grid-cols-3 gap-x-2">
              <CCheckbox element={{ label: "Kdv Orani" }} checked={true} />
              <CCheckbox element={{ label: "Kdv Orani" }} checked={true} />
              <CCheckbox element={{ label: "Kdv Orani" }} checked={true} />
            </div>
          </div>
        </div>
      </CollapseUI>
      <CollapseUI title="Birimler" defaultOpen={false}>
        <TableUI defaultData={defaultData} />
      </CollapseUI>
    </form>
  );
};
