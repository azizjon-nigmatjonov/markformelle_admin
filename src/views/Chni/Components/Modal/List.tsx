import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import { Button, ListDivider, Switch } from "@mui/joy";
import { Bolt } from "@mui/icons-material";
import { Alert } from "@mui/material";
import "./style.scss";
import { useState } from "react";
import { GetCurrentDate } from "../../../../utils/getDate";
import { usePermissions } from "../../../../hooks/usePermissions";
import { t } from "i18next";
import { ImageViewer } from "../../../../components/UI/ImageViewer";
import { MachineCardHeader } from "../../../../components/UI/Cards/MahineCard/Header";
import { MachineCardBody } from "../../../../components/UI/Cards/MahineCard/Body";

export const ChniCardList = ({ machine }: { machine: any }) => {
  const { getFontSize } = useDeviceHeight();
  const [checked1, setChecked1] = useState(machine.machine_is_on == "true");
  const [checked2, setChecked2] = useState(machine.not_broken == "true");
  const height = window?.screen?.height ?? 0;
  const [alertInfo, setAlertInfo]: any = useState({
    type: "error",
    title: "",
  });
  const { checkPermission } = usePermissions();
  const [descriptionText, setDescriptionText] = useState("");
  const [imageView, setImageView] = useState("");

  const createStatus = () => {
    setAlertInfo({ type: "error", title: "No API" });
  };
  const getWeight = (item: any) => {
    const num: any = Number(item.pkol_knit) - Number(item.fkol_knit) || 0;

    return Number(num.toFixed(2));
  };

  return (
    <div className="grid mobile:grid-cols-2 h-full">
      <div className="text-base list remove-scroll">
        <div className="flex justify-between px-2 py-1">
          <p>Номер машины</p>
          <p>{machine.machine_name ?? "-"}</p>
        </div>
        <ListDivider />
        <div className="flex justify-between px-2 py-1">
          <p>Название машины</p>
          <p>{machine?.machine_name ?? "-"}</p>
        </div>
        <ListDivider />
        <div className="flex justify-between px-2 py-1">
          <p>Мощность машины</p> <p>{machine.plan_hourly} носков / час</p>
        </div>
        <ListDivider />
        <div className="flex justify-between px-2 py-1">
          <p>Статус машины</p>
          <p>{t(machine.status) ?? "-"}</p>
        </div>
        <ListDivider />
        <div className="flex justify-between px-2 py-1">
          <p>IP адрес </p>
          <p>{machine.ip_address ?? "-"}</p>
        </div>

        <ListDivider sx={{ background: "var(--gray)" }} />
        <div className="flex justify-between px-2 py-1">
          <p>Номер заказа </p>
          <p>{machine.zakaz ?? "-"}</p>
        </div>
        <ListDivider />
        <div className="flex justify-between px-2 py-1">
          <p>Артикул </p>
          <p>{machine.program ?? "-"}</p>
        </div>
        <ListDivider />
        <div className="flex justify-between px-2 py-1">
          <p>Лот пряжи </p>
          <p>{machine.lotno ?? "-"}</p>
        </div>

        <ListDivider />
        <div className="flex justify-between px-2 py-1">
          <p>План </p>
          <p>{machine.total_socks_plan}</p>
        </div>
        <ListDivider />
        <div className="flex justify-between px-2 py-1">
          <p>План факт </p>
          <p>{machine.total_socks_fact}</p>
        </div>
        <ListDivider />
        <div className="flex justify-between px-2 py-1">
          <p>Почасовой план </p>
          <p>{machine.socks_in_basket_plan}</p>
        </div>
        <ListDivider />
        <div className="flex justify-between px-2 py-1">
          <p>Остатка </p>
          <p>{getWeight(machine)} кг</p>
        </div>
        <ListDivider />
        <div className="flex justify-between px-2 py-1">
          <p>Рецепт </p>{" "}
          <div>
            <p>-</p>
          </div>
        </div>
      </div>

      <div className="border-l py-3 pr-6 pl-6 w-full flex items-center flex-col">
        <div className="w-full">
          <div
            className={`flex flex-col space-y-5 remove-scroll ${
              checked2 ? "mb-10" : ""
            }`}
          >
            <div className="flex justify-between">
              <p className="mr-1">Машина</p>
              <Switch
                checked={checked1}
                startDecorator={checked1 ? "Вкл" : "Отк"}
                onChange={(event) => setChecked1(event.target.checked)}
              />
            </div>
            <div className="flex justify-between">
              <p className="mr-1">Состояние машины</p>
              <Switch
                checked={checked2}
                startDecorator={checked2 ? "Работает" : "Сломан"}
                onChange={(event) => setChecked2(event.target.checked)}
              />
            </div>
          </div>
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
            <MachineCardHeader
              data={{
                title: machine.machine_name,
              }}
              count={6}
            />
            <MachineCardBody
              data={{
                plan: machine.total_socks_plan ?? "",
                plan_hourly: machine.socks_in_basket_fact,
                plan_fact: machine.total_socks_fact,
              }}
              count={6}
            />
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
                {/* {machine.efficiency + "%"} */}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full border-t border-[var(--border)] pt-2 mt-3">
            <div className="flex items-center justify-between mb-1">
              <h3>{t("screen_image")}</h3>
              <p>
                {GetCurrentDate({ date: machine.log_time, type: "usually" })}
              </p>
            </div>

            <div
              className="rounded-[12px] overflow-hidden border border-[var(--gray30)] cursor-pointer"
              onClick={() =>
                setImageView(
                  `http://10.40.14.193:8080/v1/machine_status/${machine.machine_id}/image`
                )
              }
            >
              <img
                src={`http://10.40.14.193:8080/v1/machine_status/${machine.machine_id}/image`}
                alt={machine.machine_id}
              />
            </div>
            <p className="mb-2 text-[var(--gray)] mt-3">
              Введите причину поломки
            </p>

            <textarea
              value={descriptionText}
              className="p-3 bg-transparent border border-[var(--border)] outline-none focus:border-[var(--primary)] rounded-[8px] w-full"
              rows={1}
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

            <div className="flex py-1 space-x-3">
              <Button onClick={() => {}} fullWidth variant="outlined">
                Отменить
              </Button>
              <button
                className="custom-btn create"
                onClick={() => {
                  // setOpen(false);
                  createStatus();
                }}
                disabled={!checkPermission("edit")}
              >
                Отправить
              </button>
            </div>
          </div>
        )}
      </div>

      {imageView ? (
        <ImageViewer url={imageView} closeViewer={() => setImageView("")} />
      ) : (
        ""
      )}
    </div>
  );
};
