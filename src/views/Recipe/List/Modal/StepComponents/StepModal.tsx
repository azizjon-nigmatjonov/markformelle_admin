import { useForm } from "react-hook-form";
import CNewMiniModal from "../../../../../components/CElements/CNewMiniModal";
import { SelectOptionsTable } from "../../../../../components/UI/Options/Table";
import { IStepForm } from "../../../../Labaratory/Chemicals/Modal/interfaces";
import { useGetBirimTypeList } from "../../../../../hooks/useFetchRequests/useBrimTypesList";
import CLabel from "../../../../../components/CElements/CLabel";
import { useTranslation } from "react-i18next";
import HFTextField from "../../../../../components/HFElements/HFTextField";
import { useEffect } from "react";

interface Props {
  defaultData: {
    index?: number;
    RECETEID?: string;
    RECETEASAMAID?: number;
  };
  setDefaultData: (val: {}) => void;
}

export const StepModal = ({
  defaultData,
  setDefaultData = () => {},
}: Props) => {
  if (!defaultData?.index && defaultData.index !== 0) return <></>;
  const { t } = useTranslation();
  const { control, handleSubmit, setValue, getValues } = useForm<IStepForm>({
    mode: "onSubmit",
  });

  const {
    birimTypeData,
    setFilterParams: setFilterParamsBirim,
    filterParams: filterParamsBirim,
  } = useGetBirimTypeList({});

  const onSubmit = (data: IStepForm) => {
    console.log(data);
  };

  useEffect(() => {
    setValue("RECETEID", defaultData.RECETEID || "");
  }, [defaultData]);

  return (
    <CNewMiniModal
      handleActions={() => setDefaultData({})}
      title="recipe_modal"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px] grid grid-cols-1 gap-y-2"
      >
        <HFTextField
          control={control}
          name="RECETEID"
          label="RECETEID"
          disabled
          defaultValue={defaultData?.RECETEID}
        />
        <SelectOptionsTable
          name="RECETEASAMAKODU"
          label="Recete asama kodu"
          placeholder="Recete asama kodu"
          options={[]}
          required={true}
          headColumns={[
            { id: "BARKOD", width: 200, title: "BARKOD" },
            { id: "ADI", title: "URUNADI", innerId: "URUNID" },
          ]}
          filterParams={{}}
          handleSelect={(_: {}) => {}}
          handleSearch={(_: string) => {
            {
            }
          }}
          control={control}
          setFilterParams={() => {}}
        />
        <SelectOptionsTable
          name="RECETEASAMASABLONKODU"
          label="Recete asama sablon kodu"
          placeholder="Recete asama sablon kodu"
          options={[]}
          required={true}
          headColumns={[
            { id: "BARKOD", width: 200, title: "BARKOD" },
            { id: "ADI", title: "URUNADI", innerId: "URUNID" },
          ]}
          filterParams={{}}
          handleSelect={(_: {}) => {}}
          handleSearch={(_: string) => {
            {
            }
          }}
          control={control}
          disabled={!defaultData?.RECETEASAMAID}
          setFilterParams={() => {}}
        />
        <SelectOptionsTable
          name="GRAFIKKODU"
          label="Grafi kodu"
          placeholder="Grafi kodu"
          options={[]}
          required={true}
          headColumns={[
            { id: "BARKOD", width: 200, title: "BARKOD" },
            { id: "ADI", title: "URUNADI", innerId: "URUNID" },
          ]}
          filterParams={{}}
          handleSelect={(_: {}) => {}}
          handleSearch={(_: string) => {
            {
            }
          }}
          control={control}
          disabled={!defaultData?.RECETEASAMAID}
          setFilterParams={() => {}}
        />
        <SelectOptionsTable
          name="ALTASAMAKODU"
          label="Alt asama kodu"
          placeholder="Alt asama kodu"
          options={[]}
          required={true}
          headColumns={[
            { id: "BARKOD", width: 200, title: "BARKOD" },
            { id: "ADI", title: "URUNADI", innerId: "URUNID" },
          ]}
          filterParams={{}}
          handleSelect={(_: {}) => {}}
          handleSearch={(_: string) => {
            {
            }
          }}
          control={control}
          setFilterParams={() => {}}
        />
        <SelectOptionsTable
          name="URUNKODU"
          label="Urun kodu"
          placeholder="Urun kodu"
          options={[]}
          required={true}
          headColumns={[
            { id: "BARKOD", width: 200, title: "BARKOD" },
            { id: "ADI", title: "URUNADI", innerId: "URUNID" },
          ]}
          filterParams={{}}
          handleSelect={(_: {}) => {}}
          handleSearch={(_: string) => {
            {
            }
          }}
          control={control}
          setFilterParams={() => {}}
        />
        <SelectOptionsTable
          name="BIRIMID"
          label="BIRIMID"
          placeholder="BIRIMID"
          options={birimTypeData?.data ?? []}
          required={true}
          headColumns={[
            { id: "BIRIMID", title: "Birim id" },
            { id: "BIRIMADI", title: "Adi" },
            { id: "CARPAN", title: "CARPAN" },
          ]}
          filterParams={filterParamsBirim}
          handleSelect={(_: any) => {}}
          defaultValue={0}
          readOnly={true}
          control={control}
          position="right"
          disabled={!!defaultData?.RECETEASAMAID}
          setFilterParams={setFilterParamsBirim}
        />
        <div>
          <CLabel title="NOTU" />
          <textarea
            className="p-3 h-[110px] transparent border border-[var(--border)] outline-none focus:border-[var(--primary)] resize-none rounded-[8px] w-full"
            rows={3}
            placeholder={t("NOTU")}
            defaultValue={getValues("NOTU")}
            onChange={(e: any) => setValue("NOTU", e.target.value)}
          ></textarea>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setDefaultData({})}
          >
            {t("cancel")}
          </button>
          <button type="submit" className="custom-btn">
            {t("create")}
          </button>
        </div>
      </form>
    </CNewMiniModal>
  );
};
