import { FC, memo, ReactNode } from "react";
import { iconsList } from "./iconsList";

interface Props {
  icon: string | ReactNode;
  fill?: any;
}

const IconGenerator: FC<Props> = ({ icon, ...props }) => {
  if (!icon) return "-";
  if (typeof icon !== "string") return icon;

  const findedIcon = iconsList.find((el) => el.name === icon);
  if (!findedIcon) return icon;

  return <findedIcon.component {...props} />;
};

export default memo(IconGenerator);
