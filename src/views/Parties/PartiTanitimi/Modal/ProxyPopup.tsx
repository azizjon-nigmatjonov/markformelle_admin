import { useRef } from "react";
import CLabel from "../../../../components/CElements/CLabel";

export const ProxyPopup = ({ obj }: { obj: any }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  console.log("obj", obj);

  // useEffect(() => {
  //   inputRef.current?.focus();
  //   setInterval(() => {
  //     inputRef.current?.focus();
  //   }, 1000);
  // }, [inputRef]);

  return (
    <>
      <div className="absolute top-0 left-0 z-[99]">
        <CLabel title={obj?.PARTIKAYITID} />
        <input
          type="text"
          className="rounded-[8px] h-[25px] w-[100px] px-2 border border-[var(--border)] bg-white"
          autoFocus
          ref={inputRef}
        />
      </div>

      {/* {open && <ProxyFinalModal setOpen={setOpen} title={title} />} */}
    </>
  );
};
