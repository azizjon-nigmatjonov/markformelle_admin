import { useEffect, useRef, useState } from "react";
import CLabel from "../../../../components/CElements/CLabel";
import { ProxyFinalModal } from "./ProxyFinalModal";

export const ProxyPopup = ({ obj, title }: { obj: any; title: string }) => {
  const [open, setOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  console.log("obj", obj);

  useEffect(() => {
    inputRef.current?.focus();
    setInterval(() => {
      inputRef.current?.focus();
    }, 1000);
  }, [inputRef]);

  return (
    <>
      <div className="p-2 w-[180px] border rounded-[8px]">
        <CLabel title={title} />
        <input type="text" className="input-design" autoFocus ref={inputRef} />

        <div className="flex justify-end mt-3">
          <button className="border rounded-[8px] px-2 py-1">Enter</button>
        </div>
      </div>
      {open && <ProxyFinalModal setOpen={setOpen} title={title} />}
    </>
  );
};
