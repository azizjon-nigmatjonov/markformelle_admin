import HFTextField from "../../../../../components/HFElements/HFTextField";
import { InputFieldUI } from "../../../../../components/UI/FieldUI";
import HFSelect from "../../../../../components/HFElements/HFSelect";
import CCheckbox from "../../../../../components/CElements/CCheckbox";
import { useGetDovizList } from "../../../../../hooks/useFetchRequests/useDovizList";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import { useState } from "react";

interface InputFieldsProps {
  control: any;
  setValue: (name: any, value: any) => void;
  getValues: () => any;
  formData: any;
}

export const InputFields = ({
  control,
  setValue,
  getValues,
  formData,
}: InputFieldsProps) => {
  const { Options: moneyOptions } = useGetDovizList({});
  const [selectedHamID, setSelectedHamID]: any = useState(null);

  return (
    <div className="w-full grid grid-cols-4 gap-y-3 gap-x-5">
      <div className="space-y-2">
        <InputFieldUI title="LABRECETEADI" required>
          <HFTextField
            name="ADI"
            control={control}
            setValue={setValue}
            placeholder="ADI"
          />
        </InputFieldUI>
        <InputFieldUI title="FIRMAID" required>
          <LiteOptionsTable
            name="FIRMAID"
            placeholder="FIRMAID"
            link="firma"
            headColumns={[
              { id: "FIRMAID", title: "FIRMAID", width: 80 },
              { id: "ADI", title: "FIRMAADI", width: 180 },
            ]}
            handleSelect={(obj: { FIRMAID: string }) => {
              setValue("FIRMAID", obj.FIRMAID);
            }}
            defaultValue={formData?.FIRMAID}
            control={control}
            disabled={!!formData?.FIRMAID}
          />
        </InputFieldUI>
        <InputFieldUI title="LABRENKGRUPID" required>
          <LiteOptionsTable
            name="LABRENKGRUPID"
            placeholder="LABRENKGRUPID"
            link="labrenkgrup"
            renderValue={(_: string, obj: any) => {
              return obj.ADI || obj.LABRENKGRUPID;
            }}
            defaultValue={formData.LABRENKGRUPAD}
            headColumns={[
              { id: "ADI", title: "ADI" },
              {
                id: "HEXCODE",
                title: "HEXCODE",
                render: (val: string) => {
                  return (
                    <div
                      className={`w-[70px] h-[25px] rounded-[8px] border`}
                      style={{
                        backgroundColor: val,
                      }}
                    ></div>
                  );
                },
              },
            ]}
            handleSelect={(obj: { LABRENKGRUPID: number }) => {
              setValue("LABRENKGRUPID", obj.LABRENKGRUPID);
            }}
            control={control}
          />
        </InputFieldUI>
        <InputFieldUI title="HAMSTOK" required>
          <LiteOptionsTable
            name="HAMID"
            placeholder="HAMSTOK"
            link="ham"
            renderValue={(_: string, obj: any) => {
              return obj.ADI || obj.HAMID;
            }}
            defaultValue={formData.HAMADI}
            headColumns={[
              { id: "HAMID", title: "HAMID", width: 75 },
              { id: "ADI", title: "ADI", width: 160 },
              { id: "HAMTIPIADI", title: "HAMTIPIADI", width: 130 },
            ]}
            handleSelect={(obj: { ADI: string; HAMID: number }) => {
              setValue("HAMID", obj.HAMID);
              setValue("HAMADI", obj.ADI);
              setSelectedHamID(obj.HAMID);
            }}
            control={control}
          />
        </InputFieldUI>
      </div>
      <div className="space-y-2">
        <InputFieldUI title="RECETETURU" required>
          <LiteOptionsTable
            name="RECETETURUID"
            placeholder="RECETETURUID"
            link="receteturu"
            renderValue={(_: string, obj: any) => {
              return obj.ADI || obj.RECETETURUID;
            }}
            defaultValue={formData?.RECETETURAADI}
            headColumns={[
              { id: "RECETETURUID", title: "ID", width: 40 },
              { id: "ADI", title: "ADI" },
            ]}
            handleSelect={(obj: { RECETETURUID: number }) => {
              setValue("RECETETURUID", obj.RECETETURUID);
            }}
            disabled={!!formData?.RECETETURUID}
            control={control}
          />
        </InputFieldUI>
        <InputFieldUI title="ACIKLAMA" required>
          <HFTextField
            name="ACIKLAMA"
            control={control}
            setValue={setValue}
            placeholder="ACIKLAMA"
          />
        </InputFieldUI>
        <InputFieldUI title="USTASAMA" required>
          <LiteOptionsTable
            name="ASAMAID"
            placeholder={"USTASAMA"}
            link="asama"
            renderValue={(_: string, obj: any) => {
              return obj.ADI || obj.ASAMAID;
            }}
            defaultValue={formData?.USTASAMAADI}
            headColumns={[
              { id: "ASAMAID", title: "ASAMAID", width: 80 },
              { id: "ADI", title: "ADI", width: 150 },
            ]}
            handleSelect={(obj: { ASAMAID: number; ADI: string }) => {
              setValue("USTASAMAID", obj.ASAMAID);
              setValue("USTASAMAADI", obj.ADI);
            }}
            control={control}
          />
        </InputFieldUI>
        <InputFieldUI title="DOVIZID" required>
          <HFSelect
            name="DOVIZID"
            control={control}
            setValue={setValue}
            handleClick={(obj) => {
              setValue("DOVIZID", obj.value);
            }}
            placeholder="DOVIZID"
            options={moneyOptions}
            disabled={!!formData?.FIRMAID}
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
        <InputFieldUI title="PANTONEKODU" required>
          <HFTextField
            name="PANTONEKODU"
            control={control}
            setValue={setValue}
            placeholder="PANTONEKODU"
          />
        </InputFieldUI>
        <InputFieldUI title="RENKDERINGLIGI" required>
          <LiteOptionsTable
            name="RENKDERINLIGIID"
            placeholder="RENKDERINLIGIID"
            link="renkderinligi"
            renderValue={(_: string, obj: any) => {
              return obj.ADI || obj.ASAMAID;
            }}
            headColumns={[
              { id: "RENKDERINLIGIID", title: "RENKDERINLIGIID" },
              { id: "ADI", title: "FIRMAADI" },
            ]}
            handleSelect={(obj: { RENKDERINLIGIID: number }) => {
              setValue("RENKDERINLIGIID", obj.RENKDERINLIGIID);
            }}
            defaultValue={formData?.RENKDERINLIGIID}
            control={control}
          />
        </InputFieldUI>
      </div>
      <div className="space-y-2">
        <InputFieldUI title="KALITEID">
          <LiteOptionsTable
            name="KALITEID"
            placeholder="KALITEID"
            link="kalite"
            renderValue={(_: string, obj: any) => {
              return obj.KALITEID;
            }}
            defaultSearch={selectedHamID ? `HAMID=${selectedHamID}` : ""}
            defaultValue={formData?.KALITEID}
            headColumns={[
              { id: "KALITEID", title: "KALITEID", width: 120 },
              { id: "KALITEADI", title: "KALITEADI", width: 300 },
            ]}
            handleSelect={(obj: { KALITEADI: string; KALITEID: string }) => {
              setValue("KALITEADI", obj.KALITEADI);
              setValue("KALITEID", obj.KALITEID);
            }}
            disabled={true}
            control={control}
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
