import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { FetchFunction } from "./Logic";
import { SearchModal } from "./SearchModal";
import CCheckbox from "../../../../components/CElements/CCheckbox";
import { TableUI } from "./Table";
import { CollapseUI } from "../../../../components/CElements/CCollapse";
import HFSelect from "../../../../components/HFElements/HFSelect";
import { ModalTypes } from "../interfaces";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { ModalLogic } from "../Logic";
import { useGetUniteList } from "../../../../hooks/useFetchRequests/useUniteList";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { useGetUrunList } from "../../../../hooks/useFetchRequests/useUrunList";

interface ModalUIProps {
  defaultData?: ModalTypes;
  URUNRECETEDETAYID?: number;
  URUNRECETEURUNID?: string;
  URUNADI?: string;
}

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

export const ModalUI = ({ defaultData = {} }: ModalUIProps) => {
  const { t } = useTranslationHook();
  const [open, setOpen] = useState(false);
  const [formId, setFormId] = useState<string>("");
  const [modalInitialData, setModalInitialData] = useState<ModalUIProps>({});

  const { urunType, depo, boyaTypes, uniteOptions } = FetchFunction();

  const {
    setFilterParams: setUrunFilterParams,
    filterParams: urunFilterParams,
    urunData,
  } = useGetUrunList({});
  const {
    filterParams: uniteFilerParams,
    setFilterParams: setUniteFilterParams,
    uniteData,
  } = useGetUniteList();

  const { formData } = ModalLogic({
    urunId: defaultData?.URUNID || formId,
  });

  console.log("formData", formData);

  const { control, handleSubmit, setValue } = useForm({
    mode: "onSubmit",
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    if (formData) {
      setValue("URUNID", formData.URUNID);
      setValue("UNITEID", formData.UNITEID);
      setValue("UNITEADI", formData.UNITEADI);
    }
  }, [formData]);
  useEffect(() => {
    if (defaultData?.URUNID) {
      setFormId(defaultData.URUNID);
    }
  }, [defaultData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="pb-3 inline-block">
        <InputFieldUI title={t("URUNID")}>
          <SelectOptionsTable
            name="URUNID"
            placeholder={t("UNITEID")}
            options={urunData?.data}
            required={true}
            headColumns={[
              { id: "URUNID", title: "URUNID" },
              { id: "ADI", title: "ADI" },
            ]}
            filterParams={urunFilterParams}
            handleSelect={(obj: any) => {
              setValue("URUNID", obj.URUNID);
            }}
            handleSearch={(val: string) => {
              setUrunFilterParams({ ...urunFilterParams, q: val });
            }}
            control={control}
            setFilterParams={setUrunFilterParams}
            disabled={!!formId}
          />
        </InputFieldUI>
      </div>

      <CollapseUI title="Urun bilgileri">
        <div className="flex gap-x-10">
          <div className="space-y-3 w-full">
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
              />
            </FieldUI>
            <FieldUI title="Boya tipi">
              <HFSelect
                name="BOYATIPIID"
                control={control}
                options={boyaTypes}
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

                // disabled={action === "view"}
              />
            </FieldUI>
            <FieldUI title="Unite">
              <HFSelect
                name="UNITEID"
                control={control}
                options={uniteOptions}
              />
            </FieldUI>
            <InputFieldUI title={t("UNITEID")}>
              <SelectOptionsTable
                name="UNITEADI"
                placeholder={t("UNITEID")}
                options={uniteData?.data}
                required={true}
                headColumns={[
                  { id: "ADI", title: "ADI" },
                  { id: "UNITEID", title: "UNITEID" },
                ]}
                filterParams={uniteFilerParams}
                handleSelect={(obj: any) => {
                  setValue("UNITEID", obj.UNITEID);
                  setValue("UNITEADI", obj.ADI);
                }}
                handleSearch={(val: string) => {
                  setUniteFilterParams({ ...uniteFilerParams, q: val });
                }}
                control={control}
                setFilterParams={setUniteFilterParams}
                disabled={!!formId}
              />
            </InputFieldUI>
          </div>
          <div className="space-y-3 w-full">
            <FieldUI title="Barkod kodu">
              <HFTextField
                name="BARKOD"
                control={control}
                setValue={setValue}
                required={true}

                // disabled={action === "view"}
              />
            </FieldUI>
            <FieldUI title="Pesin iskontosu">
              <HFTextField
                name="name"
                control={control}
                setValue={setValue}
                required={true}

                // disabled={action === "view"}
              />
            </FieldUI>
            <FieldUI title="Vadeli iskontosu">
              <HFTextField
                name="name"
                control={control}
                setValue={setValue}
                required={true}

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
      <CollapseUI title="Birimler" defaultOpen={true}>
        <TableUI defaultData={defaultData} />
      </CollapseUI>
    </form>
  );
};
