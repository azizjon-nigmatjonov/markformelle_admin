import { useForm } from "react-hook-form";
import CNewMiniModal from "../../../../../components/CElements/CNewMiniModal";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../../components/UI/FormButtons/SubmitCancel";
import dayjs from "dayjs";
import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useTransition,
} from "react";
import { PaintFormLogic } from "./PaintComponents/Logic";
import HFTextarea from "../../../../../components/HFElements/HFTextarea";
import HFTextField from "../../../../../components/HFElements/HFTextField";
import CLabel from "../../../../../components/CElements/CLabel";
import CCheckbox from "../../../../../components/CElements/CCheckbox";
import { websiteActions } from "../../../../../store/website";
import { useDispatch } from "react-redux";

// Define the form data interface
interface PaintFormData {
  HAMID?: string | number;
  PUS?: number;
  FEINE?: number;
  IPTALKILO?: number;
  BRUTKILO?: number;
  IPTALMETRE?: number;
  KALITEID?: string;
  DOVIZID?: string;
  LABRECETEKODU?: string;
  SIPARISPROSESID?: number;
  RENKID?: number;
  RENKDERINLIGIID?: number;
  NOTU?: string;
  PLANLAMANOTU?: string;
  TERMINNOTU?: string;
  HATAPUANICARPANI?: number;
  ISLEMTIPIID?: number;
  DESENID?: number;
  PANTONEKODU?: string;
  LABRECETEID?: number;
  HAMADI?: string | number;
  ENISTENEN?: string;
  GRAMAJISTENEN?: string;
  BIRIMFIYAT?: number;
  MUSTERISIPARISNO?: number;
  REFSIPARISNO?: number;
  SEKILADRES?: string;
  MELANJKODU?: string;
  FIREORANI?: number;
  DESENVARYANTID?: number;
  SIPARISNOTU?: string;
  ONAYDURUMU?: boolean;
  TERMINTARIHI?: string;
  LABRECETEATISID?: number;
  RECETEASAMAADI?: string;
  // Additional properties for API submission
  ADET?: any;
  BOYASIPARISKAYITID?: number;
  DEGISIMLOG?: string;
  DINLENMISGRAMAJ?: string;
  BASKIBIRIMFIYATDOVIZID?: string;
  FASONBIRIMFIYATDOVIZID?: string;
  FATURAEDILECEKMIKTARTIPI?: number;
  HAMSTOKBIRIMID?: number;
  SIRANO?: number;
  FIRMASEVKADRESIID?: number;
  INSERTKULLANICIID?: number;
  ORMESIPARISDETAYID?: number;
  BOYASIPARISDETAYID?: number;
}

export const PaintForm = ({
  handleActions,
  uniqueID,
  defaultData,
  title,
  parentId,
  refetch,
}: {
  handleActions: (val: string) => void;
  uniqueID: string;
  defaultData: any;
  parentId: number;
  title: string;
  refetch: () => void;
  isDirty: boolean;
}) => {
  const dispatch = useDispatch();
  const [formId, setFormId] = useState(null);
  const [isPending, startTransition] = useTransition();

  // Configure useForm with proper mode to prevent excessive re-renders
  const { control, setValue, handleSubmit, watch, getValues } = useForm<any>({
    mode: "onSubmit", // Only validate on submit, not on every change
    defaultValues: {
      DOVIZID: "USD",
      TERMINTARIHI: dayjs().format("YYYY-MM-DD"),
    },
  });

  // Only watch the fields that are actually needed for conditional rendering
  const DESENID = watch("DESENID");
  const PANTONEKODU = watch("PANTONEKODU");
  const LABRECETEID = watch("LABRECETEID");

  // Memoize the closeFn to prevent PaintFormLogic from re-creating
  const closeFn = useCallback(() => {
    startTransition(() => {
      refetch();
      handleActions("Close");
    });
  }, [refetch, handleActions, startTransition]);

  const { formData, updateForm, createForm } = PaintFormLogic({
    formId: formId ? formId : null,
    defaultData,
    closeFn,
  });

  // Memoize handleDirtyPlaces to prevent new function creation
  const handleDirtyPlaces = useCallback(
    (list: string) => {
      // User input is high priority - don't wrap in startTransition
      dispatch(websiteActions.setDirtyPlaces({ list, isDirty: false }));
    },
    [dispatch]
  );

  // Memoize the form change handler - HIGH PRIORITY (user input)
  const handleFormChange = useCallback(
    (name: string, value: string) => {
      // User input is high priority - immediate response
      setValue(name as keyof PaintFormData, value);
      handleDirtyPlaces(name);
    },
    [setValue, handleDirtyPlaces]
  );

  // Memoize the textarea change handler - HIGH PRIORITY (user input)
  const handleTextareaChange = useCallback(
    (name: string, value: any) => {
      // User input is high priority - immediate response
      setValue(name as keyof PaintFormData, value);
      handleDirtyPlaces(name);
    },
    [setValue, handleDirtyPlaces]
  );

  // Memoize the checkbox change handler - HIGH PRIORITY (user input)
  const handleCheckboxChange = useCallback(
    (value: any) => {
      // User input is high priority - immediate response
      setValue("ONAYDURUMU", value.checked);
      handleDirtyPlaces("ONAYDURUMU");
    },
    [setValue, handleDirtyPlaces]
  );

  const onSubmit = useCallback(
    (data: PaintFormData) => {
      // Form submission is lower priority - wrap in startTransition
      startTransition(() => {
        let params: any = { ...data };
        params.MAXIMUMFIREORANI = Number(params.MAXIMUMFIREORANI || 0);
        params.HATAPUANICARPANI = Number(params.HATAPUANICARPANI || 0);
        if (formId) {
          params = { ...formData, ...params };
          params.DESENID = params.DESENID || null;
          updateForm(params, formId);
        } else {
          params.PUS = params.PUS ?? 0;
          params.FEINE = params.FEINE ?? 0;
          params.IPTALKILO = params.IPTALKILO ?? 0;
          params.IPTALMETRE = params.IPTALMETRE ?? 0;
          params.HATAPUANICARPANI = params.HATAPUANICARPANI ?? 0;
          params.ADET = null;
          params.BOYASIPARISKAYITID = parentId;
          params.DEGISIMLOG = "";
          params.DINLENMISGRAMAJ = "";
          params.BASKIBIRIMFIYATDOVIZID = params.DOVIZID;
          params.FASONBIRIMFIYATDOVIZID = params.DOVIZID;
          params.FATURAEDILECEKMIKTARTIPI = 0;
          params.HAMSTOKBIRIMID = 0;
          params.SIRANO = 999;
          params.FIRMASEVKADRESIID = 904;
          params.SIPARISPROSESID = Number(params.SIPARISPROSESID);
          params.RENKID = Number(params.RENKID);
          params.INSERTKULLANICIID = 1;
          params.ORMESIPARISDETAYID = 12280;
          params.BOYASIPARISDETAYID = 40546;

          createForm(params);
        }
      });
    },
    [formId, formData, updateForm, createForm, parentId, startTransition]
  );
  console.log("formdata", formData);

  // Memoize setFormValues to prevent recreation
  const setFormValues = useCallback(
    (form: any) => {
      if (!form) return;

      // Setting form values from API data is lower priority
      startTransition(() => {
        const fieldsToSet = [
          { name: "HAMID", value: form.HAMID },
          { name: "PUS", value: form.PUS },
          { name: "FEINE", value: form.FEINE },
          { name: "IPTALKILO", value: form.IPTALKILO },
          { name: "BRUTKILO", value: form.BRUTKILO },
          { name: "IPTALMETRE", value: form.IPTALMETRE },
          { name: "KALITEID", value: form.KALITEID },
          { name: "DOVIZID", value: form.DOVIZID },
          { name: "LABRECETEKODU", value: form.LABRECETEKODU },
          { name: "SIPARISPROSESID", value: form.SIPARISPROSESID },
          { name: "RENKID", value: form.RENKID },
          { name: "RENKDERINLIGIID", value: form.RENKDERINLIGIID },
          { name: "NOTU", value: form.NOTU },
          { name: "PLANLAMANOTU", value: form.PLANLAMANOTU },
          { name: "TERMINNOTU", value: form.TERMINNOTU },
          { name: "HATAPUANICARPANI", value: form.HATAPUANICARPANI },
          { name: "ISLEMTIPIID", value: form.ISLEMTIPIID },
        ];

        fieldsToSet.forEach(({ name, value }) => {
          if (value !== undefined && value !== null) {
            setValue(name as keyof PaintFormData, value);
          }
        });
      });
    },
    [setValue, startTransition]
  );

  useEffect(() => {
    if (formData?.BOYASIPARISDETAYID) {
      setFormValues(formData);
    }
  }, [formData, setFormValues]);

  useEffect(() => {
    if (defaultData?.BOYASIPARISDETAYID) {
      setFormId(defaultData.BOYASIPARISDETAYID);
    }
  }, [defaultData]);

  const [kaliteData, setKaliteData] = useState<any>(null);
  const [receteData, setReceteData] = useState<any>(null);

  // Memoize the kalite select handler - HIGH PRIORITY (user input)
  const handleKaliteSelect = useCallback(
    (obj: {
      KALITEID: string;
      HAMID: number;
      HAMADI: string;
      FEINE: number;
      PUS: number;
      GRAMAJISTENEN: string;
      ENISTENEN: string;
    }) => {
      // User selection is high priority - immediate response
      setValue("KALITEID", obj.KALITEID);
      setKaliteData(obj);
      setValue("HAMADI", obj.HAMID);
      setValue("HAMID", obj.HAMADI);
      setValue("FEINE", obj.FEINE);
      setValue("PUS", obj.PUS);
      setValue("GRAMAJISTENEN", obj.GRAMAJISTENEN);
      setValue("ENISTENEN", obj.ENISTENEN);
      handleDirtyPlaces("KALITEID");
    },
    [setValue, handleDirtyPlaces]
  );

  // Memoize the ham select handler - HIGH PRIORITY (user input)
  const handleHamSelect = useCallback(
    (data: { HAMID: string }) => {
      // User selection is high priority - immediate response
      setValue("HAMADI", data.HAMID);
      setValue("HAMID", data.HAMID);
      handleDirtyPlaces("HAMID");
    },
    [setValue, handleDirtyPlaces]
  );

  // Memoize the doviz select handler - HIGH PRIORITY (user input)
  const handleDovizSelect = useCallback(
    (obj: { DOVIZID: string }) => {
      // User selection is high priority - immediate response
      setValue("DOVIZID", obj.DOVIZID);
      handleDirtyPlaces("DOVIZID");
    },
    [setValue, handleDirtyPlaces]
  );

  // Memoize the lab recete select handler - HIGH PRIORITY (user input)
  const handleLabReceteSelect = useCallback(
    (obj: { LABRECETEKODU: string; LABRECETEID: number }) => {
      // User selection is high priority - immediate response
      setValue("LABRECETEKODU", obj.LABRECETEKODU);
      setValue("LABRECETEID", obj.LABRECETEID);
      handleDirtyPlaces("LABRECETEKODU");
    },
    [setValue, handleDirtyPlaces]
  );

  // Memoize the renk select handler - HIGH PRIORITY (user input)
  const handleRenkSelect = useCallback(
    (obj: { RENKID: number }) => {
      // User selection is high priority - immediate response
      setValue("RENKID", obj.RENKID);
      handleDirtyPlaces("RENKID");
    },
    [setValue, handleDirtyPlaces]
  );

  // Memoize the renk derinligi select handler - HIGH PRIORITY (user input)
  const handleRenkDerinligiSelect = useCallback(
    (obj: { RENKDERINLIGIID: number }) => {
      // User selection is high priority - immediate response
      setValue("RENKDERINLIGIID", obj.RENKDERINLIGIID);
      handleDirtyPlaces("RENKDERINLIGIID");
    },
    [setValue, handleDirtyPlaces]
  );

  // Memoize the siparis proses select handler - HIGH PRIORITY (user input)
  const handleSiparisProsesSelect = useCallback(
    (obj: { SIPARISPROSESID: number }) => {
      // User selection is high priority - immediate response
      setValue("SIPARISPROSESID", obj.SIPARISPROSESID);
      handleDirtyPlaces("SIPARISPROSESID");
    },
    [setValue, handleDirtyPlaces]
  );

  // Memoize the desen select handler - HIGH PRIORITY (user input)
  const handleDesenSelect = useCallback(
    (obj: { DESENID: number }) => {
      // User selection is high priority - immediate response
      setValue("DESENID", obj.DESENID);
      handleDirtyPlaces("DESENID");
    },
    [setValue, handleDirtyPlaces]
  );

  // Memoize the desen varyant select handler - HIGH PRIORITY (user input)
  const handleDesenVaryantSelect = useCallback(
    (obj: { DESENVARYANTID: number }) => {
      // User selection is high priority - immediate response
      setValue("DESENVARYANTID", obj.DESENVARYANTID);
      handleDirtyPlaces("DESENVARYANTID");
    },
    [setValue, handleDirtyPlaces]
  );

  // Memoize the form submit handler

  useEffect(() => {
    if (formData?.LABRECETEATISNO) {
      // Setting form values from API data is lower priority
      startTransition(() => {
        setValue("LABRECETEATISNO", formData.LABRECETEATISNO);
        setValue("RENKDERINLIGIID", formData.RENKDERINLIGIID);
        setValue("RENKDERINLIGIADI", formData.RENKDERINLIGIADI);
        setValue("ENISTENEN", formData.ENISTENEN);
        setValue("GRAMAJISTENEN", formData.GRAMAJISTENEN);
        setValue("SIPARISKILO", formData.SIPARISKILO);
        setValue("SIPARISBRUTKILO", formData.SIPARISBRUTKILO);
        setValue("BIRIMFIYAT", formData.BIRIMFIYAT);
        console.log("aaaa", formData.MUSTERISIPARISNO);

        setValue("MELANJKODU", formData.MELANJKODU);
        setValue("REFERANSSIPARISNO", formData.REFERANSSIPARISNO);
        setValue("MUSTERISIPARISNO", formData.MUSTERISIPARISNO);
        setValue("MAXIMUMFIREORANI", formData.MAXIMUMFIREORANI);
        setValue("PANTONEKODU", formData.PANTONEKODU);
        setValue("LABRECETEKODU", formData.LABRECETEKODU);
        setValue("SIPARISPROSESID", formData.SIPARISPROSESID);

        setValue("DESENID", formData.DESENID || "");
      });
    }
  }, [formData, setValue, startTransition]);
  const KALITEID = watch("KALITEID");

  // Memoize the form JSX to prevent unnecessary re-renders
  const formContent = useMemo(
    () => (
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-[1000px]"
      >
        {/* Show loading indicator when API operations are pending */}
        {isPending && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 rounded-t-[12px]">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-[var(--primary)] text-sm">
                Processing...
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-3">
          <div className="space-y-3">
            <LiteOptionsTable
              label="Kalite no"
              renderValue={(_: string, obj: any) => {
                return obj.KALITEID;
              }}
              handleSelect={handleKaliteSelect}
              staticSearchID="KALITEID"
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
              label="Ham Stok"
              renderValue={(_: string, obj: any) => {
                return obj.ADI;
              }}
              defaultFilters={KALITEID ? `KALITEID=${KALITEID}` : ""}
              handleSelect={(obj: any) => {
                setValue("HAMID", obj.HAMID);
                setValue("HAMADI", obj.ADI);
              }}
              name="HAMID"
              secondName="HAMID"
              headColumns={[
                { id: "HAMID", title: "HAMID", width: 60 },
                { id: "ADI", title: "ADI", width: 150 },
              ]}
              // defaultValue={formData?.HAMADI}
              link="ham"
              control={control}
            />
            <div className="grid grid-cols-4 gap-x-3">
              <HFTextField
                type="number"
                label="Pus"
                name="PUS"
                control={control}
                handleChange={handleFormChange}
                defaultValue={formData?.PUS ?? ""}
              />
              <HFTextField
                type="number"
                label="Feine"
                name="FEINE"
                control={control}
                defaultValue={formData?.FEINE}
              />
              <HFTextField
                type="number"
                label="Enistenen"
                name="ENISTENEN"
                handleChange={handleFormChange}
                control={control}
                defaultValue={formData?.ENISTENEN}
              />
              <HFTextField
                type="number"
                label="Gramaj"
                name="GRAMAJISTENEN"
                handleChange={handleFormChange}
                control={control}
                defaultValue={formData?.GRAMAJISTENEN}
              />
            </div>
            <div className="grid grid-cols-4 gap-x-3">
              <HFTextField
                type="number"
                label="Kilo"
                name="SIPARISKILO"
                control={control}
                handleChange={handleFormChange}
                defaultValue={formData?.IPTALKILO}
              />
              <HFTextField
                type="number"
                label="Brut Kilo"
                name="SIPARISBRUTKILO"
                control={control}
                handleChange={handleFormChange}
                defaultValue={formData?.SIPARISBRUTKILO}
              />
              <HFTextField
                label="Birim fiyat"
                name="BIRIMFIYAT"
                type="number"
                control={control}
                handleChange={handleFormChange}
                defaultValue={formData?.BIRIMFIYAT}
              />
              <LiteOptionsTable
                label="Doviz"
                name="DOVIZID"
                renderValue={(_: string, obj: any) => {
                  return obj.DOVIZID;
                }}
                link="doviz"
                defaultValue={formData?.DOVIZID || "USD"}
                headColumns={[{ id: "DOVIZID", title: "DOVIZID", width: 80 }]}
                handleSelect={handleDovizSelect}
                control={control}
              />
            </div>

            <HFTextField
              name="PANTONEKODU"
              label="Panton kodu"
              defaultValue={""}
              control={control}
              setValue={setValue}
              handleChange={handleFormChange}
            />
            <div className="grid grid-cols-3 gap-x-2">
              <div className="col-span-2">
                <LiteOptionsTable
                  label="Lab Recete Kodu"
                  name="LABRECETEKODU"
                  renderValue={(_: string, obj: any) => {
                    return obj.LABRECETEKODU;
                  }}
                  link="labrecete"
                  // defaultFilters={`${
                  //   PANTONEKODU ? `LABRECETEKODU=${PANTONEKODU}` : ""
                  // }`}
                  headColumns={[
                    { id: "LABRECETEKODU", title: "LABRECETEKODU", width: 140 },
                    { id: "LABRECETEID", title: "LABRECETEID", width: 110 },
                    { id: "ADI", title: "ADI", width: 140 },
                  ]}
                  defaultValue={formData?.LABRECETEKODU}
                  handleSelect={(obj: any) => {
                    setValue("LABRECETEKODU", obj.LABRECETEKODU);
                    setValue("LABRECETEID", obj.LABRECETEID);
                    setReceteData(obj);
                    handleDirtyPlaces("LABRECETEKODU");
                  }}
                  control={control}
                />
              </div>

              <LiteOptionsTable
                label="Lab atis no"
                name="ATISNO"
                link="labreceteatis"
                renderValue={(_: string, obj: any) => obj.ATISNO}
                disabled={!receteData?.LABRECETEID}
                headColumns={[
                  { id: "ATISNO", title: "ATISNO", width: 80 },
                  {
                    id: "LABRECETEATISID",
                    title: "LABRECETEATISID",
                    width: 120,
                  },

                  {
                    id: "OKEY",
                    title: "OKEY",
                    render: (val: boolean) => {
                      return val ? "OKEY" : "Okeysiz";
                    },
                    width: 100,
                  },
                ]}
                defaultValue={formData?.LABRECETEATISNO}
                defaultFilters={
                  receteData?.LABRECETEID
                    ? `LABRECETEATISID=${receteData?.LABRECETEID}`
                    : ""
                }
                // defaultValue={formData?.LABRECETEATISID}
                handleSelect={(obj: any) => {
                  setValue("LABRECETEATISID", obj.ATISNO);
                  setValue("RECETEASAMAADI", obj.RECETEASAMAADI);
                  setReceteData(obj);
                  // handleDirtyPlaces("LABRECETEATISID");
                }}
                control={control}
              />
            </div>
            <LiteOptionsTable
              label="Renk"
              name="RENKID"
              renderValue={(_: string, obj: any) => {
                return obj.RENKID;
              }}
              defaultValue={formData?.RENKADI}
              link="renk"
              headColumns={[
                { id: "RENKID", title: "RENKID", width: 80 },
                { id: "ADI", title: "ADI", width: 280 },
              ]}
              // defaultFilters={
              //   receteData?.LABRECETEID
              //     ? `LABRECETEID=${receteData?.LABRECETEID}`
              //     : ""
              // }
              handleSelect={handleRenkSelect}
              control={control}
            />

            <LiteOptionsTable
              label="Renk Deringligi"
              name="RENKDERINLIGIID"
              renderValue={(_: string, obj: any) => {
                return obj.ADI;
              }}
              secondName="RENKDERINLIGIID"
              defaultValue={formData?.RENKDERINLIGIADI}
              defaultFilters={
                receteData?.RENKDERINLIGIID || receteData?.RENKDERINLIGIID === 0
                  ? `RENKDERINLIGIID=${receteData?.RENKDERINLIGIID + ""}`
                  : ""
              }
              link="renkderinligi"
              headColumns={[
                {
                  id: "RENKDERINLIGIID",
                  title: "RENKDERINLIGIID",
                  width: 120,
                },
                { id: "ADI", title: "ADI", width: 120 },
              ]}
              handleSelect={(obj: any) => {
                setValue("RENKDERINLIGIID", obj.RENKDERINLIGIID);
                setValue("RENKDERINLIGIADI", obj.RENKDERINLIGIADI);
              }}
              control={control}
            />
          </div>
          <div className="space-y-3">
            <LiteOptionsTable
              label="Sparis Proses"
              name="SIPARISPROSESID"
              link="siparisproses"
              renderValue={(_: string, obj: any) => {
                return obj.SIPARISPROSESID;
              }}
              headColumns={[
                {
                  id: "SIPARISPROSESID",
                  title: "SIPARISPROSESID",
                  width: 120,
                },
                { id: "ADI", title: "ADI", width: 280 },
              ]}
              defaultValue={formData?.SIPARISPROSESID}
              handleSelect={(obj: any) => {
                setValue("SIPARISPROSESID", obj.SIPARISPROSESID);
                setValue("SIPARISPROSESADI", obj.ADI);
              }}
              control={control}
            />

            <div className="grid grid-cols-2 gap-x-3">
              <HFTextField
                label="Musteri Siparis No"
                name="MUSTERISIPARISNO"
                control={control}
                defaultValue={formData?.MUSTERISIPARISNO}
                handleChange={handleFormChange}
              />

              <HFTextField
                type="number"
                label="Ref Siparis No"
                name="REFERANSSIPARISNO"
                control={control}
                defaultValue={formData?.REFERANSSIPARISNO}
                handleChange={handleFormChange}
              />
            </div>

            <HFTextField
              label="Melanj kodu"
              name="MELANJKODU"
              control={control}
              defaultValue={formData?.MELANJKODU}
              handleChange={handleFormChange}
            />

            <div className="grid grid-cols-2 gap-x-3">
              <HFTextField
                type="number"
                label="Fire oran"
                name="MAXIMUMFIREORANI"
                control={control}
                defaultValue={formData?.MAXIMUMFIREORANI}
                handleChange={handleFormChange}
              />

              <HFTextField
                label="Hata Puan Carpan"
                name="HATAPUANICARPANI"
                control={control}
                handleChange={handleFormChange}
              />
            </div>
            <LiteOptionsTable
              label="Desen No"
              name="DESENID"
              link="desen"
              renderValue={(_: string, obj: any) => {
                return obj.DESENID && obj.ADI
                  ? obj.DESENID + " - " + obj.ADI
                  : obj.DESENID;
              }}
              headColumns={[
                {
                  id: "DESENID",
                  title: "DESENID",
                  width: 120,
                },
                { id: "ADI", title: "ADI", width: 280 },
              ]}
              defaultValue={formData?.DESENID}
              handleSelect={handleDesenSelect}
              control={control}
            />

            <LiteOptionsTable
              label="Islem Tipi"
              name="ISLEMTIPIID"
              link="islemtipi"
              renderValue={(_: string, obj: any) => {
                return obj.ISLEMTIPIID;
              }}
              headColumns={[
                {
                  id: "ISLEMTIPIID",
                  title: "ISLEMTIPIID",
                  width: 90,
                },
                { id: "ADI", title: "ADI", width: 120 },
              ]}
              defaultValue={formData?.ILAVEISLEMLER}
              handleSelect={(obj: { ISLEMTIPIID: number }) => {
                setValue("ISLEMTIPIID", obj.ISLEMTIPIID);
                handleDirtyPlaces("ISLEMTIPIID");
              }}
              control={control}
            />
          </div>

          <div className="space-y-3">
            <HFTextarea
              label="Planlama Notu"
              name="PLANLAMANOTU"
              defaultValue={formData?.PLANLAMANOTU}
              control={control}
              minRows={3}
              handleChange={(value: any) =>
                handleTextareaChange("PLANLAMANOTU", value)
              }
            />
            <HFTextarea
              label="Siparis Notu"
              name="SIPARISNOTU"
              defaultValue={formData?.SIPARISNOTU}
              control={control}
              minRows={3}
              handleChange={(value: any) =>
                handleTextareaChange("SIPARISNOTU", value)
              }
            />
            <HFTextarea
              label="Termin Notu"
              name="TERMINNOTU"
              defaultValue={formData?.TERMINNOTU}
              control={control}
              minRows={3}
              handleChange={(value: any) =>
                handleTextareaChange("TERMINNOTU", value)
              }
            />
            <div>
              <CLabel title="ONAYDURUMU" />
              <CCheckbox
                element={{
                  label: "ONAYDURUMU",
                  name: "ONAYDURUMU",
                  control: control,
                }}
                checked={formData?.ONAYDURUMU}
                handleCheck={handleCheckboxChange}
              />
            </div>
          </div>
        </div>
        <SubmitCancelButtons
          uniqueID={uniqueID}
          type={
            formId ? "update boya siparis detay" : "create boya siparis detay"
          }
          handleActions={handleActions}
        />
      </form>
    ),
    [
      handleSubmit,
      onSubmit,
      handleKaliteSelect,
      handleHamSelect,
      handleFormChange,
      handleDovizSelect,
      handleLabReceteSelect,
      handleRenkSelect,
      handleRenkDerinligiSelect,
      handleSiparisProsesSelect,
      handleDesenSelect,
      handleDesenVaryantSelect,
      handleTextareaChange,
      handleCheckboxChange,
      control,
      formData,
      kaliteData,
      receteData,
      DESENID,
      PANTONEKODU,
      LABRECETEID,
      getValues,
      handleActions,
      uniqueID,
      formId,
      isPending,
    ]
  );

  return (
    <>
      <CNewMiniModal title={title} handleActions={handleActions}>
        {formContent}
      </CNewMiniModal>
      {/* {isDirty && (
        <CNewMiniModal title=" " handleActions={handleDirtyPlacesReset}>
          <div className="w-[400px]">
            <p>{t("you_have_changes")}</p>
            <div className="flex space-x-2 mt-5">
              <button
                className="cancel-btn"
                type="button"
                onClick={handleDirtyPlacesReset}
              >
                Cancel
              </button>
              <button
                className="custom-btn"
                type="button"
                onClick={handleFormSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </CNewMiniModal>
      )} */}
    </>
  );
};
