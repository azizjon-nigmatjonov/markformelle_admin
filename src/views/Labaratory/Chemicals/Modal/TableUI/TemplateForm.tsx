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
  getList,
  getDetey,
  atisId,
}: {
  handleActions: () => void;
  formData: any;
  getList: (link: string) => void;
  getDetey: () => void;
  atisId: number;
}) => {
  const { control, handleSubmit, setValue } = useForm<any>({
    mode: "onSubmit",
  });
  const { createForm } = TemplateLogic({
    getList: () => {
      getList(`recete/${formData.LABRECETEKODU}`);
    },
    getDetey,
  });

  const onSubmit = (data: any) => {
    const params: any = {};
    params.RECETEID = formData.LABRECETEKODU;
    params.newReceteId = data.RECETEID;
    params.atisId = atisId;
    params.ADI = formData.ADI;

    params.RECETETURUADI = formData.RECETETURUADI;
    params.RECETETURUID = formData.RECETETURUID;
    params.FIRMAID = formData.FIRMAID;
    params.ASAMAADI = data.ASAMAADI;
    params.ASAMAID = data.USTASAMAID;
    params.URUNTIPIID = 1;
    params.RECETETIPI = data.RECETETIPI;
    params.CALISMATARIHI = convertToISO(dayjs().format("DD.MM.YYYY"));
    params.DEGISIMTARIHI = dayjs();
    params.RECETEKAPATMA = data.RECETEKAPATMA;
    params.MIGRASYON = 0;
    params.SABLON = false;
    params.ORTAKRECETE = data.ORTAKRECETE;
    params.ILAVE = data.ILAVE;
    params.SOKUMUZERIBOYA = data.SOKUMUZERIBOYA;
    params.RECETEDETAYVAR = data.RECETEDETAYVAR;
    params.OZELDURUMLINKISLEMI = data.OZELDURUMLINKISLEMI;
    params.INSERTKULLANICIID = formData.INSERTKULLANICIID;
    params.INSERTTARIHI = dayjs();
    params.KULLANICIID = formData.KULLANICIID;
    params.USTASAMAID = formData.USTASAMAID;
    params.TALEPTARIHI = dayjs();
    params.LABRECETEGRUPID = formData.LABRECETEGRUPID;
    params.DOVIZID = formData.DOVIZID;
    params.HAMID = formData.HAMID;
    params.ACIKLAMA = formData.ACIKLAMA;
    params.LABRENKGRUPID = formData.LABRENKGRUPID;
    params.RENKDERINLIGIID = formData.RENKDERINLIGIID;

    createForm(params);
  };

  return (
    <form
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3"
    >
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
        staticSearchID="RECETEID"
        defaultFilters="SABLON=true"
        headColumns={[
          { id: "RECETEID", title: "Recete kodu", width: 130 },
          {
            title: "ADI",
            id: "ADI",
            width: 160,
          },
          {
            title: "Recete Turi adi",
            id: "RECETETURUADI",
            width: 120,
          },
          {
            title: "RECETETURUID",
            id: "RECETETURUID",
            width: 110,
          },
          {
            title: "FIRMAID",
            id: "FIRMAID",
            width: 80,
          },
          {
            title: "USTASAMAID",
            id: "USTASAMAID",
            width: 100,
          },
          {
            title: "RECETETIPI",
            id: "RECETETIPI",
            width: 80,
          },
          {
            title: "SABLON",
            id: "SABLON",
            width: 60,
            render: (_, obj) => {
              return obj.SABLON ? "Evet" : "Hayır";
            },
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
          type={formData.LABRECETEKODU ? "update" : "create"}
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
