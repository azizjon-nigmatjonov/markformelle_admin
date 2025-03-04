import CloseIcon from "@mui/icons-material/Close";
import { Card, IconButton, Modal } from "@mui/material";
import cls from "./style.module.scss";
import { FC, ReactNode, useState } from "react";
import AddButton from "../../UI/Buttons/AddButton";
import { t } from "i18next";
import CancelButton from "../../UI/Buttons/Cancel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
interface Props {
  title?: string;
  textSaveBtn?: string;
  textDeleteBtn?: string;
  minWidth?: string | number;
  maxWidth?: string | number;
  minHeight?: string;
  padding?: string;
  children?: ReactNode;
  footerActive?: boolean;
  open: boolean;
  classes?: string;
  closable?: boolean;
  handleSave?: (val?: any) => void;
  handleClose?: (val?: any) => void;
}

const CModal: FC<Props> = ({
  title = "",
  textSaveBtn = "confirm",
  textDeleteBtn = "",
  padding = "20px",
  children,
  footerActive = true,
  open = false,
  handleSave = () => {},
  handleClose = () => {},
}) => {
  const [screen, setScreen] = useState(false);

  const handleScreen = () => {
    setScreen(!screen);
  };

  return (
    <div id="modal">
      <Modal
        open={open}
        className={cls.modal}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          className={`${cls.card} duration-300 ${
            screen ? "w-[90vw] h-[80vh]" : "w-[60vw] h-[95vh]"
          }`}
          style={{ padding }}
        >
          <div className={cls.header}>
            <IconButton onClick={() => {}}>
              <div className="w-[30px] h-[30px] items-center justify-center flex">
                <ArrowBackIcon style={{ color: "black" }} />
              </div>
            </IconButton>
            <div className={cls.cardTitle}>{t(title)}</div>

            <IconButton onClick={() => handleScreen()}>
              <div className="w-[30px] h-[30px] items-center justify-center flex">
                {!screen ? <OpenInFullIcon /> : <CloseFullscreenIcon />}
              </div>
            </IconButton>
          </div>

          <div className="p-4">{children}</div>

          {footerActive && (
            <div className={cls.footer}>
              {textSaveBtn && (
                <AddButton
                  text={textSaveBtn}
                  onClick={handleSave}
                  iconLeft={false}
                />
              )}
              {textDeleteBtn && (
                <CancelButton text={textDeleteBtn} onClick={handleClose} />
              )}
            </div>
          )}
        </Card>
      </Modal>
    </div>
  );
};

export default CModal;
