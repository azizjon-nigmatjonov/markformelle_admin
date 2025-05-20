import { useEffect, useRef, useState } from "react";
import cls from "./style.module.scss";
export const TwoRowTable = () => {
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
                className={`${cls.cell} font-medium border-b border-green-300 bg-green-200`}
              >
                <p>{item[head.id]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="h-[12px] w-full"></div>
      {/* {headerScrollRef && (
        <div
          className="w-full py-1"
          style={{
            width: headerScrollRef?.current?.scrollWidth,
          }}
        >
          <Divider>
            <Chip label={<p>okeysiz</p>} size="small" />
          </Divider>
        </div>
      )} */}
      <div className={cls.body}>
        {bodyColumns.map((item: any, index: number) => (
          <div key={index} className={`${cls.row} flex`}>
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
  );
};
