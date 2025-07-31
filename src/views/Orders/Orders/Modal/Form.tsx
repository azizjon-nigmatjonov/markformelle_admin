import { useEffect } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { Validation } from "./Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import { LiteOptionsTable } from "../../../../components/UI/Options/LiteTable";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { SubmitButton } from "../../../../components/UI/FormButtons/SubmitButton";
import { FormLogic } from "./Logic";
import HFTextarea from "../../../../components/HFElements/HFTextarea";
import CNewMiniModal from "../../../../components/CElements/CNewMiniModal";
import { useTranslation } from "react-i18next";
import { websiteActions } from "../../../../store/website";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/types";
const schema = Validation;

interface OrderFormProps {
  handleModalActions: (val: string, val2: string) => void;
  createForm: (val: any) => void;
  updateForm: (val: any, id: number) => void;
  formData: any;
  uniqueID: string;
  formId: number;
  setFormId: (val: number) => void;
}

export const OrderForm = ({
  handleModalActions,
  createForm,
  updateForm,
  uniqueID,
  formData,
  formId,
  setFormId,
}: OrderFormProps) => {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue, getValues, reset } = useForm<any>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const isDirty = useSelector(
    (state: RootState) => state.website.dirty_places.isDirty
  );
  const { setFormValues, setInitialFormValues } = FormLogic();
  const dispatch = useDispatch();

  const handleDirtyPlaces = (_: string) => {
    // dispatch(websiteActions.setDirtyPlaces({ list, isDirty: false }));
  };

  const handleModalActionsFn = (status: string, id: string) => {
    if (status === "delete") {
      handleModalActions(status, id);
      reset();
      setFormId(0);
    }
    if (status === "close") {
      const formValues = getValues();
      const formInitialValues = getValues();
      let changes = false;

      for (let key in formInitialValues) {
        if (formInitialValues[key] !== formValues[key]) {
          changes = true;
          break;
        }
      }

      if (changes) {
      } else {
        reset();
        setFormId(0);
      }
    }
  };

  const onSubmit = (data: any) => {
    let params: any = data;
    params.IPTAL = params?.IPTAL ? true : false;

    if (formId) {
      params = {
        ...formData,
        ...params,
      };
      params.TALEPTARIHI = formData.TALEPTARIHI;
      params.ISLEMTIPIID = 1;
      params.DEGISIMTARIHI = dayjs();
      params.SIPARISTARIHI = formData.SIPARISTARIHI;

      updateForm(params, formId);
    } else {
      params.SIPARA;
      params.INSERTKULLANICIID = 1;
      params.INSERTTARIHI = dayjs();
      params.KULLANICIID = 1;
      params.DEGISIMTARIHI = dayjs();
      params.SIPARISTARIHI = dayjs().format("YYYY-MM-DD");
      params.BOYASIPARISYIL = dayjs().year();
      params.SIPARISIALANKULLANICIID = 1;
      params.ISLEMTIPIID = 1;
      params.FASON = false;
      params.YURTDISI = false;
      params.KUMASTEMIN = false;
      params.ORMESIPARISI = false;
      params.DOKUMASIPARISI = false;
      params.BASKAFIRMAYASATILABILIR = false;
      delete params.KULLANICIADI;
      delete params.BOYASIPARISKAYITID;
      params.BOYASIPARISID = null;

      createForm(params);
    }
  };

  useEffect(() => {
    if (formData?.BOYASIPARISID) {
      setFormValues(formData, setValue);
    } else {
      setInitialFormValues(setValue);
    }
  }, [formData, setValue, setFormValues, setInitialFormValues]);

  useEffect(() => {
    if (formData?.BOYASIPARISKAYITID) {
      setFormId(formData.BOYASIPARISKAYITID);
    } else {
      setValue("SIPARISTARIHI", dayjs().format("YYYY-MM-DD"));
    }
  }, [formData]);

  return (
    <>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="border-b border-[var(--border)] pb-3 mb-3 grid grid-cols-4 gap-x-3">
          <div className="col-span-2 flex space-x-3">
            <InputFieldUI title="Siparis Yili">
              <HFTextField
                name="SIPARISYILI"
                control={control}
                disabled={true}
                defaultValue={formData?.SIPARISYILI}
                focused
              />
            </InputFieldUI>
            <InputFieldUI title="Siparis ID">
              <LiteOptionsTable
                name="BOYASIPARISID"
                link="boyasiparis"
                control={control}
                renderValue={(_: string, obj: any) => {
                  return obj?.BOYASIPARISKAYITID;
                }}
                headColumns={[
                  {
                    id: "BOYASIPARISKAYITID",
                    title: "BOYASIPARISKAYITID",
                    width: 150,
                  },
                  {
                    id: "BOYASIPARISID",
                    title: "BOYASIPARISID",
                    width: 100,
                  },
                ]}
                defaultValue={formData?.BOYASIPARISID}
                handleSelect={(obj: { BOYASIPARISKAYITID: number }) => {
                  setFormId(obj.BOYASIPARISKAYITID);
                }}
              />
            </InputFieldUI>
            <InputFieldUI title={formId ? "ID: " + formId : ""}>
              <span></span>
            </InputFieldUI>
          </div>
          <div className="col-span-2 flex justify-end">
            <div className="w-[200px]">
              <SubmitButton
                uniqueID={uniqueID}
                type={formId ? "update" : "create"}
                handleActions={(val: string, uniqueID: string) => {
                  if (uniqueID === "main_order_form") {
                    if (val === "Close") handleModalActionsFn("close", "");

                    if (val === "Enter") handleSubmit(onSubmit)();
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-3">
          <div className="space-y-2">
            <InputFieldUI title="Firma Adi">
              <LiteOptionsTable
                name="FIRMAID"
                staticSearchID="FIRMAID"
                link="firma"
                required={true}
                renderValue={(_: string, obj: any) => {
                  return obj?.FIRMAID;
                }}
                focused
                control={control}
                handleSelect={(obj: any) => {
                  setValue("FIRMAID", obj.FIRMAID);
                  handleDirtyPlaces("FIRMAID");
                }}
                defaultValue={
                  formData?.FIRMAID &&
                  formData?.FIRMAID + " - " + formData?.FIRMAADI
                }
                headColumns={[
                  {
                    id: "FIRMAID",
                    title: "FIRMAID",
                  },
                  {
                    id: "ADI",
                    title: "ADI",
                  },
                ]}
              />
            </InputFieldUI>
            <InputFieldUI title="Siparis Tarihi">
              <HFTextField
                name="SIPARISTARIHI"
                control={control}
                defaultValue={dayjs(formData?.SIPARISTARIHI).format(
                  "YYYY-MM-DD"
                )}
                handleChange={() => handleDirtyPlaces("SIPARISTARIHI")}
                disabled
              />
            </InputFieldUI>

            <InputFieldUI title="sparis grubi">
              <LiteOptionsTable
                name="SIPARISGRUPID"
                link="siparisgrup"
                control={control}
                defaultValue={
                  formData?.SIPARISGRUPID && formData?.SIPARISGRUPADI
                    ? formData?.SIPARISGRUPID + " - " + formData?.SIPARISGRUPADI
                    : formData?.SIPARISGRUPID
                }
                headColumns={[
                  {
                    id: "SIPARISGRUPID",
                    title: "SIPARISGRUPID",
                  },
                  {
                    id: "ADI",
                    title: "ADI",
                  },
                ]}
                renderValue={(_: string, obj: any) => {
                  return obj?.SIPARISGRUPID && obj?.ADI
                    ? obj?.SIPARISGRUPID + " - " + obj?.ADI
                    : obj?.SIPARISGRUPID;
                }}
                handleSelect={(obj: any) => {
                  handleDirtyPlaces("SIPARISGRUPID");
                  setValue("SIPARISGRUPID", obj.SIPARISGRUPID);
                }}
              />
            </InputFieldUI>
          </div>
          <div className="space-y-2">
            <InputFieldUI title="Islem tipi">
              <LiteOptionsTable
                name="ISLEMTIPIID"
                link="islemtipi"
                control={control}
                renderValue={(_: string, obj: any) => {
                  return obj?.ISLEMTIPIID && obj?.ADI
                    ? obj?.ISLEMTIPIID + " - " + obj?.ADI
                    : obj?.ISLEMTIPIID;
                }}
                // defaultValue={formData?.ISLEMTIPIID}
                headColumns={[
                  {
                    id: "ISLEMTIPIID",
                    title: "ISLEMTIPIID",
                  },
                  {
                    id: "ADI",
                    title: "ADI",
                  },
                ]}
                handleSelect={(obj: any) => {
                  setValue("ISLEMTIPIID", obj.ISLEMTIPIID);
                  handleDirtyPlaces("ISLEMTIPIID");
                }}
              />
            </InputFieldUI>
            <InputFieldUI title="Sparis alan">
              <HFTextField
                name="SIPARISIALANKULLANICIADI"
                control={control}
                defaultValue={formData?.SIPARISIALANKULLANICIADI}
                handleChange={() =>
                  handleDirtyPlaces("SIPARISIALANKULLANICIADI")
                }
              />
            </InputFieldUI>
            {/* <InputFieldUI title="sparis sekli">
            <LiteOptionsTable
              name="ORMESIPARISSEKLIID"
              link="ormesiparissekli"
              control={control}
              renderValue={(_: string, obj: any) => {
                return obj?.ORMESIPARISSEKLIID && obj?.ADI
                  ? obj?.ORMESIPARISSEKLIID + " - " + obj?.ADI
                  : obj?.ORMESIPARISSEKLIID;
              }}
              defaultValue={formData?.ORMESIPARISSEKLIID}
              headColumns={[
                {
                  id: "ORMESIPARISSEKLIID",
                  title: "ID",
                  width: 50,
                },
                {
                  id: "ADI",
                  title: "ADI",
                  width: 100,
                },
              ]}
              handleSelect={(obj: any) => {
                setValue("ORMESIPARISSEKLIID", obj.ORMESIPARISSEKLIID);
              }}
            />
          </InputFieldUI> */}
            <InputFieldUI title="Sparis tipi">
              <LiteOptionsTable
                name="ORMESIPARISTIPIID"
                link="ormesiparistipi"
                control={control}
                headColumns={[
                  {
                    id: "ORMESIPARISTIPIID",
                    title: "ORMESIPARISTIPIID",
                  },
                  {
                    id: "ADI",
                    title: "ADI",
                  },
                ]}
                renderValue={(_: string, obj: any) => {
                  return obj?.ORMESIPARISTIPIID && obj?.ADI
                    ? obj?.ORMESIPARISTIPIID + " - " + obj?.ADI
                    : obj?.ORMESIPARISTIPIID;
                }}
                defaultValue={formData?.ORMESIPARISTIPIID}
                handleSelect={(obj: any) => {
                  setValue("ORMESIPARISTIPIID", obj.ORMESIPARISTIPIID);
                  handleDirtyPlaces("ORMESIPARISTIPIID");
                }}
              />
            </InputFieldUI>
          </div>
          <div className="space-y-2 grid grid- gap-x-2">
            <InputFieldUI title="Sparis Veren">
              <HFTextField
                name="KULLANICIADI"
                control={control}
                handleChange={() => handleDirtyPlaces("KULLANICIADI")}
                defaultValue={formData?.KULLANICIADI}
              />
            </InputFieldUI>
            {/* <InputFieldUI title="Notu"> */}
            <HFTextarea
              name="NOTU"
              control={control}
              minRows={2}
              defaultValue={formData?.NOTU}
              handleChange={() => handleDirtyPlaces("NOTU")}
            />
            {/* </InputFieldUI> */}
          </div>
        </div>
      </form>

      {isDirty && (
        <CNewMiniModal
          title=" "
          handleActions={() => {
            dispatch(
              websiteActions.setDirtyPlaces({ list: "", isDirty: false })
            );
          }}
        >
          <div className="w-[400px]">
            <p>{t("you_have_changes")}</p>
            <div className="flex space-x-2 mt-5">
              <button
                className="cancel-btn"
                type="button"
                onClick={() => {
                  dispatch(
                    websiteActions.setDirtyPlaces({ list: "", isDirty: false })
                  );
                }}
              >
                Cancel
              </button>
              <button
                className="custom-btn"
                type="button"
                onClick={() => {
                  handleSubmit(onSubmit)();
                  dispatch(
                    websiteActions.setDirtyPlaces({ list: "", isDirty: false })
                  );
                }}
              >
                Save
              </button>
            </div>
          </div>
        </CNewMiniModal>
      )}
    </>
  );
};
