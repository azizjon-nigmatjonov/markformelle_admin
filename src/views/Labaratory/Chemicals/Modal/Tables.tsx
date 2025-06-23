import { useEffect, useState } from "react";
import { MaterialForm } from "./MaterialForm";
import CNewMiniModal from "../../../../components/CElements/CNewMiniModal";
import { TrailForm } from "./TrailForm";
import { DetailForm } from "./DetailForm";
import { TwoRowTable } from "./TableUI/TwoRowTable";
import { TableUI } from "./TableUI/TableUI";
import {
  DetailTableLogic,
  TableHeadersLogic,
  TablesLogic,
  TrailTableLogic,
} from "./Logic";
import { MaterialFormLogic } from "./MaterialForm/Logic";
import { TrailFormLogic } from "./TrailForm/Logic";
import { DetailFormLogic } from "./DetailForm/Logic";
import { PopupUI } from "../../../../components/UI/PopupUI";
import { AskTemplate } from "./TableUI/AskTemplate";
import { useFetchTypeSingle } from "../../../../hooks/useFetchRequests/useFetchType";
import CNewModal from "../../../../components/CElements/CNewModal";
import { ModalUIRecipe } from "../../../Recipe/List/Modal";
import { TemplateForm } from "./TableUI/TemplateForm";

export const LabModalTables = ({
  disabled,
  formId,
  formData = {},
  setUniqueID,
}: {
  disabled: boolean;
  formId: number;
  formData: any;
  setUniqueID: (val: string) => void;
}) => {
  const [openModal, setOpenModal] = useState<string[]>([""]);
  const { tableData, refetch: refetchMaterial } = TablesLogic({
    formId: formId || formData?.LABRECETEID,
  });
  const [idTable, setIdTable]: any = useState(null);
  const [materialData, setMaterialData] = useState({});
  const [idMaterial, setIdMaterial]: any = useState(null);
  const [idTrail, setIdTrail]: any = useState(null);
  const [idTrailForm, setIdTrailForm]: any = useState(null);
  const [idDetailForm, setIdDetailForm]: any = useState(null);
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 100 });
  const [open, setOpen] = useState("");
  const [atisNo, setAtisNo]: any = useState(null);
  const [openPopUp, setOpenPoUp] = useState(null);
  const [openNewModal, setOpenNewModal] = useState<string>("");
  const { headColumns, trailHeadColumns, detailHeadColumns } =
    TableHeadersLogic();
  const { trailData, refetch: refetchTrailTable } = TrailTableLogic({
    id: formId,
    idTable: idTable,
  });
  const {
    data: templateData,
    setFilterParams: setTemplateFilterParams,
    filterParams: templateFilterParams,
  } = useFetchTypeSingle();
  const { detailData, refetch: refetchDetailTable } = DetailTableLogic({
    id: formId,
    idTable: idTrail,
  });
  const refetchAll = () => {
    refetchMaterial();
    refetchTrailTable();
    refetchDetailTable();
  };
  const { deleteFn } = MaterialFormLogic({ refetchMaterial: refetchAll });
  const { deleteFn: deleteTrailFn } = TrailFormLogic({
    refetchTable: refetchAll,
  });
  const { deleteFn: deleteDetailFn } = DetailFormLogic({
    refetchTable: refetchDetailTable,
  });

  useEffect(() => {
    if (open.length) setUniqueID(open);
    else setUniqueID("main_table_lab");
  }, [open]);

  useEffect(() => {
    if (tableData?.data?.length) {
      setIdTable(tableData.data[0].LABRECETECALISMAID);
      setMaterialData(tableData.data[0]);
    }
  }, [tableData]);

  useEffect(() => {
    if (trailData?.okey?.length) {
      setIdTrail(trailData.okey[0].LABRECETEATISID);
    } else if (trailData?.okeysiz?.length) {
      setIdTrail(trailData.okeysiz[0].LABRECETEATISID);
    } else {
      setIdTrail(null);
    }
  }, [trailData]);

  useEffect(() => {
    if (detailData?.length) {
      setIdDetailForm(detailData[0].LABRECETEURUNID);
    }
  }, [detailData]);

  const handleActionsMaterial = (
    el: { index: number; LABRECETECALISMAID: number },
    type: string,
    arr?: any
  ) => {
    if (type === "view_single") {
      setIdTable(el.LABRECETECALISMAID);
      setIdMaterial(el.LABRECETECALISMAID);
      setMaterialData(el);
    }

    if (type === "view") {
      setOpen("material");
      setMaterialData(el);
      setIdMaterial(el.LABRECETECALISMAID);
    }

    if (type === "modal") {
      setOpen("material");
      setIdMaterial(null);
    }

    if (type === "delete") {
      deleteFn(
        arr.map((item: { LABRECETECALISMAID: number }) => {
          return item.LABRECETECALISMAID;
        })
      );
    }
  };

  const handleActionsTrial = (
    el: { index: number; LABRECETEATISID: number },
    type: string,
    arr?: any
  ) => {
    if (type === "modal") {
      setOpen("trail");
      setIdTrailForm(null);
    }

    if (type === "view_single") {
      setIdTrail(el.LABRECETEATISID);
      setIdTrailForm(el.LABRECETEATISID);
    }

    if (type === "view") {
      setIdTrail(el.LABRECETEATISID);
      setIdTrailForm(el.LABRECETEATISID);
      setOpen("trail");
    }

    if (type === "delete") {
      deleteTrailFn(
        arr.map((item: { LABRECETEATISID: number }) => {
          return item.LABRECETEATISID;
        })
      );
    }
  };

  const handleActionsDetails = (
    el: { index: number; LABRECETEURUNID: number },
    type: string,
    arr?: any
  ) => {
    if (type.includes("inner")) {
      if (type === "modalinner") {
        setOpen("traildetail");
        setIdDetailForm(null);
      }

      if (type === "viewinner") {
        setIdDetailForm(el.LABRECETEURUNID);
        setOpen("traildetail");
      }
    }
    if (type === "modal") {
      setOpen("detail");
      setIdDetailForm(null);
    }
    if (type === "view_single") {
      setIdDetailForm(el.LABRECETEURUNID);
    }

    if (type === "view") {
      setIdDetailForm(el.LABRECETEURUNID);
      setOpen("detail");
    }

    if (type === "delete") {
      deleteDetailFn(
        arr.map((item: { LABRECETEURUNID: number }) => {
          return item.LABRECETEURUNID;
        })
      );
    }
  };

  const [search, setSearch] = useState("");
  const [bodyData, setBodyData] = useState([]);
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const arr = bodyData?.filter((el: any) =>
        el.HAMADI.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );

      setBodyData(search ? arr : tableData?.data ?? []);
    }
  };
  useEffect(() => {
    if (tableData?.data?.length) setBodyData(tableData.data);
  }, [tableData]);

  useEffect(() => {
    if (templateFilterParams?.link) {
      if (templateData?.RECETEID) {
        setOpenNewModal("template_ready");
      } else {
        setOpenNewModal("template_not_ready");
      }
    }
  }, [templateData, templateFilterParams?.link]);

  return (
    <>
      <div className="grid grid-cols-3 gap-x-2">
        <div>
          <TableUI
            title="labrecetecalisma"
            headColumns={headColumns}
            idTable={idTable}
            bodyColumns={bodyData}
            handleRowClick={handleActionsMaterial}
            disabled={disabled}
            name="LABRECETECALISMAID"
            extra={
              <div className="w-full">
                <input
                  className="input-design text-[var(--black)] font-normal w-full"
                  placeholder="Поиск"
                  onKeyDown={(e: any) => {
                    handleKeyDown(e);
                  }}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    if (e.target.value === "") {
                      setBodyData(tableData?.data ?? []);
                    }
                  }}
                  style={{ height: "20px" }}
                />
              </div>
            }
          />
        </div>

        <div>
          <TwoRowTable
            title="labreceteatis"
            headColumns={trailHeadColumns}
            bodyColumns={trailData}
            handleRowClick={handleActionsTrial}
            disabled={tableData?.data ? false : true}
            idTable={idTrail}
            handleRightClick={(e: any, atisNo: number) => {
              setOpenPoUp(e.target);
              setAtisNo(atisNo);
            }}
          />
        </div>

        <div>
          <TableUI
            title="labreceteurun"
            idTable={idDetailForm}
            handleRowClick={handleActionsDetails}
            headColumns={detailHeadColumns}
            bodyColumns={detailData}
            name="LABRECETEURUNID"
            disabled={!trailData?.okey?.length && !trailData?.okeysiz?.length}
          />
        </div>
      </div>

      {open === "trail" || open === "material" || open === "traildetail" ? (
        <CNewMiniModal
          title={open === "material" ? "labrecetecalisma" : "labreceteatis"}
          handleActions={() => {
            setOpen("");
          }}
        >
          {open === "material" && (
            <MaterialForm
              onClose={() => {
                setOpen("");
                refetchAll();
              }}
              refetchMaterial={(el: any) => {
                refetchMaterial();
                setMaterialData(el);
                setOpen("trail");
              }}
              formData={formData}
              formId={idMaterial}
              open={open}
            />
          )}
          {open === "trail" || open === "traildetail" ? (
            <TrailForm
              materialData={materialData}
              onClose={() => setOpen("")}
              handleActionsDetails={handleActionsDetails}
              filterParams={filterParams}
              setFilterParams={setFilterParams}
              disabled={disabled}
              setOpen={setOpen}
              formId={idTrailForm}
              detailData={detailData}
              DetailHeader={detailHeadColumns}
              labReceteId={formData?.LABRECETEID}
              materialId={idTable}
              open={open}
              idDetailForm={idDetailForm}
              refetchTable={() => {
                refetchTrailTable();
              }}
            />
          ) : (
            ""
          )}
        </CNewMiniModal>
      ) : (
        ""
      )}
      {open === "detail" || open === "traildetail" ? (
        <CNewMiniModal
          title={"labreceteurun"}
          handleActions={() => {
            setOpen(open === "traildetail" ? "trail" : "");
          }}
        >
          <DetailForm
            onClose={() => setOpen(open === "traildetail" ? "trail" : "")}
            formId={idDetailForm}
            idTrail={idTrail}
            open={open}
            materialID={formData?.LABRECETEID}
            refetchTable={() => {
              refetchDetailTable();
            }}
          />
        </CNewMiniModal>
      ) : (
        ""
      )}

      {openPopUp && (
        <PopupUI
          open={!!openPopUp}
          anchor={openPopUp}
          placement="bottom"
          onClose={() => setOpenPoUp(null)}
        >
          <AskTemplate
            handleActions={(val: string) => {
              if (val === "fetch_template") {
                setTemplateFilterParams({
                  link: `recete/${formData?.LABRECETEKODU + "." + atisNo}`,
                });
              }
              setOpenPoUp(null);
            }}
          />
        </PopupUI>
      )}

      {openNewModal === "template_ready" && (
        <CNewModal
          title="creating_recipe"
          handleActions={() => {}}
          defaultData={{
            id: templateData?.RECETEID,
          }}
          innerModal={true}
          disabled="big"
        >
          <ModalUIRecipe
            defaultData={templateData}
            changed={""}
            setChanged={() => {}}
            askAction={""}
            open={openModal}
            setOpen={setOpenModal}
            setAskAction={() => {}}
          />
        </CNewModal>
      )}

      {openNewModal === "template_not_ready" && (
        <CNewMiniModal title="Sablon Recete Secimi">
          <TemplateForm
            formData={formData}
            handleActions={() => {
              setOpenNewModal("");
            }}
          />
        </CNewMiniModal>
      )}
    </>
  );
};
