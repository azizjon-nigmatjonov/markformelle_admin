import { ReactNode, useEffect, useState } from "react";
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
// const schema = Validation;
interface ModalUIProps {
  defaultData?: ModalTypes;
  URUNBIRIMID?: string;
  ADI?: string;
}

const FieldUI = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between space-x-3 whitespace-nowrap">
      <p className="text-sm">{title}</p>
      <hr className="w-full border-t-[3px] border-dotted border-[var(--border)]" />
      <div className="max-w-[30%] min-w-[30%]">{children}</div>
    </div>
  );
};

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
    testForm,
  } = ModalTableLogic({
    filterParams,
    setFormId,
    setDisabled,
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
  const onSubmit = (data: any) => {
    const params: any = data;

    if (formId) {
      updateForm(params, formId);
    } else {
      params.DEGISIMTARIHI = dayjs();
      params.KULLANICIID = 1;
      params.INSERTKULLANICIID = 1;
      params.KDVORANI = 0;
      params.KULLANICIADI = "Supervisor";
      createForm(params);
    }
    console.log("params", params);
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-3 flex justify-between space-x-2">
          <div className="flex space-x-3 items-center">
            <InputFieldUI title={t("URUNID")}>
              <HFTextField
                name="URUNID"
                control={control}
                setValue={setValue}
              />
            </InputFieldUI>
            <InputFieldUI title={t("ADI")}>
              <HFTextField name="ADI" control={control} setValue={setValue} />
            </InputFieldUI>
            <button
              className="bg-[var(--primary)] w-[40px] h-[30px] flex items-center justify-center rounded-[8px]"
              type="button"
              onClick={() => {
                const val = getValues()?.URUNID || "";

                testForm(val.toLocaleLowerCase());
              }}
            >
              <SearchIcon fill="white" width={18} />
            </button>
          </div>

          <div>
            <button className="custom-btn" type="submit">
              {t(disabled ? "update" : "create")}
            </button>
          </div>
        </div>
        <div className="w-1/3">
          <Alert severity={"info"}>
            {t("after_you_add_urun_id_you_can_continue")}
          </Alert>
        </div>

        <CollapseUI title={t("urun_form")}>
          <div className="flex gap-x-10">
            <div className="space-y-3 w-full">
              <FieldUI title={t("URUNTIPIADI")}>
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
              </FieldUI>
              <FieldUI title={t("BOYATIPIADI")}>
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
              </FieldUI>

              <FieldUI title={t("MUTFAKDEPONO")}>
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
              </FieldUI>

              <FieldUI title={t("UNITEID")}>
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
              </FieldUI>
            </div>
            <div className="space-y-3 w-full">
              <FieldUI title={t("BARKOD")}>
                <HFTextField
                  name="BARKOD"
                  control={control}
                  setValue={setValue}
                  disabled={disabled}
                />
              </FieldUI>
              {/* <FieldUI title={t("KULLANICIADI")}>
                <HFTextField
                  name="KULLANICIADI"
                  control={control}
                  setValue={setValue}
                />
              </FieldUI> */}

              <FieldUI title={t("NOTU")}>
                <HFTextField
                  name="NOTU"
                  control={control}
                  setValue={setValue}
                  disabled={disabled}
                />
              </FieldUI>
              <div className="grid grid-cols-3 gap-x-2">
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
            </div>
          </div>
        </CollapseUI>
        <CollapseUI title={t("urun_birim_table")} defaultOpen={true}>
          <CNewTable
            headColumns={headColumns}
            bodyColumns={tableData?.data ?? []}
            handleActions={handleActions}
            isLoading={false}
            filterParams={filterParams}
            handleFilterParams={setFilterParams}
            disablePagination={true}
            autoHeight={"440px"}
            disabled={disabled}
          />
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
