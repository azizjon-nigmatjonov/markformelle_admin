interface Props {
  element: any;
  checked?: boolean;
  color?: string;
  handleCheck?: (val: any) => void;
}

const CCheckButton = ({
  element,
  handleCheck = () => {},
  checked = false,
  color = "white",
}: Props) => {
  return (
    <div
      onClick={() => handleCheck(element)}
      className={`flex items-center gap-2 cursor-pointer px-12px rounded-[8px] border h-[35px] w-full whitespace-nowrap`}
      style={{
        backgroundColor: checked ? color : "",
        color: checked ? "white" : "var(--gray)",
        borderColor: color
      }}
    >
      <div className="font-medium">{element.label}</div>
    </div>
  );
};

export default CCheckButton;
