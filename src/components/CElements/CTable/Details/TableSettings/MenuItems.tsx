import { useState } from "react";
import CCheckbox from "../../../../CElements/CCheckbox";

const CheckBox = ({
  element,
  defaultValue,
  handleFilterSave,
}: {
  defaultValue: any;
  element: any;
  handleFilterSave: (val: any) => void;
}) => {
  const [checked, setChecked] = useState(defaultValue);

  return (
    <CCheckbox
      element={{ label: element.title || element.id }}
      checked={checked}
      handleCheck={() => {
        handleFilterSave(element.id);
        setChecked((prev: boolean) => !prev);
      }}
    />
  );
};

const CheckBoxList = ({
  list,
  handleFilterSave,
}: {
  list: any;
  handleFilterSave: (val: any) => void;
}) => {
  return (
    <div className="grid gap-y-2">
      {list.map((item: any, index: number) => (
        <CheckBox
          key={index}
          element={item}
          defaultValue={item.checked}
          handleFilterSave={handleFilterSave}
        />
      ))}
    </div>
  );
};

export const MenuItem = ({
  element,
  allCheck = false,
  handleFilterSave,
}: {
  element: any;
  allCheck: boolean;
  handleFilterSave: (val: any) => void;
}) => {
  const GetUi = (el: any) => {
    switch (el.type) {
      case "checkbox":
        return (
          <CheckBoxList list={el.data} handleFilterSave={handleFilterSave} />
        );
      default:
        return <></>;
    }
  };

  return (
    <li className="w-[240px]">
      <div className="mb-2 flex justify-between w-full items-center pr-1">
        <span>{element.label}</span>
        <div>
          <CCheckbox
            checked={allCheck}
            handleCheck={() => {
              handleFilterSave("all");
            }}
          />
        </div>
      </div>
      <>{GetUi(element)}</>
    </li>
  );
};
