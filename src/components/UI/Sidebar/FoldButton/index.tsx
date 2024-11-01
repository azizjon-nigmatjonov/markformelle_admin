interface Props {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export const FoldButton = ({ collapsed, setCollapsed = () => {} }: Props) => {
  return (
    <div
      className="fixed z-[97]"
      style={{
        top: "calc(100vh - 70px - 50vh)",
        left: `${collapsed ? "45px" : "10px"}`,
      }}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="group w-[17px] h-[45px] flex items-center justify-center"
      >
        <div className="relative h-[25px]">
          <div
            className={`w-[3px] h-[13.5px] bg-[var(--gray30)] absolute left-0 top-0 duration-200 ${
              collapsed ? "rotate-[30deg]" : "rotate-[-30deg]"
            }`}
          ></div>
          <div
            className={`w-[3px] h-[13.5px] bg-[var(--gray30)] absolute left-0 bottom-0 duration-200 ${
              collapsed ? "rotate-[-30deg]" : "rotate-[30deg]"
            }`}
          ></div>
        </div>
      </button>
    </div>
  );
};
