import { useTranslation } from "react-i18next";
import { Alert } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CNewMiniModal from "../../../../components/CElements/CNewMiniModal";
import CLabel from "../../../../components/CElements/CLabel";
import dayjs from "dayjs";

export const ProxyFinalModal = ({
  setOpen = () => {},
  modalData = {},
  deleteProxy = () => {},
  currentSiparis,
  checkProxy,
  setCurrentSiparis,
}: {
  setOpen: (val: boolean) => void;
  modalData: any;
  deleteProxy: (data: any) => void;
  currentSiparis: any;
  checkProxy: (value: string) => void;
  setCurrentSiparis: (data: any) => void;
}) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setInterval(() => {
        inputRef.current?.focus();
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (searchValue.length === 8) {
      setCurrentSiparis({
        ...currentSiparis,
        PROXYID: searchValue,
      });

      checkProxy(searchValue);
    }
  }, [searchValue]);

  return (
    <CNewMiniModal
      title={t("smart_card_modal")}
      handleActions={() => setOpen(false)}
    >
      <div className="w-[400px]">
        {modalData?.PROXYID && (
          <Alert
            severity={modalData?.PARTIKAYITID ? "error" : "info"}
            style={{ height: "30px" }}
          >
            {modalData?.PARTIKAYITID ? (
              <p className="text-[16px]">
                {t("this_proxy_is_used_in_parti")}{" "}
                <span className="text-red-500 font-medium">
                  {dayjs(modalData?.INSERTTARIHI).format("YYYY")} ID:{" "}
                  {modalData?.PARTISINIFID}
                </span>{" "}
                ?
              </p>
            ) : (
              <p className="text-[16px]">
                <span className="text-blue-700">
                  {modalData?.PROXYID} proxy
                </span>{" "}
                {t("into")}{" "}
                <span className="text-red-700">
                  {currentSiparis?.PARTIKAYITID} {t("partistok")}
                </span>
              </p>
            )}
          </Alert>
        )}
        <div className="mt-3">
          <CLabel title="enter_proxy_id" />
          <input
            type="text"
            className="rounded-[8px] h-[25px] w-full px-2 mt-1 border border-[var(--border)] bg-white mb-3"
            autoFocus
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            value={searchValue}
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setCurrentSiparis({
                  ...currentSiparis,
                  PROXYID: searchValue,
                });
                checkProxy(searchValue);
              }
            }}
          />
        </div>

        {!modalData?.PARTIKAYITID && modalData?.PROXYID ? (
          <div className="flex justify-end">
            <div>
              <button
                onClick={() => deleteProxy(modalData)}
                className="custom-btn"
              >
                {t("submit_proxy_to_partistok")}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </CNewMiniModal>
  );
};
