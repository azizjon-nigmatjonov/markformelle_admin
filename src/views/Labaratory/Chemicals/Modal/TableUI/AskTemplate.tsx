import { useEffect, useState } from "react";
import { useFetchTypeSingle } from "../../../../../hooks/useFetchRequests/useFetchType";
import CNewModal from "../../../../../components/CElements/CNewModal";
import { ModalUIRecipe } from "../../../../Recipe/List/Modal";

export const AskTemplate = ({
  handleActions,
}: {
  handleActions: (val: string) => void;
}) => {
  return (
    <>
      <div>
        <ul>
          <li className="border-b px-2 py-1">
            <button>Bu Atisin Kapyasini Olustur</button>
          </li>
          <li
            onClick={() => {
              handleActions("fetch_template");
            }}
            className="border-b px-2 py-1"
          >
            <button>Sablondan Uretim Recetesi Olustur</button>
          </li>
          <li className="px-2 py-1">
            <button>Uretim Recetesi Olustur</button>
          </li>
        </ul>
      </div>
    </>
  );
};
