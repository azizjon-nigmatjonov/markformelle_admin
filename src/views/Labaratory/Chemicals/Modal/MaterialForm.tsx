import { useForm } from "react-hook-form";
import HFInputMask from "../../../../components/HFElements/HFInputMask";
import { useTranslation } from "react-i18next";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { HFDatePicker } from "../../../../components/HFElements/HFDatePicker";
import { useGetDovizList } from "../../../../hooks/useFetchRequests/useDovizList";
import { IMaterialForm } from "./interface";

interface Props {
  onClose: () => void;
}

export const MaterialForm = ({ onClose }: Props) => {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue } = useForm<IMaterialForm>({
    mode: "onSubmit",
  });
  const { dovizData } = useGetDovizList({});

  const onSubmit = (data: any) => {
    let params: any = data;
    console.log(params);
  };

  return (
    <div onSubmit={handleSubmit(onSubmit)}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-[400px]">
        <div className="grid grid-cols-1 gap-x-3">
          <div className="space-y-2">
            <HFInputMask
              control={control}
              name="TELEPNO"
              label={t("TELEPNO")}
              type="number"
              required={true}
              placeholder={t("TELEPNO")}
            />

            <SelectOptionsTable
              name="HOMESTOK"
              label={t("HOMESTOK")}
              placeholder={t("HOMESTOK")}
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

            <HFDatePicker
              control={control}
              name="CALISMATARIHI"
              label="CALISMATARIHI"
              placeholder="CALISMATARIHI"
              format="DD.MM.YYYY"
            />

            <HFDatePicker
              control={control}
              name="TEMINTARIHI"
              label="TEMINTARIHI"
              placeholder="TEMINTARIHI"
              format="DD.MM.YYYY"
            />
          </div>

          <div className="space-y-2">
            <SelectOptionsTable
              name="USTASAMA"
              label={t("USTASAMA")}
              placeholder={t("USTASAMA")}
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
            <HFInputMask
              control={control}
              name="BIRIMFIYAT"
              label={t("BIRIMFIYAT")}
              type="number"
              placeholder={t("BIRIMFIYAT")}
            />

            <SelectOptionsTable
              name="DOVIZID"
              label={t("DOVIZID")}
              placeholder={t("DOVIZID")}
              options={dovizData?.data}
              required={true}
              headColumns={[
                { id: "DOVIZID", title: "DOVIZID" },
                { id: "CINSI", title: "CINSI" },
              ]}
              filterParams={{}}
              handleSelect={(obj: { DOVIZID: string }) => {
                setValue("DOVIZID", obj.DOVIZID);
              }}
              handleSearch={(_: string) => {}}
              control={control}
              setFilterParams={() => {}}
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onClose()}
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
  );
};
