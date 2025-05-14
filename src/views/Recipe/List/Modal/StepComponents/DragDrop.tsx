import { useEffect, useMemo, useState } from "react";
import { StokeDeteyContantList } from "../../../../../constants/stokedetey";

import { ImageViewer } from "../../../../../components/UI/ImageViewer";

import { useTranslation } from "react-i18next";
import { StepModal } from "./StepModal";
import {
  CheckLine,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  SaveIcon,
} from "../../../../../components/UI/IconGenerator/Svg";
import { StepCard } from "./Card";
import CModal from "../../../../../components/CElements/CModal";
import toast from "react-hot-toast";
import { playSound } from "../../../../../utils/playAudio";
import { CardModal } from "./CardModal";
import ExcelDownload from "../../../../../hooks/useExcelDownload";
import { Tooltip } from "@mui/material";
import { TooltipPosition } from "../../../../../constants/toolPosition";
import {
  CheckMultipleIcon,
  UncheckMultipleIcon,
} from "../../../../../components/UI/IconGenerator/Svg/Table";

interface Props {
  changed: string;
  setChanged: (val: string) => void;
  askAction: string;
  setAskAction: (val: string) => void;
  setOpenMainModal: (val: boolean) => void;
}

export const DragDrop = ({
  setChanged = () => {},
  changed,
  askAction,
  setAskAction = () => {},
  setOpenMainModal,
}: Props) => {
  const { t } = useTranslation();
  const [editStep, setEditStep] = useState(false);
  const [deleteStep, setDeleteStep] = useState(false);
  const [initialModalData, setInitialModalData] = useState({});
  const [saveData, setSaveData] = useState(false);

  const [imageView, setImageView] = useState("");
  const [items, setItems]: any = useState([]);
  const [headColumns, setHeadColumns]: any = useState([]);
  const [oldValues, setOldValues] = useState([]);
  const [askClear, setAskClear] = useState(false);
  const [askDelete, setAskDelete] = useState(false);
  const [checkedList, setCheckedList]: any = useState([]);
  const [deleteCard, setDeleteCard] = useState(null);
  const [deleteCardActive, setDeleteCardActive] = useState(false);

  const onSubmit = () => {
    console.log("save");
    setEditStep(false);
    setSaveData(false);
    setAskClear(false);
    setChanged("");
    setAskAction("");
    toast.success("Изменения успешно сохранены!");
    playSound("/notif.wav");
  };

  const SetInitialData = () => {
    const objects: any = {};
    let lastId = "";
    for (let i = 0; i < StokeDeteyContantList.length; i++) {
      const obj = StokeDeteyContantList[i];
      if (obj.RECETEASAMAID) lastId = "" + obj.RECETEASAMAID;

      if (lastId in objects && !obj.RECETEASAMAID) {
        objects[lastId].rows.push(obj);
      } else {
        objects[obj.RECETEASAMAID] = {
          rows: [obj],
          id: obj.RECETEASAMAID,
          image: "/images/test/test1.png",
          bg: i === 0 ? "bg-blue-100" : i < 2 ? "bg-lime-100" : "bg-indigo-100",
        };
      }
    }
    setOldValues(Object.values(JSON.parse(JSON.stringify(objects))));
    setItems(Object.values(objects));
    setHeadColumns([
      { title: "RECETEDETAYID", id: "RECETEDETAYID" },
      { title: "SIRA", id: "SIRA" },
      { title: "URUNID", id: "URUNID" },
      { title: "URUNBIRIMID", id: "URUNBIRIMID" },
      { title: "RECETEGRAFIKID", id: "RECETEGRAFIKID" },
      { title: "MIKTAR", id: "MIKTAR" },
      { title: "INSERTKULLANICIID", id: "INSERTKULLANICIID" },
      { title: "INSERTTARIHI", id: "INSERTTARIHI" },
      { title: "KULLANICIID", id: "KULLANICIID" },
      { title: "DEGISIMTARIHI", id: "DEGISIMTARIHI" },
    ]);
  };
  useEffect(() => {
    SetInitialData();
  }, []);

  const clearChanges = () => {
    if (editStep && changed) {
      setAskClear(true);
    } else {
      setEditStep((prev) => !prev);
    }
  };

  const clearSelect = () => {
    items.map((item: { rows: any }) => {
      return item.rows.map((row: any) => {
        row.checked = false;
        return row;
      });
    });
    setCheckedList([]);
  };

  const ExcelData = useMemo(() => {
    const arr: any = [];

    for (let i = 0; i < items?.length; i++) {
      const rows = items[i].rows;
      arr.push(...rows);
    }

    return arr;
  }, [items, editStep]);

  const Fields = useMemo(() => {
    const arr: any = [];
    const obj: any = StokeDeteyContantList[0];
    delete obj.status;
    delete obj.index;
    for (let key in obj) {
      arr.push(key);
    }
    return arr;
  }, []);

  const handleDelete = () => {
    if (checkedList.length) {
      setAskDelete(true);
    } else {
      setDeleteStep((prev) => !prev);
    }
  };

  const handleCheck = (el: any) => {
    let arr = JSON.parse(JSON.stringify(checkedList));
    if (arr.includes(el.RECETEDETAYID)) {
      arr = arr.filter((i: number) => i !== el.RECETEDETAYID);
    } else {
      arr.push(el.RECETEDETAYID);
    }
    arr.length ? setChanged("delete") : setChanged("");
    setCheckedList(arr);
  };

  return (
    <div className="cdraganddrop text-sm">
      <div className="flex justify-end items-center mb-1 pb-2 border-b">
        <div className="flex space-x-8 items-center font-medium">
          <div>
            <ExcelDownload
              title={"excel_steps"}
              data={ExcelData}
              allColumns={ExcelData}
              defaultExcelFields={Fields}
              disabled={false}
              type="directly"
              label={
                <span className="text-sm uppercase">{t("download_excel")}</span>
              }
            />
          </div>
          <Tooltip
            title={t("delete_sellected_elements")}
            arrow
            slotProps={TooltipPosition}
          >
            <button
              onClick={() => handleDelete()}
              type="button"
              className={`flex items-center space-x-2 ${
                checkedList.length ? "text-[var(--error)]" : ""
              }`}
            >
              {checkedList.length ? (
                <DeleteIcon fill="var(--error)" />
              ) : deleteStep ? (
                <UncheckMultipleIcon width={23} fill="var(--main)" />
              ) : (
                <CheckMultipleIcon width={23} fill="var(--main)" />
              )}

              <span className="text-[var(--black)]">
                {t(
                  checkedList.length
                    ? "delete_elements"
                    : deleteStep
                    ? "cancel_select"
                    : "select_delete"
                )}
              </span>
            </button>
          </Tooltip>

          <Tooltip title={t("delete_card")} arrow slotProps={TooltipPosition}>
            <button
              onClick={() => setDeleteCardActive(!deleteCardActive)}
              type="button"
              className={`flex items-center space-x-2`}
            >
              <div
                onClick={() => {}}
                className={`w-[17px] h-[17px] border-[1.5px] border-[var(--main)] rounded-[4px] hover:cursor-pointer flex items-center justify-center`}
              >
                <div className="w-[18px]">
                  {deleteCardActive && <CheckLine fill="var(--main)" />}
                </div>
              </div>
              <span className="text-[var(--black)]">{t("delete_card")}</span>
            </button>
          </Tooltip>

          <Tooltip
            title={t(editStep ? "cancel_changes" : "edit")}
            arrow
            slotProps={TooltipPosition}
          >
            <button
              onClick={() => clearChanges()}
              type="button"
              className={`flex items-center space-x-2`}
            >
              {editStep ? (
                <CloseIcon width={22} fill="black" />
              ) : (
                <EditIcon width={18} fill="var(--main)" />
              )}
              <span className="text-[var(--black)]">
                {t(
                  changed
                    ? "cancel_changes"
                    : editStep
                    ? "cancel_order"
                    : "edit_order"
                )}
              </span>
            </button>
          </Tooltip>

          <Tooltip
            title="Сохранить изменения"
            arrow
            slotProps={TooltipPosition}
          >
            <button
              onClick={() => {
                if (editStep && changed) setSaveData(true);
              }}
              disabled={!editStep && !changed}
              type="button"
              className={`flex items-center space-x-2 ${
                editStep && changed ? "text-[var(--main)]" : "disabled"
              }`}
            >
              <SaveIcon
                width={24}
                fill={editStep && changed ? "var(--main)" : "var(--gray)"}
              />
              <span className="text-[var(--black)]">{t("save")}</span>
            </button>
          </Tooltip>
        </div>
      </div>
      <StepCard
        items={items}
        editStep={editStep}
        setItems={setItems}
        oldValues={oldValues}
        deleteStep={deleteStep}
        setChanged={setChanged}
        setImageView={setImageView}
        headColumns={headColumns}
        checkedList={checkedList}
        handleCheck={handleCheck}
        setDeleteCard={setDeleteCard}
        deleteCardActive={deleteCardActive}
        setInitialModalData={setInitialModalData}
      />
      <ImageViewer url={imageView} closeViewer={() => setImageView("")} />
      <StepModal
        defaultData={initialModalData}
        setDefaultData={setInitialModalData}
      />
      <CardModal
        defaultData={initialModalData}
        setDefaultData={setInitialModalData}
      />
      <CModal
        open={saveData || askClear}
        handleClose={() => {
          setSaveData(false);
          setAskClear(false);
        }}
        footerActive={false}
      >
        {askClear ? (
          <>
            <p className="text-[var(--error)] text-2xl font-medium">
              Вы точно хотите <br /> отменить изменения?!
            </p>
          </>
        ) : (
          <>
            <p className="text-[var(--black)] text-2xl font-medium">
              Вы точно хотите <br /> сохранить изменения?!
            </p>
            <p className="text-[var(--error)] text-lg mt-3">
              Это изменение повлияет на производительность машины!
            </p>
          </>
        )}

        <div className="grid gap-2 grid-cols-2 mt-8">
          <button
            className="cancel-btn"
            onClick={() => {
              setSaveData(false);
              setAskClear(false);
            }}
          >
            {t("no")}
          </button>
          <button
            className="custom-btn"
            onClick={() => {
              if (askClear) {
                clearChanges();
                setAskClear(false);
                setEditStep(false);
                SetInitialData();
                setChanged("");
              } else {
                onSubmit();
              }
            }}
          >
            {t("yes")}
          </button>
        </div>
      </CModal>

      <CModal
        open={askAction === "order"}
        handleClose={() => {
          setSaveData(false);
          setAskClear(false);
          setAskAction("");
        }}
        footerActive={false}
      >
        <p className="text-[var(--black)] text-2xl font-medium">
          Хотите сохранить изменения или нет?
        </p>

        <p className="text-[var(--error)] text-lg mt-3">
          Это изменение повлияет на производительность машины!
        </p>

        <div className="grid gap-2 grid-cols-2 mt-8">
          <button
            className="cancel-btn"
            onClick={() => {
              clearChanges();
              setAskClear(false);
              setEditStep(false);
              SetInitialData();
              setAskAction("");
              setChanged("");
              setOpenMainModal(false);
              toast.custom("Все изменения очистили!");
            }}
          >
            {t("cancel_changes")}
          </button>
          <button
            className="custom-btn"
            onClick={() => {
              onSubmit();
              setOpenMainModal(false);
            }}
          >
            {t("save")}
          </button>
        </div>
      </CModal>

      <CModal
        open={askDelete || askAction === "delete"}
        handleClose={() => {
          setAskDelete(false);
        }}
        footerActive={false}
      >
        <p className="text-[var(--black)] text-2xl font-medium">
          Вы точно хотите удалить этот данных?
        </p>

        <p className="text-[var(--error)] text-lg mt-3">
          Это изменение повлияет на производительность машины!
        </p>

        <div className="grid gap-2 grid-cols-2 mt-8">
          <button
            className="cancel-btn"
            onClick={() => {
              setDeleteStep(false);
              setAskDelete(false);
              setAskAction("");
              setChanged("");
              clearSelect();
            }}
          >
            {t("no")}
          </button>
          <button
            className="custom-btn"
            onClick={() => {
              toast.success(t("deleted!"));
              playSound("/notif.wav");
              setDeleteStep(false);
              setAskDelete(false);
              setAskAction("");
              setChanged("");
              clearSelect();
            }}
          >
            {t("yes")}
          </button>
        </div>
      </CModal>

      <CModal
        open={!!deleteCard}
        handleClose={() => {
          setDeleteCard(null);
        }}
        footerActive={false}
      >
        <p className="text-[var(--black)] text-2xl font-medium">
          Вы точно хотите удалить этот данных?
        </p>

        <p className="text-[var(--error)] text-lg mt-3">
          Это изменение повлияет на производительность машины!
        </p>

        <div className="grid gap-2 grid-cols-2 mt-8">
          <button
            className="cancel-btn"
            onClick={() => {
              setDeleteCard(null);
            }}
          >
            {t("no")}
          </button>
          <button
            className="custom-btn"
            onClick={() => {
              toast.success(t("deleted!"));
              playSound("/notif.wav");
              setDeleteCard(null);
            }}
          >
            {t("yes")}
          </button>
        </div>
      </CModal>
    </div>
  );
};
