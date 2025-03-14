import cls from "./style.module.scss";
export const OneSkeleton = ({
  rounded = 4,
  height = 150,
}: {
  rounded?: number;
  height?: number;
}) => {
  return (
    <div
      style={{ height, width: "100%", borderRadius: rounded }}
      className={cls.skeleton}
    ></div>
  );
};
