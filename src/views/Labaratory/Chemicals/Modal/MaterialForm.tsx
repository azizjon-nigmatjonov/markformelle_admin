import { useForm } from "react-hook-form";
import { IModalForm } from "../interfaces";
import HFInputMask from "../../../../components/HFElements/HFInputMask";
import { useTranslation } from "react-i18next";
import HFSelect from "../../../../components/HFElements/HFSelect";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import CCheckbox from "../../../../components/CElements/CCheckbox";

import CLabel from "../../../../components/CElements/CLabel";
import { CAnchorPopup } from "../../../../components/CElements/CAnchorPopup";

interface Props {
  anchor: null | HTMLElement;
  setAnchor: (val: HTMLElement | null) => void;
}

export const MaterialForm = ({ anchor, setAnchor }: Props) => {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue, getValues, reset, watch } =
    useForm<IModalForm>({
      mode: "onSubmit",
    });

  const onSubmit = (data: any) => {
    let params: any = data;
    console.log(params);
  };

  return (
    <CAnchorPopup anchor={anchor} setAnchor={setAnchor}>
      <div
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#fff] rounded-[12px] border border-[var(--border)] shadow-2xl z-[99] relative p-3"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-3 space-y-5">
          <div className="grid grid-cols-2 gap-3">
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

          <div className="flex space-x-2">
            <button
              onClick={() => setAnchor(null)}
              className="cancel-btn"
              type="button"
            >
              {t("cancel")}
            </button>
            <button className="custom-btn" type="submit">
              {t("save")}
            </button>
          </div>
        </form>
      </div>
    </CAnchorPopup>
  );
};
