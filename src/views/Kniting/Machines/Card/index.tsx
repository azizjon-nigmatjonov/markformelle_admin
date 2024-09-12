import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Modal,
  Stack,
  Typography,
} from "@mui/joy";
import "./MachineCard.css"; // Import CSS file for styling
import SpeedIcon from "@mui/icons-material/Speed";
import ViewDayOutlinedIcon from "@mui/icons-material/ViewDayOutlined";

import { Bolt, WifiOff } from "@mui/icons-material";

import ModalCard from "./ModalCard";
import { useScreenSize } from "../../../../hooks/useScreenSize";

interface Machine {
  id: number;
  name: string;
  daily_power: number;
  ip_address: string;
  no_connnection: string;
  machine_is_on: string;
  not_broken: string;
  yarn_replacement: string;
  rotation: number;
  efficiency: number;
  soft_version: string;
  last_response_time: string;
  stop_mins: number;
  new_rolls: number;
  defect_num: number;
  capacity: string;
  nplan: number;
  order_no: number;
  artikul: string;
  lot_no: string;
  fkol_knit: number;
  pkol_knit: number;
  fakt_percentage: number;
  message: string;
  zakaz: string;
  art: string;
}

interface MachineCardProps {
  machine: Machine;
}

const MachineCard: React.FC<MachineCardProps> = ({ machine }) => {
  const [cardColor, setCardColor] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  const ipod = useScreenSize("ipod");

  useEffect(() => {
    setCardColor(getCardColor());
  }, [machine]);

  const getCardColor = (): string => {
    if (machine.no_connnection == "true") {
      return "grey";
    } else if (machine.pkol_knit == 0) {
      return "purple";
    } else if (
      machine.rotation > 0 &&
      machine.not_broken == "true" &&
      machine.machine_is_on == "true"
    ) {
      if (
        machine.yarn_replacement == "true" &&
        machine.pkol_knit - machine.fkol_knit < 30 &&
        machine.pkol_knit - machine.fkol_knit > 0
      ) {
        return "orange";
      } else return "green";
    } else if (
      machine.not_broken == "true" &&
      machine.machine_is_on == "false"
    ) {
      return "purple";
    } else if (
      machine.not_broken == "false" &&
      machine.machine_is_on == "false"
    ) {
      return "grey";
    } else if (
      machine.not_broken == "true" &&
      machine.machine_is_on == "true" &&
      machine.rotation == 0
    ) {
      return "red";
    } else {
      return "";
    }
  };

  return (
    <>
      <Card
        sx={{ pt: 0 }}
        className={`machine-card custom ${cardColor}`}
        onClick={() => setOpen(true)}
      >
        {machine.no_connnection == "true" && (
          <CardContent
            sx={{
              mx: "auto",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography fontSize={16} fontStyle="SemiBold" fontWeight={"bold"}>
              {machine.name}
            </Typography>
            <WifiOff sx={{ fontSize: 40 }} />
            <Typography
              flex={"center"}
              textAlign={"center"}
              fontSize={14}
              fontStyle="SemiBold"
              fontWeight={"bold"}
            >
              Нет соединения
            </Typography>
            <Typography fontSize={14} fontStyle="SemiBold" fontWeight={"bold"}>
              {machine.ip_address}
            </Typography>
          </CardContent>
        )}

        {machine.no_connnection != "true" && (
          <CardContent sx={{ mx: "auto", alignItems: "center" }}>
            <Typography
              position={"absolute"}
              top={"2px"}
              left={"5px"}
              startDecorator={
                <ViewDayOutlinedIcon
                  sx={{ marginRight: "-5px" }}
                  fontSize="small"
                />
              }
            >
              {machine.new_rolls}
            </Typography>

            <Typography position={"absolute"} top={"2px"} right={"5px"}>
              {machine.defect_num}
            </Typography>

            <Typography fontSize={16} fontStyle="SemiBold" fontWeight={"bold"}>
              {machine.name}
            </Typography>
            <p>{machine.artikul}</p>
            {/* <div className="w-[70px] h-[70px] screen:w-[80px] screen:h-[80px] mt-3">
              <ResponsivePie
                data={responsiveData}
                innerRadius={0.7}
                activeOuterRadiusOffset={4}
                enableArcLinkLabels={false}
                isInteractive={true}
                enableArcLabels={false}
                colors={["white", "var(--success)"]}
              />
            </div> */}
            <CircularProgress
              variant="soft"
              color="success"
              value={
                Number(machine.fakt_percentage) > 100
                  ? 100
                  : Number(machine.fakt_percentage)
              }
              determinate
              sx={{
                // mb: "0px",
                "--CircularProgress-size": "97px",
                "--CircularProgress-trackThickness": "10px",
                "--CircularProgress-progressThickness": "10px",
              }}
              className={`${cardColor}`}
            >
              <Stack spacing={0} alignItems={"center"}>
                <p className={"text-sm"}>{machine.fkol_knit}</p>
                <Divider
                  orientation="horizontal"
                  sx={{ height: 2, backgroundColor: "gray", opacity: 0.5 }}
                  style={{ background: "black" }}
                />
                <p className={`text-[13px]`}>{machine.pkol_knit + " Kg"}</p>

                <Typography
                  fontSize={"13px"}
                  startDecorator={<SpeedIcon style={{ fontSize: 18 }} />}
                >
                  {machine.rotation}
                </Typography>
              </Stack>
            </CircularProgress>
            {/* Display other machine information */}
            <div className="mt-2"></div>
            <Typography
              position={"absolute"}
              bottom={"2px"}
              right={"7px"}
              startDecorator={
                <Bolt sx={{ marginRight: "-10px" }} fontSize="small" />
              }
            >
              {machine.efficiency + "%"}
            </Typography>
            <Typography
              fontSize={12}
              position={"absolute"}
              bottom={"2px"}
              left={"5px"}
            >
              {machine.soft_version}
            </Typography>
          </CardContent>
        )}
      </Card>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ModalCard machine={machine} setOpen={setOpen} />
      </Modal>
    </>
  );
};

export default MachineCard;
