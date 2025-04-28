import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { CollapseUI } from "../../../../components/CElements/CCollapse";
import { IModalForm, ModalTypes } from "../interfaces";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { useGetUrunTypeList } from "../../../../hooks/useFetchRequests/useUrunType";
import { ModalTableLogic, TablesLogic } from "./Logic";
import { TableForm } from "./TableForm";
import dayjs from "dayjs";
import { useGetFirmList } from "../../../../hooks/useFetchRequests/useFirmaList";
import CNewTable from "../../../../components/CElements/CNewTable";
import HFSelect from "../../../../components/HFElements/HFSelect";
import { PlusIcon } from "../../../../components/UI/IconGenerator/Svg";

import { MaterialForm } from "./MaterialForm";

interface ModalUIProps {
  defaultData?: ModalTypes;
  URUNBIRIMID?: string;
  ADI?: string;
}

export const ModalUI = ({ defaultData = {} }: ModalUIProps) => {
  const [anchorMaterial, setAchorMaterial] = useState<null | HTMLElement>(null);
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 100 });
  const { t } = useTranslationHook();
  const [open, setOpen] = useState(false);
  const [formId, setFormId] = useState<string>("");
  const [disabled, setDisabled] = useState(true);
  const [modalInitialData, setModalInitialData] = useState<ModalUIProps>({});
  const { headColumnsTrail } = TablesLogic();
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
    firmaData,
    setFilterParams: setFilterParamsFirm,
    filterParams: filterParamsFirm,
  } = useGetFirmList({});

  const {
    setFilterParams: setUrunTypeFilterParams,
    filterParams: urunTypeFilterParams,
    urunTypeData,
  } = useGetUrunTypeList({});

  const { control, handleSubmit, setValue } = useForm<IModalForm>({
    mode: "onSubmit",
    // resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    let params: any = data;

    if (formId) {
      params = { ...formData, ...params };
      delete params.BOYATIPIADI;

      updateForm(params, formId);
    } else {
      params.DEGISIMTARIHI = dayjs();
      delete params.UNITEADI;

      createForm(params);
    }
  };

  const setFormValues = (form: any) => {
    setValue("URUNID", form.URUNID);
    setValue("UNITEID", form.UNITEID);
    setValue("UNITEADI", form.UNITEADI);
    setValue("ADI", form.ADI);
    setValue("BARKOD", form.BARKOD);

    setValue("MUTFAKDEPONO", form.MUTFAKDEPONO);

    setValue("BOYATIPIID", form.BOYATIPIID);
    setValue("BOYATIPIADI", form.BOYATIPIADI);

    setValue("URUNTIPIID", form.URUNTIPIID);
    setValue("URUNTIPIADI", form.URUNTIPIADI);
    setValue("KULLANICIADI", form.KULLANICIADI);

    setValue("NOTU", form.NOTU);
    setValue("KAPALI", form.KAPALI);
    setValue("ENVANTEREDAHIL", form.ENVANTEREDAHIL);
  };

  useEffect(() => {
    if (formData?.URUNID) setFormValues(formData);
  }, [formData]);

  useEffect(() => {
    if (defaultData?.URUNID) {
      setFormId(defaultData.URUNID);
    }
  }, [defaultData, disabled]);

  const handleActions = (el: any, status: string) => {
    setModalInitialData({});
    if (status === "modal") setOpen(true);

    if (status === "view" || status === "edit") {
      setOpen(true);
      setModalInitialData(el);
    }

    if (status === "delete") deleteFn([el.URUNBIRIMID]);

    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { URUNBIRIMID: number }) => {
          return item.URUNBIRIMID;
        })
      );
    }
  };
  console.log("anchorMaterial", anchorMaterial);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <InputFieldUI title={t("LABRECETEKOD")} disabled={disabled}>
            <SelectOptionsTable
              name="LABRECETEKOD"
              placeholder={t("LABRECETEKOD")}
              options={urunTypeData?.data}
              required={true}
              headColumns={[{ id: "ADI", title: "ADI", width: 200 }]}
              filterParams={urunTypeFilterParams}
              handleSelect={(_: {}) => {}}
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
        <CollapseUI title="" disabled={true}>
          <div className="flex justify-between space-x-4">
            <div className="w-full grid grid-cols-3 gap-y-3 gap-x-5">
              <InputFieldUI title={t("URUNRECETEADI")}>
                <HFTextField
                  name="URUNRECETEADI"
                  control={control}
                  setValue={setValue}
                  placeholder={t("URUNRECETEADI")}
                />
              </InputFieldUI>
              {/* <InputFieldUI title={t("Miktar")}>
                <HFInputMask
                  control={control}
                  name="MIKTAR"
                  type="number"
                  required={true}
                  placeholder="Miktar"
                />
              </InputFieldUI> */}
              <InputFieldUI title={t("URUNID")}>
                <HFTextField
                  name="URUNID"
                  control={control}
                  setValue={setValue}
                  placeholder={t("URUNID")}
                />
              </InputFieldUI>
              <InputFieldUI title={t("TALEPTARIHI")}>
                <HFTextField
                  name="TALEPTARIHI"
                  control={control}
                  setValue={setValue}
                  placeholder={t("TALEPTARIHI")}
                />
              </InputFieldUI>
              <InputFieldUI title={t("ASHKLAMA")}>
                <HFTextField
                  name="ASHKLAMA"
                  control={control}
                  setValue={setValue}
                  placeholder={t("ASHKLAMA")}
                />
              </InputFieldUI>
              <InputFieldUI title={t("ESKIRECETEKODU")}>
                <HFTextField
                  name="ESKIRECETEKODU"
                  control={control}
                  setValue={setValue}
                  placeholder={t("ESKIRECETEKODU")}
                />
              </InputFieldUI>
              <InputFieldUI title={t("RENKDIENLIGI")}>
                <HFSelect
                  name="RENKDIENLIGI"
                  control={control}
                  setValue={setValue}
                  placeholder={t("RENKDIENLIGI")}
                />
              </InputFieldUI>
              <InputFieldUI title={t("RENKGRUP")}>
                <HFSelect
                  name="RENKGRUP"
                  control={control}
                  setValue={setValue}
                  placeholder={t("RENKGRUP")}
                />
              </InputFieldUI>
              <InputFieldUI title={t("DOVIZ")}>
                <HFSelect
                  name="DOVIZ"
                  control={control}
                  setValue={setValue}
                  placeholder={t("DOVIZ")}
                />
              </InputFieldUI>
              <InputFieldUI title={t("RECETETURU")}>
                <HFSelect
                  name="RECETETURU"
                  control={control}
                  setValue={setValue}
                  placeholder={t("RECETETURU")}
                />
              </InputFieldUI>
              <InputFieldUI title={t("HAMSTOCK")}>
                <SelectOptionsTable
                  name="HAMSTOCK"
                  placeholder={t("HAMSTOCK")}
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
                />
              </InputFieldUI>
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
                />
              </InputFieldUI>
              <InputFieldUI title={t("PANTONEKODU")}>
                <HFSelect
                  name="PANTONEKODU"
                  control={control}
                  setValue={setValue}
                  placeholder={t("PANTONEKODU")}
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
                />
              </InputFieldUI>
            </div>
          </div>
        </CollapseUI>
      </form>

      <div className="grid grid-cols-3 border rounded-[12px] border-[var(--border)]">
        <div className="border-r border-[var(--border)] px-2">
          <CNewTable
            title="Material"
            headColumns={headColumns}
            defaultFilters={["actions"]}
            defaultActions={["delete", "edit"]}
            idForTable="modal_table_material"
            bodyColumns={[]}
            handleActions={handleActions}
            isLoading={false}
            filterParams={filterParams}
            handleFilterParams={setFilterParams}
            disablePagination={true}
            autoHeight={"400px"}
            disabled={disabled}
            extra={
              <button
                onClick={(event) => setAchorMaterial(event.currentTarget)}
                className="flex items-center"
              >
                <PlusIcon fill="var(--black)" /> {t("add")}
              </button>
            }
          />
        </div>
        <div className=" px-2">
          <div>
            <CNewTable
              title="Trail"
              headColumns={headColumnsTrail}
              defaultFilters={["actions"]}
              defaultActions={["delete", "edit"]}
              idForTable="modal_table_trial_first"
              bodyColumns={[]}
              handleActions={handleActions}
              isLoading={false}
              filterParams={filterParams}
              handleFilterParams={setFilterParams}
              disablePagination={true}
              autoHeight={"180px"}
              disabled={disabled}
              extra={
                <button className="flex items-center">
                  <PlusIcon fill="var(--black)" /> {t("add")}
                </button>
              }
            />
            <CNewTable
              title=""
              headColumns={headColumnsTrail}
              removeHeader={true}
              defaultFilters={["actions"]}
              defaultActions={["delete", "edit"]}
              idForTable="modal_table_trial_first"
              bodyColumns={[]}
              handleActions={handleActions}
              isLoading={false}
              filterParams={filterParams}
              handleFilterParams={setFilterParams}
              disablePagination={true}
              autoHeight={"180px"}
              disabled={disabled}
            />
          </div>
        </div>
        <div className="border-l border-[var(--border)] px-2">
          <CNewTable
            title="Details"
            headColumns={headColumns}
            defaultFilters={["actions"]}
            defaultActions={["delete", "edit"]}
            bodyColumns={formId ? tableData?.data : []}
            handleActions={handleActions}
            isLoading={false}
            filterParams={filterParams}
            handleFilterParams={setFilterParams}
            disablePagination={true}
            autoHeight={"auto"}
            disabled={disabled}
            extra={
              <button className="flex items-center">
                <PlusIcon fill="var(--black)" /> {t("add")}
              </button>
            }
          />
        </div>
      </div>
      {open && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[99]">
          <TableForm
            setOpen={setOpen}
            refetch={refetch}
            formId={modalInitialData?.URUNBIRIMID}
            defaultValue={formData}
          />

          <div
            className="w-[100vw] h-[100vh] bg-[#00000044] fixed z-[91]"
            onClick={() => setOpen(false)}
          ></div>
        </div>
      )}

      <MaterialForm anchor={anchorMaterial} setAnchor={setAchorMaterial} />

      {/* <div className="w-full h-full fixed bg-red-500 top-0 left-0"></div> */}
    </>
  );
};
