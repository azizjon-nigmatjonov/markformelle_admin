import { useState } from "react";
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
import { statusReasonsRu } from "../../../../constants/status";
import { Alert } from "@mui/material";

interface MachineCardProps {
  machine: any;
  setOpen: (val: boolean) => void;
}

const ModalCard = ({ machine, setOpen = () => {} }: MachineCardProps) => {
  const [checkedReason, setCheckedReason]: any = useState("1");
  const [descriptionText, setDescriptionText] = useState("");
  const [alertInfo, setAlertInfo]: any = useState({
    type: "error",
    title: "",
  });
  const [checked1, setChecked1] = useState(machine.machine_is_on == "true");

  const [checked2, setChecked2] = useState(machine.not_broken == "true");

  const getWeight = (item: any) => {
    const num: any = Number(item.pkol_knit) - Number(item.fkol_knit) || 0;

    return Number(num.toFixed(2));
  };

  const createStatus = () => {
    if (machine.no_connnection === "false") {
      setAlertInfo({
        title: "Вы можете изменить только статус <br/> 'Нет соединения' !",
        type: "error",
      });
      return;
    }
    const now = new Date();

    const year = String(now.getFullYear()).slice(-2); // Last two digits of the year
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // const obj = {
    //   code_req: "003",
    //   code_device: "163",
    //   sign_device: machine.name,
    //   tabn_id: 12418,
    //   id_req: `${year}${month}${day}${hours}${minutes}${seconds}`,
    //   time_req: `${year}-${month}-${day}.${hours}:${minutes}:${seconds}`,
    //   desc: "Датчики",
    //   rotation: machine.rotation,
    //   reason: statusReasonsRu[checkedReason],
    //   ver: machine.soft_version,
    //   streams: 1,
    //   lengthrot: 0.0,
    //   factqty: 0.0,
    //   planid: machine.planid,
    //   idletime: 0,
    //   mtype: 0,
    // };
    console.log(descriptionText);

    const trash = {
      // ...machine,
      code_req: "003",
      code_device: machine.id,
      sign_device: machine.name,
      tabn_id: 12210,
      id_req: `${year}${month}${day}${hours}${minutes}${seconds}`,
      time_req: `${year}-${month}-${day}.${hours}:${minutes}:${seconds}`,
      desc: "Код причины останова",
      rotation: "0.0",
      reason: statusReasonsRu[checkedReason],
      ver: machine.soft_version,
      streams: 1,
      lengthrot: 0.0,
      factqty: machine.fkol_knit,
      planid: machine.planid,
      idletime: +machine.stop_mins,
      mtype: 0,
      reasoncode: +checkedReason,
    };

    // const obj = {
    //   code_req: "003",
    //   code_device: machine.id,
    //   sign_device: machine.name,
    //   id_req: `${year}${month}${day}${hours}${minutes}${seconds}`,
    //   time_req: `${year}-${month}-${day}.${hours}:${minutes}:${seconds}`,
    //   desc: descriptionText || statusReasonsRu[checkedReason],
    //   reason: statusReasonsRu[checkedReason],
    //   reasoncode: checkedReason,
    // };

    axios
      .post("http://10.40.140.6:8051/CUT_CONTR", trash)
      .then((res: any) => {
        // const value = res?.data ?? {};
        console.log("res", res);

        // const newObj = {
        //   ...machine,
        //   ...value,
        //   code_req: "003",
        //   time_req: `${year}-${month}-${day}.${hours}:${minutes}:${seconds}`,
        //   reason: statusReasonsRu[checkedReason],
        //   reasoncode: checkedReason,
        // };
        // axios
        //   .post("http://10.40.140.6:8051/CUT_CONTR", newObj)
        //   .then(() => {
        //     toast.success(`${machine.name} статус машины обновлен!`);
        //     setOpen(false);
        //   })
        //   .catch(() => {
        //     toast.success("Ошибка сервера!");
        //   });
      })
      .catch(() => {
        toast.success("Ошибка сервера!");
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
                <Typography>
                  {machine.name} ({machine.id})
                </Typography>
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
                <Typography>Статус машины</Typography>
                <Typography>{machine.reason}</Typography>
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
              justifyContent={checked2 ? "" : "space-between"}
              alignItems="center"
            >
              <Stack sx={{ width: "100%" }}>
                <ul
                  className={`flex flex-col space-y-5 ${
                    checked2 ? "mb-10" : ""
                  }`}
                >
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
                  className={`machine-card custom ${machine.new_status.color}`}
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
                  <ModalBtn
                    checkedReason={checkedReason}
                    setCheckedReason={setCheckedReason}
                  />
                  <p className="mb-2 text-[var(--gray)] mt-3">
                    Введите причину поломки
                  </p>
                  <textarea
                    className="p-4 bg-transparent border border-[var(--border)] outline-none focus:border-[var(--primary)] rounded-[8px] w-full"
                    rows={5}
                    onChange={(e: any) => setDescriptionText(e.target.value)}
                  ></textarea>

                  {alertInfo.title && (
                    <div className="bg-[#fdeded] rounded-lg mt-5">
                      <Alert severity={alertInfo?.type}>
                        <p
                          className="text-xl font-medium"
                          dangerouslySetInnerHTML={{ __html: alertInfo.title }}
                        ></p>
                      </Alert>
                    </div>
                  )}

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
