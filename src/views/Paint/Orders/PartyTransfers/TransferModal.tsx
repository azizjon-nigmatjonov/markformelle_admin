import { useForm } from "react-hook-form";
import { InputFieldUI } from "../../../../components/UI/FieldUI";
import HFTextField from "../../../../components/HFElements/HFTextField";
import { LiteOptionsTable } from "../../../../components/UI/Options/LiteTable";
import CCheckbox from "../../../../components/CElements/CCheckbox";
import { SubmitCancelButtons } from "../../../../components/UI/FormButtons/SubmitCancel";
import { TransferFormLogic } from "./Logic";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";

export const TransferModal = ({
  defaultData,
  refetchTable,
}: {
  defaultData: any;
  refetchTable: () => void;
}) => {
  const [openNumberInput, setOpenNumberInput] = useState<string>("");
  const [formId, setFormId] = useState<number>(0);
  const { formData } = TransferFormLogic({
    formId,
    refetchTable: () => {
      refetchTable();
    },
    defaultData,
  });
  const { control, handleSubmit, setValue, getValues } = useForm();

  useEffect(() => {
    if (defaultData?.PARTIASAMALARIID) {
      setFormId(defaultData.PARTIASAMALARIID);
    }
  }, [defaultData]);

  const onSubmit = (data: any) => {
    const params = { ...data };
    params.KUMASTAKISU = 100;
  };

  const handleModalActionsFn = (status: string) => {
    if (status === "delete") {
    }
    if (status === "close") {
    }
  };
  const [currentCalculatedNum, setCurrentCalculatedNum] = useState<number>(0);
  const setFormData = (data: any) => {
    setValue("ASAMAKODU", data.ASAMAKODU);
    setCurrentCalculatedNum(data.BANYOCARPANI);
    setValue("BANYOCARPANI", data.BANYOCARPANI);
    setValue("BANYOCARPANI2", data.BANYOCARPANI2);
    setValue("BANYOCARPANI3", data.BANYOCARPANI3);
    setValue("BANYOCARPANI4", data.BANYOCARPANI4);
    setValue("OTOMASYONADAHILMI", data.OTOMASYONADAHILMI);
    setValue("PARTININASILRECETESIMI", data.PARTININASILRECETESIMI);
    setValue("STOKTANDUSULDU", data.STOKTANDUSULDU);
  };

  const setInitalFormData = () => {};

  useEffect(() => {
    if (formData?.PARTIASAMALARIID) {
      setFormData(formData);
    } else {
      setInitalFormData();
    }
  }, [formData]);

  const [inputNumber, setInputNumber] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");

  const calculateNumber = (calc: number, val: number) => {
    if (!calc) return val;
    return calc * val;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "Enter") {
      setInputNumber(0);
      setInputValue("");

      // Handle form navigation
      const form = (e.target as HTMLElement).closest("form");
      if (form) {
        const elements = Array.from(form.elements) as HTMLElement[];
        const active = document.activeElement;
        const currentIndex = elements.indexOf(active as HTMLElement);

        const next = elements[currentIndex + 1];
        if (next && typeof next.focus === "function") {
          requestAnimationFrame(() => {
            next.focus();
          });
        }
      }
    }
  };

  return (
    <form
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      onSubmit={handleSubmit(onSubmit)}
      className="w-[400px]"
    >
      <div className="space-y-3 pb-3">
        <LiteOptionsTable
          label="Asama Kodu"
          name="ASAMAID"
          link="asama"
          control={control}
          handleSelect={(obj: any) => {
            setValue("ASAMAID", obj.ASAMAID);
          }}
          focused
          headColumns={[
            {
              title: "ASAMAID",
              id: "ASAMAID",
            },
            {
              title: "ADI",
              id: "ADI",
            },
          ]}
          renderValue={(_: string, obj: any) => {
            return obj?.ASAMAID && obj?.ADI
              ? `${obj?.ASAMAID} - ${obj?.ADI}`
              : obj?.ASAMAID;
          }}
          defaultValue={
            formData?.ASAMAID && formData?.ASAMAADI
              ? `${formData?.ASAMAID} - ${formData?.ASAMAADI}`
              : formData?.ASAMAADI
          }
        />
        <LiteOptionsTable
          label="Recete Kodu"
          name="RECETEID"
          link="recete"
          control={control}
          handleSelect={(obj: any) => {
            setValue("RECETEID", obj.RECETEID);
          }}
          headColumns={[
            {
              title: "RECETEID",
              id: "RECETEID",
            },
            {
              title: "ADI",
              id: "ADI",
            },
          ]}
          renderValue={(_: string, obj: any) => {
            return obj?.RECETEID && obj?.RECETEADI
              ? `${obj?.RECETEID} - ${obj?.RECETEADI}`
              : obj?.RECETEID;
          }}
          defaultValue={
            formData?.RECETEID && formData?.RECETEADI
              ? `${formData?.RECETEID} - ${formData?.RECETEADI}`
              : formData?.RECETEADI
          }
        />

        <div className="grid grid-cols-1 gap-3">
          <InputFieldUI title="1. Banyo Carpan ">
            {openNumberInput === "BANYOCARPANI" ? (
              <div className={`relative`}>
                <input
                  autoFocus
                  className="input-design"
                  type="number"
                  value={inputValue}
                  onChange={(e) => {
                    const value = e.target.value;
                    setInputValue(value);
                    setInputNumber(Number(value) || 0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setOpenNumberInput("BANYOCARPANI2");
                      setValue(
                        "BANYOCARPANI",
                        calculateNumber(inputNumber, currentCalculatedNum)
                      );
                      setInputNumber(0);
                      setInputValue("");
                    }
                  }}
                />
                <p className="absolute right-2 top-1/2 -translate-y-1/2 bg-white w-[80%] pl-2 text-[var(--gray)]">
                  x {currentCalculatedNum}
                </p>
                <p className="absolute right-2 top-1/2 -translate-y-1/2 bg-white w-[50%] pl-2 text-[var(--gray)]">
                  = {calculateNumber(inputNumber, currentCalculatedNum)}
                </p>
              </div>
            ) : (
              <HFTextField
                name="BANYOCARPANI"
                control={control}
                onKeydown={(val: number) => {
                  if (val === 113) {
                    setOpenNumberInput("BANYOCARPANI");
                  }
                }}
                defaultValue={formData?.BANYOCARPANI}
              />
            )}
          </InputFieldUI>

          <InputFieldUI title="2. Banyo Carpan ">
            {openNumberInput === "BANYOCARPANI2" ? (
              <div className={`relative`}>
                <input
                  autoFocus
                  className="input-design"
                  type="number"
                  value={inputValue}
                  onChange={(e) => {
                    const value = e.target.value;
                    setInputValue(value);
                    setInputNumber(Number(value) || 0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setOpenNumberInput("BANYOCARPANI3");
                      setValue(
                        "BANYOCARPANI2",
                        calculateNumber(inputNumber, currentCalculatedNum)
                      );
                      setInputNumber(0);
                      setInputValue("");
                    }
                  }}
                />
                <p className="absolute right-2 top-1/2 -translate-y-1/2 bg-white w-[70%] pl-2 text-[var(--gray)]">
                  x {currentCalculatedNum}
                </p>
                <p className="absolute right-2 top-1/2 -translate-y-1/2 bg-white w-[40%] pl-2 text-[var(--gray)]">
                  = {calculateNumber(inputNumber, currentCalculatedNum)}
                </p>
              </div>
            ) : (
              <HFTextField
                name="BANYOCARPANI2"
                control={control}
                onKeydown={(val: number) => {
                  if (val === 113) {
                    setOpenNumberInput("BANYOCARPANI2");
                  }
                }}
                defaultValue={formData?.BANYOCARPANI2}
              />
            )}
          </InputFieldUI>

          <InputFieldUI title="3. Banyo Carpan ">
            {openNumberInput === "BANYOCARPANI3" ? (
              <div className={`relative`}>
                <input
                  autoFocus
                  className="input-design"
                  type="number"
                  value={inputValue}
                  onChange={(e) => {
                    const value = e.target.value;
                    setInputValue(value);
                    setInputNumber(Number(value) || 0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setOpenNumberInput("BANYOCARPANI4");
                      setValue(
                        "BANYOCARPANI3",
                        calculateNumber(inputNumber, currentCalculatedNum)
                      );
                      setInputNumber(0);
                      setInputValue("");
                    }
                  }}
                />
                <p className="absolute right-2 top-1/2 -translate-y-1/2 bg-white w-[70%] pl-2 text-[var(--gray)]">
                  x {currentCalculatedNum}
                </p>
                <p className="absolute right-2 top-1/2 -translate-y-1/2 bg-white w-[40%] pl-2 text-[var(--gray)]">
                  = {calculateNumber(inputNumber, currentCalculatedNum)}
                </p>
              </div>
            ) : (
              <HFTextField
                name="BANYOCARPANI3"
                control={control}
                handleChange={(e: any) => {
                  setValue("BANYOCARPANI3", e.target.value);
                }}
              />
            )}
          </InputFieldUI>
          <InputFieldUI title="4. Banyo Carpan ">
            {openNumberInput === "BANYOCARPANI4" ? (
              <div className={`relative`}>
                <input
                  autoFocus
                  className="input-design"
                  type="number"
                  value={inputValue}
                  onChange={(e) => {
                    const value = e.target.value;
                    setInputValue(value);
                    setInputNumber(Number(value) || 0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setOpenNumberInput("");
                      setValue(
                        "BANYOCARPANI4",
                        calculateNumber(inputNumber, currentCalculatedNum)
                      );
                      setInputNumber(0);
                      handleKeyDown(e);
                    }
                  }}
                />
                <p className="absolute right-2 top-1/2 -translate-y-1/2 bg-white w-[70%] pl-2 text-[var(--gray)]">
                  x {currentCalculatedNum}
                </p>
                <p className="absolute right-2 top-1/2 -translate-y-1/2 bg-white w-[40%] pl-2 text-[var(--gray)]">
                  = {calculateNumber(inputNumber, currentCalculatedNum)}
                </p>
              </div>
            ) : (
              <HFTextField
                name="BANYOCARPANI4"
                control={control}
                handleChange={(e: any) => {
                  setValue("BANYOCARPANI4", e.target.value);
                }}
              />
            )}
          </InputFieldUI>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <CCheckbox
              element={{ label: "Otomasyona Dahil" }}
              checked={getValues().OTOMASYONADAHILMI}
              handleCheck={(obj: any) => {
                setValue("OTOMASYONADAHILMI", obj.checked);
              }}
            />
          </div>
          <div>
            <CCheckbox
              element={{ label: "Pati Recetesi" }}
              checked={getValues().PARTININASILRECETESIMI}
              handleCheck={(obj: any) => {
                setValue("PARTININASILRECETESIMI", obj.checked);
              }}
            />
          </div>
        </div>

        <Alert severity={getValues().STOKTANDUSULDU ? "success" : "error"}>
          <p>Stoktan Dusulmus</p>
        </Alert>
      </div>

      <SubmitCancelButtons
        uniqueID={"inner"}
        type={formId ? "update" : "create"}
        handleActions={(val: string, uniqueID: string) => {
          if (uniqueID === "main_order_form") {
            if (val === "Close") handleModalActionsFn("close");

            if (val === "Enter") handleSubmit(onSubmit)();
          }
        }}
      />
    </form>
  );
};
