interface Props {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export const HeaderFoldButton = ({
  collapsed,
  setCollapsed = () => {},
}: Props) => {
  return (
    <div
      className="fixed z-[97] left-1/2 -translate-x-1/2"
      style={{ top: `${collapsed ? "30px" : "-15px"}` }}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="group w-[28px] h-[45px] flex items-center justify-center"
      >
        <div className="relative w-[28px]">
          <div
            className={`h-[3px] w-[15px] bg-[var(--gray30)] absolute left-0 top-0 duration-200 ${
              !collapsed ? "rotate-[30deg]" : "rotate-[-30deg]"
            }`}
          ></div>
          <div
            className={`h-[3px] w-[15px] bg-[var(--gray30)] absolute right-0 top-0 duration-200 ${
              !collapsed ? "rotate-[-30deg]" : "rotate-[30deg]"
            }`}
          ></div>
        </div>
      </button>
    </div>
  );
};
