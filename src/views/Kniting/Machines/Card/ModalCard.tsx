import * as React from "react";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  List,
  ListDivider,
  ListItem,
  ModalDialog,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@mui/joy";
import { Bolt, Speed } from "@mui/icons-material";
import OrderList from "./OrderList";
import CDriver from "../../../../components/CElements/CDivider";
import "./MachineCard.css";
import toast from "react-hot-toast";
import { ModalBtn } from "./Btn";
import axios from "axios";

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
  reason?: string;
  model: string;
}

interface MachineCardProps {
  machine: Machine;
  setOpen: (val: boolean) => void;
}

const ModalCard: React.FC<MachineCardProps> = ({
  machine,
  setOpen = () => {},
}) => {
  const [cardColor, setCardColor] = React.useState<string>("");

  React.useEffect(() => {
    setCardColor(getCardColor());
  }, [machine]);
  const getCardColor = (): string => {
    if (
      machine.rotation > 0 &&
      machine.not_broken == "true" &&
      machine.machine_is_on == "true"
    ) {
      if (machine.yarn_replacement == "true" && machine.fakt_percentage > 98) {
        return "orange";
      } else return "green";
    } else if (
      machine.not_broken == "true" &&
      machine.machine_is_on == "false"
    ) {
      return "blue";
    } else if (
      machine.not_broken == "false" &&
      machine.machine_is_on == "false"
    ) {
      return "grey";
    } else if (
      machine.not_broken == "true" &&
      machine.machine_is_on == "true" &&
      machine.rotation == 0 &&
      machine.no_connnection === "false" &&
      machine.pkol_knit !== 0
    ) {
      return "red";
    } else {
      return "";
    }
  };
  const [checked1, setChecked1] = React.useState(
    machine.machine_is_on == "true"
  );

  const [checked2, setChecked2] = React.useState(machine.not_broken == "true");

  const getWeight = (item: any) => {
    const num: any = Number(item.pkol_knit) - Number(item.fkol_knit) || 0;

    return Number(num.toFixed(2));
  };

  const createStatus = () => {
    const obj = {
      code_req: "003",
      code_device: "163",
      sign_device: "A-067",
      tabn_id: 12418,
      id_req: 241030150818,
      time_req: "2024-10-30.15:08:18",
      desc: "Датчики",
      rotation: "21.2",
      reason: "Остановлена меньше 30 мин.",
      ver: "V3.8.4one",
      streams: 1,
      lengthrot: 0.0,
      factqty: 0.0,
      planid: 18249,
      idletime: 0,
      mtype: 0,
    };

    axios.post("http://10.40.140.6:8051/CUT_CONTR", obj).then((res) => {
      console.log("res", res);
    });
  };

  return (
    <ModalDialog sx={{ width: "900px", minHeight: "558px" }}>
      <ModalClose />
      <Typography></Typography>
      <Typography></Typography>

      <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ width: "100%" }}>
        <TabList>
          <Tab>Информация о машине</Tab>
          <Tab>Заказы в очереди</Tab>
        </TabList>
        <TabPanel value={0} style={{ width: "100%" }}>
          <div className="flex">
            <List aria-labelledby="decorated-list-demo">
              <ListItem
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>Номер машины</Typography>
                <Typography>{machine.name}</Typography>
              </ListItem>
              <ListDivider />
              <ListItem
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>Название машины</Typography>
                <Typography>{machine.model}</Typography>
              </ListItem>
              <ListDivider />
              <ListItem
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>IP адрес </Typography>
                <Typography>{machine.ip_address}</Typography>
              </ListItem>
              <ListDivider />
              <ListItem
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>Версия программы </Typography>
                <Typography>{machine.soft_version}</Typography>
              </ListItem>
              <ListDivider sx={{ background: "var(--gray)" }} />
              <ListItem
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>Номер заказа </Typography>
                <Typography>{machine.zakaz}</Typography>
              </ListItem>
              <ListDivider />
              <ListItem
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>Артикул </Typography>
                <Typography>{machine.art}</Typography>
              </ListItem>
              <ListDivider />
              <ListItem
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>Лот пряжи </Typography>
                <Typography>{machine.lotno}</Typography>
              </ListItem>
              <ListDivider />
              <ListItem
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>Мощность машины </Typography>
                <Typography>{machine.capacity}</Typography>
              </ListItem>
              <ListDivider />
              <ListItem
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>План </Typography>
                <Typography>
                  № {machine.nplan == undefined ? "0" : machine.nplan}
                </Typography>
              </ListItem>
              <ListDivider />
              <ListItem
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>Факт </Typography>
                <Typography>{machine.fkol_knit} кг</Typography>
              </ListItem>
              <ListDivider />
              <ListItem
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>Остатка </Typography>
                <Typography>{getWeight(machine)} кг</Typography>
              </ListItem>
              <ListDivider />
            </List>
            <CDriver direction="vertical" classes="h-[400px]" />
            <Stack
              spacing={2}
              sx={{ width: "50%" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack sx={{ width: "100%" }}>
                <ul className="flex flex-col space-y-5">
                  <li
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 0,
                    }}
                  >
                    <Typography sx={{ mr: 1 }}>Машина</Typography>
                    <Switch
                      checked={checked1}
                      startDecorator={checked1 ? "Вкл" : "Отк"}
                      onChange={(event) => setChecked1(event.target.checked)}
                    />
                  </li>
                  <li
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 0,
                    }}
                  >
                    <Typography sx={{ mr: 1 }}>Состояние машины</Typography>
                    <Switch
                      checked={checked2}
                      startDecorator={checked2 ? "Работает" : "Сломан"}
                      onChange={(event) => setChecked2(event.target.checked)}
                    />
                  </li>
                </ul>
              </Stack>
              {checked2 ? (
                <Card
                  className={`machine-card custom ${cardColor}`}
                  sx={{ width: 250 }}
                >
                  <List aria-labelledby="decorated-list-demo">
                    <ListItem
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>Скорость </Typography>
                      <Typography endDecorator={<Speed />}>
                        {machine.rotation}
                      </Typography>
                    </ListItem>

                    <ListItem
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>Эффективность </Typography>
                      <Typography endDecorator={<Bolt />}>
                        {machine.efficiency}
                      </Typography>
                    </ListItem>
                  </List>
                  <CardContent sx={{ mx: "auto", alignItems: "center" }}>
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
                        "--CircularProgress-size": "120px",
                        "--CircularProgress-trackThickness": "10px",
                        "--CircularProgress-progressThickness": "10px",
                      }}
                    >
                      <Stack spacing={0} alignItems={"center"}>
                        <Typography>{machine.fkol_knit}</Typography>
                        <Divider
                          orientation="horizontal"
                          sx={{
                            height: 2,
                            backgroundColor: "gray",
                            opacity: 0.5,
                          }}
                          style={{ background: "black" }}
                        />
                        <Typography>{machine.pkol_knit + " Kg"}</Typography>
                      </Stack>
                    </CircularProgress>
                  </CardContent>
                </Card>
              ) : (
                <div className="w-full h-full border-t border-[var(--border)] pt-5">
                  <h3 className="mb-5">Причина поломки</h3>
                  <ModalBtn />
                  <p className="mb-2 text-[var(--gray)] mt-3">
                    Введите причину поломки
                  </p>
                  <textarea
                    className="p-4 bg-transparent border border-[var(--border)] rounded-[8px] w-full"
                    rows={5}
                  ></textarea>

                  <Stack
                    spacing={1}
                    direction={"row"}
                    justifyContent={"space-between"}
                    sx={{ width: "100%" }}
                    mt={2}
                  >
                    <Button
                      onClick={() => {
                        // setOpen(false);
                        createStatus();
                        toast.success("Отправлено успешно, Спасибо!");
                      }}
                      fullWidth
                    >
                      Отправить
                    </Button>
                    <Button
                      onClick={() => setOpen(false)}
                      fullWidth
                      variant="outlined"
                    >
                      Отменить
                    </Button>
                  </Stack>
                </div>
              )}
            </Stack>
          </div>
        </TabPanel>
        <TabPanel value={1}>
          <Stack>
            <OrderList machineName={machine.id} />
          </Stack>
        </TabPanel>
      </Tabs>
    </ModalDialog>
  );
};

export default ModalCard;
