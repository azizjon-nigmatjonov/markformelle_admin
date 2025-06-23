import { useForm } from "react-hook-form";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../../components/UI/FormButtons/SubmitCancel";
import { Alert } from "@mui/material";
import { TemplateLogic } from "./Logic";
import dayjs from "dayjs";
import { convertToISO } from "../../../../../utils/getDate";

export const TemplateForm = ({
  handleActions,
  formData,
}: {
  handleActions: () => void;
  formData: any;
}) => {
  const { control, handleSubmit, setValue } = useForm<any>({
    mode: "onSubmit",
  });
  const { createForm } = TemplateLogic();

  const onSubmit = (data: any) => {
    const params = { ...formData, ...data };
    params.RECETEID = data.RECETEID;
    params.ADI = data.ADI;

    params.RECETETURUADI = data.RECETETURUADI;
    params.RECETETURUID = data.RECETETURUID;
    params.FIRMAID = data.FIRMAID;
    params.ASAMAADI = data.ASAMAADI;
    params.ASAMAID = data.USTASAMAID;
    params.URUNTIPIID = 1;
    params.RECETETIPI = data.RECETETIPI;
    params.CALISMATARIHI = convertToISO(dayjs().format("DD.MM.YYYY"));
    params.DEGISIMTARIHI = dayjs();
    params.RECETEKAPATMA = data.RECETEKAPATMA;
    params.MIGRASYON = 0;
    params.SABLON = data.SABLON;
    params.ORTAKRECETE = data.ORTAKRECETE;
    params.ILAVE = data.ILAVE;
    params.SOKUMUZERIBOYA = data.SOKUMUZERIBOYA;
    params.RECETEDETAYVAR = data.RECETEDETAYVAR;
    params.OZELDURUMLINKISLEMI = data.OZELDURUMLINKISLEMI;
    params.INSERTKULLANICIID = data.INSERTKULLANICIID;
    params.INSERTTARIHI = dayjs();
    params.KULLANICIID = data.KULLANICIID;
    params.USTASAMAID = data.USTASAMAID;

    params.LABRENKGRUPID = formData.LABRENKGRUPID;
    params.RENKDERINLIGIID = formData.RENKDERINLIGIID;

    createForm(params);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Alert severity={"info"} style={{ height: "30px" }}>
        Uritem recetisini Olustumak Icin Sablon Recetesini Secimiz
      </Alert>
      <LiteOptionsTable
        name="RECETEID"
        link="recete"
        required={true}
        renderValue={(_: string, obj: any) => {
          return obj.RECETEID + " - " + obj.ADI;
        }}
        defaultSearch="SABLON=true"
        headColumns={[
          { id: "RECETEID", title: "Recete kodu", width: 110 },
          {
            title: "ADI",
            id: "ADI",
            width: 150,
          },
          {
            title: "Recete Turi adi",
            id: "RECETETURUADI",
            width: 120,
          },
          {
            title: "RECETETURUID",
            id: "RECETETURUID",
            width: 120,
          },
          {
            title: "FIRMAID",
            id: "FIRMAID",
            width: 120,
          },
          {
            title: "USTASAMAID",
            id: "USTASAMAID",
            width: 120,
          },
          {
            title: "RECETETIPI",
            id: "RECETETIPI",
            width: 120,
          },
          {
            title: "SABLON",
            id: "SABLON",
            width: 60,
          },
        ]}
        handleSelect={(obj: {
          RECETEID: number;
          ADI: string;
          RECETETURUID: number;
          RECETETURUADI: string;
          USTASAMAID: number;
          ASAMAADI: string;
          RECETETIPI: string;
          RECETEKAPATMA: boolean;
          SABLON: boolean;
          ORTAKRECETE: boolean;
          ILAVE: boolean;
          SOKUMUZERIBOYA: boolean;
          RECETEDETAYVAR: boolean;
          OZELDURUMLINKISLEMI: boolean;
          INSERTKULLANICIID: number;
          KULLANICIID: number;
          FIRMAID: string;
        }) => {
          setValue("RECETEID", obj.RECETEID);
          setValue("ADI", obj.ADI);
          setValue("RECETETURUADI", obj.RECETETURUADI);
          setValue("RECETETURUID", obj.RECETETURUID);
          setValue("USTASAMAID", obj.USTASAMAID);
          setValue("ASAMAADI", obj.ASAMAADI);
          setValue("RECETETIPI", obj.RECETETIPI);
          setValue("RECETEKAPATMA", obj.RECETEKAPATMA);
          setValue("SABLON", obj.SABLON);
          setValue("ORTAKRECETE", obj.ORTAKRECETE);
          setValue("ILAVE", obj.ILAVE);
          setValue("SOKUMUZERIBOYA", obj.SOKUMUZERIBOYA);
          setValue("RECETEDETAYVAR", obj.RECETEDETAYVAR);
          setValue("OZELDURUMLINKISLEMI", obj.OZELDURUMLINKISLEMI);
          setValue("INSERTKULLANICIID", obj.INSERTKULLANICIID);
          setValue("KULLANICIID", obj.KULLANICIID);
          setValue("FIRMAID", obj.FIRMAID);
        }}
        control={control}
      />

      <div className="pt-10">
        <SubmitCancelButtons
          uniqueID={"inner"}
          type={"create"}
          handleActions={(val: string, uniqueID: string) => {
            if (uniqueID === "step") {
              if (val === "Close") {
                handleActions();
              }
              if (val === "Enter") {
                handleSubmit(onSubmit)();
              }
            }
          }}
        />
      </div>
    </form>
  );
};
