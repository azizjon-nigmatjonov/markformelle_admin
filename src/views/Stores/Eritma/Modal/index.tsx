import { ReactNode, useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { FetchFunction } from "./Logic";
import { CSelectList } from "../../../../components/CElements/CSelect/List";
import { SearchModal } from "./SearchModal";
import CCheckbox from "../../../../components/CElements/CCheckbox";
import { TableUI } from "./Table";

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
      <div className={`flex items-center justify-between mt-2 pb-1`}>
        <h3 className="text-sm font-semibold">{title}</h3>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="cursor-pointer w-[140px] flex justify-end"
        >
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
  const { urunType, depo } = FetchFunction();

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

      <CollapseUI title="Urun bilgileri">
        <div className="flex gap-x-10">
          <div className="space-y-3 w-full">
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
                options={urunType?.data}
                handleSelect={handleSelect}
                customId="URUNTIPIID"
                headColumns={[
                  { title: "Adi", id: "ADI" },
                  { title: "URUNTIPIID", id: "URUNTIPIID" },
                ]}
                customLabel={"ADI"}
                defaultValue={defaultData?.URUNTIPIID}
              />
            </FieldUI>
            <FieldUI title="Boya tipi">
              <CSelectList
                headColumns={[]}
                options={[]}
                handleSelect={handleSelect}
                customId="boyaid"
              />
            </FieldUI>
            <FieldUI title="Mutfak depo">
              <CSelectList
                headColumns={[{ title: "Название", id: "ADI" }]}
                options={depo?.data}
                handleSelect={handleSelect}
                customId="DEPOID"
                customLabel={"ADI"}
                defaultValue={defaultData?.MUTFAKDEPOID}
              />
            </FieldUI>
            <FieldUI title="Unite">
              <CSelectList
                headColumns={[]}
                options={[]}
                handleSelect={handleSelect}
                customId="UNITEID"
              />
            </FieldUI>
          </div>
          <div className="space-y-3 w-full">
            <FieldUI title="Barkod kodu">
              <HFTextField
                name="barkod"
                control={control}
                setValue={setValue}
                required={true}
                defaultValue={defaultData?.BARKOD}
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
            <div className="grid grid-cols-3 gap-x-2">
              <CCheckbox element={{ label: "Kdv Orani" }} checked={true} />
              <CCheckbox element={{ label: "Kdv Orani" }} checked={true} />
              <CCheckbox element={{ label: "Kdv Orani" }} checked={true} />
            </div>
          </div>
        </div>
      </CollapseUI>
      <CollapseUI title="Birimler" defaultOpen={false}>
        <TableUI />
      </CollapseUI>
    </form>
  );
};
