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
      className="fixed z-[97] translate-x-1/2 left-1/2 translate-x-1/2"
      style={{ top: `${collapsed ? "35px" : "-12px"}` }}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="group w-[20px] h-[40px] flex items-center justify-center"
      >
        <div className="relative w-[20px]">
          <div
            className={`h-[3px] w-[11.5px] bg-[var(--gray30)] absolute left-0 top-0 duration-200 ${
              !collapsed
                ? "group-hover:rotate-[30deg]"
                : "group-hover:rotate-[-30deg]"
            }`}
          ></div>
          <div
            className={`h-[3px] w-[11.5px] bg-[var(--gray30)] absolute right-0 top-0 duration-200 ${
              !collapsed
                ? "group-hover:rotate-[-30deg]"
                : "group-hover:rotate-[30deg]"
            }`}
          ></div>
        </div>
      </button>
    </div>
  );
};
