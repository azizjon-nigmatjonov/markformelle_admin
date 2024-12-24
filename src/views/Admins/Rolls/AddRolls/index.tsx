import CBreadcrumbs from "../../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../../components/UI/Header";
import Rolls from "./Rolls";
import { useForm } from "react-hook-form";
import { CreateFunction, FetchFunction, breadCrumbs } from "./Logic";
// import { Validation } from "./validate";
import { useParams } from "react-router-dom";
import { RollList } from "./List";
import { RollForm } from "./Form";
import { useEffect, useState } from "react";

const NewRolls = () => {
  // const schema = Validation();
  const { id } = useParams();

  const {
    newRouteList,
    isLoading: listLoading,
    rollData,
  } = FetchFunction({ id });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const { createRoll, updateRoll, isLoading } = CreateFunction({});
  const { breadCrumbsItems } = breadCrumbs({ id });
  const [permissions, setPermissions]: any = useState({});

  const onSubmit = (data: any) => {
    data.id = data.name.split(" ").join("").toLowerCase();
    if (id !== ":create") {
      updateRoll(data, id);
    } else {
      createRoll(data);
    }
  };

  const handleCheck = (permission: any, type?: string) => {
    let obj = { ...permissions };

    if (type === "all") {
      const ids = permission?.map((item: any) => item.label);
      const key = permission[0]?.id;

      if (key in obj) {
        if (obj[key].length >= ids.length) {
          obj[key] = [];
        } else {
          obj[key] = ids;
        }
      } else {
        obj[key] = ids;
      }
    } else {
      const value = permission.label;
      const key = permission.value.substring(0, permission.value.indexOf("#"));

      if (key in obj) {
        if (obj[key].includes(value)) {
          obj[key] = obj[key].filter((item: string) => item !== value);
        } else {
          obj[key].push(value);
        }
      } else {
        obj[key] = [];
        obj[key].push(value);
      }
    }

    setValue("permissions", obj);
    setPermissions(obj);
  };

  useEffect(() => {
    if (rollData?.permissions) {
      setPermissions(rollData.permissions);
      setValue("permissions", rollData.permissions);
    }
  }, [rollData]);

  return (
    <>
      <Header
        sticky={true}
        extra={
          <CBreadcrumbs items={breadCrumbsItems} progmatic={true} type="link" />
        }
      ></Header>

      <div className="container divide-y-[1px] divide-[var(--gray20)] w-[80%] my-5">
        <Rolls text="Новый рол">
          <RollForm
            id={id}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            control={control}
            setValue={setValue}
            rollData={rollData}
            isLoading={isLoading}
          />
        </Rolls>

        <RollList
          newRouteList={newRouteList}
          isLoading={listLoading}
          handleCheck={handleCheck}
          permissions={permissions}
          errors={errors}
        />
      </div>
    </>
  );
};

export default NewRolls;
