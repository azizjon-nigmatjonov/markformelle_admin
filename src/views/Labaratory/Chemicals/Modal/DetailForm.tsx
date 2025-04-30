import { useForm } from "react-hook-form";
import HFInputMask from "../../../../components/HFElements/HFInputMask";
import { useTranslation } from "react-i18next";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { useGetDovizList } from "../../../../hooks/useFetchRequests/useDovizList";
import { IMaterialForm } from "./interface";
import { useGetUrunList } from "../../../../hooks/useFetchRequests/useUrunList";
import CLabel from "../../../../components/CElements/CLabel";

interface Props {
  onClose: () => void;
}

export const DetailForm = ({ onClose }: Props) => {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue, getValues } = useForm<IMaterialForm>(
    {
      mode: "onSubmit",
    }
  );
  const { dovizData } = useGetDovizList({});
  const { urunData } = useGetUrunList({});

  const onSubmit = (data: any) => {
    let params: any = data;
    console.log(params);
  };

  return (
    <div onSubmit={handleSubmit(onSubmit)}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-[480px]">
        <div className="grid grid-cols-1 gap-x-3 gap-y-2">
          <SelectOptionsTable
            name="URUNKODU"
            label={t("URUNKODU")}
            placeholder={t("URUNKODU")}
            options={urunData.data}
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

          <HFInputMask
            control={control}
            name="URUNADI"
            label={t("URUNADI")}
            type="number"
            required={true}
            placeholder={t("URUNADI")}
          />

          <HFInputMask
            control={control}
            name="MIKTAR"
            label="Miktar"
            type="number"
            required={true}
            placeholder="Miktar"
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

        <div>
          <CLabel title={t("NOTU")} />
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
