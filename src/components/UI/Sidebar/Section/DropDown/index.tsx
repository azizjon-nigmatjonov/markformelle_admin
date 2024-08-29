import { useTranslation } from "react-i18next";
import IconGenerator from "../../../../../components/UI/IconGenerator";
import { SectionBtns } from "../Btns";

interface Props {
  title: any;
  value: any;
  handleNavigate: (link: any) => void;
}

const Btn = ({
  el,
  index,
  handleNavigate = () => {},
  isLastItem,
}: {
  index: number;
  el: any;
  handleNavigate: (link: any) => void;
  isLastItem: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <button
      key={el.id}
      onClick={() => handleNavigate(el)}
      className={`${
        index < 100 ? "steps__item steps__item--active" : "steps__item"
      } menu_link2 flex items-center steps ${
        location.pathname.substring(1).startsWith(el.path) ? "active" : ""
      }`}
    >
      <p
        className={`${
          isLastItem ? "mb-2" : ""
        } flex gap-x-4 capitalize menu_link cursor-pointer font-medium whitespace-nowrap text-[var(--gray)]`}
      >
        <IconGenerator
          icon={el.icon}
          fill={
            location.pathname.substring(1).startsWith(el.path)
              ? "var(--main)"
              : "var(--gray)"
          }
        />
        <span>{t(el.title)}</span>
      </p>
    </button>
  );
};

export const DropDown = ({
  value,
  title,
  handleNavigate = () => {},
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="mt-[-40px]">
      <div className="absolute left-[38px] group-hover:block hidden w-auto z-[99]">
        <div className="relative">
          <div className="absolute left-[-7px] top-[15px] w-[15px] h-[15px] rotate-[45deg] bg-white border border-[var(--gray20)] z-[33]"></div>
          <div className="relative z-[99] bg-white card-shadow min-w-[200px] rounded-[12px] border border-[var(--gray20)] pt-2 ${el.children}">
            <div
              className={`flex items-center space-x-3 pb-2 border-b border-[var(--border)] pl-3`}
            >
              <span className="text-[var(--black)] font-[600] text-lg">
                {t(title)}
              </span>
            </div>
            <div className="show">
              {Object.values(value as keyof typeof value)?.map(
                (el: any, i, arr) => {
                  const isLastItem = i === arr.length - 1;

                  if (el.title && el.title.trim() !== "") {
                    return (
                      el.sidebar && (
                        <div key={i} className={el?.children?.length ? 'pb-2 mr-5' : ''}>
                          <SectionBtns
                            index={i}
                            handleNavigate={handleNavigate}
                            clearFilter={() => {}}
                            el={el}
                            children={el.children}
                            isLastItem={isLastItem}
                          />
                        </div>
                      )
                    );
                  } else {
                    return null;
                  }
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OneDropdown = ({
  title = "",
  icon = "",
  path = "/",
  clearFilter = () => {},
  handleNavigate = () => {},
}: {
  title: string;
  icon: string;
  path: string;
  clearFilter: () => void;
  handleNavigate: (link: any) => void;
}) => {
  return (
    <div className="absolute left-[38px] group-hover:block hidden bg-white whitespace-nowrap common-shadow rounded-[12px] z-[99] p-2">
      <div className="overflow-hidden">
        <button
          onClick={() => handleNavigate(path)}
          className={`menu_link2 flex items-center steps`}
        >
          <p
            className={`flex justify-between capitalize menu_link2 cursor-pointer font-medium text-[var(--black)] whitespace-nowrap pr-10 ${
              location.pathname.startsWith(path) ? "active" : ""
            }`}
            onClick={() => clearFilter()}
          >
            <div className="flex space-x-4">
              <IconGenerator
                icon={icon}
                fill={
                  location.pathname.startsWith(path)
                    ? "var(--main)"
                    : "var(--gray)"
                }
              />
              <span>{title}</span>
            </div>
          </p>
        </button>
      </div>
    </div>
  );
};
