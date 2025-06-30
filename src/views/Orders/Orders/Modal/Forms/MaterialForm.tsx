import CNewMiniModal from "../../../../../components/CElements/CNewMiniModal";
import { useForm } from "react-hook-form";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import CLabel from "../../../../../components/CElements/CLabel";
import { CRadio } from "../../../../../components/CElements/CRadio";
import { useEffect, useState } from "react";
import { SubmitCancelButtons } from "../../../../../components/UI/FormButtons/SubmitCancel";
import { MaterialFormLogic } from "./MaterialComponents/Logic";
import dayjs from "dayjs";
import HFTextField from "../../../../../components/HFElements/HFTextField";

interface MaterialFormProps {
  handleActions: (val: string, val2: any) => void;
  uniqueID: string;
  defaultData: any;
  parentId: number;
  refetch: () => void;
}

export const MaterialForm = ({
  handleActions,
  uniqueID,
  parentId,
  defaultData,
  refetch,
}: MaterialFormProps) => {
  const [formId, setFormId] = useState(0);

  const { control, setValue, handleSubmit } = useForm();

  const { formData, createForm, updateForm } = MaterialFormLogic({
    formId: formId,
    defaultData,
    closeFn: () => {
      handleActions("Close", uniqueID);
      refetch();
    },
  });

  const [radioValue, setRadioValue] = useState(0);

  const onSubmit = (data: any) => {
    let params = { ...data };
    if (formId) {
      params.BOYASIPARISKAYITID = formData.BOYASIPARISKAYITID;
      params = { ...formData, ...params };
      updateForm(params, formId);
    } else {
      params.BOYASIPARISKAYITID = parentId;
      params.SIPARISSIRANO = 1;
      params.NETHAMMIKTAR = 0;
      params.HAMSTOKBIRIMID = 1;
      params.ORMEBIRIMMALIYETDOVIZID = "USD";
      params.DOKUMABIRIMMALIYETDOVIZID = "USD";
      params.COZGUBIRIMMALIYETDOVIZID = "USD";
      params.HASILBIRIMMALIYETDOVIZID = "USD";
      params.BUKUMBIRIMMALIYETDOVIZID = "USD";

      params.TUPACIKENMAYLI = radioValue;
      params.TESLIMTARIHI = dayjs(params.TESLIMTARIHI);
      params.REVIZETESLIMTARIHI = dayjs();
      params.KAPATMATARIHI = dayjs().format("YYYY-MM-DD");
      params.ONAYTARIHI = dayjs();
      params.MALIONAYTARIHI = dayjs().format("YYYY-MM-DD");
      params.INSERTTARIHI = dayjs();
      params.DEGISIMTARIHI = dayjs();
      params.VADEGUN = 0;
      createForm(params);
    }
  };

  const setFormDefaultData = (data: any) => {
    setValue("KALITEID", data.KALITEID);
    setValue("URUNID", data.URUNID);
    setValue("HAMMIKTAR", data.HAMMIKTAR);
    setValue("DOVIZID", data.DOVIZID);
    setValue("PUS", data.PUS);
    setValue("VADEGUN", data.VADEGUN);
    setValue("MIKTARGUN", data.MIKTARGUN);
    setValue("HAMID", data.HAMID);
    setValue("HAMADI", data.HAMADI);
    setValue("IPLIKBOYU1", data.IPLIKBOYU1);
    setValue("FEINE", data.FEINE);
    setValue("TAHMINIFIREORANI", data.TAHMINIFIREORANI);
    setValue("MUSTERISIPARISNO", data.MUSTERISIPARISNO);
    setRadioValue(data.TUPACIKENMAYLI);
  };

  useEffect(() => {
    if (defaultData?.ORMESIPARISDETAYID) {
      setFormId(defaultData?.ORMESIPARISDETAYID);
    }
  }, [defaultData]);

  useEffect(() => {
    if (formData?.ORMESIPARISDETAYID) {
      setFormDefaultData(formData);
    } else {
      setValue("DOVIZID", "USD");
    }
  }, [formData]);

  return (
    <CNewMiniModal
      title="Orme Siparis Detay Girisi"
      handleActions={handleActions}
    >
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="pb-2 grid grid-cols-1 gap-y-2 w-[550px]"
      >
        <LiteOptionsTable
          label="Kalite no"
          renderValue={(_: string, obj: any) => {
            return obj.KALITEADI;
          }}
          handleSelect={(obj: { KALITEID: string }) => {
            setValue("KALITEID", obj.KALITEID);
          }}
          name="KALITEID"
          link="kalite"
          headColumns={[
            {
              id: "KALITEID",
              title: "KALITEID",
              width: 120,
            },
            {
              id: "KALITEADI",
              title: "ADI",
              width: 240,
            },
          ]}
          defaultValue={formData?.KALITEID}
          control={control}
        />
        <LiteOptionsTable
          label="Ham Adi"
          renderValue={(_: string, obj: any) => {
            return obj.HAMID && obj.ADI ? obj.HAMID + " - " + obj.ADI : obj.ADI;
          }}
          handleSelect={(obj: { HAMID: string; ADI: string }) => {
            setValue("HAMID", obj.HAMID);
            setValue("HAMADI", obj.ADI);
          }}
          name="HAMID"
          link="ham"
          headColumns={[
            {
              id: "HAMID",
              title: "HAMID",
              width: 60,
            },
            {
              id: "ADI",
              title: "ADI",
              width: 300,
            },
          ]}
          defaultValue={
            formData?.HAMID && formData?.HAMADI
              ? formData?.HAMID + " - " + formData?.HAMADI
              : defaultData?.HAMADI
          }
          control={control}
        />
        {/* <HFInputMask
          label="Vade Gunu"
          name="VADEGUN"
          type="date"
          control={control}
          handleChange={(val?: string) => {
            setValue("VADEGUN", val);
          }}
          defaultValue={formData?.VADEGUN}
        /> */}

        <div className="flex space-x-2">
          <HFTextField
            label="Miktar"
            name="HAMMIKTAR"
            type="number"
            control={control}
            defaultValue={formData?.HAMMIKTAR}
          />
          <HFTextField type="number" label="Pus" name="PUS" control={control} />
          <HFTextField
            type="number"
            label="FEINE"
            name="FEINE"
            control={control}
          />
          <HFTextField
            type="number"
            label="Iplik Boyu 1"
            name="IPLIKBOYU1"
            control={control}
            defaultValue={formData?.IPLIKBOYU1}
          />
        </div>
        <div className="flex space-x-2">
          <HFTextField
            label="Makina Ustu Gramaj"
            name="MAKINAUSTUGRAMAJ"
            type="number"
            control={control}
            defaultValue={formData?.MAKINAUSTUGRAMAJ}
          />
          <HFTextField
            label="Tahmini Fire Orani"
            name="TAHMINIFIREORANI"
            type="number"
            control={control}
            defaultValue={formData?.TAHMINIFIREORANI}
          />
          <HFTextField
            label="Musteri Siparis No"
            name="MUSTERISIPARISNO"
            control={control}
            defaultValue={formData?.MUSTERISIPARISNO}
          />
          <LiteOptionsTable
            label="DOVIZID"
            name="DOVIZID"
            renderValue={(_: string, obj: any) => {
              return obj.DOVIZID || obj.CINSI;
            }}
            link="doviz"
            defaultValue={formData?.DOVIZID || "USD"}
            headColumns={[
              { id: "CINSI", title: "CINSI", width: 60 },
              { id: "DOVIZID", title: "DOVIZID", width: 80 },
            ]}
            handleSelect={(obj: { DOVIZID: string }) => {
              setValue("DOVIZID", obj.DOVIZID);
            }}
            control={control}
          />
        </div>
        <div>
          <CLabel title=" Tipi" />
          <div className="grid grid-cols-3 gap-2 items-center">
            <CRadio
              onChange={() => {
                setRadioValue(1);
              }}
              label="Tup"
              checked={radioValue === 1}
              value="TUP"
              name="TUP"
            />
            <CRadio
              onChange={() => {
                setRadioValue(2);
              }}
              label="Acik en"
              checked={radioValue === 2}
              value="APK"
              name="APK"
            />
            <CRadio
              onChange={() => {
                setRadioValue(3);
              }}
              label="Mayli"
              checked={radioValue === 3}
              value="MAYLI"
              name="MAYLI"
            />
          </div>
        </div>
        <SubmitCancelButtons
          uniqueID={uniqueID}
          type={formId ? "update" : "create siparis detey"}
          handleActions={(val: string, uniqueID: string) => {
            if (uniqueID === "material_form") {
              if (val === "Close") {
                handleActions("Close", uniqueID);
              }
              if (val === "Enter") handleSubmit(onSubmit)();
            }
          }}
        />
      </form>
      {/* <CollapseUI title="tables" disabled={false}>
        <div className="mb-8">
          <MaterialTable />
        </div>
      </CollapseUI> */}
    </CNewMiniModal>
  );
};
