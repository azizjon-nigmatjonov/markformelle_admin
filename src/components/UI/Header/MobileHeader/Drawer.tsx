import Drawer from "@mui/material/Drawer";
import { getWebsiteData } from "../../Sidebar/Logic";
import { useTranslation } from "react-i18next";
import IconGenerator from "../../IconGenerator";
import usePageRouter from "../../../../hooks/useObjectRouter";
import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./style.scss";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const HeaderDrawer = ({ open = false, setOpen }: Props) => {
  const { routes } = getWebsiteData();
  const { t } = useTranslation();
  const { navigateTo } = usePageRouter();
  const [expanded, setExpanded] = useState<string | false>(false);
  let locationName = location.pathname.substring(1);
  const arr = locationName.split("/");
  if (arr.length > 2) {
    if (arr[2] !== "add") {
      locationName = arr[0] + "/" + arr[1] + "/:id";
    }
  }

  useEffect(() => {
    Object.values(routes).forEach((el: any) => {
      const currentEl = el.find((item: any) => item.id === locationName);
      if (currentEl?.id) {
        setExpanded(currentEl?.parent);
      }
    });
  }, [locationName, routes]);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Drawer
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <div id="drawer" className="bg-white w-[65vw] h-full">
        <div className="h-[95vh] overflow-y-scroll hide-scrollbar">
          <div className="h-[70px] flex items-center px-4">
            <img src="/images/logo.png" alt="logo" />
          </div>
          {Object.entries(routes).map(([key, value]: [string, any]) => {
            const visibleSidebarItems: any = value.filter(
              (el: any) => el.sidebar
            );
            if (!visibleSidebarItems?.length) return "";

            return (
              <div key={key} className="px-5">
                <Accordion
                  expanded={expanded === key}
                  onChange={handleChange(key)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <div className="w-[40px]">
                      <IconGenerator
                        icon={visibleSidebarItems[0]?.parent_icon}
                        fill="var(--black)"
                      />
                    </div>
                    <h2 className="font-semibold text-black">{t(key)}</h2>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      {visibleSidebarItems?.map((item: any) => (
                        <li
                          key={item.id}
                          className={`flex items-center justify-between rounded-[8px] h-[40px] relative overflow-hidden`}
                          onClick={() => navigateTo("/" + item.path)}
                        >
                          <div
                            className={`sidebarItem ${
                              item.id === locationName ? "active" : ""
                            }`}
                          ></div>
                          <div className="w-[12px] h-[40px] border-b-2 border-l-2 border-[var(--border)] rounded-l-[8px] absolute left-[8px] top-[-18px]"></div>
                          <div className="w-[60px] flex justify-center ml-[23px]">
                            <IconGenerator
                              icon={item?.icon}
                              fill={
                                item.id === locationName
                                  ? "var(--black)"
                                  : "var(--gray)"
                              }
                            />
                          </div>
                          <p
                            className={`w-full ${
                              item.id === locationName
                                ? "text-[var(--black)] font-medium"
                                : ""
                            }`}
                          >
                            {t(item.title)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
    </Drawer>
  );
};
