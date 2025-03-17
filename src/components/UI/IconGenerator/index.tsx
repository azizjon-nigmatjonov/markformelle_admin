import { FC, memo } from "react";
import { iconsList } from "./iconsList";

interface Props {
  icon: string;
  fill?: any;
}

const IconGenerator: FC<Props> = ({ icon, ...props }) => {
  if (!icon) return "-";
  const findedIcon = iconsList.find((el) => el.name === icon);
  if (!findedIcon) return icon;

  return <findedIcon.component {...props} />;
};

export default memo(IconGenerator);
