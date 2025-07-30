import HFTextField from "../../../../../components/HFElements/HFTextField";
import { InputFieldUI } from "../../../../../components/UI/FieldUI";
import CCheckbox from "../../../../../components/CElements/CCheckbox";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import { useEffect, useState } from "react";

interface InputFieldsProps {
  control: any;
  setValue: (name: any, value: any) => void;
  getValues: () => any;
  formData: any;
  handleDirtyPlaces: (list: string) => void;
}

export const InputFields = ({
  control,
  setValue,
  getValues,
  formData,
  handleDirtyPlaces,
}: InputFieldsProps) => {
  const [selectedHamID, setSelectedHamID]: any = useState(null);
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem(
        "lab_form_initial_values",
        JSON.stringify(getValues())
      );
    }, 700);
  }, []);
  return (
    <div className="w-full grid grid-cols-4 gap-y-3 gap-x-5">
      <div className="space-y-2">
        <InputFieldUI title="LABRECETEADI" required>
          <HFTextField
            name="ADI"
            control={control}
            setValue={setValue}
            handleChange={() => handleDirtyPlaces("ADI")}
            focused={formData?.LABRECETEKODU ? false : true}
          />
        </InputFieldUI>
        <InputFieldUI title="FIRMAID" required>
          <LiteOptionsTable
            name="FIRMAID"
            link="firma"
            headColumns={[
              { id: "FIRMAID", title: "FIRMAID", width: 80 },
              { id: "ADI", title: "FIRMAADI", width: 180 },
            ]}
            renderValue={(_: string, obj: any) => {
              return obj.FIRMAID + (obj.ADI ? " - " + obj.ADI : "");
            }}
            staticSearchID="FIRMAID"
            handleSelect={(obj: { FIRMAID: string }) => {
              setValue("FIRMAID", obj.FIRMAID);
              handleDirtyPlaces("FIRMAID");
            }}
            defaultValue={formData?.FIRMAID}
            control={control}
            disabled={!!formData?.FIRMAID}
          />
        </InputFieldUI>
        <InputFieldUI title="LABRENKGRUPID" required>
          <LiteOptionsTable
            name="LABRENKGRUPID"
            link="labrenkgrup"
            renderValue={(_: string, obj: any) => {
              return obj.ADI || obj.LABRENKGRUPID;
            }}
            staticSearchID="ADI"
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
              handleDirtyPlaces("LABRENKGRUPID");
            }}
            control={control}
          />
        </InputFieldUI>
        <InputFieldUI title="HAMSTOK" required>
          <LiteOptionsTable
            name="HAMID"
            link="ham"
            renderValue={(_: string, obj: any) => {
              return obj.ADI && obj.HAMID
                ? obj.HAMID + " - " + obj.ADI
                : obj.ADI || obj.HAMID;
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
              handleDirtyPlaces("HAMID");
            }}
            control={control}
          />
        </InputFieldUI>
      </div>
      <div className="space-y-2">
        <InputFieldUI title="RECETETURU" required>
          <LiteOptionsTable
            name="RECETETURUID"
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
              handleDirtyPlaces("RECETETURUID");
            }}
            disabled={!!formData?.RECETETURUID}
            control={control}
          />
        </InputFieldUI>
        <InputFieldUI title="ACIKLAMA" required>
          <HFTextField name="ACIKLAMA" control={control} setValue={setValue} />
        </InputFieldUI>
        <InputFieldUI title="USTASAMA" required>
          <LiteOptionsTable
            name="ASAMAID"
            link="asama"
            renderValue={(_: string, obj: any) => {
              return obj.ADI ? obj.ASAMAID + " - " + obj.ADI : obj.ASAMAID;
            }}
            defaultValue={formData?.USTASAMAADI}
            headColumns={[
              { id: "ASAMAID", title: "ASAMAID", width: 80 },
              { id: "ADI", title: "ADI", width: 150 },
            ]}
            handleSelect={(obj: { ASAMAID: number; ADI: string }) => {
              setValue("USTASAMAID", obj.ASAMAID);
              setValue("USTASAMAADI", obj.ADI);
              handleDirtyPlaces("USTASAMAID");
            }}
            control={control}
          />
        </InputFieldUI>
        <InputFieldUI title="DOVIZID" required>
          <LiteOptionsTable
            name="DOVIZID"
            renderValue={(_: string, obj: any) => {
              return obj.DOVIZID || obj.CINSI;
            }}
            link="doviz"
            defaultValue={formData?.USTASAMAADI || "USD"}
            headColumns={[
              { id: "CINSI", title: "CINSI", width: 60 },
              { id: "DOVIZID", title: "DOVIZID", width: 80 },
            ]}
            handleSelect={(obj: { DOVIZID: string }) => {
              setValue("DOVIZID", obj.DOVIZID);
              handleDirtyPlaces("DOVIZID");
            }}
            disabled={!!formData?.FIRMAID}
            control={control}
          />
        </InputFieldUI>
      </div>
      <div className="space-y-2">
        <InputFieldUI title="ESKILABRECETEKODU">
          <HFTextField
            name="ESKILABRECETEKODU"
            control={control}
            setValue={setValue}
          />
        </InputFieldUI>
        <InputFieldUI title="PANTONEKODU" required>
          <HFTextField
            name="PANTONEKODU"
            control={control}
            setValue={setValue}
          />
        </InputFieldUI>
        <InputFieldUI title="RENKDERINGLIGI" required>
          <LiteOptionsTable
            name="RENKDERINLIGIID"
            link="renkderinligi"
            renderValue={(_: string, obj: any) => {
              return obj.ADI || obj.RENKDERINLIGIID;
            }}
            headColumns={[
              { id: "RENKDERINLIGIID", title: "RENKDERINLIGIID" },
              { id: "ADI", title: "FIRMAADI" },
            ]}
            handleSelect={(obj: { RENKDERINLIGIID: number }) => {
              setValue("RENKDERINLIGIID", obj.RENKDERINLIGIID);
              handleDirtyPlaces("RENKDERINLIGIID");
            }}
            defaultValue={formData?.RENKDERINLIGIADI}
            control={control}
          />
        </InputFieldUI>
      </div>
      <div className="space-y-2">
        <InputFieldUI title="KALITEID">
          <LiteOptionsTable
            name="KALITEID"
            link="kalite"
            renderValue={(_: string, obj: any) => {
              return obj.KALITEID;
            }}
            defaultFilters={selectedHamID ? `HAMID=${selectedHamID}` : ""}
            defaultValue={formData?.KALITEID}
            headColumns={[
              { id: "KALITEID", title: "KALITEID", width: 120 },
              { id: "KALITEADI", title: "KALITEADI", width: 300 },
            ]}
            handleSelect={(obj: { KALITEADI: string; KALITEID: string }) => {
              setValue("KALITEADI", obj.KALITEADI);
              setValue("KALITEID", obj.KALITEID);
              handleDirtyPlaces("KALITEID");
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
          />
        </InputFieldUI>
        <div className="flex">
          <div className="w-[48%]">
            <CCheckbox
              element={{ label: "FASON" }}
              checked={getValues().FASON === 1 ? true : false}
              handleCheck={(obj: { checked: boolean }) => {
                setValue("FASON", obj.checked ? "1" : "0");
                handleDirtyPlaces("FASON");
              }}
            />
          </div>
          <div className="w-[2%]"></div>
          <div className="w-[48%] overflow-hidden">
            <div>
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
    </div>
  );
};
