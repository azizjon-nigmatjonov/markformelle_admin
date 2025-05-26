import HFTextField from "../../../../../components/HFElements/HFTextField";
import { InputFieldUI } from "../../../../../components/UI/FieldUI";
import { SelectOptionsTable } from "../../../../../components/UI/Options/Table";
import HFSelect from "../../../../../components/HFElements/HFSelect";
import { useTranslationHook } from "../../../../../hooks/useTranslation";
import { useGetDovizList } from "../../../../../hooks/useFetchRequests/useDovizList";

interface InputFieldsProps {
  control: any;
  setValue: (name: any, value: any) => void;
  disabled: boolean;
  filterParams: any;
  urunTypeData: any;
  urunTypeFilterParams: any;
  firmaData: any;
  filterParamsFirm: any;
  setFilterParamsFirm: (val: any) => void;
  setFilterParams: (params: any) => void;
  setUrunTypeFilterParams: (params: any) => void;
}

export const InputFields = ({
  control,
  filterParams,
  setFilterParams,
  setValue,
  disabled,
  urunTypeData,
  urunTypeFilterParams,
  setFilterParamsFirm,
  firmaData,
  filterParamsFirm,
  setUrunTypeFilterParams,
}: InputFieldsProps) => {
  const { t } = useTranslationHook();
  const { dovizData } = useGetDovizList({});
  console.log("dovizData", dovizData);

  return (
    <div className="w-full grid grid-cols-3 gap-y-3 gap-x-5">
      <div className="space-y-2">
        <InputFieldUI title={t("LABRECETEADI")}>
          <HFTextField
            name="LABRECETEADI"
            control={control}
            setValue={setValue}
            placeholder={t("LABRECETEADI")}
            disabled={disabled}
          />
        </InputFieldUI>
        <InputFieldUI title={t("TALEPTARIHI")}>
          <HFTextField
            name="TALEPTARIHI"
            control={control}
            setValue={setValue}
            placeholder={t("TALEPTARIHI")}
            disabled={disabled}
          />
        </InputFieldUI>
        <InputFieldUI title={t("HAMSTOK")}>
          <HFTextField
            name="HAMSTOK"
            control={control}
            setValue={setValue}
            placeholder={t("HAMSTOK")}
            disabled={disabled}
          />
        </InputFieldUI>
        <InputFieldUI title={t("FIRMARENKKODU")}>
          <HFTextField
            name="FIRMARENKKODU"
            control={control}
            setValue={setValue}
            placeholder={t("FIRMARENKKODU")}
            disabled={disabled}
          />
        </InputFieldUI>
        <InputFieldUI title={t("ASKLAMA")}>
          <HFSelect
            name="ASKLAMA"
            control={control}
            setValue={setValue}
            placeholder={t("ASKLAMA")}
            disabled={disabled}
          />
        </InputFieldUI>
        <InputFieldUI title={t("ESKIRECETEKODU")}>
          <HFSelect
            name="ESKIRECETEKODU"
            control={control}
            setValue={setValue}
            placeholder={t("ESKIRECETEKODU")}
            disabled={disabled}
          />
        </InputFieldUI>
        <InputFieldUI title={t("REMKDERINGLIGI")}>
          <HFSelect
            name="REMKDERINGLIGI"
            control={control}
            setValue={setValue}
            placeholder={t("REMKDERINGLIGI")}
            disabled={disabled}
          />
        </InputFieldUI>
      </div>
      <div className="space-y-2">
        <InputFieldUI title={t("FIRMAKODU")}>
          <HFSelect
            name="FIRMAKODU"
            control={control}
            setValue={setValue}
            placeholder={t("FIRMAKODU")}
            disabled={disabled}
          />
        </InputFieldUI>
        <InputFieldUI title={t("RENKGRUP")}>
          <HFSelect
            name="RENKGRUP"
            control={control}
            setValue={setValue}
            placeholder={t("RENKGRUP")}
            disabled={disabled}
          />
        </InputFieldUI>
        <InputFieldUI title={t("DOVIZID")}>
          <HFSelect
            name="DOVIZID"
            control={control}
            setValue={setValue}
            placeholder={t("DOVIZID")}
            disabled={disabled}
            options={[]}
          />
        </InputFieldUI>
        <InputFieldUI title={t("RECETETURAADI")}>
          <HFSelect
            name="RECETETURAADI"
            control={control}
            setValue={setValue}
            placeholder={t("RECETETURAADI")}
            disabled={disabled}
          />
        </InputFieldUI>

        <InputFieldUI title={t("ESKILABRECETEKODU")}>
          <HFTextField
            name="ESKILABRECETEKODU"
            control={control}
            setValue={setValue}
            placeholder={t("ESKILABRECETEKODU")}
            disabled={disabled}
          />
        </InputFieldUI>

        <InputFieldUI title={t("KALITENO")}>
          <HFSelect
            name="KALITENO"
            control={control}
            setValue={setValue}
            placeholder={t("KALITENO")}
            disabled={disabled}
          />
        </InputFieldUI>
      </div>
      <div className="space-y-2">
        <InputFieldUI title={t("USTASAMA")}>
          <SelectOptionsTable
            name="USTASAMA"
            placeholder={t("USTASAMA")}
            options={firmaData}
            required={true}
            headColumns={[
              { id: "FIRMAID", width: 200, title: "FIRMAID" },
              { id: "FIRMAADI", title: "FIRMAADI" },
              { id: "KISAADI", title: "KISAADI" },
            ]}
            filterParams={filterParams}
            handleSelect={(_: {}) => {}}
            handleSearch={(val: string) => {
              setFilterParamsFirm({ ...filterParamsFirm, q: val });
            }}
            control={control}
            setFilterParams={setFilterParams}
            disabled={disabled}
          />
        </InputFieldUI>
        <InputFieldUI title={t("PANTONEKODU")}>
          <HFSelect
            name="PANTONEKODU"
            control={control}
            setValue={setValue}
            placeholder={t("PANTONEKODU")}
            disabled={disabled}
            options={[]}
          />
        </InputFieldUI>
        <InputFieldUI title={t("FIRMAID")}>
          <SelectOptionsTable
            name="FIRMAID"
            placeholder={t("FIRMAID")}
            options={firmaData}
            required={true}
            headColumns={[
              { id: "FIRMAID", width: 200, title: "FIRMAID" },
              { id: "FIRMAADI", title: "FIRMAADI" },
              { id: "KISAADI", title: "KISAADI" },
            ]}
            filterParams={filterParams}
            handleSelect={(_: {}) => {}}
            handleSearch={(val: string) => {
              setFilterParamsFirm({ ...filterParamsFirm, q: val });
            }}
            control={control}
            setFilterParams={setFilterParams}
            disabled={disabled}
          />
        </InputFieldUI>
        <InputFieldUI title={t("URUNTIPIADI")}>
          <SelectOptionsTable
            name="URUNTIPIADI"
            placeholder={t("URUNTIPIID")}
            options={urunTypeData?.data}
            required={true}
            headColumns={[{ id: "ADI", title: "ADI", width: 200 }]}
            filterParams={urunTypeFilterParams}
            handleSelect={(obj: any) => {
              setValue("URUNTIPIID", obj.URUNTIPIID);
              setValue("URUNTIPIADI", obj.ADI);
            }}
            handleSearch={(val: string) => {
              setUrunTypeFilterParams({
                ...urunTypeFilterParams,
                q: val,
              });
            }}
            control={control}
            setFilterParams={setUrunTypeFilterParams}
            disabled={disabled}
          />
        </InputFieldUI>
        <InputFieldUI title={t("KULLANICIADI")}>
          <HFTextField
            name="KULLANICIADI"
            control={control}
            setValue={setValue}
            placeholder={t("KULLANICIADI")}
            disabled={true}
          />
        </InputFieldUI>
        <InputFieldUI title={t("RENKDERINLIGIADI")}>
          <HFSelect
            name="RENKDERINLIGIADI"
            control={control}
            setValue={setValue}
            placeholder={t("RENKDERINLIGIADI")}
            disabled={disabled}
          />
        </InputFieldUI>
      </div>
    </div>
  );
};
