import { statusReasonsRu } from "../../../../constants/status";

interface Props {
  checkedReason: string;
  setCheckedReason: (val: string) => void;
}

export const ModalBtn = ({
  checkedReason = "1",
  setCheckedReason = () => {},
}: Props) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {Object.keys(statusReasonsRu).map((item: any) => (
        <div
          key={item}
          className={`border rounded-[8px] px-3 h-[40px] flex items-center justify-center cursor-pointer ${
            checkedReason == item
              ? "border-[#FF9C27] bg-[#FEE5C7]"
              : "border-[var(--gray30)]"
          }`}
          onClick={(e: any) => {
            e.stopPropagation();
            setCheckedReason(item);
          }}
        >
          <p
            className={`${
              checkedReason == item ? "text-black" : "text-[var(--gray)]"
            }`}
          >
            {statusReasonsRu[item]}
          </p>
        </div>
      ))}
    </div>
  );
};
