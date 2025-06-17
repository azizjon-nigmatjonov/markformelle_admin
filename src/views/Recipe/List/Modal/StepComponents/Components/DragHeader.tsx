import { useEffect, useMemo } from "react";
import ExcelDownload from "../../../../../../hooks/useExcelDownload";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  CheckLine,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  SaveIcon,
} from "../../../../../../components/UI/IconGenerator/Svg";
import {
  CheckMultipleIcon,
  UncheckMultipleIcon,
} from "../../../../../../components/UI/IconGenerator/Svg/Table";
import { useKeyDownEvent } from "../../../../../../hooks/useKeyDownEvent";
interface Props {
  items: any;
  changed: string;
  editStep: boolean;
  tableData: any;
  checkedList: any;
  deleteStep: boolean;
  deleteCardActive: boolean;
  setAskDelete: (val: boolean) => void;
  setDeleteStep: (val: any) => void;
  clearChanges: () => void;
  setSaveData: (val: boolean) => void;
  setDeleteCardActive: (val: boolean) => void;
}

export const DragHeader = ({
  items = [],
  editStep = false,
  changed,
  tableData,
  setAskDelete,
  checkedList = [],
  setDeleteStep,
  deleteStep,
  deleteCardActive,
  setDeleteCardActive,
  setSaveData,
  clearChanges,
}: Props) => {
  const { t } = useTranslation();
  // const { isAltPressed, currentKey } = useKeyDownEvent();

  // useEffect(() => {
  //   if (currentKey && isAltPressed) handleActions(currentKey);
  // }, [currentKey, isAltPressed]);

  const ExcelData = useMemo(() => {
    const arr: any = [];

    for (let i = 0; i < items?.length; i++) {
      const rows = items[i].rows;
      arr.push(...rows);
    }

    return arr;
  }, [items, editStep]);

  const Fields = useMemo(() => {
    if (!tableData?.data) return [];
    const arr: any = [];
    const obj: any = tableData.data[0];
    delete obj.status;
    delete obj.index;
    for (let key in obj) {
      arr.push(key);
    }
    return arr;
  }, [tableData]);

  const handleDelete = () => {
    if (checkedList.length) {
      setAskDelete(true);
    } else {
      setDeleteStep((prev: boolean) => !prev);
    }
  };

  return (
    <div className="flex justify-between items-center">
      {/* <div>
        {isAltPressed && (
          <div className="flex space-x-8 text-sm font-medium">
            <div className="flex space-x-1">
              <EditIcon width={14} fill="var(--main)" />
              <span>Ctr + Enter</span>
            </div>
          </div>
        )}
      </div> */}
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
        <Tooltip title={t("delete_sellected_elements")} placement="bottom">
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

        <Tooltip title={t("delete_card")} placement="bottom">
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
          placement="bottom"
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
              {t(changed ? "cancel_changes" : editStep ? "cancel" : "edit")}
            </span>
          </button>
        </Tooltip>

        <Tooltip title="Сохранить изменения" placement="bottom">
          <div>
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
          </div>
        </Tooltip>
      </div>
    </div>
  );
};
