import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { CollapseUI } from "../../../../components/CElements/CCollapse";
import { IModalForm, ModalTypes } from "../interfaces";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { useGetUrunTypeList } from "../../../../hooks/useFetchRequests/useUrunType";
import { ModalTableLogic } from "./Logic";
import { TableForm } from "./TableForm";
import dayjs from "dayjs";
import { useGetFirmList } from "../../../../hooks/useFetchRequests/useFirmaList";
import CNewTable from "../../../../components/CElements/CNewTable";

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
            <div className="w-full grid grid-cols-3 gap-3">
              <InputFieldUI title={t("URUNRECETEADI")}>
                <HFTextField
                  name="URUNRECETEADI"
                  control={control}
                  setValue={setValue}
                  placeholder={t("URUNRECETEADI")}
                />
              </InputFieldUI>
              <InputFieldUI title={t("URUNID")}>
                <HFTextField
                  name="URUNID"
                  control={control}
                  setValue={setValue}
                  placeholder={t("URUNID")}
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

        {/* <CollapseUI title={t("form_material")} disabled={disabled}>
          A
        </CollapseUI> */}

        <div className="grid grid-cols-3">
          <div className="border border-[var(--border)] border-r-0">
            <CNewTable
              title=""
              key={formId ? formId : "modal"}
              headColumns={headColumns}
              defaultFilters={["add", "delete", "actions", "sellect_more"]}
              idForTable="modal_table_material"
              bodyColumns={formId ? tableData?.data : []}
              handleActions={handleActions}
              isLoading={false}
              filterParams={filterParams}
              handleFilterParams={setFilterParams}
              disablePagination={true}
              autoHeight={"400px"}
              disabled={disabled}
            />
          </div>
          <div className="border border-[var(--border)] border-r-0">
            <CNewTable
              title=""
              key={formId ? formId : "modal"}
              headColumns={headColumns}
              defaultActions={["view", "edit", "delete"]}
              defaultFilters={["add", "delete", "actions", "sellect_more"]}
              idForTable="modal_table_trial_first"
              bodyColumns={formId ? tableData?.data : []}
              handleActions={handleActions}
              isLoading={false}
              filterParams={filterParams}
              handleFilterParams={setFilterParams}
              disablePagination={true}
              autoHeight={"180px"}
              disabled={disabled}
            />
            <CNewTable
              title=""
              key={formId ? formId : "modal"}
              headColumns={headColumns}
              removeHeader={true}
              defaultFilters={["add", "delete", "actions", "sellect_more"]}
              idForTable="modal_table_trial_second"
              bodyColumns={formId ? tableData?.data : []}
              handleActions={handleActions}
              isLoading={false}
              filterParams={filterParams}
              handleFilterParams={setFilterParams}
              disablePagination={true}
              autoHeight={"180px"}
              disabled={disabled}
            />
          </div>
          <div className="border border-[var(--border)]">
            <CNewTable
              title=""
              key={formId ? formId : "modal"}
              headColumns={headColumns}
              defaultFilters={["add", "delete", "actions", "sellect_more"]}
              idForTable="modal_table_details"
              bodyColumns={formId ? tableData?.data : []}
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
      </form>
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
    </>
  );
};
