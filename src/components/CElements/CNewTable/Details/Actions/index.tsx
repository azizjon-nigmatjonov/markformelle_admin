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
import { useState, useRef } from "react";
import { PopoverDelete } from "./EditDelete/PopOver";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface Props {
  element: any;
  actions: string[];
  rowIndex: number;
  checkPermission: any;
  handleActions: (obj?: any, status?: any) => void;
  currentIndex: any;
  setCurrentIndex: (newIndex?: any) => void;
  selectedItems: number[];
  anchor: any;
  setAnchor: (anchor: any) => void;
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
  anchor,
  setAnchor,
}: Props) => {
  const [deletePopover, setDeletePopover] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (!buttonRef.current) return "bottom";

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const popupHeight = 200; // Approximate height of the popup

    // Check if there's enough space below the button
    const spaceBelow = viewportHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    // If there's not enough space below but enough space above, position at top
    if (spaceBelow < popupHeight && spaceAbove > popupHeight) {
      return "top";
    }

    return "bottom";
  };

  const handleClick = (element: any, status?: string, active?: boolean) => {
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
  };

  return (
    <>
      <div
        ref={buttonRef}
        className={`w-[20px] h-full items-center justify-center flex ml-2 ${
          selectedItems.length ? "invisible" : "visible"
        }`}
        onClick={(event) => {
          setCurrentIndex(rowIndex);
          setAnchor(anchor ? null : event.currentTarget);
        }}
      >
        <div
          className={`group-hover:visible flex ${
            rowIndex === currentIndex || deletePopover
              ? "bg-[var(--gray20)] visible"
              : "invisible"
          }`}
        >
          <DotsVerticalIcon fill="black" />
        </div>
      </div>
      {currentIndex === rowIndex && !deletePopover && (
        <div
          className={`absolute left-0 z-[99] ${
            rowIndex > 7 ? "bottom-5" : "top-5"
          }`}
        >
          <div className="bg-white rounded-[8px] border border-[var(--gray30)] shadow-2xl">
            <div className={`relative z-[99]`}>
              <Element
                text="freez"
                active={element?.is_freez && checkPermission("freez")}
                onClick={() => handleClick(element, "freez", element?.is_freez)}
                icon={
                  <LockIcon
                    fill={
                      element?.is_freez ? "var(--main)" : ColorConstants.gray
                    }
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
                    fill={
                      element?.is_edit ? "var(--main)" : ColorConstants.gray
                    }
                  />
                }
                show={actions.includes("edit")}
              />
              <Element
                text="sellect_more"
                active={
                  element?.is_sellect_more && checkPermission("sellect_more")
                }
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
                onClick={() =>
                  handleClick(element, "delete", element.is_delete)
                }
                icon={
                  <DeleteIcon
                    fill={
                      element?.is_delete ? "var(--main)" : ColorConstants.gray
                    }
                  />
                }
                border={false}
                show={actions.includes("delete")}
              />
            </div>
          </div>
        </div>
      )}

      {deletePopover && currentIndex === rowIndex ? (
        <div
          className={`absolute left-0 z-[99] ${
            calculatePosition() === "top" ? "bottom-6" : "top-6"
          }`}
        >
          <div className="bg-white rounded-[8px] border border-[var(--gray30)] shadow-2xl">
            <PopoverDelete
              closePopover={(status) => {
                setDeletePopover(false);
                if (status) handleActions(element, status);
              }}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

TabbleActions.propTypes = {
  item: propTypes.object,
  handleActions: propTypes.func,
  actionList: propTypes.array,
};

export default TabbleActions;
