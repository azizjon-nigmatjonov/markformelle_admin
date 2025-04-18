import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./style.scss";
import { ColorConstants } from "../../../constants/website";
import { useTranslation } from "react-i18next";
function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface Props {
  tabList: any;
  value: any;
  customStyles?: any;
  handleCustomClick?: (val?: any) => void;
}

export default function CTab({
  tabList,
  value = 0,
  handleCustomClick = () => {},
  customStyles,
}: Props) {
  const { t } = useTranslation();

  const customization = {
    "&": {
      width: "100%",
      borderBottom: "1px solid var(--gray30)",
    },
    "& .MuiButtonBase-root": {
      background: "#white",
      borderRadius: "8px",
      color: "#111",
      textTransform: "none",
      fontSize: "14px",
      fontWight: "500",
      padding: "0 20px",
      textAlign: "left",
    },
    "& .MuiButtonBase-root, & .MuiTab-root": {
      maxWidth: "100%",
    },
    "& .Mui-selected": {
      transition: "0.7s",
      // color: "red !important",
    },
    "& .MuiTabs-indicator": {
      // borderRadius: "8px",
      backgroundColor: ColorConstants.border,
      height: "100%",
      borderBottom: "2px solid var(--main)",
    },
    ...customStyles,
  };

  return (
    <Box sx={{ width: "100%" }} id="CTabID">
      <Box sx={customization}>
        <Tabs
          value={value}
          variant="scrollable"
          scrollButtons={"auto"}
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          {tabList?.map((tab: any, ind: number) => (
            <Tab
              disableRipple
              key={ind}
              onClick={() => handleCustomClick(tab)}
              sx={{
                "& .MuiButtonBase-root, & .MuiTab-root": {
                  maxWidth: "auto",
                },
              }}
              label={<p className="text">{t(tab?.name)}</p>}
              {...a11yProps(tab.id)}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
