const Lighter = ({
  text = "",
  color = "",
  icon,
}: {
  color?: string;
  text: string;
  icon?: any;
}) => {
  return (
    <div className="flex justify-start w-full gap-[6px] items-center ">
      <div
        className="w-[20px] h-[20px] rounded-full"
        style={{ backgroundColor: icon }}
      ></div>
      <span className="font-medium text-[var(--black)]">{text}</span>
      {color && (
        <div
          className="w-[8px] h-[8px]  rounded-full ml-1"
          style={{ backgroundColor: color }}
        ></div>
      )}
    </div>
  );
};

export default Lighter;
