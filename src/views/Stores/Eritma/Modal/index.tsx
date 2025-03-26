import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { FetchFunction } from "./Logic";
import { SearchModal } from "./SearchModal";
import CCheckbox from "../../../../components/CElements/CCheckbox";
import { TableUI } from "./Table";
import { CollapseUI } from "../../../../components/CElements/CCollapse";
import HFSelect from "../../../../components/HFElements/HFSelect";

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
}: {
  defaultData: any;
  action: string;
  setData: (val: any) => void;
}) => {
  const { urunType, depo, boyaTypes, uniteOptions } = FetchFunction();

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
                // disabled={action === "view"}
              />
            </FieldUI>
            <FieldUI title="Urun tipi">
              <HFSelect
                options={urunType?.data?.map((item: any) => {
                  return {
                    label: item?.ADI,
                    value: item?.URUNTIPIID,
                  };
                })}
                control={control}
                name="URUNTIPIID"
                defaultValue={defaultData?.URUNTIPIID}
              />
            </FieldUI>
            <FieldUI title="Boya tipi">
              <HFSelect
                name="BOYATIPIID"
                control={control}
                options={boyaTypes}
                defaultValue={defaultData?.BOYATIPIID}
              />
            </FieldUI>
            <FieldUI title="Mutfak depo">
              <HFSelect
                options={depo?.data?.map((item: any) => {
                  return {
                    label: item?.ADI,
                    value: item?.DEPOID,
                  };
                })}
                control={control}
                name="DEPOID"
                defaultValue={defaultData?.MUTFAKDEPONO}
                // disabled={action === "view"}
              />
            </FieldUI>
            <FieldUI title="Unite">
              <HFSelect
                name="UNITEID"
                control={control}
                options={uniteOptions}
                defaultValue={defaultData?.UNITEID}
              />
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
                // disabled={action === "view"}
              />
            </FieldUI>
            <FieldUI title="Pesin iskontosu">
              <HFTextField
                name="name"
                control={control}
                setValue={setValue}
                required={true}
                defaultValue={defaultData?.URUNID}
                // disabled={action === "view"}
              />
            </FieldUI>
            <FieldUI title="Vadeli iskontosu">
              <HFTextField
                name="name"
                control={control}
                setValue={setValue}
                required={true}
                defaultValue={defaultData?.URUNID}
                // disabled={action === "view"}
              />
            </FieldUI>
            <div className="grid grid-cols-3 gap-x-2">
              <CCheckbox element={{ label: "Kdv Orani" }} checked={true} />
              <CCheckbox element={{ label: "Kdv Orani" }} checked={true} />
              <CCheckbox element={{ label: "Kdv Orani" }} checked={true} />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div>
            <button className="custom-btn" type="submit">
              Сохранить
            </button>
          </div>
        </div>
      </CollapseUI>
      <CollapseUI title="Birimler" defaultOpen={false}>
        <TableUI defaultData={defaultData} />
      </CollapseUI>
    </form>
  );
};
