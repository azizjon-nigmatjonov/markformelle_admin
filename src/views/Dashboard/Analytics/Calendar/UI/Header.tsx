import Tools from "./Tools";

const Header = () => {
  // const nextButton = () => {
  //   if (MONTHS.length - 1 > index) {
  //     setIndex((prev: any) => ++prev)
  //   } else if (MONTHS.length - 1 == index) {
  //     setIndex(0)
  //   }
  // }

  // const prevButton = () => {
  //   if (index > 0) {
  //     setIndex((prev: any) => --prev)
  //   } else if (index == 0) {
  //     setIndex(11)
  //   }
  // }

  return (
    <div className="flex justify-between h-[60px] items-center px-5">
      <Tools />

      <div className="flex text-[14px] text-[var(--gray)] space-x-[30px] font-medium">
        <div className="flex gap-1 items-center">
          <div
            className="w-[20px] h-[20px] rounded-full"
            style={{ backgroundColor: "var(--primary)" }}
          ></div>
          Ishlayotganlar
        </div>
        <div className="flex gap-1 items-center">
          <div
            className="w-[20px] h-[20px] rounded-full"
            style={{ backgroundColor: "var(--primary)" }}
          ></div>
          Buzulganlar
        </div>
        <div className="flex gap-1 items-center">
          <div
            className="w-[20px] h-[20px] rounded-full"
            style={{ backgroundColor: "var(--primary)" }}
          ></div>
          Kutlyatgonlar
        </div>
        <div className="flex gap-1 items-center">
          <div
            className="w-[20px] h-[20px] rounded-full"
            style={{ backgroundColor: "var(--primary)" }}
          ></div>
          Toxtaganlar
        </div>
      </div>
    </div>
  );
};

export default Header;
