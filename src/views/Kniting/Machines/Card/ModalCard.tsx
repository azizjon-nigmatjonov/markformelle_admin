import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  ListDivider,
  Stack,
  Switch,
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
import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import CTabs from "../../../../components/CElements/CTab";
import { usePermissions } from "../../../../hooks/usePermissions";
import { useScreenSize } from "../../../../hooks/useScreenSize";

interface MachineCardProps {
  machine: any;
  setOpen: (val: boolean) => void;
}

const TabList = [
  {
    name: "ИИнформация о машине",
    id: "info",
  },
  {
    name: "Заказы в очереди",
    id: "order",
  },
];

const ModalCard = ({ machine, setOpen = () => {} }: MachineCardProps) => {
  const [checkedReason, setCheckedReason]: any = useState("1");
  const [descriptionText, setDescriptionText] = useState("");
  const [alertInfo, setAlertInfo]: any = useState({
    type: "error",
    title: "",
  });
  const [currentTab, setCurrentTab] = useState({ name: "", id: "info" });
  const [checked1, setChecked1] = useState(machine.machine_is_on == "true");
  const { getFontSize } = useDeviceHeight();
  const height = window?.screen?.height ?? 0;
  const [checked2, setChecked2] = useState(machine.not_broken == "true");
  const { checkPermission } = usePermissions();
  const ipodScreen = useScreenSize("ipod");

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

    axios
      .post("http://10.40.140.6:8051/CUT_CONTR", trash)
      .then((res: any) => {
        console.log("res", res);
      })
      .catch(() => {
        toast.success("Ошибка сервера!");
      });
  };

  return (
    <div className="relative">
      <h2 className="hidden ipod:flex absolute text-2xl right-5 top-[3px] items-center h-[35px] z-[99] font-semibold border-[2px] border-[var(--border)] border-b-0 px-2">
        {machine.name}
      </h2>

      <CTabs
        tabList={TabList}
        currentTab={currentTab}
        handleTabClick={setCurrentTab}
      />

      {currentTab.id === "info" ? (
        <div className="flex flex-col ipod:flex-row overflow-y-scroll ipod:overflow-y-visible py-5">
          <div
            className="grid grid-cols-1 paintlist text-[var(--black10)] mr-6 space-y-1 desktop:space-y-2 ipod:w-[50%]"
            style={{
              fontSize: getFontSize({
                type: "machine",
                count: 1,
                percent:
                  height > 1200
                    ? 2.5
                    : height < 800 && height > 600
                    ? 1.5
                    : 1.5,
              }),
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Номер машины</p>
              <p>
                {machine.name} ({machine.id})
              </p>
            </div>
            <ListDivider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Название машины</p>
              <p>{machine.model}</p>
            </div>
            <ListDivider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Статус машины</p>
              <p>{machine.reason}</p>
            </div>
            <ListDivider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>IP адрес </p>
              <p>{machine.ip_address}</p>
            </div>
            <ListDivider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Версия программы </p>
              <p>{machine.soft_version}</p>
            </div>
            <ListDivider sx={{ background: "var(--gray)" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Номер заказа </p>
              <p>{machine.zakaz}</p>
            </div>
            <ListDivider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Артикул </p>
              <p>{machine.art}</p>
            </div>
            <ListDivider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Лот пряжи </p>
              <p>{machine.lotno}</p>
            </div>
            <ListDivider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Мощность машины </p>
              <p>{machine.capacity}</p>
            </div>
            <ListDivider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>План </p>
              <p>№ {machine.nplan == undefined ? "0" : machine.nplan}</p>
            </div>
            <ListDivider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Факт </p>
              <p>{machine.fkol_knit} кг</p>
            </div>
            <ListDivider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Остатка </p>
              <p>{getWeight(machine)} кг</p>
            </div>
            <ListDivider />
          </div>
          <CDriver direction="vertical" classes="h-[100%]" />
          <Stack
            spacing={2}
            sx={{ width: ipodScreen ? "100%" : "50%" }}
            justifyContent={checked2 ? "" : "space-between"}
            alignItems="center"
          >
            <Stack sx={{ width: "100%" }}>
              <div
                className={`flex flex-col space-y-5 ${checked2 ? "mb-10" : ""}`}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 0,
                  }}
                >
                  <p className="mr-1">Машина</p>
                  <Switch
                    checked={checked1}
                    startDecorator={checked1 ? "Вкл" : "Отк"}
                    onChange={(event) => setChecked1(event.target.checked)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 0,
                  }}
                >
                  <p className="mr-1">Состояние машины</p>
                  <Switch
                    checked={checked2}
                    startDecorator={checked2 ? "Работает" : "Сломан"}
                    onChange={(event) => setChecked2(event.target.checked)}
                  />
                </div>
              </div>
            </Stack>
            {checked2 ? (
              <Card
                className={`machine-card custom ${machine.new_status.color}`}
                sx={{ width: 250 }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Скорость </p>
                    <p>
                      <Speed />
                      {machine.rotation}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Эффективность </p>
                    <p>
                      <Bolt />
                      {machine.efficiency}
                    </p>
                  </div>
                </div>
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
                      "--CircularProgress-size": "135px",
                      "--CircularProgress-trackThickness": "10px",
                      "--CircularProgress-progressThickness": "10px",
                    }}
                  >
                    <div
                      className="flex flex-col items-center justify-center text-[var(--black)]"
                      style={{
                        fontSize: getFontSize({
                          type: "machine",
                          count: 1,
                          percent:
                            height > 1200
                              ? 2.8
                              : height < 800 && height > 600
                              ? 1.8
                              : 1.8,
                        }),
                      }}
                    >
                      <p>{machine.fkol_knit}</p>
                      <Divider
                        orientation="horizontal"
                        sx={{
                          height: 2,
                          backgroundColor: "gray",
                          opacity: 0.5,
                        }}
                        style={{ background: "black" }}
                      />
                      <p>{machine.pkol_knit + " Kg"}</p>
                    </div>
                  </CircularProgress>
                </CardContent>
              </Card>
            ) : (
              <div className="w-full h-full border-t border-[var(--border)] pt-3">
                <h3 className="mb-5">Причина поломки</h3>
                <ModalBtn
                  checkedReason={checkedReason}
                  setCheckedReason={setCheckedReason}
                />
                <p className="mb-2 text-[var(--gray)] mt-3">
                  Введите причину поломки
                </p>
                <textarea
                  className="p-3 bg-white border border-[var(--border)] outline-none focus:border-[var(--primary)] rounded-[8px] w-full"
                  rows={window?.screen?.height < 800 ? 1 : 5}
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
                      createStatus();
                    }}
                    fullWidth
                    disabled={!checkPermission("edit")}
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
      ) : (
        <OrderList machineName={machine.name} machineId={machine.id} />
      )}
    </div>
  );
};

export default ModalCard;
