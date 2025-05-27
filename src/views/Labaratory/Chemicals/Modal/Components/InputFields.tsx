import HFTextField from "../../../../../components/HFElements/HFTextField";
import { InputFieldUI } from "../../../../../components/UI/FieldUI";
import { SelectOptionsTable } from "../../../../../components/UI/Options/Table";
import HFSelect from "../../../../../components/HFElements/HFSelect";
import CCheckbox from "../../../../../components/CElements/CCheckbox";
import { useLabRenkGroupList } from "../../../../../hooks/useFetchRequests/useLabRenkGroup";
import { useHamStockList } from "../../../../../hooks/useFetchRequests/useHamStockList";
import { useAsamaList } from "../../../../../hooks/useFetchRequests/useAsamaList";
import { useGetDovizList } from "../../../../../hooks/useFetchRequests/useDovizList";
import { useReceteTypeList } from "../../../../../hooks/useFetchRequests/useReceteTypeList";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import { useRenkDering } from "../../../../../hooks/useFetchRequests/useRenkDering";
import { useKaliteList } from "../../../../../hooks/useFetchRequests/useKaliteList";

interface InputFieldsProps {
  control: any;
  setValue: (name: any, value: any) => void;
  filterParams: any;
  firmaData: any;
  filterParamsFirm: any;
  setFilterParamsFirm: (val: any) => void;
  setFilterParams: (params: any) => void;
  getValues: () => any;
}

export const InputFields = ({
  control,
  filterParams,
  setFilterParams,
  setValue,
  setFilterParamsFirm,
  firmaData,
  filterParamsFirm,
  getValues,
}: InputFieldsProps) => {
  const { Options: LabRenkOptions } = useLabRenkGroupList();
  const { data: hamStockData } = useHamStockList();
  const { data: asamaData } = useAsamaList();
  const { Options: moneyOptions } = useGetDovizList({});
  const { Options: receteTypeOptions } = useReceteTypeList();
  const { Options: renkDeringOptions } = useRenkDering();
  const { data: kaliteData } = useKaliteList();

  return (
    <div className="w-full grid grid-cols-4 gap-y-3 gap-x-5">
      <div className="space-y-2">
        <InputFieldUI title="LABRECETEADI">
          <HFTextField
            name="ADI"
            control={control}
            setValue={setValue}
            placeholder="ADI"
          />
        </InputFieldUI>
        <InputFieldUI title="FIRMAID">
          <LiteOptionsTable
            name="FIRMAID"
            placeholder="FIRMAID"
            options={firmaData?.data}
            required={true}
            headColumns={[
              { id: "FIRMAID", title: "FIRMAID" },
              { id: "ADI", title: "FIRMAADI" },
            ]}
            handleSelect={(obj: { FIRMAID: string }) => {
              setValue("FIRMAID", obj.FIRMAID);
            }}
            control={control}
          />
        </InputFieldUI>
        <InputFieldUI title="LABRENKGRUPID">
          <HFSelect
            name="LABRENKGRUPID"
            control={control}
            setValue={setValue}
            placeholder="LABRENKGRUPID"
            options={LabRenkOptions}
          />
        </InputFieldUI>{" "}
        <InputFieldUI title={"HAMSTOK"}>
          <SelectOptionsTable
            name="HAMADI"
            placeholder={"HAMADI"}
            options={hamStockData?.data}
            required={true}
            headColumns={[
              { id: "HAMID", title: "HAMID" },
              { id: "ADI", title: "ADI" },
              { id: "HAMTIPIADI", title: "HAMTIPIADI" },
            ]}
            filterParams={filterParams}
            handleSelect={(obj: { ADI: string; HAMID: number }) => {
              setValue("HAMID", obj.HAMID);
              setValue("HAMADI", obj.ADI);
            }}
            handleSearch={(val: string) => {
              setFilterParamsFirm({ ...filterParamsFirm, q: val });
            }}
            control={control}
            setFilterParams={setFilterParams}
          />
        </InputFieldUI>
      </div>
      <div className="space-y-2">
        <InputFieldUI title={"RECETETURU"}>
          <HFSelect
            name="RECETETURUID"
            control={control}
            setValue={setValue}
            placeholder="RECETETURUID"
            options={receteTypeOptions}
          />
        </InputFieldUI>
        <InputFieldUI title="ACIKLAMA">
          <HFTextField
            name="ACIKLAMA"
            control={control}
            setValue={setValue}
            placeholder="ACIKLAMA"
          />
        </InputFieldUI>
        <InputFieldUI title="USTASAMA">
          <SelectOptionsTable
            name="USTASAMAID"
            placeholder={"USTASAMA"}
            options={asamaData?.data}
            required={true}
            headColumns={[
              { id: "ASAMAID", title: "ASAMAID" },
              { id: "ADI", title: "ADI" },
            ]}
            filterParams={filterParams}
            handleSelect={(obj: { ASAMAID: number; ADI: string }) => {
              console.log("ob", obj);

              setValue("USTASAMAID", obj.ASAMAID);
              setValue("USTASAMAADI", obj.ADI);
            }}
            handleSearch={(val: string) => {
              setFilterParamsFirm({ ...filterParamsFirm, q: val });
            }}
            control={control}
            setFilterParams={setFilterParams}
          />
        </InputFieldUI>
        <InputFieldUI title="DOVIZID">
          <HFSelect
            name="DOVIZID"
            control={control}
            setValue={setValue}
            handleClick={(obj) => {
              console.log(obj);

              setValue("DOVIZID", obj.value);
            }}
            placeholder="DOVIZID"
            options={moneyOptions}
          />
        </InputFieldUI>
      </div>
      <div className="space-y-2">
        <InputFieldUI title="ESKILABRECETEKODU">
          <HFTextField
            name="ESKILABRECETEKODU"
            control={control}
            setValue={setValue}
            placeholder="ESKILABRECETEKODU"
          />
        </InputFieldUI>
        <InputFieldUI title="PANTONEKODU">
          <HFTextField
            name="PANTONEKODU"
            control={control}
            setValue={setValue}
            placeholder="PANTONEKODU"
          />
        </InputFieldUI>
        <InputFieldUI title="RENKDERINGLIGI">
          <HFSelect
            name="RENKDERINLIGIID"
            control={control}
            setValue={setValue}
            placeholder="RENKDERINLIGIID"
            options={renkDeringOptions}
            handleClick={(obj) => {
              setValue("RENKDERINLIGIID", obj.value);
            }}
          />
        </InputFieldUI>
      </div>
      <div className="space-y-2">
        <InputFieldUI title="KALITENO">
          <SelectOptionsTable
            name="KALITEID"
            placeholder="KALITEID"
            options={kaliteData?.data}
            required={true}
            headColumns={[
              { id: "KALITEID", title: "KALITEID" },
              { id: "KALITEADI", title: "KALITEADI" },
            ]}
            filterParams={filterParams}
            handleSelect={(obj: { KALITEADI: string; KALITEID: string }) => {
              setValue("KALITEADI", obj.KALITEADI);
              setValue("KALITEID", obj.KALITEID);
            }}
            handleSearch={(val: string) => {
              setFilterParamsFirm({ ...filterParamsFirm, q: val });
            }}
            control={control}
            setFilterParams={setFilterParams}
          />
        </InputFieldUI>
        <InputFieldUI title="TALEPTARIHI">
          <HFTextField
            name="TALEPTARIHI"
            control={control}
            setValue={setValue}
            disabled
            placeholder="TALEPTARIHI"
          />
        </InputFieldUI>
        <div className="flex">
          <div className="w-[48%]">
            <CCheckbox
              element={{ label: "FASON" }}
              checked={getValues().FASON === 1 ? true : false}
              handleCheck={(obj: { checked: boolean }) => {
                setValue("FASON", obj.checked ? "1" : "0");
              }}
            />
          </div>
          <div className="w-[2%]"></div>
          <div className="w-1/2">
            <CCheckbox
              element={{ label: "IPTAL" }}
              checked={getValues().IPTAL === 1 ? true : false}
              handleCheck={(obj: { checked: boolean }) => {
                setValue("IPTAL", obj.checked ? "1" : "0");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
