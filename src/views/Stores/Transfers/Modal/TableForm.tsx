import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/HFElements/HFTextField";
import HFInputMask from "../../../../components/HFElements/HFInputMask";
import { SelectOptionsTable } from "../../../../components/UI/Options/Table";
import { useEffect, useState } from "react";
import { InnerModalLogic } from "./Logic";
import { CloseIcon } from "../../../../components/UI/IconGenerator/Svg";
import { IFilterParams } from "../../../../interfaces";
import { Alert } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { useTranslationHook } from "../../../../hooks/useTranslation";
const API_URL = import.meta.env.VITE_TEST_URL;

interface TableFormProps {
  setOpen: (val: boolean) => void;
  defaultData?: Partial<any>;
  refetch: () => void;
}
interface FormData {
  BARKODKODU: string;
  URUNID: string;
  ADI: string;
  MIKTAR: number;
  URUNBIRIMID: number;
  BIRIMFIYAT: number;
  BIRIMID: string;
}

export const TableForm = ({
  setOpen,
  defaultData = {},
  refetch = () => {},
}: TableFormProps) => {
  const { t } = useTranslationHook();
  const [alettInfo, setAlertInfo]: any = useState({
    title: "Осататка в складе",
    type: "info",
    amount: 0,
  });
  const [filterParams, setFilterParams] = useState<Partial<IFilterParams>>({
    page: 1,
    perPage: 100,
    q: "",
  });
  const [filterParamsWeight, setFilterParamsWeight] = useState<
    Partial<IFilterParams>
  >({
    page: 1,
    perPage: 100,
  });
  const { control, handleSubmit, setValue, getValues, setError, clearErrors } =
    useForm<FormData>({
      mode: "onSubmit",
    });
  const { urunData, urunBirim, createStokElement, updateElement } =
    InnerModalLogic({
      filterParams,
      filterParamsWeight,
      refetch,
      setOpen,
    });

  const onSubmit = (data: any) => {
    if (defaultData.URUNID) {
      let params: any = {
        STOKDETAYID: defaultData.STOKDETAYID,
        STOKID: null,
        IRSALIYEID: 5652,
        URUNID: defaultData.URUNID,
        URUNBIRIMID: 1284,
        KULLANICIID: 1,
        DEPOID: "D003",
        TRANSFERDEPOID: "D009",
        MIKTAR: 4,
        BIRIMFIYAT: 0,
        DEGISIMTARIHI: "2025-04-12T07:37:38.184000",
        NOTU: "",
        IRSALIYETARIHI: "2025-04-12T00:00:00",
      };

      params.IRSALIYEID = defaultData.IRSALIYEID;
      params.DEPOID = defaultData.DEPOID;
      params.TRANSFERDEPOID = defaultData.TRANSFERDEPOID;
      params.DEGISIMTARIHI = defaultData.INSERTTARIHI;
      params.IRSALIYETARIHI = defaultData.IRSALIYETARIHI;
      params = { ...params, ...data };

      params.URUNBIRIMID = defaultData.URUNBIRIMID;
      params.MIKTAR = +params.MIKTAR;
      params.BIRIMFIYAT = +params.BIRIMFIYAT;
      delete params.BIRIMID;
      delete params.ADI;
      delete params.BARKODKODU;

      if (defaultData?.URUNID) {
        updateElement(params, defaultData.STOKDETAYID);
      } else {
        createStokElement(params);
      }
    } else {
      let params: any = {
        HAREKETTIPI: 5,
        URUNID: defaultData?.URUNID,
        URUNBIRIMID: 1288,
        MIKTAR: 17,
        BIRIMFIYAT: 0,
        DEPOID: "D003",
        TRANSFERDEPOID: "D008",
        IRSALIYEID: 5626,
        FIRMAID: null,
        NOTU: "",
        STOKVAR: true,
        INSERTKULLANICIID: 1,
        KULLANICIID: 1,
        DEGISIMTARIHI: dayjs(),
      };
      params.IRSALIYEID = defaultData.IRSALIYEID;
      params.DEPOID = defaultData.DEPOID;
      params.TRANSFERDEPOID = defaultData.TRANSFERDEPOID;
      params.INSERTTARIHI = defaultData.INSERTTARIHI;
      params.TARIH = defaultData.IRSALIYETARIHI;
      params = { ...params, ...data };
      params.URUNBIRIMID =
        urunBirim.find((obj: any) => obj.BIRIMID === params.BIRIMID)
          ?.URUNBIRIMID ?? 0;
      params.MIKTAR = +params.MIKTAR;
      params.BIRIMFIYAT = +params.BIRIMFIYAT;
      delete params.BIRIMID;
      delete params.ADI;
      delete params.IRSALIYETARIHI;

      if (defaultData?.URUNID) {
        updateElement(params, defaultData.STOKDETAYID);
      } else {
        createStokElement(params);
      }
    }
  };

  const checkAmount = (search: any) => {
    const amount = +search;
    const values = getValues();

    const currentVal = amount / (values.BIRIMID === "Kg" ? 1 : 1000);

    if (currentVal > alettInfo.amount) {
      setError("MIKTAR", {
        type: "manual",
        message: "Incorrect username",
      });
    } else {
      clearErrors(["MIKTAR"]);
    }
  };

  const getDepoStock = (depoId: string, urunId: string) => {
    if (!urunId || !depoId) return;
    axios.get(`${API_URL}/depostok/${depoId}/${urunId}`).then((res: any) => {
      const stock = res?.data ?? {};
      const weight = stock.ALIS - stock.DEPOYACIKAN;
      const values = getValues();
      if (weight) {
        setAlertInfo({
          title: `В осататка есть ${weight} ${values.BIRIMID}` + "",
          type: "success",
          amount: weight,
        });
      } else {
        setAlertInfo({
          title: `В осататка ${weight} ${values.BIRIMID}` + "",
          type: "error",
          amount: 0,
        });
      }
    });
  };

  useEffect(() => {
    setValue("BIRIMID", urunBirim?.[0]?.BIRIMID ?? "Kg");
    const values = getValues();
    if (!defaultData.DEPOID) return;
    getDepoStock(defaultData.DEPOID, values.URUNID);
  }, [urunBirim]);

  useEffect(() => {
    if (defaultData?.URUNID) {
      setFilterParams({
        ...filterParams,
        q: `URUNID=${defaultData.URUNID.substring(3, -1)}`,
      });
      setValue("URUNID", defaultData.URUNID);
      setValue("ADI", defaultData.URUNADI);
    }
  }, [defaultData]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-y-3 bg-white shadow-2xl p-4 rounded-[8px] z-[99] border border-[var(--border)] w-[350px]"
    >
      <div className="flex justify-between mb-2">
        <div className="w-[20px]"></div>
        <h2>Примешенные</h2>
        <div className="w-[20px] cursor-pointer" onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
      </div>

      <HFTextField
        control={control}
        name="BARKODKODU"
        label="Barkod kodi"
        placeholder="Barkod kodu"
        setValue={setValue}
        defaultValue={defaultData?.BARKODKODI}
      />

      <SelectOptionsTable
        name="URUNID"
        label="Urun kodi"
        focused={true}
        placeholder="Urun kodi"
        options={urunData?.data ?? []}
        required={true}
        headColumns={[
          { id: "BARKOD", width: 200, title: "BARKODI" },
          { id: "ADI", title: "ADIS", innerId: "URUNID" },
        ]}
        filterParams={filterParams}
        handleSelect={(obj: any) => {
          setValue("URUNID", obj.URUNID);
          setValue("ADI", obj.ADI);
          setFilterParamsWeight({
            ...filterParamsWeight,
            q: `URUNID=${obj.URUNID}`,
          });
        }}
        control={control}
        handleSearch={(val: string) => {
          setFilterParams({ ...filterParams, q: val });
        }}
        setFilterParams={setFilterParams}
        defaultValue={defaultData?.URUNID}
      />

      <SelectOptionsTable
        name="ADI"
        label="Urun adi"
        placeholder="Urun adi"
        options={urunData?.data}
        required={true}
        headColumns={[
          { id: "BARKOD", width: 200, title: "BARKODI" },
          { id: "ADI", title: "ADIS", innerId: "URUNID" },
        ]}
        filterParams={filterParams}
        handleSelect={(obj: any) => {
          setValue("URUNID", obj.URUNID);
          setValue("ADI", obj.ADI);
          setFilterParamsWeight({
            ...filterParamsWeight,
            q: `&URUNID=${obj.URUNID}`,
          });
        }}
        handleSearch={(val: string) => {
          setFilterParams({ ...filterParams, q: val });
        }}
        control={control}
        setFilterParams={setFilterParams}
      />

      <div className="flex space-x-2 items-end">
        <HFInputMask
          control={control}
          name="MIKTAR"
          label="Miktar"
          type="number"
          required={true}
          placeholder="Miktar"
          handleChange={(val?: string) => checkAmount(val)}
          defaultValue={defaultData?.MIKTAR}
        />
        <div className="w-[90px]">
          <SelectOptionsTable
            name="BIRIMID"
            options={urunBirim}
            required={true}
            headColumns={[
              { id: "BIRIMID", title: "Birim id" },
              { id: "BIRIMADI", title: "Adi" },
              { id: "CARPAN", title: "Carpani" },
            ]}
            filterParams={filterParamsWeight}
            handleSelect={(obj: any) => {
              setValue("BIRIMID", obj.BIRIMID);
            }}
            defaultValue={0}
            readOnly={true}
            control={control}
            setFilterParams={setFilterParamsWeight}
          />
        </div>
      </div>
      <Alert severity={alettInfo.type}>{alettInfo.title}</Alert>
      <HFInputMask
        control={control}
        name="BIRIMFIYAT"
        label={t("BIRIMFIYAT")}
        type="number"
        placeholder="Birim fiyat"
      />
      <div className="flex space-x-2 mt-3">
        <button
          className="cancel-btn"
          type="button"
          onClick={() => setOpen(false)}
        >
          Отменить
        </button>
        <button className="custom-btn save" type="submit">
          {defaultData?.URUNID ? "Редикировать" : "Сохранить"}
        </button>
      </div>
    </form>
  );
};
