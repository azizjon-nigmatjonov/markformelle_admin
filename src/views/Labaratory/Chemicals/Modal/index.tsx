import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CollapseUI } from "../../../../components/CElements/CCollapse";
import { ModalTypes } from "../interfaces";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { useGetUrunTypeList } from "../../../../hooks/useFetchRequests/useUrunType";
import { ModalTableLogic, TablesLogic } from "./Logic";
import { LabModalTables } from "./Tables";
import { InputFields } from "./Components/InputFields";
import { GetCurrentDate } from "../../../../utils/getDate";
import { ColorMaterial } from "./Components/ColorMaterial";
import CNewModal from "../../../../components/CElements/CNewModal";
import dayjs from "dayjs";

interface ModalUIProps {
  defaultData?: ModalTypes;
  URUNBIRIMID?: string;
  ADI?: string;
  handleModalActions: (val: string, val2: string) => void;
  modalInitialData: any;
  open: boolean;
  showUI: boolean;
  firmaData: any;
  setShowUI: (val: boolean) => void;
  filterParamsFirm: any;
  setFilterParamsFirm: (val: any) => void;
}

export const ModalUI = ({
  open = false,
  defaultData = {},
  handleModalActions,
  showUI = false,
  setShowUI = () => {},
  firmaData,
  modalInitialData = [],
  filterParamsFirm,
  setFilterParamsFirm,
}: ModalUIProps) => {
  const { t } = useTranslationHook();
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 100 });
  const [formId, setFormId] = useState<number>(0);
  const [disabled, setDisabled] = useState(true);
  const { control, handleSubmit, setValue, getValues, reset } = useForm<any>({
    mode: "onSubmit",
  });

  const { createForm, updateForm, formData } = ModalTableLogic({
    filterParams,
    setFormId,
    urunId: defaultData?.LABRECETEID || formId,
  });

  const { tableData } = TablesLogic({ formId: formData?.LABRECETEID });

  useEffect(() => {
    if (formId) setDisabled(false);
  }, [formId]);

  useEffect(() => {
    if (!open) setShowUI(false);
  }, [open]);

  const {
    setFilterParams: setUrunTypeFilterParams,
    filterParams: urunTypeFilterParams,
    urunTypeData,
  } = useGetUrunTypeList({});

  // {
  //   "ADI": "T-SINIY-10",
  //   "FIRMAID": "M0868",
  //   "TALEPTARIHI": "2025-05-27T00:00:00",
  //   "LABRECETEGRUPID": 2,
  //   "LABRENKGRUPID": 14,
  //   "USTASAMAID": 8,
  //   "HAMID": 312,
  //   "DOVIZID": "USD",
  //   "ACIKLAMA": "Молочнный3",
  //   "ESKILABRECETEKODU": "C-93 2411",
  //   "PANTONEKODU": "TCX 19-4116",
  //   "RECETETURUID": 3,
  //   "NOTU": null,
  //   "RENKDERINLIGIID": 0,
  //   "IPTAL": false,
  //   "ESKITIPRECETE": false,
  //   "KALITEID": null,
  //   "INSERTKULLANICIID": 1,
  //   "INSERTTARIHI": "2025-05-27T20:30:27",
  //   "KULLANICIID": 1,
  //   "DEGISIMTARIHI": "2025-05-27T20:30:27"
  //   }

  const onSubmit = (data: any) => {
    let params: any = data;
    params.TALEPTARIHI = dayjs();
    params.LABRECETEGRUPID = 2;
    params.NOTU = null;
    params.IPTAL = params?.IPTAL ? true : false;
    params.ESKITIPRECETE = false;
    params.ESKITIPRECETE = false;
    params.INSERTKULLANICIID = 1;
    params.INSERTTARIHI = dayjs();
    params.KULLANICIID = 1;
    params.DEGISIMTARIHI = dayjs();
    console.log("params", params);

    if (formId) {
      params = { ...formData, ...params };
      delete params.BOYATIPIADI;

      updateForm(formData, formId);
    } else {
      params.DEGISIMTARIHI = dayjs();
      delete params.UNITEADI;

      createForm(params);
    }
  };

  const setFormValues = (form: any) => {
    setValue("RECETETURUID", form.RECETETURUID);
    setValue("USTASAMAID", form.USTASAMAID);
    setValue("USTASAMAADI", form.USTASAMAADI);
    setValue("HAMID", form.HAMID);
    setValue("HAMADI", form.HAMADI);
    setValue("DOVIZID", form.DOVIZID);
    setValue("ESKILABRECETEKODU", form.ESKILABRECETEKODU);
    setValue("RENKDERINLIGIID", form.RENKDERINLIGIID);
    setValue("RENKDERINLIGIADI", form.RENKDERINLIGIADI);
    setValue("IPTAL", form.IPTAL);
    setValue("FASON", form.FASON);

    setValue("LABRECETEKODU", form.LABRECETEKODU);
    setValue("LABRECETEID", form.LABRECETEID);
    setValue("ACIKLAMA", form.ACIKLAMA);
    setValue("ADI", form.ADI);
    setValue("FIRMAID", form.FIRMAID);
    setValue("FIRMAADI", form.FIRMAADI);
    setValue("PANTONEKODU", form.PANTONEKODU);
    setValue("KULLANICIADI", form.KULLANICIADI);

    setValue("USTASAMAADI", form.USTASAMAADI);
    setValue("ESKILABRECETEKODU", form.ESKILABRECETEKODU);
    setValue("RECETETURAADI", form.RECETETURAADI);
    setValue(
      "TALEPTARIHI",
      GetCurrentDate({ date: form.TALEPTARIHI, type: "usually" })
    );
  };

  const setInitialFormValues = () => {
    setValue("FIRMAID", "M0868");
    setValue(
      "TALEPTARIHI",
      GetCurrentDate({
        date: GetCurrentDate({ type: "usually" }),
        type: "usually",
      })
    );
  };

  useEffect(() => {
    if (formData?.LABRECETEKODU) {
      setFormValues(formData);
    } else {
      setInitialFormValues();
    }
  }, [formData]);

  useEffect(() => {
    if (formData?.LABRECETEKODU && open && defaultData?.LABRECETEID) {
      setTimeout(() => {
        setShowUI(true);
      }, 0);
    }
    if (!defaultData?.LABRECETEID && open) setShowUI(true);
  }, [formData, defaultData, open]);

  useEffect(() => {
    if (defaultData?.LABRECETEID) setFormId(defaultData.LABRECETEID);
  }, [defaultData, disabled]);

  const handleModal = (status: string, id: string) => {
    handleModalActions(status, id);
    if (status === "close") {
      setFormId(0);
      reset();
    }
    if (status === "delete") {
      setFormId(0);
      reset();
    }
  };

  return open ? (
    <CNewModal
      title={t(
        modalInitialData.LABRECETEID ? "updating_chemical" : "creating_chemical"
      )}
      handleActions={handleModal}
      defaultData={{
        id: modalInitialData?.LABRECETEID,
      }}
      showUI={showUI}
      disabled="big"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <div className="pb-5">
          <div
            className={`grid grid-cols-3 gap-x-5 border-b border-[var(--border)] pb-5`}
          >
            <div>
              <InputFieldUI title={t("LABRECETEKODU")} disabled={disabled}>
                <SelectOptionsTable
                  name="LABRECETEKODU"
                  placeholder={t("LABRECETEKODU")}
                  options={urunTypeData?.data}
                  required={true}
                  headColumns={[{ id: "ADI", title: "ADI", width: 200 }]}
                  filterParams={urunTypeFilterParams}
                  handleSelect={(obj: { ADI: string }) => {
                    setValue("LABRECETEKODU", obj.ADI);
                  }}
                  handleSearch={(val: string) => {
                    setUrunTypeFilterParams({
                      ...urunTypeFilterParams,
                      q: val,
                    });
                  }}
                  control={control}
                  setFilterParams={setUrunTypeFilterParams}
                />
              </InputFieldUI>
            </div>
            <ColorMaterial PANTONEKODU={formData.PANTONEKODU} />
            <div className="flex justify-end">
              <div className="w-[200px]">
                <button
                  className="custom-btn"
                  style={{ backgroundColor: disabled ? "var(--gray)" : "" }}
                  type={disabled ? "button" : "submit"}
                >
                  {t(formId ? "update" : "create")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <InputFields
          control={control}
          setValue={setValue}
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          firmaData={firmaData}
          filterParamsFirm={filterParamsFirm}
          setFilterParamsFirm={setFilterParamsFirm}
          getValues={getValues}
        />
      </form>
      <LabModalTables
        disabled={disabled}
        tableData={tableData}
        formId={formId}
      />
    </CNewModal>
  ) : (
    <></>
  );
};
