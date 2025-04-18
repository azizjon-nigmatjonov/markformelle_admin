import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import CCheckbox from "../../../../components/CElements/CCheckbox";
import { CollapseUI } from "../../../../components/CElements/CCollapse";
import { IModalForm, ModalTypes } from "../interfaces";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { useGetUniteList } from "../../../../hooks/useFetchRequests/useUniteList";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { useGetUrunTypeList } from "../../../../hooks/useFetchRequests/useUrunType";
import { useGetPaintTypeList } from "../../../../hooks/useFetchRequests/usePaintType";
import { useGetDepoList } from "../../../../hooks/useFetchRequests/useDepoList";
import CNewTable from "../../../../components/CElements/CNewTable";
import { ModalTableLogic } from "./Logic";
import { GetCurrentDate } from "../../../../utils/getDate";
import { TableForm } from "./TableForm";
import dayjs from "dayjs";
import { Alert } from "@mui/material";
import { SearchIcon } from "../../../../components/UI/IconGenerator/Svg";
import axios from "axios";
const API_URL = import.meta.env.VITE_TEST_URL;
// import { SearchIcon } from "../../../../components/UI/IconGenerator/Svg";
// const schema = Validation;
interface ModalUIProps {
  defaultData?: ModalTypes;
  URUNBIRIMID?: string;
  ADI?: string;
}

export const ModalUI = ({ defaultData = {} }: ModalUIProps) => {
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 100 });
  const { t } = useTranslationHook();
  const [open, setOpen] = useState(false);
  const [formId, setFormId] = useState<string>("");
  const [disabled, setDisabled] = useState(true);
  const [modalInitialData, setModalInitialData] = useState<ModalUIProps>({});

  const {
    headColumns,
    tableData,
    refetch,
    createForm,
    updateForm,
    deleteFn,
    formData,
  } = ModalTableLogic({
    filterParams,
    setFormId,
    urunId: defaultData?.URUNID || formId,
  });

  useEffect(() => {
    if (formId) setDisabled(false);
  }, [formId]);

  const {
    setFilterParams: setUrunTypeFilterParams,
    filterParams: urunTypeFilterParams,
    urunTypeData,
  } = useGetUrunTypeList({});

  const {
    setFilterParams: setDepoFilterParams,
    filterParams: depoFilterParams,
    depoData,
  } = useGetDepoList();

  const {
    setFilterParams: setPaintTypeFilterParams,
    filterParams: paintTypeFilterParas,
    paintTypeData,
  } = useGetPaintTypeList({});

  const {
    filterParams: uniteFilerParams,
    setFilterParams: setUniteFilterParams,
    uniteData,
  } = useGetUniteList();

  // console.log("formData", formData);
  // console.log("defaultData", defaultData);

  const { control, handleSubmit, setValue, getValues } = useForm<IModalForm>({
    mode: "onSubmit",
    // resolver: yupResolver(schema),
  });

  // {
  //   "URUNID": "OY001",
  //   "ADI": "test",
  //   "URUNTIPIID": 0,
  //   "BOYATIPIID": 1,
  //   "MUTFAKDEPONO": "D008",
  //   "UNITEID": 1,
  //   "KIMYASALTIPIID": null,
  //   "KDVORANI": 0,
  //   "NOTU": "test",
  //   "TEMINSURESI": 0,
  //   "RAF": null,
  //   "TRANSFERKODU": null,
  //   "ENVANTEREDAHIL": true,
  //   "SONALISSTOKDETAYID": null,
  //   "SONALISTARIHI": "2025-04-18T06:03:48.648Z",
  //   "BARKOD": "string",
  //   "KAPALI": false,
  //   "INSERTKULLANICIID": 1,
  //   "INSERTTARIHI": "2025-04-18T06:03:48.648Z",
  //   "DEGISIMTARIHI": "2025-04-18T06:03:48.648Z",
  //   "KULLANICIID": 1
  // }

  const onSubmit = (data: any) => {
    const params: any = data;

    createForm(params);
    if (formId) {
      delete params.BOYATIPIADI;
      delete params.KULLANICIADI;
      delete params.URUNTIPIADI;
      delete params.UNITEADI;
      updateForm(params, formId);
    } else {
      params.DEGISIMTARIHI = dayjs();
      params.KULLANICIID = 1;
      params.INSERTKULLANICIID = 1;
      params.KDVORANI = 0;
      params.KULLANICIADI = "Supervisor";
      params.INSERTTARIHI = dayjs();
      params.SONALISTARIHI = dayjs();
      params.KIMYASALTIPIID = null;
      params.TEMINSURESI = 0;
      params.RAF = null;
      params.TRANSFERKODU = null;
      params.SONALISSTOKDETAYID = null;

      delete params.BOYATIPIADI;
      delete params.KULLANICIADI;
      delete params.URUNTIPIADI;
      delete params.UNITEADI;

      createForm(params);
    }
    // console.log("params", params);
  };

  useEffect(() => {
    if (formData?.URUNID) {
      setValue("URUNID", formData.URUNID);
      setValue("UNITEID", formData.UNITEID);
      setValue("UNITEADI", formData.UNITEADI);
      setValue("ADI", formData.ADI);
      setValue("BARKOD", formData.BARKOD);

      setValue("MUTFAKDEPONO", formData.MUTFAKDEPONO);

      setValue("BOYATIPIID", formData.BOYATIPIID);
      setValue("BOYATIPIADI", formData.BOYATIPIADI);

      setValue("URUNTIPIID", formData.URUNTIPIID);
      setValue("URUNTIPIADI", formData.URUNTIPIADI);
      setValue("KULLANICIADI", formData.KULLANICIADI);
      setValue("INSERTTARIHI", formData.INSERTTARIHI);
      setValue("ENVANTEREDAHIL", formData.ENVANTEREDAHIL);

      setValue(
        "DEGISIMTARIHI",
        GetCurrentDate({ type: "usually", date: formData.DEGISIMTARIHI })
      );
    } else {
      setValue("KAPALI", false);
      setValue("ENVANTEREDAHIL", false);
      setValue("BOYATIPIADI", "");
      setValue("URUNTIPIADI", "");
      setValue("UNITEADI", "");
      setValue("URUNTIPIADI", "");
      setValue("MUTFAKDEPONO", "");
      setValue("URUNID", "");
    }
  }, [formData]);

  useEffect(() => {
    if (defaultData?.URUNID) {
      setFormId(defaultData.URUNID);
    }
  }, [defaultData]);

  const handleActions = (el: any, status: string) => {
    setModalInitialData({});
    if (status === "modal") setOpen(true);

    if (status === "view") {
      setOpen(true);
      setModalInitialData(el);
    }

    if (status === "delete") deleteFn([el.URUNRECETEDETAYID]);

    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { URUNRECETEDETAYID: number }) => {
          return item.URUNRECETEDETAYID;
        })
      );
    }
  };

  const handleCheck = () => {
    let urunId = getValues("URUNID") || "";
    urunId = urunId.toLocaleUpperCase();
    axios
      .get(`${API_URL}/urun/${urunId}`)
      .then((res: any) => {
        setFormId(res?.data?.URUNID);
        setDisabled(false);
      })
      .catch(() => {
        setDisabled(false);
      })
      .finally(() => {
        setValue("URUNID", urunId);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-3 flex justify-between space-x-3">
          <div className="flex space-x-2 items-center">
            <div className="min-w-[400px]">
              <InputFieldUI title={t("URUNID")}>
                <div className="w-[200px]">
                  <HFTextField
                    name="URUNID"
                    control={control}
                    setValue={setValue}
                    placeholder={t("URUNID")}
                  />
                </div>
              </InputFieldUI>
            </div>
            <button
              className="bg-[var(--primary)] w-[40px] h-[34px] flex items-center justify-center rounded-[8px]"
              type="button"
              onClick={() => handleCheck()}
            >
              <SearchIcon fill="white" width={18} />
            </button>
          </div>
          <div className="w-full">
            <Alert severity={"info"} style={{ height: "35px" }}>
              {t("add_unique_id")}
            </Alert>
          </div>

          <div className="w-[300px]">
            <button
              className="custom-btn"
              style={{ backgroundColor: disabled ? "var(--gray)" : "" }}
              type={disabled ? "button" : "submit"}
            >
              {t(formId ? "update" : "create")}
            </button>
          </div>
        </div>

        <CollapseUI title={t("urun_form")}>
          <div className="h-[500px] overflow-y-scroll designed-scroll">
            <div className="flex gap-x-10 pb-5">
              <div className="space-y-3 w-full">
                <InputFieldUI title={t("ADI")} disabled={disabled}>
                  <HFTextField
                    name="ADI"
                    control={control}
                    setValue={setValue}
                    disabled={disabled}
                    placeholder={t("ADI")}
                  />
                </InputFieldUI>
                <InputFieldUI title={t("URUNTIPIADI")} disabled={disabled}>
                  <div className="">
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
                      disabled={disabled}
                      setFilterParams={setUrunTypeFilterParams}
                    />
                  </div>
                </InputFieldUI>
                <InputFieldUI title={t("BOYATIPIADI")} disabled={disabled}>
                  <SelectOptionsTable
                    name="BOYATIPIADI"
                    placeholder={t("BOYATIPIID")}
                    options={paintTypeData?.data}
                    required={true}
                    headColumns={[{ id: "ADI", title: "ADI", width: 200 }]}
                    filterParams={paintTypeFilterParas}
                    handleSelect={(obj: any) => {
                      setValue("BOYATIPIID", obj.BOYATIPIID);
                      setValue("BOYATIPIADI", obj.ADI);
                    }}
                    handleSearch={(val: string) => {
                      setPaintTypeFilterParams({
                        ...paintTypeFilterParas,
                        q: val,
                      });
                    }}
                    disabled={disabled}
                    control={control}
                    setFilterParams={setPaintTypeFilterParams}
                  />
                </InputFieldUI>

                <InputFieldUI title={t("MUTFAKDEPONO")} disabled={disabled}>
                  <SelectOptionsTable
                    name="MUTFAKDEPONO"
                    placeholder={t("MUTFAKDEPONO")}
                    options={depoData?.data}
                    required={true}
                    headColumns={[
                      { id: "DEPOID", title: "DEPOID", width: 200 },
                      { id: "ADI", title: "ADI", width: 200 },
                    ]}
                    filterParams={depoFilterParams}
                    handleSelect={(obj: any) => {
                      setValue("MUTFAKDEPONO", obj.DEPOID);
                    }}
                    handleSearch={(val: string) => {
                      setDepoFilterParams({ ...depoFilterParams, q: val });
                    }}
                    control={control}
                    setFilterParams={setDepoFilterParams}
                    disabled={disabled}
                  />
                </InputFieldUI>

                <InputFieldUI title={t("UNITEID")} disabled={disabled}>
                  <SelectOptionsTable
                    name="UNITEADI"
                    placeholder={t("UNITEID")}
                    options={uniteData?.data}
                    required={true}
                    headColumns={[{ id: "ADI", title: "ADI", width: 200 }]}
                    filterParams={uniteFilerParams}
                    handleSelect={(obj: any) => {
                      setValue("UNITEID", obj.UNITEID);
                      setValue("UNITEADI", obj.ADI);
                    }}
                    handleSearch={(val: string) => {
                      setUniteFilterParams({ ...uniteFilerParams, q: val });
                    }}
                    control={control}
                    setFilterParams={setUniteFilterParams}
                    disabled={disabled}
                  />
                </InputFieldUI>
                <InputFieldUI title={t("BARKOD")} disabled={disabled}>
                  <HFTextField
                    name="BARKOD"
                    control={control}
                    setValue={setValue}
                    disabled={disabled}
                    placeholder={t("BARKOD")}
                  />
                </InputFieldUI>
              </div>
              <div className="space-y-3 w-full">
                <div className="grid grid-cols-2 gap-x-2">
                  <CCheckbox
                    element={{ label: t("ENVANTEREDAHIL") }}
                    checked={false}
                    handleCheck={(obj: { checked: boolean }) => {
                      setValue("ENVANTEREDAHIL", obj.checked);
                    }}
                    disabled={disabled}
                  />
                  <CCheckbox
                    element={{ label: t("KAPALI") }}
                    checked={false}
                    handleCheck={(obj: { checked: boolean }) => {
                      setValue("KAPALI", obj.checked);
                    }}
                    disabled={disabled}
                  />
                </div>

                <div>
                  <textarea
                    className="p-3 h-[217px] transparent border border-[var(--border)] outline-none focus:border-[var(--primary)] resize-none rounded-[8px] w-full"
                    rows={9}
                    placeholder={t("NOTU")}
                    onChange={(e: any) => setValue("NOTU", e.target.value)}
                  ></textarea>
                </div>

                {/* <HFTextField
                name="NOTU"
                control={control}
                label={t("NOTU")}
                setValue={setValue}
                disabled={disabled}
              /> */}
              </div>
            </div>

            <div className="ml-[-10px]">
              <CNewTable
                title={t("urun_birim_table")}
                headColumns={headColumns}
                bodyColumns={tableData?.data ?? []}
                handleActions={handleActions}
                isLoading={false}
                filterParams={filterParams}
                handleFilterParams={setFilterParams}
                disablePagination={true}
                autoHeight={"auto"}
                disabled={disabled}
              />
            </div>
          </div>
        </CollapseUI>
      </form>
      {open && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[99]">
          <TableForm
            setOpen={setOpen}
            refetch={refetch}
            formId={modalInitialData?.URUNBIRIMID}
          />

          <div
            className="w-[100vw] h-[100vh] bg-[#00000044] fixed z-[91]"
            onClick={() => setOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
};
