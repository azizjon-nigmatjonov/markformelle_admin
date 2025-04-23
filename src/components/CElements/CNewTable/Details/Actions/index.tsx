import propTypes from "prop-types";
// import CDropdown from "../../../CDropdown";
import {
  DeleteIcon,
  DotsVerticalIcon,
  EditIcon,
  LockIcon,
} from "../../../../UI/IconGenerator/Svg";
import cls from "./style.module.scss";
import Element from "./Element";
import { ColorConstants } from "../../../../../constants/website";
import { useState } from "react";
import { PopoverDelete } from "./EditDelete/PopOver";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { styled } from "@mui/material";

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

const PopupBody = styled("div")(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${
    theme.palette.mode === "dark" ? "var(--gray30)" : "var(--gray30)"
  };
  background-color: ${theme.palette.mode === "dark" ? "var(--gray30)" : "#fff"};
  box-shadow: ${
    theme.palette.mode === "dark"
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`
);

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
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const handleClick = (element: any, status?: string, active?: boolean) => {
    if (checkPermission(status)) {
      if (status === "delete") {
        setDeletePopover(true);
        setTimeout(() => {
          setCurrentIndex(null);
        }, 0);
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
      <button
        className={`w-[20px] h-full items-center justify-center flex ml-2 ${
          selectedItems.length ? "invisible" : "visible"
        }`}
        onClick={(event) => {
          setCurrentIndex(rowIndex);
          setAnchor(anchor ? null : event.currentTarget);
        }}
        type="button"
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
      </button>
      <BasePopup
        id={currentIndex === rowIndex ? "simple-popup" : undefined}
        open={currentIndex === rowIndex && !deletePopover}
        anchor={anchor}
        style={{
          left: "65px",
          top: "-8px",
          padding: 0,
          zIndex: 99,
        }}
      >
        <PopupBody>
          <div className={`relative z-[99] ${cls.card}`}>
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
              onClick={() => handleClick(element, "delete", element.is_delete)}
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
        </PopupBody>
      </BasePopup>

      <BasePopup
        id={deletePopover ? "simple-popup" : undefined}
        open={deletePopover}
        anchor={anchor}
        style={{
          left: "75px",
          top: "0px",
          padding: 0,
          zIndex: 99,
        }}
      >
        <PopupBody>
          <PopoverDelete
            closePopover={(status) => {
              setDeletePopover(false);
              if (status) handleActions(element, status);
            }}
          />
        </PopupBody>
      </BasePopup>
    </>
  );
};

TabbleActions.propTypes = {
  item: propTypes.object,
  handleActions: propTypes.func,
  actionList: propTypes.array,
};

export default TabbleActions;
