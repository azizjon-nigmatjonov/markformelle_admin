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
  cardHeight: number
}

const MachineCard: React.FC<MachineCardProps> = ({ machine, cardHeight }) => {
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

  return (
    <>
      <Card
        sx={{ pt: 0, height: cardHeight ? cardHeight : 'auto' }}
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
            <Typography fontSize={18} fontStyle="SemiBold" fontWeight={"bold"}>
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
          <CardContent sx={{ mx: "auto", alignItems: "center", justifyItems: 'center', display: 'flex' }}>
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
              >
                {machine.new_rolls}
              </Typography>

              <Typography position={"absolute"} top={"2px"} right={"5px"}>
                {machine.defect_num}
              </Typography>

              <Typography fontSize={18} fontStyle="SemiBold" fontWeight={"bold"}>
                {machine.name}
              </Typography>
              <Typography>{machine.artikul}</Typography>
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
                "--CircularProgress-size": "110px",
                "--CircularProgress-trackThickness": "10px",
                "--CircularProgress-progressThickness": "10px",
              }}
            >
              <Stack spacing={0} alignItems={"center"}>
                <Typography>{machine.fkol_knit}</Typography>
                <Divider
                  orientation="horizontal"
                  sx={{ height: 2, backgroundColor: "gray", opacity: 0.5 }}
                  style={{ background: "black" }}
                />
                <Typography>{machine.pkol_knit + " Kg"}</Typography>

                <Typography startDecorator={<SpeedIcon />}>
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
              </Typography></div>
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