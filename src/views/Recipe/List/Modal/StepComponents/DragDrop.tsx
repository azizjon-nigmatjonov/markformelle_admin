import { useEffect, useState } from "react";
// import { StokeDeteyContantList } from "../../../../../constants/stokedetey";
import { ImageViewer } from "../../../../../components/UI/ImageViewer";
import { useTranslation } from "react-i18next";
import { StepModal } from "./StepModal";

import { StepCard } from "./Card";
import CModal from "../../../../../components/CElements/CModal";
import toast from "react-hot-toast";
import { playSound } from "../../../../../utils/playAudio";
import { CardModal } from "./CardModal";

import { DragAndDropDataLogic } from "./Logic";
import { DragHeader } from "./Components/DragHeader";
import CNewMiniModal from "../../../../../components/CElements/CNewMiniModal";
import { CardEditModal } from "./Components/CardEditModal";
const API_URL = import.meta.env.VITE_TEST_URL;
interface Props {
  formId: string;
  changed: string;
  setChanged: (val: string) => void;
  askAction: string;
  setAskAction: (val: string) => void;
  setOpenMainModal: (val: boolean) => void;
}

export const DragDrop = ({
  formId,
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
  const { tableData } = DragAndDropDataLogic({ id: formId });

  const onSubmit = () => {
    setEditStep(false);
    setSaveData(false);
    setAskClear(false);
    setChanged("");
    setAskAction("");
    toast.success("Изменения успешно сохранены!");
    playSound("/notif.wav");
  };

  const SetInitialData = (data: any) => {
    data = data.sort((a: any, b: any) => a.SIRA - b.SIRA) ?? [];
    const objects: any = {};
    let lastId = "";
    let ind = 0;
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      if (obj.RECETEASAMAID) lastId = "" + obj.RECETEASAMAID;

      if (lastId in objects && !obj.RECETEASAMAID) {
        obj.index = ind;
        ind += 1;
        objects[lastId].rows.push(obj);
      } else {
        objects[obj.RECETEASAMAID] = {
          rows: [],
          RECETEGRAFIKID: obj.RECETEGRAFIKID,
          id: obj.RECETEASAMAID,
          SIRA: obj.SIRA,
          image: `${API_URL}/recetegrafik/image/${obj.RECETEGRAFIKID}`,
          bg: "bg-indigo-100",
          main: obj,
        };
      }
    }

    setOldValues(Object.values(JSON.parse(JSON.stringify(objects))));
    setItems(
      Object.values(objects)?.length
        ? Object.values(objects).sort((a: any, b: any) => a.SIRA - b.SIRA)
        : []
    );
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
    if (tableData?.data) SetInitialData(tableData.data);
  }, [tableData]);

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

  const [currentModal, setCurrentModal] = useState("");

  const handleActions = (type: string) => {
    switch (type) {
      case "Enter":
        setCurrentModal("card");
        break;
      default:
        break;
    }
  };

  return (
    <div className="cdraganddrop text-sm">
      <DragHeader
        items={items}
        changed={changed}
        editStep={editStep}
        tableData={tableData}
        checkedList={checkedList}
        deleteStep={deleteStep}
        deleteCardActive={deleteCardActive}
        setAskDelete={setAskDelete}
        setDeleteStep={setDeleteStep}
        clearChanges={clearChanges}
        setSaveData={setSaveData}
        handleActions={handleActions}
        setDeleteCardActive={setDeleteCardActive}
      />
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
                SetInitialData([]);
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
              SetInitialData([]);
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

      {currentModal === "card" && (
        <CNewMiniModal
          title="Recete Girisi"
          handleActions={() => setCurrentModal("")}
        >
          <CardEditModal
            currentModal={currentModal}
            handleActions={() => {
              setCurrentModal("");
            }}
          />
        </CNewMiniModal>
      )}
    </div>
  );
};
