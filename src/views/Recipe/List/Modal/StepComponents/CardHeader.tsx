import { useTranslation } from "react-i18next";

interface Props {
  headerScrollRef: any;
  headColumns: any;
}

export const CardHeader = ({ headerScrollRef, headColumns = [] }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-4 border-t border-[var(--border)] text-[var(--main)] sticky top-[-7px] bg-white z-[90] font-medium">
      <div
        className="header col-span-3 pl-3 overflow-x-scroll remove-scroll"
        ref={headerScrollRef}
      >
        <div className="flex px-1">
          {headColumns.map(
            (head: { id: string; title: string; width: number }) => (
              <div
                key={head.id + head.title}
                style={{ minWidth: head?.width }}
                className="cell"
              >
                <p style={{ minWidth: head?.width }}>{head.title}</p>
              </div>
            )
          )}
        </div>
      </div>
      <div className="py-[6px]">
        <p className="text-center">{t("process_number")}</p>
      </div>
    </div>
  );
};
