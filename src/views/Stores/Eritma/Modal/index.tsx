import { ReactNode, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CSelect from "../../../../components/CElements/CSelect";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { FetchFunction } from "./Logic";
import { CSelectList } from "../../../../components/CElements/CSelect/List";
import { SearchModal } from "./SearchModal";

const CollapseUI = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="pb-5">
      <div className="flex items-center justify-between mt-2 mb-3 pb-1 border-b border-[var(--gray)]">
        <h3 className="text-base font-medium">{title}</h3>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="cursor-pointer w-[140px] flex justify-end"
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </button>
      </div>
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
    <div className="flex items-center space-x-2 whitespace-nowrap">
      <p className="text-sm w-[20%]">{title}</p>
      <hr className="w-[50%] border-t-[3px] border-dotted border-[var(--border)]" />
      <div className="w-[50%]">{children}</div>
    </div>
  );
};
export const ModalUI = ({
  defaultData,
  setData,
}: {
  defaultData: any;
  setData: (val: any) => void;
}) => {
  const { urunType } = FetchFunction();

  const { control, handleSubmit, setValue } = useForm({
    mode: "onSubmit",
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleSelect = (element: any) => {
    console.log("elementelement", element);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="pb-3  flex items-center space-x-2">
        <p className="text-sm">Urun kodi</p>
        <SearchModal setData={setData} />
      </div>
      <CollapseUI title="Bo'lim 1">
        <div className="grid grid-cols-2 gap-x-10">
          <div className="grid gap-y-2">
            <FieldUI title="Uru adi">
              <HFTextField
                name="name"
                control={control}
                setValue={setValue}
                required={true}
                defaultValue={defaultData?.ADI}
              />
            </FieldUI>
            <FieldUI title="Urun tipi">
              <CSelectList
                options={urunType?.data?.map((item: any) => {
                  return {
                    label: item.ADI,
                    value: item?.URUNTIPIID,
                  };
                })}
                handleSelect={handleSelect}
                customId="URUNTIPIID"
                customLabel="ADI"
                defaultValue={defaultData?.URUNTIPIID}
              />
            </FieldUI>
            <FieldUI title="Boya tipi">
              <CSelectList
                options={urunType?.data?.map((item: any) => {
                  return {
                    label: item.ADI,
                    value: item?.URUNTIPIID,
                  };
                })}
                handleSelect={handleSelect}
                customId="boyaid"
                customLabel="ADI"
                defaultValue={defaultData?.URUNTIPIID}
              />
            </FieldUI>
            <FieldUI title="Mutfak depo">
              <CSelect options={[{ label: "Boya", value: "urun tipi" }]} />
            </FieldUI>
            <FieldUI title="Boyahane">
              <CSelect options={[{ label: "Boya", value: "urun tipi" }]} />
            </FieldUI>
          </div>
          <div className="grid gap-y-2">
            <FieldUI title="Kdv Orani">
              <HFTextField
                name="name"
                control={control}
                setValue={setValue}
                required={true}
                defaultValue={defaultData?.URUNID}
              />
            </FieldUI>
            <FieldUI title="Pesin iskontosu">
              <HFTextField
                name="name"
                control={control}
                setValue={setValue}
                required={true}
                defaultValue={defaultData?.URUNID}
              />
            </FieldUI>
            <FieldUI title="Vadeli iskontosu">
              <HFTextField
                name="name"
                control={control}
                setValue={setValue}
                required={true}
                defaultValue={defaultData?.URUNID}
              />
            </FieldUI>
          </div>
        </div>
      </CollapseUI>
    </form>
  );
};
