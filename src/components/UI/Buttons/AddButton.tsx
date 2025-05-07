import "./style.scss";
import { PlusIcon } from "../IconGenerator/Svg";
import { useTranslation } from "react-i18next";
import { usePermissions } from "../../../hooks/usePermissions";

interface Props {
  text?: string;
  iconLeft?: any;
  style?: any;
  id?: string;
  children?: any;
  classes?: string;
  type?: any;
  btnType?: string;
  permission?: string;
  onClick?: (val?: any) => void;
}

const AddButton = ({
  text = "",
  iconLeft = true,
  id,
  children,
  classes,
  type = "button",
  btnType = "",
  permission = "add",
  onClick = () => {},
  ...props
}: Props) => {
  const { t } = useTranslation();
  const { checkPermission } = usePermissions();
  // if (!checkPermission(permission)) return "";

  if (btnType === "ordinary") {
    return (
      <button
        onClick={() => {
          if (!checkPermission(permission)) return;
          onClick();
        }}
        {...props}
        className={`font-[600] flex items-center ${
          checkPermission(permission)
            ? "text-[var(--main)]"
            : "text-[var(--gray30)] cursor-not-allowed"
        }`}
      >
        {iconLeft === true ? (
          <PlusIcon
            fill={checkPermission(permission) ? "var(--main)" : "var(--gray30)"}
          />
        ) : (
          iconLeft
        )}
        {children ? children : <p>{text}</p>}
      </button>
    );
  }

  return (
    <div id={id ? id : ""} {...props}>
      <button
        type={type}
        onClick={() => {
          if (!checkPermission(permission)) return;
          onClick();
        }}
        className={`rounded-[8px]  flex items-center whitespace-nowrap px-2 h-[25px] desktop:h-[30px] ${
          checkPermission(permission)
            ? "bg-[var(--main)]"
            : "bg-[var(--gray30)] cursor-not-allowed"
        } ${classes}`}
      >
        {iconLeft === true ? (
          <PlusIcon fill={checkPermission(permission) ? "white" : "white"} />
        ) : (
          iconLeft
        )}
        {children ? (
          children
        ) : (
          <span className="font-[600] mx-1 text-white">{t(text)}</span>
        )}
      </button>
    </div>
  );
};

export default AddButton;
