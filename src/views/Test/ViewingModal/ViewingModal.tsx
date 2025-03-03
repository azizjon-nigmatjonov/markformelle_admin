interface Props {
  title?: string;
  open: boolean;
  children: any;
  onClose: () => void;
}

export const ViewingModal = ({
  title = "",
  open = false,
  onClose = () => {},
  children,
}: Props) => {
  if (!open) return <></>;
  return (
    <>
      <div className="w-[90vw] absolute left-1/2 top-1/2 z-[99] bg-white -translate-x-1/2 -translate-y-1/2 rounded-[12px]">
        {title && (
          <h2 className="text-xl font-medium text-center pt-3">{title}</h2>
        )}
        {children}
      </div>
      <div
        className="absolute left-0 top-0 w-full h-full bg-[#111] bg-opacity-20 z-[98]"
        onClick={() => onClose()}
      ></div>
    </>
  );
};
