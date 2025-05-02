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

export const DragDrop = () => {
  const { t } = useTranslation();
  const [editStep, setEditStep] = useState(false);
  const [initialModalData, setInitialModalData] = useState({});
  const [saveData, setSaveData] = useState(false);

  const [imageView, setImageView] = useState("");
  const [items, setItems]: any = useState([]);

  const onSubmit = () => {
    console.log("save");
    setEditStep(false);
    setSaveData(false);
    toast.success("Изменения успешно сохранены!");
    playSound("/public/notif.wav");
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
    setItems(Object.values(objects));
  };
  useEffect(() => {
    SetInitialData();
  }, []);

  return (
    <div className="cdraganddrop">
      <div className="flex justify-end mb-3">
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setEditStep((prev) => !prev);
              if (editStep) SetInitialData();
            }}
            type="button"
            className={` ${editStep ? "cancel-btn" : "custom-btn"} space-x-1`}
          >
            {editStep ? "" : <EditIcon />}
            <span>{t(editStep ? "cancel" : "edit")}</span>
          </button>
          <button
            onClick={() => {
              if (editStep) setSaveData(true);
            }}
            disabled={!editStep}
            type="button"
            className={`custom-btn space-x-1 ${editStep ? "" : "disabled"}`}
          >
            <SaveIcon fill={editStep ? "white" : "var(--gray)"} />
            <span>{t("save")}</span>
          </button>
        </div>
      </div>

      <StepCard
        items={items}
        setItems={setItems}
        editStep={editStep}
        setImageView={setImageView}
        setInitialModalData={setInitialModalData}
      />

      <ImageViewer url={imageView} closeViewer={() => setImageView("")} />

      <StepModal
        defaultData={initialModalData}
        setDefaultData={setInitialModalData}
      />
      <CModal
        open={saveData}
        handleClose={() => setSaveData(false)}
        footerActive={false}
      >
        <p className="text-[var(--black)] text-2xl font-medium">
          Вы точно хотите <br /> сохранить изменения?!
        </p>
        <p className="text-[var(--error)] text-lg mt-3">
          Это изменение повлияет на производительность машины!
        </p>

        <div className="grid gap-2 grid-cols-2 mt-8">
          <button className="cancel-btn" onClick={() => setSaveData(false)}>
            {t("no")}
          </button>
          <button className="custom-btn" onClick={() => onSubmit()}>
            {t("yes")}
          </button>
        </div>
      </CModal>
    </div>
  );
};
