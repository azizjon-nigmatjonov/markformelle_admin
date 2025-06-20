import { useEffect, useState, useCallback, useMemo, memo } from "react";
import { ImageViewer } from "../../../../../components/UI/ImageViewer";
import { useTranslation } from "react-i18next";
import { StepCard } from "./Card";
import toast from "react-hot-toast";
import { playSound } from "../../../../../utils/playAudio";
import { DragHeader } from "./Components/DragHeader";
import ConfirmationModal from "../../../../../components/CElements/CConfirmationModal";
import dayjs from "dayjs";
import { FormLogic } from "./Components/FormLogic";
const API_URL = import.meta.env.VITE_TEST_URL;
interface Props {
  open: string[];
  changed: string;
  setChanged: (val: string) => void;
  askAction: string;
  setAskAction: (val: string) => void;
  setOpen: (val: string[]) => void;
  tableData: any;
  setCurrentSellect: (val: any) => void;
  refetchTable: () => void;
}

// Custom hook for data processing
const useDataProcessor = (tableData: any) => {
  const [items, setItems] = useState<any[]>([]);
  const [oldValues, setOldValues] = useState<any[]>([]);
  const [headColumns, setHeadColumns] = useState<any[]>([]);

  const processData = useCallback((data: any) => {
    if (!data?.length) {
      setItems([]);
      setOldValues([]);
      return;
    }

    const sortedData = data.sort((a: any, b: any) => a.SIRA - b.SIRA);
    const objects: any = {};
    let lastId = "";

    const bgColors = {
      default: "#e0e7ff",
      hover: "#c7d2fe",
      active: "#a5b4fc",
    };

    for (let i = 0; i < sortedData.length; i++) {
      const obj = sortedData[i];
      obj.index = i;
      obj.bg = bgColors.default;

      if (obj.RECETEASAMAID && !objects[obj.RECETEASAMAID]) {
        lastId = "" + obj.RECETEASAMAID;
        objects[lastId] = {
          rows: [obj],
          RECETEGRAFIKID: obj.RECETEGRAFIKID,
          id: obj.RECETEASAMAID,
          SIRA: obj.SIRA,
          image: `${API_URL}/recetegrafik/image/${obj.RECETEGRAFIKID}`,
          bg: bgColors.default,
          main: obj,
        };
      } else {
        if (
          objects[lastId]?.rows?.every(
            (el: any) => el.RECETEASAMAID !== obj.RECETEASAMAID
          ) ||
          !obj.RECETEASAMAID
        ) {
          objects[lastId]?.rows?.push(obj);
        }
      }
    }

    const processedItems = Object.values(objects).sort(
      (a: any, b: any) => a.SIRA - b.SIRA
    );
    setOldValues(Object.values(JSON.parse(JSON.stringify(objects))));
    setItems(processedItems);
  }, []);

  // 1. SIRA, 2. URUNID, 3. URUNADI, 4. GR/KG, 5. GR/LT, 6. INSERTKULLANICIID, 6. INSERTTARIHI, 7. KULLANICIID, 8. DEGISIMTARIHI, 9. MIKTAR 10. RECETEDETAYID

  const columns = useMemo(
    () => [
      {
        title: "SIRA",
        id: "SIRA",
        width: 45,
        render: (val: string) => {
          return <div className="text-center w-full">{val}</div>;
        },
      },
      {
        title: "URUNID",
        id: "URUNID",
        width: 80,
      },
      {
        title: "URUNADI",
        id: "URUNADI",
        width: 180,
        render: (val: string) => (
          <div>
            {val.substring(0, 20)}
            {val.length > 20 ? "..." : ""}
          </div>
        ),
      },
      { title: "GR/KG", id: "MIKTAR", width: 60 },
      { title: "GR/LT", id: "BANYO", width: 60 },
      { title: "RECETEDETAYID", id: "RECETEDETAYID", width: 120 },

      { title: "URUNBIRIMID", id: "URUNBIRIMID", width: 100 },
      { title: "INSERTKULLANICIID", id: "INSERTKULLANICIID", width: 140 },
      {
        title: "INSERTTARIHI",
        id: "INSERTTARIHI",
        width: 150,
        render: (val: string) => dayjs(val).format("DD.MM.YYYY HH:mm"),
      },
      { title: "KULLANICIID", id: "KULLANICIID", width: 100 },
      {
        title: "DEGISIMTARIHI",
        id: "DEGISIMTARIHI",
        width: 120,
        render: (val: string) => dayjs(val).format("DD.MM.YYYY HH:mm"),
      },
    ],
    []
  );

  useEffect(() => {
    if (tableData?.data) {
      processData(tableData.data);
      setHeadColumns(columns);
    }
  }, [tableData, processData, columns]);

  return { items, setItems, oldValues, headColumns };
};

// Custom hook for modal state management
const useModalState = () => {
  const [editStep, setEditStep] = useState(false);
  const [deleteStep, setDeleteStep] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [askClear, setAskClear] = useState(false);
  const [askDelete, setAskDelete] = useState(false);
  const [deleteCard, setDeleteCard] = useState<any>(null);
  const [deleteCardActive, setDeleteCardActive] = useState(false);
  const [imageView, setImageView] = useState("");

  const resetModals = useCallback(() => {
    setEditStep(false);
    setDeleteStep(false);
    setSaveData(false);
    setAskClear(false);
    setAskDelete(false);
    setDeleteCard(null);
    setDeleteCardActive(false);
  }, []);

  return {
    editStep,
    setEditStep,
    deleteStep,
    setDeleteStep,
    saveData,
    setSaveData,
    askClear,
    setAskClear,
    askDelete,
    setAskDelete,
    deleteCard,
    setDeleteCard,
    deleteCardActive,
    setDeleteCardActive,
    imageView,
    setImageView,
    resetModals,
  };
};

export const DragDrop = memo(
  ({
    open,
    tableData,
    setChanged = () => {},
    changed,
    askAction,
    setAskAction = () => {},
    setOpen = () => {},
    setCurrentSellect,
    refetchTable,
  }: Props) => {
    const { t } = useTranslation();
    const [checkedList, setCheckedList] = useState<number[]>([]);

    const { items, setItems, oldValues, headColumns } =
      useDataProcessor(tableData);
    const clearSelect = useCallback(() => {
      const updatedItems = items.map((item: { rows: any }) => ({
        ...item,
        rows: item.rows.map((row: any) => ({ ...row, checked: false })),
      }));
      setItems(updatedItems);
      setCheckedList([]);
    }, [items, setItems]);

    const { deleteForm } = FormLogic({
      refetchTable: () => {
        refetchTable();
        toast.success(t("deleted!"));
        playSound("/notif.wav");
        setDeleteStep(false);
        setAskDelete(false);
        setAskAction("");
        setChanged("");
        clearSelect();
      },
    });

    const {
      editStep,
      setEditStep,
      deleteStep,
      setDeleteStep,
      saveData,
      setSaveData,
      askClear,
      setAskClear,
      askDelete,
      setAskDelete,
      deleteCard,
      setDeleteCard,
      deleteCardActive,
      setDeleteCardActive,
      imageView,
      setImageView,
      resetModals,
    } = useModalState();

    const onSubmit = useCallback(() => {
      resetModals();
      setChanged("");
      setAskAction("");
      toast.success("Изменения успешно сохранены!");
      playSound("/notif.wav");
    }, [resetModals, setChanged, setAskAction]);

    const clearChanges = useCallback(() => {
      if (editStep && changed) {
        setAskClear(true);
      } else {
        setEditStep((prev) => !prev);
      }
    }, [editStep, changed, setAskClear, setEditStep]);

    const handleCheck = useCallback(
      (el: any) => {
        setCheckedList((prev) => {
          const newList = prev.includes(el.RECETEDETAYID)
            ? prev.filter((i: any) => i !== el.RECETEDETAYID)
            : [...prev, el.RECETEDETAYID];

          setChanged(newList.length ? "delete" : "");
          return newList;
        });
      },
      [setChanged]
    );

    const handleSaveConfirm = useCallback(() => {
      onSubmit();
      setOpen([]);
    }, [onSubmit, setOpen]);

    const handleClearConfirm = useCallback(() => {
      clearChanges();
      setAskClear(false);
      setEditStep(false);
      setChanged("");
    }, [clearChanges, setAskClear, setEditStep, setChanged]);

    const handleDeleteConfirm = useCallback(() => {
      deleteForm(checkedList);
    }, [deleteForm, checkedList]);

    const handleCardDeleteConfirm = useCallback(() => {
      toast.success(t("deleted!"));
      playSound("/notif.wav");
      setDeleteCard(null);
    }, [t]);

    const handleCancelChanges = useCallback(() => {
      clearChanges();
      setAskClear(false);
      setEditStep(false);
      setAskAction("");
      setChanged("");
      setOpen([]);
      toast.custom("Все изменения очистили!");
    }, [
      clearChanges,
      setAskClear,
      setEditStep,
      setAskAction,
      setChanged,
      setOpen,
    ]);

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
          setDeleteCardActive={setDeleteCardActive}
        />
        <StepCard
          open={open}
          setOpen={setOpen}
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
          setCurrentSellect={setCurrentSellect}
        />

        <ImageViewer url={imageView} closeViewer={() => setImageView("")} />

        <ConfirmationModal
          open={saveData || askClear}
          onClose={() => {
            setSaveData(false);
            setAskClear(false);
          }}
          title={
            askClear
              ? "Вы точно хотите отменить изменения?!"
              : "Вы точно хотите сохранить изменения?!"
          }
          message={
            !askClear
              ? "Это изменение повлияет на производительность машины!"
              : undefined
          }
          onConfirm={askClear ? handleClearConfirm : onSubmit}
          onCancel={() => {
            setSaveData(false);
            setAskClear(false);
          }}
        />

        <ConfirmationModal
          open={askAction === "order"}
          onClose={() => {
            setAskAction("");
          }}
          title="Хотите сохранить изменения или нет?"
          message="Это изменение повлияет на производительность машины!"
          onConfirm={handleSaveConfirm}
          onCancel={handleCancelChanges}
          confirmText="save"
          cancelText="cancel_changes"
        />

        <ConfirmationModal
          open={askDelete || askAction === "delete"}
          onClose={() => {
            setAskDelete(false);
          }}
          title="Вы точно хотите удалить этот данных?"
          message="Это изменение повлияет на производительность машины!"
          onConfirm={handleDeleteConfirm}
          onCancel={() => {
            setDeleteStep(false);
            setAskDelete(false);
            setAskAction("");
            setChanged("");
            clearSelect();
          }}
        />

        <ConfirmationModal
          open={!!deleteCard}
          onClose={() => {
            setDeleteCard(null);
          }}
          title="Вы точно хотите удалить этот данных?"
          message="Это изменение повлияет на производительность машины!"
          onConfirm={handleCardDeleteConfirm}
          onCancel={() => {
            setDeleteCard(null);
          }}
        />
      </div>
    );
  }
);

DragDrop.displayName = "DragDrop";
