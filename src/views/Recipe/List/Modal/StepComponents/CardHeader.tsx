import { useTranslation } from "react-i18next";

interface Props {
  headerScrollRef: any;
  headColumns: any;
}

export const CardHeader = ({ headerScrollRef, headColumns = [] }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-3 text-[var(--main)] sticky top-0 bg-white z-[90] font-medium">
      <div
        className="header col-span-2 mr-5 pl-4 overflow-x-scroll remove-scroll"
        ref={headerScrollRef}
      >
        <div className="flex px-1 text-sm">
          {headColumns.map((head: { id: string; title: string }) => (
            <div key={head.id + head.title} className="cell">
              <p>{head.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pl-5 py-[6px]">
        <p className="text-center">{t("process_number")}</p>
      </div>
    </div>
  );
};
