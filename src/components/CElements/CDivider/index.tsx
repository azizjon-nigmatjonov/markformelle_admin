interface Props {
  title?: string;
  classes?: string;
  column?: boolean;
  direction?: string;
}

const CDriver = ({ title, classes, direction = "horizantal" }: Props) => {
  if (direction === "vertical") {
    return (
      <div
        className={`h-[20px] w-[1px] bg-[var(--border)] mx-3 ${classes}`}
      ></div>
    );
  }

  if (direction === "horizantal") {
    return (
      <div
        className={`flex items-center  ${classes} ${title ? "space-x-3" : ""}`}
      >
        <div className="w-full h-[1px] bg-[var(--border)]"></div>
        {title && (
          <span className="font-medium whitespace-nowrap">{title}</span>
        )}
        <div className="w-full h-[1px]  bg-[var(--border)]"></div>
      </div>
    );
  }
};

export default CDriver;
