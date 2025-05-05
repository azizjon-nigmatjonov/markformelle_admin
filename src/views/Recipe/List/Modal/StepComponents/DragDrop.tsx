import { useEffect, useState } from "react";
import { StokeDeteyContantList } from "../../../../../constants/stokedetey";

import { ImageViewer } from "../../../../../components/UI/ImageViewer";

import { useTranslation } from "react-i18next";
import { StepModal } from "./StepModal";
import {
  EditIcon,
  SaveIcon,
} from "../../../../../components/UI/IconGenerator/Svg";
import { StepCard } from "./Card";
import CModal from "../../../../../components/CElements/CModal";
import toast from "react-hot-toast";
import { playSound } from "../../../../../utils/playAudio";

interface Props {
  changed: boolean;
  setChanged: (val: boolean) => void;
  askAction: boolean;
  setAskAction: (val: boolean) => void;
  setOpenMainModal: (val: boolean) => void;
}

export const DragDrop = ({
  setChanged = () => {},
  changed = false,
  askAction,
  setAskAction = () => {},
  setOpenMainModal,
}: Props) => {
  const { t } = useTranslation();
  const [editStep, setEditStep] = useState(false);
  const [initialModalData, setInitialModalData] = useState({});
  const [saveData, setSaveData] = useState(false);

  const [imageView, setImageView] = useState("");
  const [items, setItems]: any = useState([]);
  const [oldValues, setOldValues] = useState([]);
  const [askClear, setAskClear] = useState(false);

  const onSubmit = () => {
    console.log("save");
    setEditStep(false);
    setSaveData(false);
    setAskClear(false);
    setChanged(false);
    setAskAction(false);
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

  return (
    <div className="cdraganddrop">
      <div className="flex justify-end mb-3">
        <div className="flex space-x-2">
          <button
            onClick={() => clearChanges()}
            type="button"
            className={` ${editStep ? "cancel-btn" : "custom-btn"} space-x-1`}
            style={{ color: editStep ? "var(--error)" : "" }}
          >
            {editStep ? "" : <EditIcon />}
            <span>
              {t(changed ? "cancel_changes" : editStep ? "cancel" : "edit")}
            </span>
          </button>
          <button
            onClick={() => {
              if (editStep && changed) setSaveData(true);
            }}
            disabled={!editStep && !changed}
            type="button"
            className={`custom-btn space-x-1 ${
              editStep && changed ? "" : "disabled"
            }`}
          >
            <SaveIcon fill={editStep && changed ? "white" : "var(--gray)"} />
            <span>{t("save")}</span>
          </button>
        </div>
      </div>
      <StepCard
        items={items}
        setItems={setItems}
        oldValues={oldValues}
        editStep={editStep}
        setChanged={setChanged}
        setImageView={setImageView}
        setInitialModalData={setInitialModalData}
      />
      <ImageViewer url={imageView} closeViewer={() => setImageView("")} />
      <StepModal
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
                setChanged(false);
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
        open={askAction}
        handleClose={() => {
          setSaveData(false);
          setAskClear(false);
          setAskAction(false);
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
              setAskAction(false);
              setChanged(false);
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
    </div>
  );
};
