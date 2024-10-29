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
// import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
// import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";

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
  lotno: string;
  fkol_knit: number;
  pkol_knit: number;
  fakt_percentage: number;
  message: string;
  zakaz: string;
  art: string;
  model: string;
}

interface MachineCardProps {
  machine: Machine;
}

const MachineCard: React.FC<MachineCardProps> = ({ machine }) => {
  const [cardColor, setCardColor] = useState<string>("");
  const [open, setOpen] = React.useState(false);

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
      return ""; // Handle any other case if needed
    }
  };

  const small_destop = useScreenSize("small_destop");

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
            <Typography
              fontSize={small_destop ? "28px" : "18px"}
              fontStyle="SemiBold"
              fontWeight={"bold"}
            >
              {machine.name}
            </Typography>
            <WifiOff sx={{ fontSize: 60 }} />
            <Typography fontSize={16} fontStyle="SemiBold" fontWeight={"bold"}>
              Нет соединения
            </Typography>
            <Typography fontSize={16} fontStyle="SemiBold" fontWeight={"bold"}>
              {machine.ip_address}
            </Typography>
          </CardContent>
        )}

        {machine.no_connnection != "true" && (
          <CardContent
            sx={{
              mx: "auto",
              alignItems: "center",
              justifyItems: "center",
              display: "flex",
              width: "100%",
              height: "100%",
            }}
          >
            <div>
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
                fontSize={small_destop ? "24px" : "16px"}
              >
                {machine.new_rolls}
              </Typography>

              <Typography
                fontSize={small_destop ? "24px" : "16px"}
                position={"absolute"}
                top={"2px"}
                right={"5px"}
              >
                {machine.defect_num}
              </Typography>

              <Typography
                fontSize={small_destop ? "28px" : "18px"}
                fontStyle="SemiBold"
                fontWeight={"bold"}
              >
                {machine.name}
              </Typography>
              <Typography fontSize={small_destop ? "28px" : "18px"}>
                {machine.artikul}
              </Typography>
            </div>

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
                "--CircularProgress-size": small_destop ? "150px" : "120px",
                "--CircularProgress-trackThickness": small_destop
                  ? "15px"
                  : "10px",
                "--CircularProgress-progressThickness": small_destop
                  ? "15px"
                  : "10px",
              }}
            >
              <Stack spacing={0} alignItems={"center"}>
                <Typography fontSize={small_destop ? "20px" : "16px"}>
                  {machine.fkol_knit}
                </Typography>
                <Divider
                  orientation="horizontal"
                  sx={{ height: 2, backgroundColor: "gray", opacity: 0.5 }}
                  style={{ background: "black" }}
                />
                <Typography fontSize={small_destop ? "20px" : "16px"}>
                  {machine.pkol_knit + " Kg"}
                </Typography>

                <Typography
                  fontSize={small_destop ? "20px" : "16px"}
                  startDecorator={<SpeedIcon />}
                >
                  {machine.rotation}
                </Typography>
              </Stack>
            </CircularProgress>

            {/* Display other machine information */}

            <div>
              <Typography
                position={"absolute"}
                bottom={"2px"}
                right={"7px"}
                fontSize={small_destop ? "22px" : "12px"}
                startDecorator={
                  <Bolt sx={{ marginRight: "-10px" }} fontSize="small" />
                }
              >
                {machine.efficiency + "%"}
              </Typography>
              <Typography
                fontSize={small_destop ? "20px" : "12px"}
                position={"absolute"}
                bottom={"2px"}
                left={"5px"}
              >
                {machine.soft_version}
              </Typography>
            </div>
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
