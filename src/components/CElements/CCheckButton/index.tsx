interface Props {
  element?: any;
  checked?: boolean;
  color?: string;
  handleCheck?: (val: any) => void;
}

const CCheckButton = ({
  element = {},
  handleCheck = () => {},
  checked = false,
  color = "white",
}: Props) => {
  if (!element?.label) return;
  return (
    <div
      onClick={() => handleCheck(element)}
      className={`flex items-center gap-2 cursor-pointer px-2 ipod:px-1 desktop:px-12px rounded-[8px] border h-[30px] whitespace-nowrap`}
      style={{
        backgroundColor: checked ? color : "",
        color: checked ? "white" : "var(--gray)",
        borderColor: color,
      }}
    >
      <div className="font-medium">{element.label}</div>
    </div>
  );
};

export default CCheckButton;
