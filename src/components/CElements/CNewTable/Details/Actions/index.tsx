import propTypes from "prop-types";
// import CDropdown from "../../../CDropdown";
import {
  DeleteIcon,
  DotsVerticalIcon,
  EditIcon,
  LockIcon,
} from "../../../../UI/IconGenerator/Svg";
import Element from "./Element";
import { ColorConstants } from "../../../../../constants/website";
import { useState, useCallback } from "react";
import { PopoverDelete } from "./EditDelete/PopOver";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { PopupUI } from "../../../../UI/PopupUI";

interface Props {
  element: any;
  actions: string[];
  rowIndex: number;
  checkPermission: any;
  handleActions: (obj?: any, status?: any) => void;
  currentIndex: any;
  setCurrentIndex: (newIndex?: any) => void;
  selectedItems: number[];
}

const TabbleActions = ({
  element,
  rowIndex,
  actions = [],
  currentIndex,
  selectedItems = [],
  checkPermission = [],
  handleActions = () => {},
  setCurrentIndex = () => {},
}: Props) => {
  const [deletePopover, setDeletePopover] = useState(false);
  const [buttonElement, setButtonElement] = useState<HTMLDivElement | null>(
    null
  );

  const handleClick = useCallback(
    (element: any, status?: string, active?: boolean) => {
      if (checkPermission(status)) {
        if (status === "delete") {
          setDeletePopover(true);
        } else {
          if (active) {
            handleActions(element, status);
            setCurrentIndex(null);
          }
        }
      }
    },
    [checkPermission, handleActions, setCurrentIndex]
  );

  const handleMainClick = useCallback(() => {
    if (currentIndex === rowIndex) {
      setCurrentIndex(null);
    } else {
      setCurrentIndex(rowIndex);
    }
  }, [currentIndex, rowIndex, setCurrentIndex]);

  const handleClosePopup = useCallback(() => {
    setCurrentIndex(null);
  }, [setCurrentIndex]);

  const handleCloseDeletePopup = useCallback(() => {
    setDeletePopover(false);
    setCurrentIndex(null);
  }, [setCurrentIndex]);

  const handleDeleteConfirm = useCallback(
    (status: any) => {
      setDeletePopover(false);
      setCurrentIndex(null);
      if (status) handleActions(element, status);
    },
    [handleActions, element, setCurrentIndex]
  );

  return (
    <>
      <div
        className={`w-[20px] h-full items-center justify-center flex ml-2 ${
          selectedItems.length ? "invisible" : "visible"
        }`}
        onClick={handleMainClick}
      >
        <div
          ref={(e) => {
            if (e) {
              setButtonElement(e);
            }
          }}
          className={`group-hover:visible flex ${
            rowIndex === currentIndex || deletePopover
              ? "bg-[var(--gray20)] visible"
              : "invisible"
          }`}
        >
          <DotsVerticalIcon fill="black" />
        </div>
      </div>
      <PopupUI
        open={currentIndex === rowIndex && !deletePopover}
        anchor={buttonElement}
        onClose={handleClosePopup}
      >
        <div className={`relative z-[99]`}>
          <Element
            text="freez"
            active={element?.is_freez && checkPermission("freez")}
            onClick={() => handleClick(element, "freez", element?.is_freez)}
            icon={
              <LockIcon
                fill={element?.is_freez ? "var(--main)" : ColorConstants.gray}
              />
            }
            show={actions.includes("freez")}
          />
          <Element
            text="edit"
            active={element?.is_edit && checkPermission("edit")}
            onClick={() => handleClick(element, "edit", element.is_edit)}
            icon={
              <EditIcon
                fill={element?.is_edit ? "var(--main)" : ColorConstants.gray}
              />
            }
            show={actions.includes("edit")}
          />
          <Element
            text="sellect_more"
            active={element?.is_sellect_more && checkPermission("sellect_more")}
            onClick={() =>
              handleClick(element, "sellect_more", element.is_sellect_more)
            }
            icon={
              <CheckCircleOutlineIcon
                style={{
                  color: element?.is_sellect_more
                    ? "var(--main)"
                    : ColorConstants.gray,
                  width: 18,
                }}
              />
            }
            border={true}
            show={actions.includes("delete")}
          />
          <Element
            text="delete"
            active={element?.is_delete && checkPermission("delete")}
            onClick={() => handleClick(element, "delete", element.is_delete)}
            icon={
              <DeleteIcon
                fill={element?.is_delete ? "var(--main)" : ColorConstants.gray}
              />
            }
            border={false}
            show={actions.includes("delete")}
          />
        </div>
      </PopupUI>

      <PopupUI
        open={deletePopover && currentIndex === rowIndex}
        anchor={buttonElement}
        onClose={handleCloseDeletePopup}
      >
        <PopoverDelete closePopover={handleDeleteConfirm} />
      </PopupUI>
    </>
  );
};

TabbleActions.propTypes = {
  item: propTypes.object,
  handleActions: propTypes.func,
  actionList: propTypes.array,
};

export default TabbleActions;
