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
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { Validation } from "./Validation";
import HFInputMask from "../../../../../components/HFElements/HFInputMask";
import { RootState } from "../../../../../store";
const schema = Validation();

interface PaintFormData {
  HAMID: string;
  RENKDERINLIGIID: number;
  ISLEMTIPIID: number;
  // BIRIMFIYAT: number;
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
  NOTU?: string;
  PLANLAMANOTU?: string;
  TERMINNOTU?: string;
  HATAPUANICARPANI?: string;
  DESENID?: string;
  PANTONEKODU?: string;
  LABRECETEID?: number;
  HAMADI?: string | number;
  ENISTENEN?: string;
  GRAMAJISTENEN?: string;
  MUSTERISIPARISNO?: string;
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
  // Missing fields that are being set
  LABRECETEATISNO?: string;
  RENKDERINLIGIADI?: string;
  SIPARISKILO?: number;
  SIPARISBRUTKILO?: number;
  REFERANSSIPARISNO?: string;
  MAXIMUMFIREORANI?: string;
  ATISNO?: string;
  SIPARISPROSESADI?: string;
}

export const PaintForm = ({
  handleActions,
  uniqueID,
  defaultData,
  title,
  parentId,
  refetch,
  siparisId,
  handleModalActions,
}: {
  handleActions: (val: string) => void;
  uniqueID: string;
  defaultData: any;
  parentId: number;
  title: string;
  refetch: () => void;
  isDirty: boolean;
  siparisId: number;
  handleModalActions: (val: string) => void;
}) => {
  const dispatch = useDispatch();
  const [formId, setFormId] = useState(null);
  const [_, startTransition] = useTransition();

  // Configure useForm with proper mode to prevent excessive re-renders
  const { control, setValue, handleSubmit, watch, getValues } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  // Only watch the fields that are actually needed for conditional rendering
  const DESENID = watch("DESENID");
  const [PANTONEKODU, setPANTONEKODU] = useState("");
  const LABRECETEID = watch("LABRECETEID");

  // Memoize the closeFn to prevent PaintFormLogic from re-creating
  const closeFn = useCallback(() => {
    handleModalActions("Close");
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
          // params.SIRANO = 999212121213232;
          params.FIRMASEVKADRESIID = 904;
          params.SIPARISPROSESID = Number(params.SIPARISPROSESID);
          params.RENKID = Number(params.RENKID);
          params.INSERTKULLANICIID = 1;
          params.ISLEMGRUBUID = 1;
          params.FEINE = Number(params.FEINE || 0);
          params.PUS = Number(params.PUS || 0);
          params.MUSTERIKALITENO = "2";
          params.TERMINTARIHI = dayjs();
          params.SONTERMINTARIHI = dayjs();
          params.INSERTTARIHI = dayjs();
          params.DEGISIMTARIHI = dayjs();
          params.HATAPUANICARPANI = Number(params.HATAPUANICARPANI || 0);
          params.BOYASIPARISYIL = dayjs().year();
          params.BOYASIPARISID = siparisId;
          params.FIRMAADI = "MARK FORMELLE";
          params.FIRMASEVKADRESIADI = "Firma Tanıtım Adresi";
          params.RECETEDEGISIMTARIHI = dayjs();
          params.RECETEGIRISTARIHI = dayjs();
          params.RECETEDEGISIMKULLANICIID = 43;
          // params.MUSTERISIPARISNO = Number(params.MUSTERISIPARISNO || 0);
          // params.REFERANSSIPARISNO = Number(params.REFERANSSIPARISNO || 0);
          // params.DESENID = Number(params.DESENID || 0);

          createForm(params);
        }
      });
    },
    [formId, formData, updateForm, createForm, parentId, startTransition]
  );

  const setFormValues = useCallback(
    (form: any) => {
      if (!form) return;

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
      setValue("KALITEID", obj.KALITEID);
      setKaliteData(obj);
      setValue("HAMADI", obj.HAMID + "");
      setValue("HAMID", obj.HAMADI);
      setValue("FEINE", obj.FEINE);
      setValue("PUS", obj.PUS);
      setValue("GRAMAJISTENEN", obj.GRAMAJISTENEN);
      setValue("ENISTENEN", obj.ENISTENEN);
      handleDirtyPlaces("KALITEID");
    },
    [setValue, handleDirtyPlaces]
  );

  const handleHamSelect = useCallback(
    (data: { HAMID: string }) => {
      setValue("HAMADI", data.HAMID);
      setValue("HAMID", data.HAMID);
      handleDirtyPlaces("HAMID");
    },
    [setValue, handleDirtyPlaces]
  );

  const handleDovizSelect = useCallback(
    (obj: { DOVIZID: string }) => {
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

  const handleRenkDerinligiSelect = useCallback(
    (obj: { RENKDERINLIGIID: number }) => {
      setValue("RENKDERINLIGIID", obj.RENKDERINLIGIID);
      handleDirtyPlaces("RENKDERINLIGIID");
    },
    [setValue, handleDirtyPlaces]
  );

  const handleSiparisProsesSelect = useCallback(
    (obj: { SIPARISPROSESID: number }) => {
      setValue("SIPARISPROSESID", obj.SIPARISPROSESID);
      handleDirtyPlaces("SIPARISPROSESID");
    },
    [setValue, handleDirtyPlaces]
  );

  const handleDesenVaryantSelect = useCallback(
    (obj: { DESENVARYANTID: number }) => {
      setValue("DESENVARYANTID", obj.DESENVARYANTID);
      handleDirtyPlaces("DESENVARYANTID");
    },
    [setValue, handleDirtyPlaces]
  );

  useEffect(() => {
    if (formData?.LABRECETEATISNO) {
      startTransition(() => {
        setValue("LABRECETEATISNO", formData.LABRECETEATISNO);
        setValue("RENKDERINLIGIID", formData.RENKDERINLIGIID);
        setValue("RENKDERINLIGIADI", formData.RENKDERINLIGIADI);
        setValue("ENISTENEN", formData.ENISTENEN);
        setValue("GRAMAJISTENEN", formData.GRAMAJISTENEN);
        setValue("SIPARISKILO", formData.SIPARISKILO);
        setValue("SIPARISBRUTKILO", formData.SIPARISBRUTKILO);
        setValue("BIRIMFIYAT", formData.BIRIMFIYAT);
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

  const SIPARISKILO = watch("SIPARISKILO");
  const MAXIMUMFIREORANI = watch("MAXIMUMFIREORANI");
  const defaultBrutoKilo = useMemo(() => {
    return SIPARISKILO && MAXIMUMFIREORANI
      ? Number(SIPARISKILO) * (1 + Number(MAXIMUMFIREORANI) / 100)
      : 0;
  }, [SIPARISKILO, MAXIMUMFIREORANI]);

  const modalType = useSelector((state: RootState) => state.website.modalType);
  return (
    <>
      <CNewMiniModal title={title} handleActions={handleActions}>
        <form
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          onSubmit={handleSubmit(onSubmit as any)}
          className="w-[1000px]"
        >
          <div className="grid grid-cols-3 gap-4 mb-3">
            <div className="space-y-3">
              <LiteOptionsTable
                label="Kalite no"
                renderValue={(_: string, obj: any) => {
                  return obj.KALITEID;
                }}
                handleSelect={(obj: any) => {
                  setValue("KALITEID", obj.KALITEID);
                  setKaliteData(obj);
                  setValue("HAMADI", obj.HAMADI);
                  setValue("HAMID", obj.HAMID);
                  setValue("FEINE", obj.FEINE);
                  setValue("PUS", obj.PUS);
                  setValue("GRAMAJISTENEN", obj.GRAMAJISTENEN);
                  setValue("ENISTENEN", obj.ENISTENEN);
                  handleDirtyPlaces("KALITEID");
                }}
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

              <HFTextField disabled name="HAMADI" control={control} />
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
              <div className="grid grid-cols-3 gap-x-3">
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
                  label="Fire oran"
                  name="MAXIMUMFIREORANI"
                  control={control}
                  defaultValue={formData?.MAXIMUMFIREORANI}
                  handleChange={handleFormChange}
                />
                <HFTextField
                  type="number"
                  label="Brut Kilo"
                  name="SIPARISBRUTKILO"
                  control={control}
                  handleChange={handleFormChange}
                  disabled
                  defaultValue={defaultBrutoKilo}
                />
              </div>

              <div className="grid grid-cols-2 gap-x-3">
                <HFTextField
                  label="Birim fiyat"
                  name="BIRIMFIYAT"
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

              {/* mask input = TCX 99-9999 */}

              <HFInputMask
                name="PANTONEKODU"
                label="Panton kodu"
                defaultValue="TCX "
                mask="TCX 99-9999"
                control={control}
                handleChange={(val) => {
                  if (val && !val.startsWith("TCX ")) {
                    const formattedValue = `TCX ${val}`;
                    setValue("PANTONEKODU", formattedValue);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setPANTONEKODU(getValues()?.PANTONEKODU || "");
                  }
                }}
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
                    defaultFilters={`${
                      PANTONEKODU ? `PANTONEKODU=${PANTONEKODU}` : ""
                    }`}
                    headColumns={[
                      {
                        id: "LABRECETEKODU",
                        title: "LABRECETEKODU",
                        width: 140,
                      },
                      { id: "LABRECETEID", title: "LABRECETEID", width: 110 },
                      { id: "ADI", title: "ADI", width: 140 },
                    ]}
                    defaultValue={formData?.LABRECETEKODU}
                    handleSelect={(obj: any) => {
                      setValue("LABRECETEKODU", obj.LABRECETEKODU);
                      setValue("LABRECETEID", obj.LABRECETEID);
                      setReceteData(obj);
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
                    { id: "ATISNO", title: "ATISNO", width: 60 },
                    {
                      id: "DEGISIMTARIHI",
                      title: "DEGISIMTARIHI",
                      render: (val: string) => {
                        return dayjs(val).format("DD.MM.YYYY HH:mm");
                      },
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
                      ? `LABRECETEID=${receteData?.LABRECETEID}`
                      : ""
                  }
                  handleSelect={(obj: any) => {
                    setValue("LABRECETEATISID", obj.LABRECETEATISID);
                    setValue("ATISNO", obj.ATISNO);
                    setValue("RECETEASAMAADI", obj.RECETEASAMAADI);
                    setReceteData(obj);
                  }}
                  control={control}
                />
              </div>
              <LiteOptionsTable
                label="Renk"
                name="RENKID"
                renderValue={(_: string, obj: any) => {
                  return obj.ADI ? obj.ADI : obj.RENKID;
                }}
                defaultValue={formData?.RENKADI}
                defaultFilters={receteData?.ADI ? `ADI=${receteData?.ADI}` : ""}
                link="renk"
                headColumns={[
                  { id: "RENKID", title: "RENKID", width: 80 },
                  { id: "ADI", title: "ADI", width: 280 },
                ]}
                handleSelect={(obj: { RENKID: number }) => {
                  setValue("RENKID", obj.RENKID);
                }}
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
                  receteData?.RENKDERINLIGIID ||
                  receteData?.RENKDERINLIGIID === 0
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
                  return obj.SIPARISPROSESID && obj?.ADI
                    ? obj.SIPARISPROSESID + " - " + obj.ADI
                    : obj.SIPARISPROSESID;
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

              <div className="grid grid-cols-2 gap-x-3">
                <HFTextField
                  label="Melanj kodu"
                  name="MELANJKODU"
                  control={control}
                  defaultValue={formData?.MELANJKODU}
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
                handleSelect={(obj: { DESENID: number }) => {
                  setValue("DESENID", obj.DESENID + "");
                }}
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

              <LiteOptionsTable
                label="Siparis Tipi"
                name="SIPARISTIPIID"
                link="boyasiparistipi"
                renderValue={(_: string, obj: any) => {
                  return obj.SIPARISTIPIID && obj?.ADI
                    ? obj.SIPARISTIPIID + " - " + obj.ADI
                    : obj.ADI;
                }}
                headColumns={[
                  {
                    id: "SIPARISTIPIID",
                    title: "SIPARISTIPIID",
                    width: 90,
                  },
                  { id: "ADI", title: "ADI", width: 120 },
                ]}
                defaultValue={formData?.ILAVEISLEMLER}
                handleSelect={(obj: { ISLEMTIPIID: number }) => {
                  setValue("ISLEMTIPIID", obj.ISLEMTIPIID);
                }}
                control={control}
              />

              <LiteOptionsTable
                label="Tip"
                name="TIPID"
                staticOptions={[
                  {
                    TIPID: 1,
                    ADI: "TUP",
                  },
                  {
                    TIPID: 2,
                    ADI: "ACIK EN",
                  },
                  {
                    TIPID: 3,
                    ADI: "MAYLI",
                  },
                ]}
                renderValue={(_: string, obj: any) => {
                  return obj.ADI ? obj.ADI : obj.TIPID;
                }}
                headColumns={[
                  {
                    id: "TIPID",
                    title: "TIPID",
                    width: 90,
                  },
                  { id: "ADI", title: "ADI", width: 120 },
                ]}
                defaultValue={"ACIK EN"}
                handleSelect={(obj: { ADI: string }) => {
                  setValue("TIPID", obj.ADI);
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
        {modalType === "desen" && (
          <CNewMiniModal
            title="Desen Tanitimi"
            type="inner"
            handleActions={() => {
              dispatch(websiteActions.setModalType(""));
            }}
          >
            <form>
              <SubmitCancelButtons
                uniqueID={uniqueID}
                type="create desen"
                handleActions={handleActions}
              />
            </form>
          </CNewMiniModal>
        )}
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
