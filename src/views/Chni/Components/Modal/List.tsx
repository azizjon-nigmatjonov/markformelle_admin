import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import { Button, Divider, ListDivider, Stack, Switch } from "@mui/joy";
import { Bolt } from "@mui/icons-material";
import { Alert } from "@mui/material";
import CircularProgress from "../../../../components/CElements/CCircularProgress";
import "./style.scss";
import { useState } from "react";
import { ModalBtn } from "../../../Kniting/Machines/Card/Btn";
import { GetCurrentDate } from "../../../../utils/getDate";
import { usePermissions } from "../../../../hooks/usePermissions";

export const ChniCardList = ({ machine }: { machine: any }) => {
  const { getFontSize } = useDeviceHeight();
  const [checked1, setChecked1] = useState(machine.machine_is_on == "true");
  const [checked2, setChecked2] = useState(machine.not_broken == "true");
  const height = window?.screen?.height ?? 0;
  const [checkedReason, setCheckedReason]: any = useState("1");
  const [alertInfo, setAlertInfo]: any = useState({
    type: "error",
    title: "",
  });
  const { checkPermission } = usePermissions();
  const [descriptionText, setDescriptionText] = useState("");
  const createStatus = () => {
    setAlertInfo({ type: "error", title: "No API" });
  };
  const getWeight = (item: any) => {
    const num: any = Number(item.pkol_knit) - Number(item.fkol_knit) || 0;

    return Number(num.toFixed(2));
  };

  return (
    <div className="grid grid-cols-2">
      <ul
        className="grid grid-cols-1 paintlist text-[var(--black10)] mr-6 space-y-1 desktop:space-y-2"
        style={{
          fontSize: getFontSize({
            type: "machine",
            count: 1,
            percent:
              height > 1200 ? 2.5 : height < 800 && height > 600 ? 1.5 : 1.5,
          }),
        }}
      >
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Номер машины</p>
          <p>{machine.name}</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Название машины</p>
          <p>{machine.model}</p>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Мощность машины</p> <p>{machine.capacity}</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Статус машины</p>
          <p>{machine.status}</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>IP адрес </p>
          <p>{machine.ip_address}</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Версия программы </p>
          <p>{machine.soft_version}</p>
        </li>
        <ListDivider sx={{ background: "var(--gray)" }} />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Номер заказа </p>
          <p>{machine.zakaz}</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Артикул </p>
          <p>{machine.art}</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Лот пряжи </p>
          <p>{machine.lotno}</p>
        </li>

        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>План </p>
          <p>{machine.plan}</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>План факт </p>
          <p>{machine.plan_fact}</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Почасовой план </p>
          <p>{machine.plan_fact}</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Остатка </p>
          <p>{getWeight(machine)} кг</p>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Рецепт </p>{" "}
          <div>
            <p>M0581-C34132.A</p>
          </div>
        </li>

        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>ФИО сотрудника </p> <p>Сардор</p>
        </li>

        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Время начала</p>{" "}
          <p>
            {GetCurrentDate({ date: machine.PrevDateTime, type: "usually" })}
          </p>
        </li>

        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Время окончания</p>
          <p>
            {GetCurrentDate({ date: machine.LastDateTime, type: "usually" })}
          </p>
        </li>
      </ul>

      <div className="border-l py-3 pr-6 pl-6 w-full flex items-center flex-col">
        <div className="w-full">
          <ul className={`flex flex-col space-y-5 ${checked2 ? "mb-10" : ""}`}>
            <li
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
            </li>
            <li
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
            </li>
          </ul>
        </div>
        {checked2 ? (
          <div
            className={`flex flex-col items-center w-[300px] p-3 font-semibold mt-8 rounded-[12px] ${machine.new_status.color}`}
          >
            <p
              className="text-center w-full"
              style={{
                fontSize: getFontSize({
                  count: 6,
                  percent: height > 1200 ? 24 : 20,
                  type: "machine",
                }),
              }}
            >
              {machine.machine_number}
            </p>
            <CircularProgress
              strokeWidth={getFontSize({
                count: 6,
                percent: 6,
                type: "machine",
              })}
              value={
                Number(machine.plan_fact) > 100
                  ? 100
                  : Number(machine.plan_fact)
              }
              maxValue={100}
              size={getFontSize({
                count: 6,
                percent: 100,
                type: "machine",
              })}
            >
              <div
                className="flex flex-col"
                style={{
                  fontSize: getFontSize({
                    type: "machine",
                    count: 6,
                    percent: 15,
                  }),
                }}
              >
                <p>{machine.plan}</p>
                <Divider
                  orientation="horizontal"
                  sx={{
                    height: 2,
                    backgroundColor: "gray",
                    opacity: 0.5,
                  }}
                  style={{ background: "black" }}
                />
                <p>{machine.plan_fact}</p>
                <p>{machine.plan_fact}</p>
              </div>
            </CircularProgress>
            <div className="flex justify-between items-end w-full">
              <p></p>
              <p
                style={{
                  fontSize: getFontSize({
                    count: 6,
                    percent: 10,
                    type: "machine",
                  }),
                }}
              >
                <Bolt
                  style={{
                    fontSize: getFontSize({
                      count: 6,
                      percent: 12,
                      type: "machine",
                    }),
                  }}
                />
                {machine.efficiency + "%"}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full border-t border-[var(--border)] pt-2 mt-3">
            <h3 className="mb-5">Причина поломки</h3>
            <ModalBtn
              checkedReason={checkedReason}
              setCheckedReason={setCheckedReason}
            />
            <p className="mb-2 text-[var(--gray)] mt-3">
              Введите причину поломки
            </p>
            <textarea
              value={descriptionText}
              className="p-3 bg-transparent border border-[var(--border)] outline-none focus:border-[var(--primary)] rounded-[8px] w-full"
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
                  // setOpen(false);
                  createStatus();
                }}
                fullWidth
                disabled={!checkPermission("edit")}
              >
                Отправить
              </Button>
              <Button onClick={() => {}} fullWidth variant="outlined">
                Отменить
              </Button>
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
};
