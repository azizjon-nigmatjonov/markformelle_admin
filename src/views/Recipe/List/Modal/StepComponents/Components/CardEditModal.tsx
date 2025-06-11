import { useForm } from "react-hook-form";
import { LiteOptionsTable } from "../../../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../../../components/UI/FormButtons/SubmitCancel";
import HFTextField from "../../../../../../components/HFElements/HFTextField";
import CNewMiniModal from "../../../../../../components/CElements/CNewMiniModal";
import { ReviewForm } from "./ReviewForm";
import CLabel from "../../../../../../components/CElements/CLabel";
import { t } from "i18next";

interface Props {
  handleActions: () => void;
  open: string[];
  setOpen: (val: string[]) => void;
}

export const CardEditModal = ({ handleActions, open, setOpen }: Props) => {
  const { control, handleSubmit, setValue, getValues } = useForm<any>({
    mode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px]"
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <LiteOptionsTable
              label="Recete asama kodu"
              name="RECETEASAMAID"
              placeholder="RECETEASAMAID"
              focused
              required
              link="receteasama"
              headColumns={[
                { id: "RECETEASAMAID", title: "ID", width: 50 },
                { id: "ADI", title: "FIRMAADI", width: 300 },
              ]}
              renderValue={(_: string, obj: any) => {
                return obj.RECETEASAMAID
                  ? obj.RECETEASAMAID + " - " + obj.ADI
                  : obj.ADI;
              }}
              handleSelect={(obj: { RECETEASAMAID: number }) => {
                setValue("RECETEASAMAID", obj.RECETEASAMAID);
                setOpen(["card", "step", "review"]);
                // setInnerModal("review");
              }}
              control={control}
            />
          </div>
          <LiteOptionsTable
            label="Recete asama sablon kodu"
            name="RECETEASAMAID"
            placeholder="Recete asama sablon kodu"
            required
            link="receteasama"
            headColumns={[
              { id: "RECETEASAMAID", title: "ID", width: 50 },
              { id: "ADI", title: "FIRMAADI", width: 300 },
            ]}
            renderValue={(_: string, obj: any) => {
              return obj.RECETEASAMAID
                ? obj.RECETEASAMAID + " - " + obj.ADI
                : obj.ADI;
            }}
            handleSelect={(obj: { RECETEASAMAID: number }) => {
              setValue("RECETEASAMAID", obj.RECETEASAMAID);
            }}
            control={control}
          />
          <LiteOptionsTable
            label="Grafik kodu"
            name="RECETEASAMAID"
            placeholder="Grafik kodu"
            required
            link="asama"
            headColumns={[
              { id: "RECETEASAMAID", title: "ID", width: 50 },
              { id: "ADI", title: "FIRMAADI", width: 300 },
            ]}
            renderValue={(_: string, obj: any) => {
              return obj.RECETEASAMAID
                ? obj.RECETEASAMAID + " - " + obj.ADI
                : obj.ADI;
            }}
            handleSelect={(obj: { RECETEASAMAID: number }) =>
              setValue("RECETEASAMAID", obj.RECETEASAMAID)
            }
            control={control}
          />
          <LiteOptionsTable
            label="Alt asama kodu"
            name="RECETEASAMAID"
            placeholder="Alt asama kodu"
            required
            link="asama"
            headColumns={[
              { id: "RECETEASAMAID", title: "ID", width: 50 },
              { id: "ADI", title: "FIRMAADI", width: 300 },
            ]}
            renderValue={(_: string, obj: any) => {
              return obj.RECETEASAMAID
                ? obj.RECETEASAMAID + " - " + obj.ADI
                : obj.ADI;
            }}
            handleSelect={(obj: { RECETEASAMAID: number }) =>
              setValue("RECETEASAMAID", obj.RECETEASAMAID)
            }
            control={control}
          />
          <LiteOptionsTable
            label="Urun kodu"
            name="URUNID"
            placeholder="Urun kodu"
            required
            link="urun"
            headColumns={[
              { id: "RECETEASAMAID", title: "ID", width: 50 },
              { id: "ADI", title: "FIRMAADI", width: 300 },
            ]}
            renderValue={(_: string, obj: any) => {
              return obj.RECETEASAMAID
                ? obj.RECETEASAMAID + " - " + obj.ADI
                : obj.ADI;
            }}
            handleSelect={(obj: { RECETEASAMAID: number }) =>
              setValue("RECETEASAMAID", obj.RECETEASAMAID)
            }
            control={control}
          />
          <HFTextField
            label="Urun birimi"
            name="BIRIMID"
            control={control}
            placeholder="Urun Birimi"
          />
          <HFTextField
            label="Gr/Kg"
            name="kg"
            control={control}
            placeholder="Gr/Kg"
          />
          <HFTextField
            label="Gr/Lt"
            name="lt"
            control={control}
            placeholder="Gr/Lt"
          />
          <div>
            <CLabel title="Aciklama" />
            <textarea
              className="p-3 h-[110px] transparent border border-[var(--border)] outline-none focus:border-[var(--primary)] resize-none rounded-[8px] w-full"
              rows={3}
              placeholder={t("NOTU")}
              defaultValue={getValues("NOTU")}
              onChange={(e: any) => setValue("NOTU", e.target.value)}
            ></textarea>
          </div>
        </div>
        <SubmitCancelButtons
          uniqueID={
            open.includes("step") && !open.includes("review") ? "step" : ""
          }
          type="update"
          handleActions={(val: string, uniqueID: string) => {
            if (uniqueID === "step") {
              if (val === "Close") {
                handleActions();
              }
              if (val === "Enter") handleSubmit(onSubmit)();
            }
          }}
        />
      </form>
      {open.includes("review") && (
        <CNewMiniModal
          title="Recete asama tanitimi"
          type="inner"
          handleActions={() => setOpen(["card", "step"])}
        >
          <ReviewForm />
        </CNewMiniModal>
      )}
    </>
  );
};
