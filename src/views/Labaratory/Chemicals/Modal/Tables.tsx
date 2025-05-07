import { useState } from "react";
import CNewTable from "../../../../components/CElements/CNewTable";
import { PlusIcon } from "../../../../components/UI/IconGenerator/Svg";
import { MaterialForm } from "./MaterialForm";
import CNewMiniModal from "../../../../components/CElements/CNewMiniModal";
import { TrailForm } from "./TrailForm";
import { DetailForm } from "./DetailForm";
import { TwoRowTable } from "./TableUI/TwoRowTable";

const TrialList = [
  {
    ASKNO: "12332",
    ASKTARIHI: "11.03.2024",
    PIPETLEMENO: "123",
    MIGROSOYUN: "MIG",
  },
  {
    ASKNO: "4343",
    ASKTARIHI: "13.03.2024",
    PIPETLEMENO: "44",
    MIGROSOYUN: "hhf",
  },
  {
    ASKNO: "4343",
    ASKTARIHI: "13.03.2024",
    PIPETLEMENO: "44",
    MIGROSOYUN: "hhf",
  },
];

const TrialList2 = [
  {
    ASKNO: "5354543",
    ASKTARIHI: "01.01.2024",
    PIPETLEMENO: "4434",
    MIGROSOYUN: "FJERF",
  },
];

const DetailsList = [
  {
    SIRA: "SIOR",
    URUNADI: "SEZATOL GOLDEN YELLOW",
    MIKTAR: "0.044320",
    HASEPBIRIMI: "%",
    BIRIMFIYAT: "7.68",
    TURLAR: "0.002",
    ILKKAYDEDM: "Nodirbek Mamajonov",
    ILKTARIHI: "30.07.2024 16:28:49",
    DIGISIMKULLANUCI: "Nodirbek Mamajonov",
  },
];

const DetailsList2 = [
  {
    SIRA: "ggeg",
    URUNADI: " GOLDEN YELLOW",
    MIKTAR: "0.044320",
    HASEPBIRIMI: "%",
    BIRIMFIYAT: "7.68",
    TURLAR: "0.002",
    ILKKAYDEDM: "Jaurbek Mamajonov",
    ILKTARIHI: "30.07.2024 16:28:49",
    DIGISIMKULLANUCI: "Jaurbek Mamajonov",
  },
];

export const LabModalTables = ({ disabled }: { disabled: boolean }) => {
  const [filterParamsMaterial, setFilterParamsMaterial] = useState({
    page: 1,
    perPage: 100,
  });
  const [trialTable, setTrailTable]: any = useState(TrialList);
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 100 });
  const [detailsTable, setDetailsTable] = useState(DetailsList);
  const [open, setOpen] = useState("");
  const [bodyList, setBodyList] = useState([
    {
      1: "3",
      2: "434",
      3: "43434",
      checked: true,
    },
    {
      1: "aaade",
      2: "frefdd",
      3: "hhfgh",
    },
  ]);

  const handleActionsMaterial = (el: { index: number }, type: string) => {
    if (type === "view_single") {
      const newList = bodyList.map((item: any, index: number) => {
        if (index + 1 === el.index) item.checked = true;
        else item.checked = false;

        return item;
      });
      setBodyList(newList);
      if (el.index === 1) {
        setTrailTable(TrialList);
      } else {
        setTrailTable(TrialList2);
      }
    }

    if (type === "modal" || type === "view") {
      setOpen("material");
    }
  };

  const handleActionsTrial = (el: { index: number }, type: string) => {
    if (type === "modal" || type === "view") {
      setOpen("trial");
    }
    if (type === "view_single") {
      const newList = trialTable.map((item: any, index: number) => {
        if (index + 1 === el.index) item.checked = true;
        else item.checked = false;

        return item;
      });
      setTrailTable(newList);
      if (el.index === 1) {
        setDetailsTable(DetailsList);
      } else {
        setDetailsTable(DetailsList2);
      }
    }
  };

  const handleActionsDetails = (_: {}, type: string) => {
    if (type === "modal" || type === "view") {
      setOpen("detail");
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-x-5 border rounded-[12px] border-[var(--border)] overflow-hidden">
        <div className="border-r border-[var(--border)]">
          <CNewTable
            title="Material"
            headColumns={[
              {
                title: "Ham Adi",
                id: "1",
              },
              {
                title: "Calisma tarihi",
                id: "2",
              },
              {
                title: "Termin tarihi",
                id: "1",
              },
            ]}
            defaultFilters={["actions"]}
            defaultActions={["delete", "edit"]}
            idForTable="modal_table_material"
            bodyColumns={bodyList}
            handleActions={handleActionsMaterial}
            isLoading={false}
            filterParams={filterParamsMaterial}
            handleFilterParams={setFilterParamsMaterial}
            disablePagination={true}
            autoHeight={"400px"}
            disabled={disabled}
            animation={false}
            extra={
              <button
                onClick={() => {
                  if (disabled) return;
                  setOpen("material");
                }}
                className="flex items-center"
                type="button"
              >
                <PlusIcon fill={disabled ? "var(--gray)" : "var(--main)"} />
              </button>
            }
          />
        </div>

        <div>
          <TwoRowTable />
        </div>

        <div className="border-l border-[var(--border)]">
          <CNewTable
            title="Details"
            headColumns={[
              {
                title: "Sira",
                id: "SIRA",
              },

              {
                title: "Urun Adi",
                id: "URUNADI",
              },
              {
                title: "Miktar",
                id: "MIKTAR",
              },
              {
                title: "Hasep Birimi",
                id: "HASEPBIRIMI",
              },
              {
                title: "ILKKAYDEDM",
                id: "ILKKAYDEDM",
              },
              {
                title: "TARIH",
                id: "ILKTARIHI",
              },
              {
                title: "Birimi Fiyati",
                id: "BIRIMFIYAT",
              },
              {
                title: "Turlar",
                id: "TURLAR",
              },
            ]}
            defaultFilters={["actions"]}
            idForTable="table_modal_details"
            defaultActions={["delete", "edit"]}
            bodyColumns={detailsTable}
            handleActions={handleActionsDetails}
            isLoading={false}
            filterParams={filterParams}
            handleFilterParams={setFilterParams}
            disablePagination={true}
            autoHeight={"400px"}
            animation={false}
            disabled={disabled}
            extra={
              <button
                onClick={() => {
                  if (disabled) return;
                  setOpen("detail");
                }}
                className="flex items-center"
                type="button"
              >
                <PlusIcon fill={disabled ? "var(--gray)" : "var(--main)"} />
              </button>
            }
          />
        </div>
      </div>
      {open.length ? (
        <CNewMiniModal
          title={
            open === "material"
              ? "Add material"
              : open === "trial"
              ? "Add trial"
              : "Add details"
          }
          handleActions={() => setOpen("")}
        >
          {open === "material" && <MaterialForm onClose={() => setOpen("")} />}
          {open === "trial" && (
            <TrailForm
              onClose={() => setOpen("")}
              handleActionsDetails={handleActionsDetails}
              filterParams={filterParams}
              setFilterParams={setFilterParams}
              disabled={disabled}
              setOpen={setOpen}
            />
          )}
          {open === "detail" && <DetailForm onClose={() => setOpen("")} />}
        </CNewMiniModal>
      ) : (
        ""
      )}
    </>
  );
};
