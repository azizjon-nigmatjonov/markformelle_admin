import { useForm } from "react-hook-form";
import { IModalForm } from "../interfaces";
import HFInputMask from "../../../../components/HFElements/HFInputMask";
import { useTranslation } from "react-i18next";
import HFSelect from "../../../../components/HFElements/HFSelect";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import CCheckbox from "../../../../components/CElements/CCheckbox";

import CLabel from "../../../../components/CElements/CLabel";
import CNewTable from "../../../../components/CElements/CNewTable";
import { PlusIcon } from "../../../../components/UI/IconGenerator/Svg";

interface Props {
  onClose: () => void;
  filterParams: { page: number; perPage: number };
  handleActionsDetails: (val: any, val2: string) => void;
  setFilterParams: (val: any) => void;
  disabled: boolean;
  setOpen: (val: string) => void;
}

const DetailsList = [
  {
    SIRA: "SIOR",
    URUNADI: "SEZATOL GOLDEN YELLOW",
    MIKTAR: "0.044320",
    HASEPBIRIMI: "%",
    BIRIMFIYAT: "7.68",
    TURLAR: "0.002",
    ILKKAYDEDM: "Nodirbek Mamajonov",
    ILKTARIHI: "30.07.2024 16:28:49",
    DIGISIMKULLANUCI: "Nodirbek Mamajonov",
  },
];

export const TrailForm = ({
  onClose,
  handleActionsDetails,
  filterParams,
  setFilterParams,
  disabled,
  setOpen,
}: Props) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<IModalForm>({
    mode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    let params: any = data;
    console.log(params);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-[840px]">
      <div className="grid grid-cols-2 gap-x-3 gap-y-2">
        <HFInputMask
          control={control}
          name="ATISNO"
          label={t("ATISNO")}
          type="number"
          required={true}
          placeholder={t("ATISNO")}
        />
        <HFSelect
          control={control}
          name="MIGRASYUN"
          label={t("MIGRASYUN")}
          placeholder={t("MIGRASYUN")}
        />

        <HFTextField
          control={control}
          name="GIDISTARIHI"
          required={true}
          label={t("GIDISTARIHI")}
          placeholder={t("GIDISTARIHI")}
        />
        <SelectOptionsTable
          name="RECETEASAMA"
          label={t("RECETEASAMA")}
          placeholder={t("RECETEASAMA")}
          options={[]}
          required={true}
          headColumns={[
            { id: "FIRMAID", width: 200, title: "FIRMAID" },
            { id: "FIRMAADI", title: "FIRMAADI" },
            { id: "KISAADI", title: "KISAADI" },
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
        <HFTextField
          control={control}
          name="TARIHI"
          required={true}
          label={t("TARIHI")}
          placeholder={t("TARIHI")}
        />
        <HFInputMask
          control={control}
          name="BOYAMILYETU"
          label={t("BOYAMILYETU")}
          type="number"
          required={true}
          placeholder={t("BOYAMILYETU")}
        />
        <HFInputMask
          control={control}
          name="BOYAYUZDESI"
          label={t("BOYAYUZDESI")}
          type="number"
          required={true}
          placeholder={t("BOYAYUZDESI")}
        />
        <div>
          <CLabel title={t("Okey")} />
          <CCheckbox
            checked={false}
            handleCheck={(_: any) => {}}
            element={{
              label: "Okey",
            }}
          />
        </div>
      </div>

      <CNewTable
        title="Details"
        headColumns={[
          {
            title: "Sira",
            id: "SIRA",
          },

          {
            title: "Urun Adi",
            id: "URUNADI",
          },
          {
            title: "Miktar",
            id: "MIKTAR",
          },
          {
            title: "Hasep Birimi",
            id: "HASEPBIRIMI",
          },
          {
            title: "ILKKAYDEDM",
            id: "ILKKAYDEDM",
          },
          {
            title: "TARIH",
            id: "ILKTARIHI",
          },
          {
            title: "Birimi Fiyati",
            id: "BIRIMFIYAT",
          },
          {
            title: "Turlar",
            id: "TURLAR",
          },
        ]}
        defaultFilters={["actions"]}
        idForTable="table_modal_details"
        defaultActions={["delete", "edit"]}
        bodyColumns={DetailsList}
        handleActions={handleActionsDetails}
        isLoading={false}
        filterParams={filterParams}
        handleFilterParams={setFilterParams}
        disablePagination={true}
        autoHeight="240px"
        disabled={disabled}
        extra={
          <button
            onClick={() => {
              setOpen("detail");
            }}
            className="flex items-center"
          >
            <PlusIcon fill="var(--main)" />
          </button>
        }
      />

      <div className="flex space-x-2">
        <button onClick={() => onClose()} className="cancel-btn" type="button">
          {t("cancel")}
        </button>
        <button className="custom-btn" type="submit">
          {t("save")}
        </button>
      </div>
    </form>
  );
};
