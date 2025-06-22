import { ReactNode } from "react";
import { iconsList } from "./iconsList";
import { SvgIconComponent } from "@mui/icons-material";

interface Props {
  icon: string | ReactNode;
  fill?: string;
  width?: number;
  height?: number;
}

const IconGenerator = ({
  icon,
  fill = "var(--black)",
  width,
  height,
}: Props) => {
  if (!icon) return null;

  if (typeof icon === "string" && icon.startsWith("/images/")) {
    return (
      <img
        src={icon}
        alt="icon"
        width={width || 18}
        height={height}
        loading="lazy"
      />
    );
  }

  if (typeof icon === "string") {
    const foundIcon = iconsList.find((el) => el.name === icon);
    if (foundIcon) {
      const IconComponent = foundIcon.component as SvgIconComponent;
      return <IconComponent fill={fill} width={width} height={height} />;
    }
  }

  return icon as ReactNode;
};

export default IconGenerator;
