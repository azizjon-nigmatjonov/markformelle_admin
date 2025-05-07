import { useState } from "react";
// import { NotificationData } from "./Logic";
import { NitifList } from "./List";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { NotificationIcon } from "../../../../components/UI/IconGenerator/Svg";
import { NotificationData } from "./Logic";
import { Closer } from "../../../../components/UI/Closer";
import { usePermissions } from "../../../../hooks/usePermissions";
import { TooltipPosition } from "../../../../constants/toolPosition";
// import { useSelector } from "react-redux";

const Notification = () => {
  const [open, setOpen] = useState(false);
  const { notificationList, clearCount, notifCount } = NotificationData();
  const { checkAdditionals } = usePermissions();
  return (
    <div className="relative z-[4]">
      <Tooltip
        arrow
        slotProps={TooltipPosition}
        title={`Новости о системе`}
        placement="left"
      >
        <IconButton
          className={`w-[25px] h-[25px] desktop:h-[30px] desktop:w-[30px] bg-white ${
            checkAdditionals("show_notification") ? "" : "cursor-not-allowed"
          }`}
          onClick={() => {
            if (!checkAdditionals("show_notification")) return;
            setOpen(true);
            clearCount();
          }}
        >
          <div className="border border-[var(--border)] h-full w-full flex items-center justify-center rounded-[8px]">
            <Badge badgeContent={notifCount} color="primary">
              <NotificationIcon
                fill={
                  checkAdditionals("show_notification")
                    ? "var(--gray)"
                    : "var(--gray30)"
                }
              />
            </Badge>
          </div>
        </IconButton>
      </Tooltip>

      {open && <NitifList setOpen={setOpen} list={notificationList} />}
      {open && <Closer handleClose={() => setOpen(false)} />}
    </div>
  );
};

export default Notification;
