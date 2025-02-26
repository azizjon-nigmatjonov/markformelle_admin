import useDeviceHeight from "../../../../hooks/useDeviceHeight";

export const CellKK = ({
  item,
  setOpen,
}: {
  item: any;
  setOpen: (val: boolean) => void;
}) => {
  const { getFontSize } = useDeviceHeight();

  const height = window?.screen?.height ?? 0;

  return (
    <div className={`h-full`}>
      <div
        className={`rounded-xl flex items-center justify-center text-2xl h-full py-1 desktop:py-2 ${
          item.all_defects ? "bg-[#ff6060] cursor-pointer" : "bg-[#6cce65]"
        }`}
        onClick={() => {
          if (item?.all_defects) {
            setOpen(true);
          }
        }}
      >
        <div
          className="flex w-full flex-col items-center font-medium h-full justify-center"
          style={{
            fontSize: getFontSize({
              count: 5,
              percent: height > 1200 ? 16 : 9,
              type: "machine",
            }),
          }}
        >
          <h2
            className="font-bold small_desktop:text-5xl mb-2"
            style={{
              fontSize: getFontSize({
                count: 5,
                percent: height > 1200 ? 20 : 14,
                type: "machine",
              }),
            }}
          >
            {item?.all_defects ? "Брак" : item.OBORUD_NUMBER}
          </h2>
          {item?.all_defects || item?.all_defects === 0 ? (
            <h3
              className="font-bold small_desktop:text-5xl mt-2 text-center"
              style={{
                fontSize: getFontSize({
                  count: 5,
                  percent: height > 1200 ? 20 : 13.5,
                  type: "machine",
                }),
              }}
            >
              <span>{item?.all_defects ? item?.all_defects + ' шт.' : 'Нет браков'}</span>
            </h3>
          ): ''}
            <p
            className="sub-text-614 font-medium mb-2"
            style={{
              fontSize: getFontSize({
                count: 5,
                percent: height > 1200 ? 18 : 13,
                type: "machine",
              }),
            }}
          >
            {item?.COUNT_RECORDS && item.COUNT_RECORDS + " шт."}
          </p>
          
          <p className="font-medium">
            {item?.LOT?.substring(0, item?.LOT?.indexOf("(") - 1)}
          </p>
          <p className="font-medium">{item?.ART}</p>
        </div>
      </div>
    </div>
  );
};
