import { useEffect, useRef, useState } from "react";
import cls from "./style.module.scss";
import { PlusIcon } from "../../../../../components/UI/IconGenerator/Svg";
import { useTranslation } from "react-i18next";
interface Props {
  title: string;
}
export const TwoRowTable = ({ title = "table" }: Props) => {
  const { t } = useTranslation();
  const headerScrollRef: any = useRef(null);
  const [headColumns, setHeadColumns]: any = useState([]);
  useEffect(() => {
    setHeadColumns([
      {
        title: "Name",
        id: "name",
      },
      {
        title: "Age",
        id: "age",
      },
      {
        title: "Address",
        id: "address",
      },
      {
        title: "Job",
        id: "job",
      },
      {
        title: "Experience",
        id: "experience",
      },
    ]);
  }, []);
  const bodyColumns = [
    {
      name: "john dou",
      age: 21,
      address: "Tashkent",
      job: "Programmer",
      experience: "4 years",
    },
    {
      name: "john dou",
      age: 21,
      address: "Tashkent",
      job: "Programmer",
      experience: "4 years",
    },
    {
      name: "john dou",
      age: 21,
      address: "Tashkent",
      job: "Programmer",
      experience: "4 years",
    },
    {
      name: "john dou",
      age: 21,
      address: "Tashkent",
      job: "Programmer",
      experience: "4 years",
    },
    {
      name: "john dou",
      age: 21,
      address: "Tashkent",
      job: "Programmer",
      experience: "4 years",
    },
  ];
  return (
    <div>
      <div className="py-1 flex items-center justify-between px-2 border-b border-[var(--border)]">
        <h2>{title}</h2>
        <button className="flex space-x-1 items-center text-sm">
          <PlusIcon fill="var(--black)" />
          <span>{t("add")}</span>
        </button>
      </div>
      <div
        className={`${cls.twoRowTable} text-sm overflow-x-scroll designed-scroll`}
      >
        <div className={`${cls.header} flex`} ref={headerScrollRef}>
          <div className="flex font-medium text-[var(--main)]">
            {headColumns.map((head: { id: string; title: string }) => (
              <div
                key={head.id + head.title}
                className={`${cls.cell} border-b border-[var(--border)]`}
              >
                <p>{head.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={cls.body}>
          {bodyColumns.map((item: any, index: number) => (
            <div key={index} className={`${cls.row} flex`}>
              {headColumns.map((head: { id: string; title: string }) => (
                <div
                  key={head.id + head.title}
                  className={`${cls.cell} font-medium border-b border-green-300 bg-green-200 cursor-pointer`}
                >
                  <p>{item[head.id]}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="h-[6px] w-full"></div>

        <div className={cls.body}>
          {bodyColumns.map((item: any, index: number) => (
            <div key={index} className={`${cls.row} flex cursor-pointer`}>
              {headColumns.map((head: { id: string; title: string }) => (
                <div
                  key={head.id + head.title}
                  className={`${cls.cell} font-medium border-b border-yellow-300 bg-yellow-100`}
                >
                  <p>{item[head.id]}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
